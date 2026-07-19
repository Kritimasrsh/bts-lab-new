"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Check, Loader2, Lock, User } from "lucide-react";

type Problem = { id: string; name: string };
type Category = { id: string; name: string; problems: Problem[] };

type Props = {
  modelId: string;
  modelName: string;
  categories: Category[];
};

export default function ProblemSelector({ modelId, modelName, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated";

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [customNote, setCustomNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const selectedCount = selected.size;
  const canSubmit = selectedCount > 0 || customNote.trim().length > 0;

  const selectedNames = useMemo(() => {
    const all = categories.flatMap((c) => c.problems);
    return all.filter((p) => selected.has(p.id)).map((p) => p.name);
  }, [selected, categories]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function submit() {
    if (!canSubmit || submitting || !isAuthed) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/repair-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId,
          problemIds: [...selected],
          customNote: customNote.trim() || undefined,
          // name/phone are taken from the logged-in account server-side.
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-ink/10 bg-paper p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-extrabold text-ink">Request received!</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Thanks — we&apos;ve logged your {modelName} repair request
          {selectedNames.length ? ` (${selectedNames.length} issue${selectedNames.length > 1 ? "s" : ""})` : ""}.
          Our team will reach out shortly to confirm the details and pricing.
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="focus-ring mt-6 inline-flex items-center rounded-full bg-brand px-6 py-3 font-display text-sm font-bold text-paper transition hover:bg-brand-deep"
        >
          Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
      {/* problem groups */}
      <div>
        <div className="space-y-8">
          {categories.map((cat) => (
            <fieldset key={cat.id}>
              <legend className="font-mono-tag text-xs uppercase tracking-[0.2em] text-brand">
                {cat.name}
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {cat.problems.map((p) => {
                  const isOn = selected.has(p.id);
                  return (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                        isOn
                          ? "border-brand bg-brand/10 text-ink"
                          : "border-ink/10 bg-paper text-ink hover:border-brand/40 hover:bg-brand/5"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                          isOn ? "border-brand bg-brand text-paper" : "border-ink/25 bg-paper"
                        }`}
                      >
                        {isOn && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isOn}
                        onChange={() => toggle(p.id)}
                      />
                      {p.name}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        {/* custom problem field */}
        <div className="mt-8">
          <label htmlFor="customNote" className="font-mono-tag text-xs uppercase tracking-[0.2em] text-brand">
            Describe the problem (optional)
          </label>
          <textarea
            id="customNote"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            rows={3}
            placeholder="Anything else we should know? e.g. 'phone got wet and won't turn on since yesterday…'"
            className="focus-ring mt-3 w-full resize-y rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {/* sticky summary / submit */}
      <aside className="lg:sticky lg:top-28">
        <div className="rounded-2xl border border-ink/10 bg-paper-dim p-5">
          <p className="font-display text-sm font-bold text-ink">Your repair</p>
          <p className="mt-1 text-sm text-ink-soft">{modelName}</p>

          <div className="mt-4 border-t border-ink/10 pt-4">
            <p className="font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft">
              Selected issues ({selectedCount})
            </p>
            {selectedNames.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {selectedNames.map((n) => (
                  <li key={n} className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                    {n}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-ink-soft">None selected yet.</p>
            )}
          </div>

          {/* contact / auth-gated submit */}
          <div className="mt-4 border-t border-ink/10 pt-4">
            {status === "loading" ? (
              <div className="skeleton h-24 rounded-xl" />
            ) : isAuthed ? (
              <>
                <div className="flex items-center gap-2.5 rounded-xl bg-paper px-3 py-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <User className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {session?.user?.name || "Your account"}
                    </p>
                    <p className="truncate text-xs text-ink-soft">{session?.user?.email}</p>
                  </div>
                </div>

                {error && <p className="mt-3 text-xs font-semibold text-red-600">{error}</p>}

                <button
                  type="button"
                  onClick={submit}
                  disabled={!canSubmit || submitting}
                  className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 font-display text-sm font-bold text-paper transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    "Submit repair request"
                  )}
                </button>
                {!canSubmit && (
                  <p className="mt-2 text-center text-[11px] text-ink-soft">
                    Select at least one problem to continue.
                  </p>
                )}
              </>
            ) : (
              /* Not logged in — require login to send the request */
              <div className="rounded-xl border border-brand/20 bg-brand/5 p-4 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Lock className="h-5 w-5" />
                </span>
                <p className="mt-3 font-display text-sm font-bold text-ink">
                  Log in to send your request
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                  You need an account to submit — it lets you track the repair and skips
                  re-typing your details. Your selection is kept.
                </p>
                <Link
                  href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
                  className="focus-ring mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 font-display text-sm font-bold text-paper transition hover:bg-brand-deep"
                >
                  Log in to continue
                </Link>
                <Link
                  href={`/register?callbackUrl=${encodeURIComponent(pathname)}`}
                  className="mt-2 inline-block text-xs font-semibold text-brand hover:underline"
                >
                  New here? Create an account
                </Link>
              </div>
            )}
          </div>

          <p className="mt-3 text-center text-[11px] text-ink-soft">
            No payment now — we confirm pricing first.
          </p>
        </div>
      </aside>
    </div>
  );
}
