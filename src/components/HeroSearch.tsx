"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Smartphone, Wrench, Tag } from "lucide-react";
import type { SearchResult } from "@/app/api/search/route";

const ICONS = {
  brand: Tag,
  model: Smartphone,
  problem: Wrench,
  service: Wrench,
} as const;

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // debounced fetch — all state changes happen inside the (async) timer, never
  // synchronously in the effect body.
  useEffect(() => {
    const query = q.trim();
    const t = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  // close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (results[0]) go(results[0].href);
    else if (q.trim()) router.push(`/services`);
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 rounded-full bg-paper p-1.5 pl-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
      >
        <Search className="h-5 w-5 shrink-0 text-ink-soft" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Search a brand, model or problem…"
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
          aria-label="Search services, models and problems"
        />
        <button
          type="submit"
          className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-paper transition hover:bg-brand-deep"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </button>
      </form>

      {/* results dropdown */}
      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-ink/10 bg-paper text-left shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)]">
          {loading && results.length === 0 ? (
            <div className="px-5 py-6 text-center text-sm text-ink-soft">Searching…</div>
          ) : results.length === 0 ? (
            <div className="px-5 py-6 text-center text-sm text-ink-soft">
              No matches. Try a brand like “Apple” or an issue like “battery”.
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((r, i) => {
                const Icon = ICONS[r.type];
                return (
                  <li key={`${r.type}-${r.label}-${i}`}>
                    <button
                      type="button"
                      onClick={() => go(r.href)}
                      className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-brand/5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">{r.label}</span>
                        {r.sublabel && (
                          <span className="block truncate text-xs text-ink-soft">{r.sublabel}</span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
