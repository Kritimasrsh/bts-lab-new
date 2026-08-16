import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  ClipboardList, Hammer, PackageCheck, CheckCircle2, Banknote, CreditCard,
  Tag, Smartphone, Inbox, Wrench, ArrowUpRight, ClipboardPlus, ArrowRight,
} from "lucide-react";
import { MonthlyBars, Donut, BarList } from "@/components/admin/charts";
import {
  ORDER_STATUS_LABEL, ORDER_STATUS_STYLE, SOURCE_LABEL, rs,
  type OrderStatus, type OrderSource,
} from "@/components/admin/order-status";

export const dynamic = "force-dynamic";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default async function AdminOverview() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const sixAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [all, recent, brands, models, problems, requests] = await Promise.all([
    prisma.repairOrder.findMany({
      select: { createdAt: true, cost: true, amountPaid: true, status: true, source: true, preferredPayment: true, paymentStatus: true },
    }),
    prisma.repairOrder.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.brand.count(),
    prisma.model.count(),
    prisma.problem.count(),
    prisma.repairRequest.count(),
  ]);

  const totalOrders = all.length;
  const monthCount = all.filter((o) => o.createdAt >= monthStart).length;
  const st = (s: OrderStatus) => all.filter((o) => o.status === s).length;
  const src = (s: OrderSource) => all.filter((o) => o.source === s).length;
  const collected = all.reduce((s, o) => s + (o.amountPaid ?? 0), 0);
  const billed = all.reduce((s, o) => s + (o.cost ?? 0), 0);
  const creditDue = all
    .filter((o) => o.preferredPayment === "CREDIT" && o.paymentStatus !== "PAID")
    .reduce((s, o) => s + ((o.cost ?? 0) - (o.amountPaid ?? 0)), 0);

  // monthly buckets (last 6 months)
  const buckets: { label: string; primary: number; billed: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(sixAgo.getFullYear(), sixAgo.getMonth() + i, 1);
    const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    const inMonth = all.filter((o) => o.createdAt >= d && o.createdAt < next);
    buckets.push({
      label: MONTHS[d.getMonth()],
      primary: inMonth.length,
      billed: inMonth.reduce((s, o) => s + (o.cost ?? 0), 0),
    });
  }

  const kpis = [
    { label: "Total orders", value: String(totalOrders), sub: `${monthCount} added this month`, icon: ClipboardList, accent: "text-ink" },
    { label: "In workshop", value: String(st("RECEIVED") + st("IN_PROGRESS")), sub: "Received + in progress", icon: Hammer, accent: "text-ink" },
    { label: "Ready for pickup", value: String(st("READY")), sub: "Awaiting handover", icon: PackageCheck, accent: "text-ink" },
    { label: "Delivered", value: String(st("DELIVERED")), sub: "Completed jobs", icon: CheckCircle2, accent: "text-ink" },
    { label: "Collected", value: rs(collected), sub: `${rs(billed)} billed`, icon: Banknote, accent: "text-emerald-600" },
    { label: "Credit outstanding", value: rs(creditDue), sub: "Unpaid shop credit", icon: CreditCard, accent: "text-red-600" },
  ];

  const statusSegments = [
    { label: ORDER_STATUS_LABEL.RECEIVED, value: st("RECEIVED"), color: "#0F6A73" },
    { label: ORDER_STATUS_LABEL.IN_PROGRESS, value: st("IN_PROGRESS"), color: "#d97706" },
    { label: ORDER_STATUS_LABEL.READY, value: st("READY"), color: "#0284c7" },
    { label: ORDER_STATUS_LABEL.DELIVERED, value: st("DELIVERED"), color: "#059669" },
    { label: ORDER_STATUS_LABEL.CANCELLED, value: st("CANCELLED"), color: "#dc2626" },
  ].filter((s) => s.value > 0);

  const catalog = [
    { label: "Brands", value: brands, href: "/admin/brands", icon: Tag },
    { label: "Models", value: models, href: "/admin/models", icon: Smartphone },
    { label: "Services", value: problems, href: "/admin/services", icon: Wrench },
    { label: "Online bookings", value: requests, href: "/admin/bookings", icon: Inbox },
  ];

  return (
    <div>
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-5">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(now)}
          </p>
        </div>
        <Link
          href="/admin/orders/new"
          className="group inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 font-display text-sm font-bold text-paper shadow-sm transition hover:bg-brand-deep active:scale-[0.98]"
        >
          <ClipboardPlus className="h-4 w-4" /> New entry
        </Link>
      </div>

      {/* KPIs — clean numeric cards, muted top-right icon */}
      <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map(({ label, value, sub, icon: Icon, accent }) => (
          <div key={label} className="bg-paper p-5">
            <div className="flex items-start justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</p>
              <Icon className="h-4 w-4 shrink-0 text-ink-soft/40" />
            </div>
            <p className={`mt-3 font-display text-2xl font-extrabold tabular-nums ${accent}`}>{value}</p>
            <p className="mt-1 text-xs text-ink-soft">{sub}</p>
          </div>
        ))}
      </div>

      {/* charts row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold">Intake trend</h2>
              <p className="text-xs text-ink-soft">Repair orders received, last 6 months</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
              <ArrowUpRight className="h-3.5 w-3.5" /> {monthCount} this month
            </span>
          </div>
          <div className="mt-5">
            <MonthlyBars data={buckets.map((b) => ({ label: b.label, primary: b.primary }))} />
          </div>
        </section>

        <section className="rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
          <h2 className="font-display text-base font-bold">Status mix</h2>
          <p className="text-xs text-ink-soft">All-time distribution</p>
          <div className="mt-5">
            {statusSegments.length ? (
              <Donut segments={statusSegments} centerLabel={String(totalOrders)} centerSub="orders" />
            ) : (
              <p className="py-6 text-sm text-ink-soft">No orders yet.</p>
            )}
          </div>
        </section>
      </div>

      {/* recent + side */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold">Recent repair orders</h2>
            <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:gap-1.5 hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-ink-soft">
              No orders yet. <Link href="/admin/orders/new" className="font-semibold text-brand hover:underline">Add your first entry</Link>.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink/8">
              {recent.map((o) => (
                <li key={o.id}>
                  <Link href={`/admin/orders/${o.id}`} className="-mx-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-3 transition hover:bg-brand/5">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">
                        <span className="font-mono-tag text-ink-soft">#{o.labNo}</span> {o.brand} {o.deviceModel}
                      </p>
                      <p className="truncate text-xs text-ink-soft">
                        {o.customerName}{o.companyName ? ` · ${o.companyName}` : ""}
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

        <div className="space-y-6">
          <section className="rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
            <h2 className="font-display text-base font-bold">Where work comes from</h2>
            <div className="mt-4">
              <BarList
                items={[
                  { label: SOURCE_LABEL.SHOP, value: src("SHOP"), color: "#0F6A73" },
                  { label: SOURCE_LABEL.DIRECT, value: src("DIRECT"), color: "#0284c7" },
                ]}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
            <h2 className="font-display text-base font-bold">Catalog</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {catalog.map(({ label, value, href, icon: Icon }) => (
                <Link key={label} href={href} className="rounded-xl border border-ink/10 p-3 transition hover:border-brand/40 hover:bg-brand/5">
                  <span className="flex items-center gap-2 text-ink-soft"><Icon className="h-4 w-4" /><span className="text-xs">{label}</span></span>
                  <p className="mt-1 font-display text-xl font-extrabold tabular-nums text-ink">{value}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
