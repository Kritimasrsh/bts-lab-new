"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";

/**
 * Exports a DOM element to a pixel-accurate A4 PDF (same layout as on screen).
 * Uses html2canvas-pro (handles Tailwind v4 oklch / color-mix) + jsPDF, both
 * loaded dynamically so they stay out of the main bundle.
 */
export default function DownloadPdfButton({
  targetId,
  fileName,
}: {
  targetId: string;
  fileName: string;
}) {
  const [busy, setBusy] = useState(false);

  async function download() {
    const el = document.getElementById(targetId);
    if (!el) return;
    setBusy(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pageW) / canvas.width;

      let heightLeft = imgH;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, pageW, imgH, undefined, "FAST");
      heightLeft -= pageH;
      while (heightLeft > 0) {
        position -= pageH;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageW, imgH, undefined, "FAST");
        heightLeft -= pageH;
      }
      pdf.save(fileName);
    } catch (e) {
      console.error("PDF export failed", e);
      alert("Could not generate the PDF. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={busy}
      className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 font-display text-sm font-bold text-white shadow-sm transition hover:bg-brand-deep active:scale-95 disabled:opacity-60"
    >
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
      {busy ? "Generating…" : "Download PDF"}
    </button>
  );
}
