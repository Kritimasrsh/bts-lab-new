"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2, Building2, User, MapPin, Phone, Hash, Tag, Smartphone,
  Wrench, ScanLine, Lock, FileText, StickyNote, Wallet, UserRound,
  type LucideIcon,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";
import { BRANDS } from "@/lib/data/brands";
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABEL,
  type PaymentMethod,
} from "@/components/admin/order-status";

type OrderResp = { order: { id: string } };

const labelCls = "mb-1.5 block text-[13px] font-semibold text-ink";

/* input with a leading icon */
function Field({
  icon: Icon,
  label,
  required,
  hint,
  children,
}: {
  icon: LucideIcon;
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>
        {label} {required && <span className="text-brand">*</span>}
        {hint && <span className="ml-1 font-normal text-ink-soft">· {hint}</span>}
      </label>
      <div className="group relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60 transition group-focus-within:text-brand" />
        {children}
      </div>
    </div>
  );
}

const inputCls =
  "peer w-full rounded-lg border border-ink/15 bg-paper py-2.5 pl-9.5 pr-3.5 text-sm text-ink outline-none transition placeholder:text-ink-soft/60 hover:border-ink/25 focus:border-brand focus:ring-4 focus:ring-brand/10";

export default function RepairOrderForm({ suggestedLabNo }: { suggestedLabNo: string }) {
  const router = useRouter();
  const { success, error } = useToast();
  const [saving, setSaving] = useState(false);

  const [f, setF] = useState({
    labNo: suggestedLabNo,
    customerName: "",
    companyName: "",
    address: "",
    contactNo: "",
    preferredPayment: "CREDIT" as PaymentMethod,
    brand: "",
    deviceModel: "",
    relatedFault: "",
    serialImei: "",
    passwordProtected: false,
    devicePassword: "",
    quoted: false,
    quotedAmount: "",
    faultDescription: "",
    notes: "",
    termsAccepted: true,
  });

  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) =>
    setF((prev) => ({ ...prev, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.customerName.trim() || !f.contactNo.trim() || !f.brand.trim() || !f.deviceModel.trim()) {
      error("Name, contact, brand and model are required.");
      return;
    }
    setSaving(true);
    try {
      const { order } = await adminReq<OrderResp>("POST", "/api/admin/repair-orders", {
        ...f,
        quotedAmount: f.quoted ? f.quotedAmount : null,
      });
      success(`Repair order ${f.labNo} created`);
      router.push(`/admin/orders/${order.id}`);
      router.refresh();
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to create order");
      setSaving(false);
    }
  }

  // small pill used for yes/no + payment choices
  const pill = (activeState: boolean) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition active:scale-[0.97] ${
      activeState ? "bg-brand text-paper shadow-sm" : "border border-ink/15 bg-paper text-ink-soft hover:border-ink/30 hover:text-ink"
    }`;

  return (
    <form onSubmit={submit} className="grid items-start gap-6 lg:grid-cols-2">
      {/* ---------------- Customer ---------------- */}
      <section className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <header className="mb-5 flex items-center gap-3 border-b border-ink/8 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand/20 bg-brand/5 text-brand">
            <UserRound className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="font-display text-base font-bold text-ink">Customer details</h2>
            <p className="text-xs text-ink-soft">Who the device belongs to</p>
          </div>
        </header>

        <div className="space-y-4">
          <Field icon={User} label="Name" required>
            <input className={inputCls} value={f.customerName} onChange={(e) => set("customerName", e.target.value)} placeholder="Customer full name" />
          </Field>

          <Field icon={Building2} label="Company / shop name" hint="optional — leave blank for a direct customer">
            <input className={inputCls} value={f.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Shop / company name" />
          </Field>

          <Field icon={MapPin} label="Address">
            <input className={inputCls} value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="City / area" />
          </Field>

          <Field icon={Phone} label="Contact no" required>
            <input className={inputCls} value={f.contactNo} onChange={(e) => set("contactNo", e.target.value)} placeholder="98XXXXXXXX" inputMode="tel" />
          </Field>

          <div>
            <label className={labelCls}>
              <Wallet className="mr-1 inline h-3.5 w-3.5 -translate-y-0.5 text-ink-soft/60" /> Preferred payment
            </label>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button key={m} type="button" onClick={() => set("preferredPayment", m)} className={pill(f.preferredPayment === m)}>
                  {PAYMENT_METHOD_LABEL[m]}
                </button>
              ))}
            </div>
            {f.companyName.trim() && f.preferredPayment !== "CREDIT" && (
              <p className="mt-1.5 text-xs text-ink-soft">Shop orders are usually billed on credit.</p>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- Repair ---------------- */}
      <section className="rounded-2xl border border-ink/10 bg-paper p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <header className="mb-5 flex items-center gap-3 border-b border-ink/8 pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand/20 bg-brand/5 text-brand">
            <Wrench className="h-4.5 w-4.5" />
          </span>
          <div>
            <h2 className="font-display text-base font-bold text-ink">Device &amp; repair</h2>
            <p className="text-xs text-ink-soft">What came in and what&apos;s wrong</p>
          </div>
        </header>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field icon={Hash} label="Lab no">
              <input className={`${inputCls} font-mono-tag font-bold`} value={f.labNo} onChange={(e) => set("labNo", e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field icon={Tag} label="Brand" required>
                <input list="brand-list" className={inputCls} value={f.brand} onChange={(e) => set("brand", e.target.value)} placeholder="e.g. Apple" />
                <datalist id="brand-list">
                  {BRANDS.map((b) => (<option key={b.slug} value={b.name} />))}
                </datalist>
              </Field>
            </div>
          </div>

          <Field icon={Smartphone} label="Model" required>
            <input className={inputCls} value={f.deviceModel} onChange={(e) => set("deviceModel", e.target.value)} placeholder="e.g. iPhone 13 Pro" />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field icon={Wrench} label="Related fault">
              <input className={inputCls} value={f.relatedFault} onChange={(e) => set("relatedFault", e.target.value)} placeholder="Screen, battery…" />
            </Field>
            <Field icon={ScanLine} label="Serial / IMEI">
              <input className={inputCls} value={f.serialImei} onChange={(e) => set("serialImei", e.target.value)} placeholder="IMEI or serial" />
            </Field>
          </div>

          {/* password */}
          <div>
            <label className={labelCls}>
              <Lock className="mr-1 inline h-3.5 w-3.5 -translate-y-0.5 text-ink-soft/60" /> Password protected?
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => set("passwordProtected", false)} className={pill(!f.passwordProtected)}>No</button>
              <button type="button" onClick={() => set("passwordProtected", true)} className={pill(f.passwordProtected)}>Yes</button>
              {f.passwordProtected && (
                <input className={`${inputCls} !pl-3.5 flex-1`} value={f.devicePassword} onChange={(e) => set("devicePassword", e.target.value)} placeholder="Password / pattern (so we can test)" />
              )}
            </div>
          </div>

          {/* quote */}
          <div>
            <label className={labelCls}>
              <Wallet className="mr-1 inline h-3.5 w-3.5 -translate-y-0.5 text-ink-soft/60" /> Quoted a price?
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => set("quoted", false)} className={pill(!f.quoted)}>No</button>
              <button type="button" onClick={() => set("quoted", true)} className={pill(f.quoted)}>Yes</button>
              {f.quoted && (
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-ink/15 bg-paper px-3 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
                  <span className="text-sm font-semibold text-ink-soft">Rs</span>
                  <input type="number" className="w-full bg-transparent py-2.5 text-sm outline-none" value={f.quotedAmount} onChange={(e) => set("quotedAmount", e.target.value)} placeholder="Quoted amount" />
                </div>
              )}
            </div>
          </div>

          <Field icon={FileText} label="Fault description">
            <textarea rows={3} className={`${inputCls} !pt-2.5`} value={f.faultDescription} onChange={(e) => set("faultDescription", e.target.value)} placeholder="Describe the fault in detail" />
          </Field>

          <Field icon={StickyNote} label="Internal notes" hint="not printed">
            <textarea rows={2} className={`${inputCls} !pt-2.5`} value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Notes for the team" />
          </Field>
        </div>
      </section>

      {/* ---------------- Terms + submit ---------------- */}
      <div className="lg:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 bg-paper-dim p-4 transition hover:border-brand/30">
          <input
            type="checkbox"
            checked={f.termsAccepted}
            onChange={(e) => set("termsAccepted", e.target.checked)}
            className="mt-0.5 h-5 w-5 accent-[var(--brand)]"
          />
          <span className="text-sm text-ink/80">
            The customer agrees to all Terms &amp; Conditions as advised by BTS Lab (service fee for
            unrepairable devices, no data-loss liability, remove SIM/memory card, no warranty on
            marked/scratched/cracked LCDs, collect within 20 days).
          </span>
        </label>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/orders")}
            className="rounded-lg border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink/70 transition hover:bg-ink/5 active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-7 py-2.5 font-display text-sm font-bold text-paper shadow-sm transition hover:bg-brand-deep active:scale-[0.98] disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Create repair order
          </button>
        </div>
      </div>
    </form>
  );
}
