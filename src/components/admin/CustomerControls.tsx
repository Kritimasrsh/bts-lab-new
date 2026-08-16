"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Save, Ban, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";

type Props = {
  id: string;
  status: "ACTIVE" | "BLOCKED";
  notes: string | null;
};

const legend = "text-[11px] font-bold uppercase tracking-wide text-ink-soft";

export default function CustomerControls(props: Props) {
  const router = useRouter();
  const { success, error } = useToast();
  const [status, setStatus] = useState(props.status);
  const [notes, setNotes] = useState(props.notes ?? "");
  const [busy, setBusy] = useState(false);

  async function patch(body: Record<string, unknown>, msg: string) {
    setBusy(true);
    try {
      await adminReq("PATCH", `/api/admin/customers/${props.id}`, body);
      success(msg);
      router.refresh();
    } catch (err) {
      error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  async function toggleBlock() {
    const next = status === "BLOCKED" ? "ACTIVE" : "BLOCKED";
    setStatus(next);
    await patch({ status: next }, next === "BLOCKED" ? "Customer blocked" : "Customer unblocked");
  }

  async function remove() {
    if (!confirm("Delete this customer? Their repair orders will stay but lose the link.")) return;
    setBusy(true);
    try {
      await adminReq("DELETE", `/api/admin/customers/${props.id}`);
      success("Customer deleted");
      router.push("/admin/customers");
      router.refresh();
    } catch (err) {
      error(err instanceof Error ? err.message : "Delete failed");
      setBusy(false);
    }
  }

  const blocked = status === "BLOCKED";

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-ink/10 bg-paper p-5">
        <p className={legend}>Access</p>
        <p className="mt-2 text-sm text-ink-soft">
          {blocked
            ? "This customer is blocked — new repair orders are refused."
            : "This customer is active and can have new orders logged."}
        </p>
        <button
          type="button"
          disabled={busy}
          onClick={toggleBlock}
          className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold shadow-sm transition active:scale-[0.98] disabled:opacity-60 ${
            blocked
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          }`}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : blocked ? <ShieldCheck className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
          {blocked ? "Unblock customer" : "Block customer"}
        </button>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-paper p-5">
        <p className={legend}>Internal notes</p>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything the team should know about this customer…"
          className="mt-2 w-full rounded-lg border border-ink/15 bg-paper px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => patch({ notes }, "Notes saved")}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-paper shadow-sm transition hover:bg-brand-deep active:scale-95 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save notes
        </button>
      </div>

      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-600 disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" /> Delete customer
      </button>
    </div>
  );
}
