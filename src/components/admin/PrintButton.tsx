"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-white transition hover:bg-brand-deep"
    >
      <Printer className="h-4 w-4" /> Print
    </button>
  );
}
