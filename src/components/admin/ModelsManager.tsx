"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Trash2, Loader2, Layers, Rows3 } from "lucide-react";
import { useToast } from "@/components/Toast";
import { adminReq } from "@/components/admin/api";
import { EditableText, Toggle, SkeletonRows } from "@/components/admin/AdminUI";

type BrandLite = { id: string; name: string };
type AdminModel = {
  id: string;
  name: string;
  slug: string;
  series: string | null;
  order: number;
  active: boolean;
  brandId: string;
};

// Common variant suffixes — the admin picks which apply per series (optional).
const SUFFIXES = ["Plus", "Pro", "Pro Max", "Max", "mini", "Ultra", "FE", "Lite"];

export default function ModelsManager({ brands }: { brands: BrandLite[] }) {
  const { success, error } = useToast();
  const [brandId, setBrandId] = useState(brands[0]?.id ?? "");
  const [models, setModels] = useState<AdminModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [mode, setMode] = useState<"single" | "series">("single");
  // single
  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  // by series
  const [seriesBase, setSeriesBase] = useState("");
  const [includeBase, setIncludeBase] = useState(true);
  const [picked, setPicked] = useState<Set<string>>(new Set(["Pro", "Pro Max", "Plus"]));

  const load = useCallback(async () => {
    if (!brandId) return;
    setLoading(true);
    try {
      const { models } = await adminReq<{ models: AdminModel[] }>(
        "GET",
        `/api/admin/models?brandId=${brandId}`
      );
      setModels(models);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to load models");
    } finally {
      setLoading(false);
    }
  }, [brandId, error]);

  useEffect(() => {
    load();
  }, [load]);

  async function addSingle(e: React.FormEvent) {
    e.preventDefault();
    const value = name.trim();
    if (!value || !brandId) return;
    setAdding(true);
    try {
      await adminReq("POST", "/api/admin/models", {
        name: value,
        series: series.trim() || null,
        brandId,
      });
      setName("");
      setSeries("");
      await load();
      success(`Added “${value}”`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to add model");
    } finally {
      setAdding(false);
    }
  }

  const previewNames = (() => {
    const base = seriesBase.trim();
    if (!base) return [] as string[];
    const list: string[] = [];
    if (includeBase) list.push(base);
    for (const s of SUFFIXES) if (picked.has(s)) list.push(`${base} ${s}`);
    return list;
  })();

  async function addSeries(e: React.FormEvent) {
    e.preventDefault();
    const base = seriesBase.trim();
    if (!base || previewNames.length === 0 || !brandId) return;
    setAdding(true);
    try {
      const results = await Promise.allSettled(
        previewNames.map((n) =>
          adminReq("POST", "/api/admin/models", { name: n, series: base, brandId })
        )
      );
      const ok = results.filter((r) => r.status === "fulfilled").length;
      const skipped = results.length - ok;
      await load();
      if (ok > 0) {
        success(
          `Added ${ok} model${ok === 1 ? "" : "s"} to “${base}”${
            skipped ? ` · ${skipped} already existed` : ""
          }`
        );
        setSeriesBase("");
      } else {
        error("Nothing added — those models already exist.");
      }
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to add series");
    } finally {
      setAdding(false);
    }
  }

  async function patch(id: string, data: Partial<AdminModel>) {
    setBusyId(id);
    try {
      await adminReq("PATCH", `/api/admin/models/${id}`, data);
      await load();
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to update model");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(m: AdminModel) {
    if (!confirm(`Delete “${m.name}”?`)) return;
    setBusyId(m.id);
    try {
      await adminReq("DELETE", `/api/admin/models/${m.id}`);
      await load();
      success(`Deleted “${m.name}”`);
    } catch (err) {
      error(err instanceof Error ? err.message : "Failed to delete model");
    } finally {
      setBusyId(null);
    }
  }

  const tabCls = (on: boolean) =>
    `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
      on ? "bg-paper text-brand shadow-sm" : "text-ink-soft hover:text-ink"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Models</h1>
          <p className="mt-1 text-sm text-ink-soft">Devices grouped under each brand.</p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-ink-soft">Brand</span>
          <select
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            className="focus-ring rounded-xl border border-ink/15 bg-paper px-3 py-2.5 text-sm font-semibold focus:border-brand focus:outline-none"
          >
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* add panel with mode switch */}
      <div className="mt-6 rounded-2xl border border-ink/10 bg-paper p-4">
        <div className="inline-flex gap-1 rounded-xl bg-paper-dim p-1">
          <button type="button" onClick={() => setMode("single")} className={tabCls(mode === "single")}>
            <Rows3 className="h-4 w-4" /> Single model
          </button>
          <button type="button" onClick={() => setMode("series")} className={tabCls(mode === "series")}>
            <Layers className="h-4 w-4" /> Add by series
          </button>
        </div>

        {mode === "single" ? (
          <form onSubmit={addSingle} className="mt-4 flex flex-wrap items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Model name — e.g. iPhone 15 Pro"
              className="focus-ring min-w-56 flex-1 rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
            <input
              value={series}
              onChange={(e) => setSeries(e.target.value)}
              placeholder="Series (optional) — e.g. iPhone 15"
              className="focus-ring w-56 rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
            <button
              type="submit"
              disabled={adding}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-paper transition hover:bg-brand-deep disabled:opacity-60"
            >
              {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add model
            </button>
          </form>
        ) : (
          <form onSubmit={addSeries} className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={seriesBase}
                onChange={(e) => setSeriesBase(e.target.value)}
                placeholder="Series name — e.g. iPhone 15 or Galaxy S24"
                className="focus-ring min-w-64 flex-1 rounded-xl border border-ink/15 bg-paper px-3.5 py-2.5 text-sm focus:border-brand focus:outline-none"
              />
              <button
                type="submit"
                disabled={adding || previewNames.length === 0}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-paper transition hover:bg-brand-deep disabled:opacity-50"
              >
                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Add {previewNames.length || ""} model{previewNames.length === 1 ? "" : "s"}
              </button>
            </div>

            <p className="mt-3 font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft">
              Variants (optional — pick what applies)
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIncludeBase((v) => !v)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  includeBase
                    ? "border-brand bg-brand/10 text-brand"
                    : "border-ink/15 text-ink-soft hover:border-brand/40"
                }`}
              >
                Base
              </button>
              {SUFFIXES.map((s) => {
                const on = picked.has(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setPicked((prev) => {
                        const next = new Set(prev);
                        if (next.has(s)) next.delete(s);
                        else next.add(s);
                        return next;
                      })
                    }
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      on
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-ink/15 text-ink-soft hover:border-brand/40"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {previewNames.length > 0 && (
              <div className="mt-3 rounded-xl bg-paper-dim px-3.5 py-3">
                <p className="text-xs font-semibold text-ink-soft">Will create:</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {previewNames.map((n) => (
                    <span
                      key={n}
                      className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink shadow-sm"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <div className="grid grid-cols-[1fr_1fr_auto_auto] items-center gap-4 border-b border-ink/10 bg-paper-dim px-4 py-2.5 font-mono-tag text-[11px] uppercase tracking-widest text-ink-soft">
          <span>Name</span>
          <span>Series</span>
          <span className="w-20 text-center">Active</span>
          <span className="w-10" />
        </div>

        {loading ? (
          <SkeletonRows rows={8} cols={3} />
        ) : models.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-soft">No models for this brand yet.</p>
        ) : (
          models.map((m) => (
            <div
              key={m.id}
              className={`grid grid-cols-[1fr_1fr_auto_auto] items-center gap-4 border-b border-ink/8 px-4 py-2 last:border-0 ${
                busyId === m.id ? "opacity-60" : ""
              }`}
            >
              <EditableText value={m.name} onSave={(v) => patch(m.id, { name: v })} />
              <EditableText
                value={m.series ?? ""}
                placeholder="—"
                onSave={(v) => patch(m.id, { series: v })}
              />
              <span className="flex w-20 justify-center">
                <Toggle checked={m.active} onChange={(v) => patch(m.id, { active: v })} label="Active" />
              </span>
              <button
                type="button"
                onClick={() => remove(m)}
                className="flex w-10 justify-center text-ink-soft transition hover:text-red-600"
                aria-label={`Delete ${m.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
