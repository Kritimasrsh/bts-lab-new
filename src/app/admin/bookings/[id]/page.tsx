import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, User, Phone, Mail, Calendar, Wrench } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BookingStatus from "@/components/admin/BookingStatus";
import { STATUS_LABEL, STATUS_STYLE, type Status } from "@/components/admin/status";

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

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = await prisma.repairRequest.findUnique({
    where: { id },
    include: {
      model: { include: { brand: { select: { name: true } } } },
      problems: { include: { problem: { include: { category: { select: { name: true } } } } } },
      user: { select: { id: true, name: true, email: true, phone: true } },
    },
  });
  if (!r) notFound();

  const status = r.status as Status;
  const name = r.user?.name || r.customerName || "Guest";
  const phone = r.user?.phone || r.customerPhone || null;
  const email = r.user?.email || null;

  return (
    <div>
      <Link
        href="/admin/bookings"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" /> All bookings
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            {r.model.brand.name} {r.model.name}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Booking #{r.id.slice(-8).toUpperCase()} · created {fmt(r.createdAt)}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1.5 font-mono-tag text-[11px] uppercase tracking-wide ${STATUS_STYLE[status]}`}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* left — issues + note */}
        <div className="space-y-5">
          <section className="rounded-2xl border border-ink/10 bg-paper p-5">
            <h2 className="flex items-center gap-2 font-display text-sm font-bold text-ink">
              <Wrench className="h-4 w-4 text-brand" /> Reported issues ({r.problems.length})
            </h2>
            {r.problems.length === 0 ? (
              <p className="mt-3 text-sm text-ink-soft">No preset issues selected.</p>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {r.problems.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-full bg-brand/8 px-3 py-1.5 text-sm font-medium text-ink"
                  >
                    {p.problem.name}
                    <span className="ml-1.5 text-xs text-ink-soft">{p.problem.category.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-ink/10 bg-paper p-5">
            <h2 className="font-display text-sm font-bold text-ink">Customer note</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {r.customNote ? `“${r.customNote}”` : "No note provided."}
            </p>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-paper p-5">
            <h2 className="font-display text-sm font-bold text-ink">Update status</h2>
            <div className="mt-3">
              <BookingStatus id={r.id} initial={status} />
            </div>
          </section>
        </div>

        {/* right — customer */}
        <div className="space-y-5">
          <section className="rounded-2xl border border-ink/10 bg-paper p-5">
            <h2 className="font-display text-sm font-bold text-ink">Customer</h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 font-display text-sm font-bold text-brand">
                {name.slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{name}</p>
                <p className="text-xs text-ink-soft">
                  {r.user ? "Registered account" : "Guest booking"}
                </p>
              </div>
            </div>
            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-ink-soft">
                <Phone className="h-4 w-4 shrink-0" />
                {phone ? (
                  <a href={`tel:${phone}`} className="text-ink hover:text-brand">{phone}</a>
                ) : (
                  <span>No phone</span>
                )}
              </div>
              <div className="flex items-center gap-2.5 text-ink-soft">
                <Mail className="h-4 w-4 shrink-0" />
                {email ? (
                  <a href={`mailto:${email}`} className="truncate text-ink hover:text-brand">{email}</a>
                ) : (
                  <span>No email</span>
                )}
              </div>
              {r.user && (
                <div className="flex items-center gap-2.5 text-ink-soft">
                  <User className="h-4 w-4 shrink-0" />
                  <Link href="/admin/users" className="text-ink hover:text-brand">View in users</Link>
                </div>
              )}
            </dl>
          </section>

          <section className="rounded-2xl border border-ink/10 bg-paper p-5">
            <h2 className="font-display text-sm font-bold text-ink">Timeline</h2>
            <dl className="mt-3 space-y-2 text-sm text-ink-soft">
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 shrink-0" /> Created {fmt(r.createdAt)}
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 shrink-0" /> Updated {fmt(r.updatedAt)}
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
