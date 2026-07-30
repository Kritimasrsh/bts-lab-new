import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Tag, Smartphone, Wrench, Inbox } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOverview() {
  const [brands, models, problems, requests, recent] = await Promise.all([
    prisma.brand.count(),
    prisma.model.count(),
    prisma.problem.count(),
    prisma.repairRequest.count(),
    prisma.repairRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { model: { include: { brand: { select: { name: true } } } } },
    }),
  ]);

  const stats = [
    { label: "Brands", value: brands, href: "/admin/brands", icon: Tag },
    { label: "Models", value: models, href: "/admin/models", icon: Smartphone },
    { label: "Repair services", value: problems, href: "/admin/services", icon: Wrench },
    { label: "Repair requests", value: requests, href: "/admin/bookings", icon: Inbox },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-extrabold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-ink-soft">Manage your catalog and see incoming repair requests.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-ink/10 bg-paper p-5 transition hover:border-brand/40 hover:shadow-[0_18px_40px_-24px_rgba(13,43,46,0.4)]"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold text-ink">{value}</p>
            <p className="mt-1 text-sm text-ink-soft">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink/10 bg-paper p-5 sm:p-6">
        <h2 className="font-display text-lg font-bold">Recent repair requests</h2>
        {recent.length === 0 ? (
          <p className="mt-3 text-sm text-ink-soft">No repair requests yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-ink/8">
            {recent.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/admin/bookings/${r.id}`}
                  className="-mx-2 flex flex-wrap items-center justify-between gap-2 rounded-lg px-2 py-3 transition hover:bg-brand/5"
                >
                  <div>
                    <p className="font-semibold text-ink">
                      {r.model.brand.name} {r.model.name}
                    </p>
                    {r.customerName && (
                      <p className="text-xs text-ink-soft">{r.customerName}</p>
                    )}
                  </div>
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 font-mono-tag text-[11px] uppercase tracking-wide text-brand">
                    {r.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
