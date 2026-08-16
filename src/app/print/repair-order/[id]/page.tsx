import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CONTACT } from "@/lib/data/contact";
import PrintButton from "@/components/admin/PrintButton";
import { PAYMENT_METHODS, PAYMENT_METHOD_LABEL, rs } from "@/components/admin/order-status";

export const dynamic = "force-dynamic";

const TERMS = [
  "If there are any changes to your original quote, or you haven't received a quote upfront, BTS Lab will contact you before starting any work.",
  "A non-refundable service fee of Rs 200 to 500 will be charged if your device is not repaired or is unrepairable (flex, lining and others).",
  "We are not responsible for the loss of any data. BTS Lab always recommends making a backup before sending your device in for repair.",
  "Please make sure you have removed your SIM card and memory card from your phone. BTS Lab does not accept responsibility for the loss of these items.",
  "No warranty is provided on LCDs or Touch if they have marks, scratches or cracks.",
  "We are not responsible for any missing or damaged products if you do not collect your device within 20 days of the date it was received.",
  "Please read these Terms & Conditions carefully before signing.",
];

function Check({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block h-3.5 w-3.5 border border-black ${on ? "bg-black" : "bg-white"}`} />
      {label}
    </span>
  );
}

function Field({ label, value, wide }: { label: string; value?: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`flex items-stretch border-b border-black/70 ${wide ? "col-span-2" : ""}`}>
      <div className="w-40 shrink-0 border-r border-black/70 bg-black/[0.04] px-3 py-1.5 text-[13px] font-bold">
        {label}
      </div>
      <div className="min-h-[30px] flex-1 px-3 py-1.5 text-[13px]">{value}</div>
    </div>
  );
}

export default async function PrintRepairOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login?callbackUrl=/admin/orders");

  const { id } = await params;
  const o = await prisma.repairOrder.findUnique({ where: { id } });
  if (!o) notFound();

  const created = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(o.createdAt);

  return (
    <div className="min-h-screen bg-black/5 py-8 print:bg-white print:py-0">
      {/* toolbar */}
      <div className="mx-auto mb-4 flex max-w-[820px] items-center justify-between px-4 print:hidden">
        <Link href={`/admin/orders/${o.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> Back to order
        </Link>
        <PrintButton />
      </div>

      {/* sheet */}
      <div className="mx-auto max-w-[820px] bg-white p-10 text-black shadow-lg print:max-w-none print:p-6 print:shadow-none">
        {/* header */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-extrabold tracking-tight">BTS Lab</h1>
          <p className="text-[13px] font-semibold">{CONTACT.address}</p>
          <p className="text-[13px] font-semibold">
            Ph: {CONTACT.phonesDisplay.join(", ")} · {CONTACT.landlineDisplay}
          </p>
        </div>
        <div className="my-4 border-t-2 border-double border-black" />

        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold underline">Repair Order Form</h2>
          <p className="text-lg font-bold">
            Lab No: <span className="text-2xl">{o.labNo}</span>
          </p>
        </div>

        {/* Your Detail */}
        <div className="border border-black">
          <div className="bg-black/80 py-1 text-center font-display text-lg font-bold text-white">Your Detail</div>
          <div className="grid grid-cols-2">
            <Field label="Name" value={o.customerName} wide />
            <Field label="Company Name" value={o.companyName} wide />
            <Field label="Address" value={o.address} wide />
            <Field label="Contact No" value={o.contactNo} wide />
            <div className="col-span-2 flex items-center gap-6 px-3 py-2 text-[13px]">
              <span className="font-bold">Preferred Payment:</span>
              {PAYMENT_METHODS.map((m) => (
                <Check key={m} on={o.preferredPayment === m} label={PAYMENT_METHOD_LABEL[m]} />
              ))}
            </div>
          </div>
        </div>

        {/* Repair Detail */}
        <div className="mt-4 border border-black">
          <div className="bg-black/80 py-1 text-center font-display text-lg font-bold text-white">Repair Detail</div>
          <div className="grid grid-cols-2">
            <Field label="Brand" value={o.brand} />
            <Field label="Model" value={o.deviceModel} />
            <Field label="Related Fault" value={o.relatedFault} wide />
            <Field label="Serial / IMEI No" value={o.serialImei} wide />
            <div className="col-span-2 flex items-center gap-6 border-b border-black/70 px-3 py-2 text-[13px]">
              <span className="font-bold">Phone protected with password?</span>
              <Check on={!o.passwordProtected} label="No" />
              <Check on={o.passwordProtected} label={`Yes ${o.passwordProtected && o.devicePassword ? "· " + o.devicePassword : ""}`} />
            </div>
            <div className="col-span-2 flex items-center gap-6 border-b border-black/70 px-3 py-2 text-[13px]">
              <span className="font-bold">Did you quote?</span>
              <Check on={!o.quoted} label="No" />
              <Check on={o.quoted} label={`Yes, for ${o.quoted ? rs(o.quotedAmount) : "Rs ........"}`} />
            </div>
            <Field label="Fault Description" value={o.faultDescription} wide />
          </div>
        </div>

        {/* Terms */}
        <div className="mt-4 border border-black">
          <div className="bg-black/80 py-1 text-center font-display text-lg font-bold text-white">Term &amp; Conditions</div>
          <ol className="list-decimal space-y-1.5 px-8 py-3 text-[11px] leading-snug">
            {TERMS.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </div>

        {/* agreement */}
        <div className="mt-4 flex items-center gap-2 text-[13px]">
          <span className={`inline-block h-4 w-4 border border-black ${o.termsAccepted ? "bg-black" : "bg-white"}`} />
          <span className="font-semibold">I agree to all Terms and Conditions as advised by BTS Lab.</span>
        </div>

        {/* signature / date */}
        <div className="mt-10 flex items-end justify-between text-[13px]">
          <div>
            Signature: <span className="ml-2 inline-block w-52 border-b border-black" />
          </div>
          <div>
            Date: <span className="ml-2 inline-block w-40 border-b border-black text-center">{created}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
