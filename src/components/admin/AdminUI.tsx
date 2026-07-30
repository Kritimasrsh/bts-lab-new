"use client";

import { useEffect, useState } from "react";

/** Inline-editable text field that saves on blur / Enter, reverts on Escape. */
export function EditableText({
  value,
  onSave,
  placeholder,
  className,
}: {
  value: string;
  onSave: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  return (
    <input
      value={draft}
      placeholder={placeholder}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        const v = draft.trim();
        if (v && v !== value) onSave(v);
        else setDraft(value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
        if (e.key === "Escape") {
          setDraft(value);
          e.currentTarget.blur();
        }
      }}
      className={
        className ??
        "w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-sm font-medium text-ink transition hover:border-ink/15 focus:border-brand focus:bg-paper focus:outline-none"
      }
    />
  );
}

/** Shimmer placeholder rows shown while a table loads. */
export function SkeletonRows({ rows = 6, cols = 3 }: { rows?: number; cols?: number }) {
  return (
    <div aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-ink/8 px-4 py-3.5 last:border-0"
        >
          <span className="skeleton h-4 flex-1 rounded" style={{ maxWidth: `${40 + ((i * 13) % 40)}%` }} />
          {Array.from({ length: Math.max(0, cols - 1) }).map((_, j) => (
            <span key={j} className="skeleton h-4 w-14 rounded" />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Accessible on/off switch. */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-brand" : "bg-ink/20"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
