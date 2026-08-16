import Link from "next/link";
import { ClipboardPlus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import OrderFilters from "@/components/admin/OrderFilters";
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
  if (status) where.status = status as OrderStatus;
  if (source) where.source = source as OrderSource;
  if (payment) where.preferredPayment = payment as PaymentMethod;
  if (paymentStatus) where.paymentStatus = paymentStatus as PaymentStatus;
  if (q) {
    where.OR = [
      { labNo: { contains: q, mode: "insensitive" } },
      { customerName: { contains: q, mode: "insensitive" } },
      { companyName: { contains: q, mode: "insensitive" } },
      { contactNo: { contains: q, mode: "insensitive" } },
      { brand: { contains: q, mode: "insensitive" } },
      { deviceModel: { contains: q, mode: "insensitive" } },
      { serialImei: { contains: q, mode: "insensitive" } },
    ];
  }
  return where;
}

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

export default async function OrdersPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const where = buildWhere(sp);
  const orders = await prisma.repairOrder.findMany({ where, orderBy: { createdAt: "desc" }, take: 300 });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Repair Orders</h1>
          <p className="mt-1 text-sm text-ink-soft">{orders.length} orders — newest first.</p>
        </div>
        <Link
          href="/admin/orders/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-paper transition hover:bg-brand-deep"
        >
          <ClipboardPlus className="h-4 w-4" /> New entry
        </Link>
      </div>

      <div className="mt-5">
        <OrderFilters />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <div className="hidden grid-cols-[auto_1.4fr_1.2fr_auto_auto_auto_auto] items-center gap-4 border-b border-ink/10 bg-paper-dim px-4 py-2.5 font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft lg:grid">
          <span className="w-14">Lab No</span>
          <span>Customer</span>
          <span>Device</span>
          <span className="w-28 text-center">Status</span>
          <span className="w-24 text-center">Payment</span>
          <span className="w-24 text-right">Cost</span>
          <span className="w-28 text-right">Date</span>
        </div>

        {orders.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-ink-soft">
            No orders match. <Link href="/admin/orders/new" className="font-semibold text-brand hover:underline">Add one</Link>.
          </p>
        ) : (
          orders.map((o) => (
            <Link
              key={o.id}
              href={`/admin/orders/${o.id}`}
              className="grid grid-cols-1 gap-2 border-b border-ink/8 px-4 py-3 transition last:border-0 hover:bg-brand/5 lg:grid-cols-[auto_1.4fr_1.2fr_auto_auto_auto_auto] lg:items-center lg:gap-4"
            >
              <span className="font-mono-tag text-sm font-bold text-ink lg:w-14">#{o.labNo}</span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-ink">{o.customerName}</span>
                <span className="block truncate text-xs text-ink-soft">
                  {o.companyName ? `${o.companyName} · ` : ""}
                  {SOURCE_LABEL[o.source as OrderSource]}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-ink">{o.brand} {o.deviceModel}</span>
                <span className="block truncate text-xs text-ink-soft">{o.relatedFault || o.faultDescription || "—"}</span>
              </span>
              <span className="lg:flex lg:w-28 lg:justify-center">
                <span className={`inline-block rounded-full px-2.5 py-1 font-mono-tag text-[10px] uppercase tracking-wide ${ORDER_STATUS_STYLE[o.status as OrderStatus]}`}>
                  {ORDER_STATUS_LABEL[o.status as OrderStatus]}
                </span>
              </span>
              <span className="lg:flex lg:w-24 lg:flex-col lg:items-center lg:gap-1">
                <span className="text-xs font-semibold text-ink">{PAYMENT_METHOD_LABEL[o.preferredPayment as PaymentMethod]}</span>
                <span className={`inline-block rounded-full px-2 py-0.5 font-mono-tag text-[9px] uppercase tracking-wide ${PAYMENT_STATUS_STYLE[o.paymentStatus as PaymentStatus]}`}>
                  {PAYMENT_STATUS_LABEL[o.paymentStatus as PaymentStatus]}
                </span>
              </span>
              <span className="text-sm font-semibold text-ink lg:w-24 lg:text-right">{rs(o.cost)}</span>
              <span className="text-xs text-ink-soft lg:w-28 lg:text-right">{fmtDate(o.createdAt)}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
