"use client";

import { useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";
import { EditableText, Toggle } from "@/components/admin/AdminUI";

export type AdminBrand = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  order: number;
  active: boolean;
  _count?: { models: number };
};

export default function BrandsManager({ initial }: { initial: AdminBrand[] }) {
  const { success, error } = useToast();
  const [brands, setBrands] = useState<AdminBrand[]>(initial);
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function refresh() {
    const { brands } = await adminReq<{ brands: AdminBrand[] }>("GET", "/api/admin/brands");
    setBrands(brands);
  }

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const value = name.trim();
    if (!value) return;
    setAdding(true);
    try {
      await adminReq("POST", "/api/admin/brands", { name: value });
      setName("");
      await refresh();
      success(`Added brand “${value}”`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to add brand");
    } finally {
      setAdding(false);
    }
  }

  async function patch(id: string, data: Partial<AdminBrand>) {
    setBusyId(id);
    try {
      await adminReq("PATCH", `/api/admin/brands/${id}`, data);
      await refresh();
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to update brand");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(b: AdminBrand) {
    if (!confirm(`Delete “${b.name}”? This also removes its ${b._count?.models ?? 0} models.`)) return;
    setBusyId(b.id);
    try {
      await adminReq("DELETE", `/api/admin/brands/${b.id}`);
      await refresh();
      success(`Deleted “${b.name}”`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to delete brand");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Brands</h1>
          <p className="mt-1 text-sm text-ink-soft">{brands.length} brands — the manufacturers customers pick from.</p>
        </div>
        <form onSubmit={add} className="flex items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New brand name"
            className="focus-ring w-48 rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-paper transition hover:bg-brand-deep disabled:opacity-60"
          >
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add
          </button>
        </form>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-ink/10 bg-paper-dim px-4 py-2.5 font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft">
          <span>Name</span>
          <span className="w-16 text-center">Models</span>
          <span className="w-20 text-center">Active</span>
          <span className="w-10" />
        </div>
        {brands.length === 0 && (
          <p className="px-4 py-6 text-sm text-ink-soft">No brands yet — add one above.</p>
        )}
        {brands.map((b) => (
          <div
            key={b.id}
            className={`grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-ink/8 px-4 py-2 last:border-0 ${
              busyId === b.id ? "opacity-60" : ""
            }`}
          >
            <div>
              <EditableText value={b.name} onSave={(v) => patch(b.id, { name: v })} />
              <span className="px-2 font-mono-tag text-[11px] text-ink-soft">/{b.slug}</span>
            </div>
            <span className="w-16 text-center text-sm text-ink-soft">{b._count?.models ?? 0}</span>
            <span className="flex w-20 justify-center">
              <Toggle checked={b.active} onChange={(v) => patch(b.id, { active: v })} label="Active" />
            </span>
            <button
              type="button"
              onClick={() => remove(b)}
              className="flex w-10 justify-center text-ink-soft transition hover:text-red-600"
              aria-label={`Delete ${b.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
