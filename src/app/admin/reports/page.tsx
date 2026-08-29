import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import OrderFilters from "@/components/admin/OrderFilters";
import ReportActions from "@/components/admin/ReportActions";
import Pagination from "@/components/admin/Pagination";
import { PER_PAGE_OPTIONS, DEFAULT_PER_PAGE } from "@/components/admin/pagination-config";
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STYLE,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
  PAYMENT_STATUS_STYLE,
  SOURCE_LABEL,
  rs,
  type OrderStatus,
  type PaymentStatus,
  type PaymentMethod,
  type OrderSource,
} from "@/components/admin/order-status";

export const dynamic = "force-dynamic";

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function buildWhere(sp: SP): Prisma.RepairOrderWhereInput {
  const where: Prisma.RepairOrderWhereInput = {};
  const status = one(sp.status);
  const source = one(sp.source);
  const payment = one(sp.payment);
  const paymentStatus = one(sp.paymentStatus);
  const q = one(sp.q)?.trim();
  const from = one(sp.from);
  const to = one(sp.to);
  if (status) where.status = status as OrderStatus;
  if (source) where.source = source as OrderSource;
  if (payment) where.preferredPayment = payment as PaymentMethod;
  if (paymentStatus) where.paymentStatus = paymentStatus as PaymentStatus;
  if (from || to) {
    where.createdAt = {};
    if (from) where.createdAt.gte = new Date(from);
    if (to) {
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }
  if (q) {
    where.OR = [
      { labNo: { contains: q, mode: "insensitive" } },
      { customerName: { contains: q, mode: "insensitive" } },
      { companyName: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } },
      { deviceModel: { contains: q, mode: "insensitive" } },
    ];
  }
  return where;
}

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

const toInt = (v: string | undefined, fallback: number) => {
  const n = parseInt(v ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export default async function ReportsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const where = buildWhere(sp);

  // Summary is computed over the FULL filtered set (not just the current page).
  const [total, sums, delivered, creditAgg] = await Promise.all([
    prisma.repairOrder.count({ where }),
    prisma.repairOrder.aggregate({ where, _sum: { cost: true, amountPaid: true } }),
    prisma.repairOrder.count({ where: { AND: [where, { status: "DELIVERED" }] } }),
    prisma.repairOrder.aggregate({
      where: { AND: [where, { preferredPayment: "CREDIT", paymentStatus: { in: ["UNPAID", "PARTIAL"] } }] },
      _sum: { cost: true, amountPaid: true },
    }),
  ]);

  const totalBilled = sums._sum.cost ?? 0;
  const totalPaid = sums._sum.amountPaid ?? 0;
  const outstanding = totalBilled - totalPaid;
  const creditOutstanding = (creditAgg._sum.cost ?? 0) - (creditAgg._sum.amountPaid ?? 0);

  // Paginated table rows.
  const perPageRaw = toInt(one(sp.perPage), DEFAULT_PER_PAGE);
  const perPage = PER_PAGE_OPTIONS.includes(perPageRaw) ? perPageRaw : DEFAULT_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const page = Math.min(toInt(one(sp.page), 1), totalPages);
  const orders = await prisma.repairOrder.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const tiles = [
    { label: "Orders", value: String(total) },
    { label: "Delivered", value: String(delivered), accent: "text-emerald-600" },
    { label: "Total billed", value: rs(totalBilled) },
    { label: "Collected", value: rs(totalPaid), accent: "text-emerald-600" },
    { label: "Outstanding", value: rs(outstanding), accent: outstanding > 0 ? "text-red-600" : "text-emerald-600" },
    { label: "Credit due", value: rs(creditOutstanding), accent: creditOutstanding > 0 ? "text-red-600" : "text-emerald-600" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-5">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Reports</h1>
          <p className="mt-1 text-sm text-ink-soft">Filter repair orders, then export to Excel or print.</p>
        </div>
        <ReportActions count={total} />
      </div>

      <div className="mt-5 print:hidden">
        <OrderFilters showDates />
      </div>

      {/* summary — hairline grid */}
      <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t) => (
          <div key={t.label} className="bg-paper p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">{t.label}</p>
            <p className={`mt-1.5 font-display text-xl font-extrabold tabular-nums ${t.accent ?? "text-ink"}`}>{t.value}</p>
          </div>
        ))}
      </div>

      {/* preview table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-paper">
        <table className="w-full min-w-205 text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-[11px] font-bold uppercase tracking-widest text-ink-soft">
              <th className="px-4 py-3">Lab No</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3 text-right">Cost</th>
              <th className="px-4 py-3 text-right">Outstanding</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-ink-soft">No orders match these filters.</td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-ink/8 transition last:border-0 hover:bg-brand/5">
                  <td className="px-4 py-3 font-mono-tag font-bold text-brand">#{o.labNo}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-ink-soft">{fmt(o.createdAt)}</td>
                  <td className="px-4 py-3">
                    <span className="block font-semibold text-ink">{o.customerName}</span>
                    <span className="block text-xs text-ink-soft">{o.companyName || SOURCE_LABEL[o.source as OrderSource]}</span>
                  </td>
                  <td className="px-4 py-3">{o.brand} {o.deviceModel}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${ORDER_STATUS_STYLE[o.status as OrderStatus]}`}>
                      {ORDER_STATUS_LABEL[o.status as OrderStatus]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-ink">{PAYMENT_METHOD_LABEL[o.preferredPayment as PaymentMethod]}</span>{" "}
                    <span className={`ml-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${PAYMENT_STATUS_STYLE[o.paymentStatus as PaymentStatus]}`}>
                      {PAYMENT_STATUS_LABEL[o.paymentStatus as PaymentStatus]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums">{rs(o.cost)}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-red-600">
                    {rs((o.cost ?? 0) - (o.amountPaid ?? 0))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination total={total} page={page} perPage={perPage} />
    </div>
  );
}
