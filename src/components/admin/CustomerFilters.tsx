"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { SOURCES, SOURCE_LABEL } from "@/components/admin/order-status";

const selectCls =
  "rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

export default function CustomerFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`);
  }
  const val = (k: string) => params.get(k) ?? "";

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input
          defaultValue={val("q")}
          onKeyDown={(e) => {
            if (e.key === "Enter") update("q", (e.target as HTMLInputElement).value.trim());
          }}
          onBlur={(e) => update("q", e.target.value.trim())}
          placeholder="Search name, phone, company…"
          className={`${selectCls} w-full pl-9`}
        />
      </div>

      <select className={selectCls} value={val("source")} onChange={(e) => update("source", e.target.value)}>
        <option value="">All types</option>
        {SOURCES.map((s) => (
          <option key={s} value={s}>{SOURCE_LABEL[s]}</option>
        ))}
      </select>

      <select className={selectCls} value={val("status")} onChange={(e) => update("status", e.target.value)}>
        <option value="">All customers</option>
        <option value="ACTIVE">Active</option>
        <option value="BLOCKED">Blocked</option>
      </select>

      {[...params.keys()].length > 0 && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-soft hover:text-brand"
        >
          Clear
        </button>
      )}
    </div>
  );
}
