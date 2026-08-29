"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PER_PAGE_OPTIONS } from "@/components/admin/pagination-config";

export default function Pagination({
  total,
  page,
  perPage,
}: {
  total: number;
  page: number;
  perPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = total === 0 ? 0 : (current - 1) * perPage + 1;
  const end = Math.min(total, current * perPage);

  function go(next: number) {
    const p = new URLSearchParams(params.toString());
    if (next <= 1) p.delete("page");
    else p.set("page", String(next));
    router.push(`${pathname}?${p.toString()}`);
  }

  function changePerPage(n: number) {
    const p = new URLSearchParams(params.toString());
    p.set("perPage", String(n));
    p.delete("page");
    router.push(`${pathname}?${p.toString()}`);
  }

  // windowed page list: 1 … (c-1) c (c+1) … last
  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= current - 1 && i <= current + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  const navBtn =
    "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg border border-ink/15 px-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="flex flex-wrap items-center gap-3 text-sm text-ink-soft">
        <span>
          Showing <span className="font-semibold text-ink tabular-nums">{start}–{end}</span> of{" "}
          <span className="font-semibold text-ink tabular-nums">{total}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <label htmlFor="perPage" className="text-xs">Per page</label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => changePerPage(Number(e.target.value))}
            className="rounded-lg border border-ink/15 bg-paper px-2 py-1 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </span>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => go(current - 1)} disabled={current <= 1} className={navBtn} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </button>
          {pages.map((p, i) =>
            p === "…" ? (
              <span key={`e${i}`} className="px-1.5 text-ink-soft">…</span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => go(p)}
                aria-current={p === current ? "page" : undefined}
                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-semibold transition ${
                  p === current
                    ? "bg-brand text-paper shadow-sm"
                    : "border border-ink/15 text-ink hover:border-brand hover:text-brand"
                }`}
              >
                {p}
              </button>
            )
          )}
          <button type="button" onClick={() => go(current + 1)} disabled={current >= totalPages} className={navBtn} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
