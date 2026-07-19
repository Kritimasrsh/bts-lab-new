import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/auth/SignOutButton";

export const metadata = { title: "My account | BTS Lab" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account");

  const requests = await prisma.repairRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    include: {
      model: { include: { brand: { select: { name: true } } } },
      problems: { include: { problem: { select: { name: true } } } },
    },
  });

  return (
    <div className="bg-paper">
      <section className="border-b border-ink/10 bg-paper-dim">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
          <span className="font-mono-tag text-xs uppercase tracking-[0.24em] text-brand">
            My account
          </span>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
                Hi, {session.user.name || "there"} 👋
              </h1>
              <p className="mt-1 text-sm text-ink-soft">{session.user.email}</p>
            </div>
            <SignOutButton />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <h2 className="font-display text-xl font-extrabold text-ink">Your repair requests</h2>

        {requests.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-ink/15 p-8 text-center">
            <p className="text-sm text-ink-soft">No repair requests yet.</p>
            <Link
              href="/#select-brand"
              className="focus-ring mt-4 inline-flex items-center rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-paper hover:bg-brand-deep"
            >
              Start a repair
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {requests.map((r) => (
              <li key={r.id} className="rounded-xl border border-ink/10 bg-paper p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display font-bold text-ink">
                    {r.model.brand.name} {r.model.name}
                  </span>
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 font-mono-tag text-[11px] uppercase tracking-wide text-brand">
                    {r.status}
                  </span>
                </div>
                {r.problems.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.problems.map((p) => (
                      <span key={p.id} className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink-soft">
                        {p.problem.name}
                      </span>
                    ))}
                  </div>
                )}
                {r.customNote && (
                  <p className="mt-2 text-sm text-ink-soft">&ldquo;{r.customNote}&rdquo;</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
