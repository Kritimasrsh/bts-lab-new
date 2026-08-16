"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Save, Ban } from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABEL,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABEL,
  PAYMENT_STATUS_STYLE,
  rs,
  type OrderStatus,
  type PaymentMethod,
  type PaymentStatus,
} from "@/components/admin/order-status";

type Props = {
  id: string;
  status: OrderStatus;
  preferredPayment: PaymentMethod;
  paymentStatus: PaymentStatus;
  cost: number | null;
  amountPaid: number | null;
};

// Linear stages shown in the progress bar (Cancelled is handled separately).
const FLOW: OrderStatus[] = ["RECEIVED", "IN_PROGRESS", "READY", "DELIVERED"];
const box = "rounded-2xl border border-ink/10 bg-paper p-5";
const legend = "text-[11px] font-bold uppercase tracking-wide text-ink-soft";

export default function OrderControls(props: Props) {
  const router = useRouter();
  const { success, error } = useToast();

  // Draft state — nothing is persisted until the matching Save is pressed.
  const [statusDraft, setStatusDraft] = useState<OrderStatus>(props.status);
  const [method, setMethod] = useState<PaymentMethod>(props.preferredPayment);
  const [payStatus, setPayStatus] = useState<PaymentStatus>(props.paymentStatus);
  const [cost, setCost] = useState(props.cost?.toString() ?? "");
  const [paid, setPaid] = useState(props.amountPaid?.toString() ?? "");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingPay, setSavingPay] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const busy = savingStatus || savingPay || deleting;

  async function patch(body: Record<string, unknown>, msg: string, setBusy: (b: boolean) => void) {
    setBusy(true);
    try {
      await adminReq("PATCH", `/api/admin/repair-orders/${props.id}`, body);
      success(msg);
      router.refresh();
    } catch (err) {
      error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  const costN = cost === "" ? null : Number(cost);
  const paidN = paid === "" ? 0 : Number(paid);
  const outstanding = (costN ?? 0) - (paidN || 0);

  const statusDirty = statusDraft !== props.status;
  const payDirty =
    method !== props.preferredPayment ||
    payStatus !== props.paymentStatus ||
    costN !== props.cost ||
    paidN !== (props.amountPaid ?? 0);

  const cancelled = statusDraft === "CANCELLED";
  const idx = FLOW.indexOf(statusDraft);
  const pct = idx <= 0 ? 0 : (idx / (FLOW.length - 1)) * 100;

  async function remove() {
    if (!confirm("Delete this repair order? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await adminReq("DELETE", `/api/admin/repair-orders/${props.id}`);
      success("Order deleted");
      router.push("/admin/orders");
      router.refresh();
    } catch (err) {
      error(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* ---------- Status form ---------- */}
      <div className={box}>
        <p className={legend}>Repair status</p>

        {/* simple progress display */}
        {cancelled ? (
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5">
            <Ban className="h-4 w-4 text-red-600" />
            <span className="text-sm font-bold text-red-700">Order cancelled</span>
          </div>
        ) : (
          <div className="mt-3">
            <div className="flex justify-between">
              {FLOW.map((s, i) => (
                <span
                  key={s}
                  className={`text-[10px] font-semibold uppercase tracking-wide ${
                    i <= idx ? "text-brand" : "text-ink-soft/50"
                  }`}
                >
                  {ORDER_STATUS_LABEL[s]}
                </span>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute left-1 right-1 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-ink/10" />
              <div
                className="absolute left-1 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-brand transition-all"
                style={{ width: `calc((100% - 0.5rem) * ${pct / 100})` }}
              />
              <div className="relative flex justify-between">
                {FLOW.map((s, i) => (
                  <span
                    key={s}
                    className={`h-2.5 w-2.5 rounded-full ring-2 ring-paper ${i <= idx ? "bg-brand" : "bg-ink/20"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* change + save */}
        <div className="mt-5 flex items-end gap-2">
          <label className="flex-1">
            <span className="mb-1.5 block text-xs font-semibold text-ink">Change status</span>
            <select
              value={statusDraft}
              onChange={(e) => setStatusDraft(e.target.value as OrderStatus)}
              className="w-full rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm font-semibold text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>{ORDER_STATUS_LABEL[s]}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            disabled={busy || !statusDirty}
            onClick={() => patch({ status: statusDraft }, `Status set to “${ORDER_STATUS_LABEL[statusDraft]}”`, setSavingStatus)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-paper shadow-sm transition hover:bg-brand-deep active:scale-95 disabled:opacity-40"
          >
            {savingStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>
        </div>
        {statusDirty && !busy && (
          <p className="mt-2 text-xs text-amber-600">Unsaved change — press Save to apply.</p>
        )}
      </div>

      {/* ---------- Payment form ---------- */}
      <div className={box}>
        <p className={legend}>Payment method</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
                method === m ? "bg-brand text-paper shadow-sm" : "border border-ink/15 text-ink-soft hover:border-ink/30 hover:text-ink"
              }`}
            >
              {PAYMENT_METHOD_LABEL[m]}
            </button>
          ))}
        </div>

        <p className={`${legend} mt-5`}>Settlement</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PAYMENT_STATUSES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPayStatus(p)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition active:scale-95 ${
                payStatus === p ? PAYMENT_STATUS_STYLE[p] : "border border-ink/15 text-ink-soft hover:border-ink/30 hover:text-ink"
              }`}
            >
              {PAYMENT_STATUS_LABEL[p]}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <label className={legend}>Final cost (Rs)</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
              placeholder="0"
            />
          </div>
          <div>
            <label className={legend}>Amount paid (Rs)</label>
            <input
              type="number"
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink/15 bg-paper px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
              placeholder="0"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-paper-dim px-4 py-2.5">
          <p className="text-sm text-ink-soft">
            Outstanding{" "}
            <span className={`font-bold ${outstanding > 0 ? "text-red-600" : "text-emerald-600"}`}>
              {rs(outstanding)}
            </span>
          </p>
          <button
            type="button"
            disabled={busy || !payDirty}
            onClick={() =>
              patch(
                { preferredPayment: method, paymentStatus: payStatus, cost: costN, amountPaid: paidN },
                "Payment details saved",
                setSavingPay
              )
            }
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-paper shadow-sm transition hover:bg-brand-deep active:scale-95 disabled:opacity-40"
          >
            {savingPay ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save changes
          </button>
        </div>
        {payDirty && !busy && (
          <p className="mt-2 text-xs text-amber-600">Unsaved payment changes.</p>
        )}
      </div>

      <button
        type="button"
        onClick={remove}
        disabled={busy}
        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-600 disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" /> Delete order
      </button>
    </div>
  );
}
