import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { Building2, User, Phone, ChevronRight } from "lucide-react";
import CustomerFilters from "@/components/admin/CustomerFilters";
import { SOURCE_LABEL, rs, type OrderSource } from "@/components/admin/order-status";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function buildWhere(sp: SP): Prisma.CustomerWhereInput {
  const where: Prisma.CustomerWhereInput = {};
  const status = one(sp.status);
  const source = one(sp.source);
  const q = one(sp.q)?.trim();
  if (status === "ACTIVE" || status === "BLOCKED") where.status = status;
  if (source === "SHOP" || source === "DIRECT") where.source = source;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { company: { contains: q, mode: "insensitive" } },
    ];
  }
  return where;
}

export default async function CustomersPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const customers = await prisma.customer.findMany({
    where: buildWhere(sp),
    orderBy: { createdAt: "desc" },
    take: 1000,
    include: { orders: { select: { cost: true, amountPaid: true } } },
  });

  const totalActive = customers.filter((c) => c.status === "ACTIVE").length;
  const totalBlocked = customers.length - totalActive;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-5">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Customers</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {customers.length} in system · {totalActive} active{totalBlocked ? ` · ${totalBlocked} blocked` : ""}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <CustomerFilters />
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-ink/10 bg-paper">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-paper-dim text-[11px] font-bold uppercase tracking-widest text-ink-soft">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Orders</th>
              <th className="px-4 py-3 text-right">Billed</th>
              <th className="px-4 py-3 text-right">Outstanding</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-soft">
                  No customers yet. They&apos;re added automatically when you log a repair order.
                </td>
              </tr>
            ) : (
              customers.map((c) => {
                const billed = c.orders.reduce((s, o) => s + (o.cost ?? 0), 0);
                const paid = c.orders.reduce((s, o) => s + (o.amountPaid ?? 0), 0);
                const outstanding = billed - paid;
                return (
                  <tr key={c.id} className="group border-b border-ink/8 transition last:border-0 hover:bg-brand/5">
                    <td className="px-4 py-3">
                      <Link href={`/admin/customers/${c.id}`} className="flex items-center gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${c.source === "SHOP" ? "bg-brand/10 text-brand" : "bg-sky-100 text-sky-700"}`}>
                          {c.source === "SHOP" ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-ink">
                            {c.name}
                            {c.status === "BLOCKED" && (
                              <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">Blocked</span>
                            )}
                          </span>
                          {c.company && <span className="block truncate text-xs text-ink-soft">{c.company}</span>}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1.5 text-ink-soft hover:text-brand">
                        <Phone className="h-3.5 w-3.5" /> {c.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{SOURCE_LABEL[c.source as OrderSource]}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">{c.orders.length}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{rs(billed)}</td>
                    <td className={`px-4 py-3 text-right font-semibold tabular-nums ${outstanding > 0 ? "text-red-600" : "text-emerald-600"}`}>
                      {rs(outstanding)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/customers/${c.id}`} className="inline-flex text-ink-soft transition group-hover:text-brand">
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
