"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABEL,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABEL,
  SOURCES,
  SOURCE_LABEL,
} from "@/components/admin/order-status";

const selectCls =
  "focus-ring rounded-xl border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none";

/** URL-driven filter bar shared by the orders list and reports pages. */
export default function OrderFilters({ showDates = false }: { showDates?: boolean }) {
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
      <div className="relative min-w-[200px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        <input
          defaultValue={val("q")}
          onKeyDown={(e) => {
            if (e.key === "Enter") update("q", (e.target as HTMLInputElement).value.trim());
          }}
          onBlur={(e) => update("q", e.target.value.trim())}
          placeholder="Search lab no, name, device, IMEI…"
          className={`${selectCls} w-full pl-9`}
        />
      </div>

      <select className={selectCls} value={val("status")} onChange={(e) => update("status", e.target.value)}>
        <option value="">All statuses</option>
        {ORDER_STATUSES.map((s) => (
          <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
        ))}
      </select>

      <select className={selectCls} value={val("source")} onChange={(e) => update("source", e.target.value)}>
        <option value="">All sources</option>
        {SOURCES.map((s) => (
          <option key={s} value={s}>{SOURCE_LABEL[s]}</option>
        ))}
      </select>

      <select className={selectCls} value={val("payment")} onChange={(e) => update("payment", e.target.value)}>
        <option value="">All methods</option>
        {PAYMENT_METHODS.map((m) => (
          <option key={m} value={m}>{PAYMENT_METHOD_LABEL[m]}</option>
        ))}
      </select>

      <select className={selectCls} value={val("paymentStatus")} onChange={(e) => update("paymentStatus", e.target.value)}>
        <option value="">All payments</option>
        {PAYMENT_STATUSES.map((p) => (
          <option key={p} value={p}>{PAYMENT_STATUS_LABEL[p]}</option>
        ))}
      </select>

      {showDates && (
        <>
          <input type="date" className={selectCls} value={val("from")} onChange={(e) => update("from", e.target.value)} aria-label="From date" />
          <input type="date" className={selectCls} value={val("to")} onChange={(e) => update("to", e.target.value)} aria-label="To date" />
        </>
      )}

      {[...params.keys()].length > 0 && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="rounded-xl px-3 py-2 text-sm font-semibold text-ink-soft hover:text-brand"
        >
          Clear
        </button>
      )}
    </div>
  );
}
