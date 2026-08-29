import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Printer, ArrowLeft, Building2, User, UserRound, Wrench, Phone, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import OrderControls from "@/components/admin/OrderControls";
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUS_STYLE,
  SOURCE_LABEL,
  rs,
  type OrderStatus,
  type PaymentMethod,
  type PaymentStatus,
  type OrderSource,
} from "@/components/admin/order-status";

export const dynamic = "force-dynamic";

function fmt(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

/** International WhatsApp link (Nepal +977) from a local number. */
function waLink(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  const intl = digits.startsWith("977") ? digits : `977${digits}`;
  return `https://wa.me/${intl}`;
}

function Row({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-ink/8 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="font-mono-tag text-[11px] uppercase tracking-wide text-ink-soft">{label}</span>
      <span className="text-sm font-medium text-ink sm:text-right">{value || "—"}</span>
    </div>
  );
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = await prisma.repairOrder.findUnique({ where: { id } });
  if (!o) notFound();

  return (
    <div>
      {/* breadcrumb + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-2 font-mono-tag text-xs uppercase tracking-widest text-ink-soft">
          <Link href="/admin/orders" className="hover:text-brand">Orders</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand">#{o.labNo}</span>
        </nav>
        <Link
          href={`/print/repair-order/${o.id}`}
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
        >
          <Printer className="h-4 w-4" /> Print / PDF
        </Link>
      </div>

      {/* header */}
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              {o.brand} {o.deviceModel}
            </h1>
            <span className={`inline-block rounded-full px-2.5 py-1 font-mono-tag text-[10px] uppercase tracking-wide ${ORDER_STATUS_STYLE[o.status as OrderStatus]}`}>
              {ORDER_STATUS_LABEL[o.status as OrderStatus]}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
            {o.source === "SHOP" ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
            Lab No #{o.labNo} · {SOURCE_LABEL[o.source as OrderSource]} · {fmt(o.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* details */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <h2 className="flex items-center gap-2.5 border-b border-ink/8 pb-3 font-display text-base font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand/20 bg-brand/5 text-brand">
                <UserRound className="h-4 w-4" />
              </span>
              Customer
            </h2>
            <div className="mt-1">
              <Row label="Name" value={o.customerName} />
              <Row label="Company" value={o.companyName} />
              <Row label="Address" value={o.address} />
              <Row
                label="Contact"
                value={
                  o.contactNo ? (
                    <span className="flex flex-wrap items-center justify-end gap-2">
                      <span className="font-medium text-ink">{o.contactNo}</span>
                      <a
                        href={`tel:${o.contactNo}`}
                        className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-2.5 py-1 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand active:scale-95"
                      >
                        <Phone className="h-3.5 w-3.5" /> Call
                      </a>
                      <a
                        href={waLink(o.contactNo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-emerald-700 active:scale-95"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </span>
                  ) : undefined
                }
              />
            </div>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <h2 className="flex items-center gap-2.5 border-b border-ink/8 pb-3 font-display text-base font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand/20 bg-brand/5 text-brand">
                <Wrench className="h-4 w-4" />
              </span>
              Repair detail
            </h2>
            <div className="mt-1">
              <Row label="Brand" value={o.brand} />
              <Row label="Model" value={o.deviceModel} />
              <Row label="Related fault" value={o.relatedFault} />
              <Row label="Serial / IMEI" value={o.serialImei} />
              <Row label="Password" value={o.passwordProtected ? (o.devicePassword || "Yes") : "No"} />
              <Row label="Quoted" value={o.quoted ? rs(o.quotedAmount) : "No"} />
              <Row label="Fault description" value={o.faultDescription} />
              <Row label="Internal notes" value={o.notes} />
              <Row label="Terms accepted" value={o.termsAccepted ? "Yes" : "No"} />
            </div>
          </section>
        </div>

        {/* controls */}
        <OrderControls
          id={o.id}
          status={o.status as OrderStatus}
          preferredPayment={o.preferredPayment as PaymentMethod}
          paymentStatus={o.paymentStatus as PaymentStatus}
          cost={o.cost}
          amountPaid={o.amountPaid}
        />
      </div>

      <div className="mt-8">
        <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> Back to orders
        </Link>
      </div>
    </div>
  );
}
