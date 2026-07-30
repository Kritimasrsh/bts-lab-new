"use client";

import { useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";
import { EditableText, Toggle } from "@/components/admin/AdminUI";

type AdminProblem = {
  id: string;
  name: string;
  order: number;
  active: boolean;
  categoryId: string;
};
export type AdminCategory = {
  id: string;
  name: string;
  order: number;
  problems: AdminProblem[];
};

export default function ServicesManager({ initial }: { initial: AdminCategory[] }) {
  const { success, error } = useToast();
  const [categories, setCategories] = useState<AdminCategory[]>(initial);
  const [newCategory, setNewCategory] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);

  async function refresh() {
    const { categories } = await adminReq<{ categories: AdminCategory[] }>(
      "GET",
      "/api/admin/problems"
    );
    setCategories(categories);
  }

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    const value = newCategory.trim();
    if (!value) return;
    setAddingCat(true);
    try {
      await adminReq("POST", "/api/admin/problem-categories", { name: value });
      setNewCategory("");
      await refresh();
      success(`Added category “${value}”`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to add category");
    } finally {
      setAddingCat(false);
    }
  }

  async function addProblem(categoryId: string) {
    const value = (drafts[categoryId] || "").trim();
    if (!value) return;
    setBusy(categoryId);
    try {
      await adminReq("POST", "/api/admin/problems", { name: value, categoryId });
      setDrafts((d) => ({ ...d, [categoryId]: "" }));
      await refresh();
      success(`Added “${value}”`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to add service");
    } finally {
      setBusy(null);
    }
  }

  async function patchProblem(id: string, data: Partial<AdminProblem>) {
    setBusy(id);
    try {
      await adminReq("PATCH", `/api/admin/problems/${id}`, data);
      await refresh();
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to update service");
    } finally {
      setBusy(null);
    }
  }

  async function removeProblem(p: AdminProblem) {
    if (!confirm(`Delete “${p.name}”?`)) return;
    setBusy(p.id);
    try {
      await adminReq("DELETE", `/api/admin/problems/${p.id}`);
      await refresh();
      success(`Deleted “${p.name}”`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to delete service");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Repair services</h1>
          <p className="mt-1 text-sm text-ink-soft">
            The problems customers can pick, grouped into categories.
          </p>
        </div>
        <form onSubmit={addCategory} className="flex items-center gap-2">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
            className="focus-ring w-44 rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none"
          />
          <button
            type="submit"
            disabled={addingCat}
            className="inline-flex items-center gap-1.5 rounded-xl border border-brand/30 px-4 py-2.5 text-sm font-bold text-brand transition hover:bg-brand/5 disabled:opacity-60"
          >
            {addingCat ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Category
          </button>
        </form>
      </div>

      <div className="mt-6 space-y-5">
        {categories.length === 0 && (
          <p className="rounded-2xl border border-ink/10 bg-paper px-4 py-6 text-sm text-ink-soft">
            No categories yet — add one above.
          </p>
        )}

        {categories.map((cat) => (
          <div key={cat.id} className="overflow-hidden rounded-2xl border border-ink/10 bg-paper">
            <div className="flex items-center justify-between border-b border-ink/10 bg-paper-dim px-4 py-3">
              <h2 className="font-display text-sm font-extrabold uppercase tracking-widest text-brand">
                {cat.name}
              </h2>
              <span className="text-xs text-ink-soft">{cat.problems.length} services</span>
            </div>

            <div className="divide-y divide-ink/8">
              {cat.problems.map((p) => (
                <div
                  key={p.id}
                  className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-1.5 ${
                    busy === p.id ? "opacity-60" : ""
                  }`}
                >
                  <EditableText value={p.name} onSave={(v) => patchProblem(p.id, { name: v })} />
                  <span className="flex w-20 justify-center">
                    <Toggle
                      checked={p.active}
                      onChange={(v) => patchProblem(p.id, { active: v })}
                      label="Active"
                    />
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProblem(p)}
                    className="flex w-10 justify-center text-ink-soft transition hover:text-red-600"
                    aria-label={`Delete ${p.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addProblem(cat.id);
              }}
              className="flex items-center gap-2 border-t border-ink/8 px-4 py-3"
            >
              <input
                value={drafts[cat.id] || ""}
                onChange={(e) => setDrafts((d) => ({ ...d, [cat.id]: e.target.value }))}
                placeholder={`Add a service to ${cat.name}…`}
                className="focus-ring flex-1 rounded-xl border border-ink/15 bg-paper px-3.5 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy === cat.id}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-sm font-bold text-paper transition hover:bg-brand-deep disabled:opacity-60"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
