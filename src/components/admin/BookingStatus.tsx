"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";
import { STATUSES, STATUS_LABEL, STATUS_STYLE, type Status } from "@/components/admin/status";

export default function BookingStatus({ id, initial }: { id: string; initial: Status }) {
  const router = useRouter();
  const { success, error } = useToast();
  const [status, setStatus] = useState<Status>(initial);
  const [saving, setSaving] = useState(false);

  async function change(next: Status) {
    const prev = status;
    setStatus(next);
    setSaving(true);
    try {
      await adminReq("PATCH", `/api/admin/repair-requests/${id}`, { status: next });
      success(`Status set to “${STATUS_LABEL[next]}”`);
      router.refresh();
    } catch (err) {
      setStatus(prev);
      error(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => change(s)}
          disabled={saving}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition disabled:opacity-60 ${
            status === s
              ? STATUS_STYLE[s]
              : "bg-ink/5 text-ink-soft hover:bg-ink/10"
          }`}
        >
          {STATUS_LABEL[s]}
        </button>
      ))}
      {saving && <Loader2 className="h-4 w-4 animate-spin text-ink-soft" />}
    </div>
  );
}
