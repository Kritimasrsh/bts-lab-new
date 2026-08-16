import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight, ArrowLeft, Building2, User, Phone, MessageCircle,
  MapPin, CalendarDays, Ban,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import CustomerControls from "@/components/admin/CustomerControls";
import {
  ORDER_STATUS_LABEL, ORDER_STATUS_STYLE, SOURCE_LABEL, rs,
  type OrderStatus, type OrderSource,
} from "@/components/admin/order-status";

export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

/** Build an international WhatsApp link (Nepal +977) from a local number. */
function waLink(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  const intl = digits.startsWith("977") ? digits : `977${digits}`;
  return `https://wa.me/${intl}`;
}

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = await prisma.customer.findUnique({
    where: { id },
    include: { orders: { orderBy: { createdAt: "desc" } } },
  });
  if (!c) notFound();

  const billed = c.orders.reduce((s, o) => s + (o.cost ?? 0), 0);
  const collected = c.orders.reduce((s, o) => s + (o.amountPaid ?? 0), 0);
  const outstanding = billed - collected;

  const stats = [
    { label: "Orders", value: String(c.orders.length) },
    { label: "Billed", value: rs(billed) },
    { label: "Collected", value: rs(collected), accent: "text-emerald-600" },
    { label: "Outstanding", value: rs(outstanding), accent: outstanding > 0 ? "text-red-600" : "text-emerald-600" },
  ];

  return (
    <div>
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
        <Link href="/admin/customers" className="hover:text-brand">Customers</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-brand">{c.name}</span>
      </nav>

      {/* header */}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.source === "SHOP" ? "bg-brand/10 text-brand" : "bg-sky-100 text-sky-700"}`}>
            {c.source === "SHOP" ? <Building2 className="h-6 w-6" /> : <User className="h-6 w-6" />}
          </span>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-extrabold tracking-tight">{c.name}</h1>
              {c.status === "BLOCKED" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-red-600">
                  <Ban className="h-3 w-3" /> Blocked
                </span>
              )}
            </div>
            <p className="mt-0.5 text-sm text-ink-soft">
              {SOURCE_LABEL[c.source as OrderSource]}
              {c.company ? ` · ${c.company}` : ""} · Since {fmt(c.createdAt)}
            </p>
          </div>
        </div>

        {/* quick contact */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${c.phone}`}
            className="inline-flex items-center gap-2 rounded-lg border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand active:scale-95"
          >
            <Phone className="h-4 w-4" /> Call
          </a>
          <a
            href={waLink(c.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>

      {/* stats */}
      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-paper p-4">
            <p className="text-[11px] font-bold uppercase tracking-wide text-ink-soft">{s.label}</p>
            <p className={`mt-1.5 font-display text-xl font-extrabold tabular-nums ${s.accent ?? "text-ink"}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          {/* contact details */}
          <section className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <h2 className="mb-3 font-display text-base font-bold">Details</h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft"><Phone className="h-3.5 w-3.5" /> Phone</dt>
                <dd className="mt-0.5"><a href={`tel:${c.phone}`} className="font-medium text-brand hover:underline">{c.phone}</a></dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft"><Building2 className="h-3.5 w-3.5" /> Company</dt>
                <dd className="mt-0.5 font-medium text-ink">{c.company || "—"}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft"><MapPin className="h-3.5 w-3.5" /> Address</dt>
                <dd className="mt-0.5 font-medium text-ink">{c.address || "—"}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft"><CalendarDays className="h-3.5 w-3.5" /> Customer since</dt>
                <dd className="mt-0.5 font-medium text-ink">{fmt(c.createdAt)}</dd>
              </div>
            </dl>
          </section>

          {/* order history = activity */}
          <section className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold">Repair history</h2>
              <span className="text-xs text-ink-soft">{c.orders.length} order{c.orders.length === 1 ? "" : "s"}</span>
            </div>
            {c.orders.length === 0 ? (
              <p className="mt-3 text-sm text-ink-soft">No repair orders yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-ink/8">
                {c.orders.map((o) => (
                  <li key={o.id}>
                    <Link href={`/admin/orders/${o.id}`} className="-mx-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-3 transition hover:bg-brand/5">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink">
                          <span className="font-mono-tag text-ink-soft">#{o.labNo}</span> {o.brand} {o.deviceModel}
                        </p>
                        <p className="truncate text-xs text-ink-soft">
                          {fmt(o.createdAt)}{o.relatedFault ? ` · ${o.relatedFault}` : ""} · {rs(o.cost)}
                        </p>
                      </div>
                      <span className={`inline-block rounded-full px-2.5 py-1 font-mono-tag text-[10px] uppercase tracking-wide ${ORDER_STATUS_STYLE[o.status as OrderStatus]}`}>
                        {ORDER_STATUS_LABEL[o.status as OrderStatus]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <CustomerControls id={c.id} status={c.status as "ACTIVE" | "BLOCKED"} notes={c.notes} />
      </div>

      <div className="mt-8">
        <Link href="/admin/customers" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> Back to customers
        </Link>
      </div>
    </div>
  );
}
