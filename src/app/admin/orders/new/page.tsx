import { prisma } from "@/lib/prisma";
import RepairOrderForm from "@/components/admin/RepairOrderForm";

export const dynamic = "force-dynamic";

async function nextLabNo() {
  const all = await prisma.repairOrder.findMany({ select: { labNo: true } });
  const max = all.reduce((m, o) => Math.max(m, parseInt(o.labNo, 10) || 0), 142);
  return String(max + 1).padStart(4, "0");
}

export default async function NewOrderPage() {
  const labNo = await nextLabNo();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 pb-4">
        <h1 className="font-display text-lg font-bold tracking-tight">New repair order</h1>
        <span className="text-xs text-ink-soft">
          Lab No <span className="font-mono-tag font-bold text-ink">{labNo}</span> · auto-assigned
        </span>
      </div>

      <RepairOrderForm suggestedLabNo={labNo} />
    </div>
  );
}
