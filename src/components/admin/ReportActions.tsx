"use client";

import { useSearchParams } from "next/navigation";
import { FileSpreadsheet, Printer } from "lucide-react";

export default function ReportActions({ count }: { count: number }) {
  const params = useSearchParams();
  const qs = params.toString();
  const exportUrl = `/api/admin/reports/export${qs ? `?${qs}` : ""}`;

  return (
    <div className="flex items-center gap-2 print:hidden">
      <a
        href={count === 0 ? undefined : exportUrl}
        aria-disabled={count === 0}
        className={`inline-flex items-center gap-2 rounded-lg border border-ink/15 px-4 py-2 text-sm font-semibold transition active:scale-95 ${
          count === 0
            ? "pointer-events-none opacity-50"
            : "text-ink hover:border-emerald-500 hover:text-emerald-600"
        }`}
      >
        <FileSpreadsheet className="h-4 w-4" /> Export Excel
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-paper shadow-sm transition hover:bg-brand-deep active:scale-95"
      >
        <Printer className="h-4 w-4" /> Print
      </button>
    </div>
  );
}
