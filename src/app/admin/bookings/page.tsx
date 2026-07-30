import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { STATUS_LABEL, STATUS_STYLE, type Status } from "@/components/admin/status";

export const dynamic = "force-dynamic";

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export default async function AdminBookingsPage() {
  const requests = await prisma.repairRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      model: { include: { brand: { select: { name: true } } } },
      _count: { select: { problems: true } },
    },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight">Bookings</h1>
      <p className="mt-1 text-sm text-ink-soft">{requests.length} repair requests — newest first.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <div className="hidden grid-cols-[1.4fr_1fr_auto_auto_auto] items-center gap-4 border-b border-ink/10 bg-paper-dim px-4 py-2.5 font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft md:grid">
          <span>Device</span>
          <span>Customer</span>
          <span className="w-16 text-center">Issues</span>
          <span className="w-28 text-center">Status</span>
          <span className="w-32 text-right">Date</span>
        </div>

        {requests.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-soft">No bookings yet.</p>
        ) : (
          requests.map((r) => (
            <Link
              key={r.id}
              href={`/admin/bookings/${r.id}`}
              className="grid grid-cols-1 gap-2 border-b border-ink/8 px-4 py-3 transition last:border-0 hover:bg-brand/5 md:grid-cols-[1.4fr_1fr_auto_auto_auto] md:items-center md:gap-4"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ink">
                  {r.model.brand.name} {r.model.name}
                </span>
                <ChevronRight className="h-4 w-4 text-ink-soft md:hidden" />
              </div>
              <span className="truncate text-sm text-ink-soft">
                {r.customerName || "—"}
                {r.customerPhone ? ` · ${r.customerPhone}` : ""}
              </span>
              <span className="text-sm text-ink-soft md:w-16 md:text-center">
                {r._count.problems}
              </span>
              <span className="md:flex md:w-28 md:justify-center">
                <span
                  className={`inline-block rounded-full px-2.5 py-1 font-mono-tag text-[10px] uppercase tracking-wide ${
                    STATUS_STYLE[r.status as Status]
                  }`}
                >
                  {STATUS_LABEL[r.status as Status]}
                </span>
              </span>
              <span className="text-xs text-ink-soft md:w-32 md:text-right">
                {fmtDate(r.createdAt)}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
