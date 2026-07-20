"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

/**
 * Guided Brand -> Model -> Problem selector.
 * This is the product's real entry point: users pick their device and issue,
 * then get routed into the repair portal with the selection pre-filled.
 */

const BRANDS = [
  { name: "Apple", slug: "apple", logo: "/images/brands/apple.svg" },
  { name: "Samsung", slug: "samsung", logo: "/images/brands/samsung.svg" },
  { name: "Xiaomi", slug: "xiaomi", logo: "/images/brands/xiaomi.svg" },
  { name: "OnePlus", slug: "oneplus", logo: "/images/brands/oneplus.svg" },
  { name: "OPPO", slug: "oppo", logo: "/images/brands/oppo.svg" },
  { name: "VIVO", slug: "vivo", logo: "/images/brands/vivo.svg" },
  { name: "Realme", slug: "realme", logo: "/images/brands/realme.svg" },
  { name: "Google", slug: "google", logo: "/images/brands/google.svg" },
];

const MODELS = {
  apple: ["iPhone 15 Pro Max", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone SE"],
  samsung: ["Galaxy S24 Ultra", "Galaxy S23", "Galaxy A55", "Galaxy A35", "Galaxy Z Flip 5", "Galaxy M14"],
  xiaomi: ["Xiaomi 14", "Redmi Note 13 Pro", "Redmi Note 12", "Poco X6", "Redmi 13C"],
  oneplus: ["OnePlus 12", "OnePlus 11", "OnePlus Nord 3", "OnePlus Nord CE 4"],
  oppo: ["Reno 11 Pro", "Reno 10", "Find X7", "A79", "A58"],
  vivo: ["V30 Pro", "V29", "Y100", "Y28", "T3"],
  realme: ["Realme 12 Pro+", "Realme 11", "Narzo 70", "Realme C67"],
  google: ["Pixel 8 Pro", "Pixel 8", "Pixel 7a", "Pixel 6"],
};

const PROBLEMS = [
  { id: "screen", label: "Cracked / broken screen", icon: "📱" },
  { id: "battery", label: "Battery drains fast", icon: "🔋" },
  { id: "charging", label: "Charging / port issue", icon: "🔌" },
  { id: "water", label: "Water damage", icon: "💧" },
  { id: "camera", label: "Camera not working", icon: "📷" },
  { id: "speaker", label: "Speaker / mic problem", icon: "🔊" },
  { id: "software", label: "Software / stuck / slow", icon: "🔓" },
  { id: "other", label: "Something else", icon: "🛠️" },
];

const STEPS = ["Brand", "Model", "Problem"];

function StepBadge({ index, active, done }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`step-dot flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${
          active
            ? "border-brand bg-brand text-paper"
            : done
            ? "border-brand bg-brand/10 text-brand"
            : "border-ink/15 bg-paper text-ink-soft"
        }`}
      >
        {done ? "✓" : index + 1}
      </span>
      <span
        className={`font-display text-xs font-bold uppercase tracking-wide ${
          active || done ? "text-ink" : "text-ink-soft"
        }`}
      >
        {STEPS[index]}
      </span>
    </div>
  );
}

export default function RepairQuery() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [problem, setProblem] = useState(null);

  const models = useMemo(() => (brand ? MODELS[brand.slug] || [] : []), [brand]);

  function pickBrand(b) {
    setBrand(b);
    setModel(null);
    setProblem(null);
    setStep(1);
  }
  function pickModel(m) {
    setModel(m);
    setProblem(null);
    setStep(2);
  }
  function pickProblem(p) {
    setProblem(p);
  }

  function submit() {
    if (!brand || !model || !problem) return;
    const params = new URLSearchParams({
      brand: brand.slug,
      model,
      problem: problem.id,
    });
    router.push(`/services?${params.toString()}`);
  }

  return (
    <div className="ticket overflow-hidden bg-paper">
      {/* Header / stepper */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/8 bg-paper-dim px-6 py-4">
        <div className="flex items-center gap-3 sm:gap-5">
          {STEPS.map((_, i) => (
            <StepBadge key={i} index={i} active={step === i} done={step > i} />
          ))}
        </div>
        <span className="font-mono-tag text-[11px] uppercase tracking-widest text-brand">
          Instant quote
        </span>
      </div>

      <div className="p-6">
        {/* STEP 1 — BRAND */}
        {step === 0 && (
          <div>
            <p className="font-display text-sm font-bold text-ink">
              Which brand is your phone?
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Select a brand to begin. We repair every major manufacturer.
            </p>
            <div className="mt-4 grid grid-cols-4 gap-2.5 sm:grid-cols-4">
              {BRANDS.map((b) => (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => pickBrand(b)}
                  className="focus-ring group flex flex-col items-center gap-2 rounded-xl border border-ink/10 bg-paper px-2 py-3 transition-colors hover:border-brand/50 hover:bg-brand/5"
                >
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={72}
                    height={36}
                    className="h-7 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span className="font-display text-[11px] font-bold text-ink-soft group-hover:text-ink">
                    {b.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — MODEL */}
        {step === 1 && brand && (
          <div>
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold text-ink">
                Pick your {brand.name} model
              </p>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="focus-ring text-xs font-semibold text-brand hover:underline"
              >
                ← Change brand
              </button>
            </div>
            <div className="mt-4 grid max-h-56 grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
              {models.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => pickModel(m)}
                  className="focus-ring flex items-center justify-between rounded-xl border border-ink/10 bg-paper px-4 py-3 text-left text-sm font-medium text-ink transition-colors hover:border-brand/50 hover:bg-brand/5"
                >
                  {m}
                  <span className="text-brand">→</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-soft">
              Can&apos;t find your exact model? Pick the closest one our team confirms it on pickup.
            </p>
          </div>
        )}

        {/* STEP 3 — PROBLEM */}
        {step === 2 && brand && model && (
          <div>
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold text-ink">
                What&apos;s wrong with your {model}?
              </p>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="focus-ring text-xs font-semibold text-brand hover:underline"
              >
                ← Change model
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PROBLEMS.map((p) => {
                const selected = problem?.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => pickProblem(p)}
                    className={`focus-ring flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      selected
                        ? "border-brand bg-brand/10 text-ink"
                        : "border-ink/10 bg-paper text-ink hover:border-brand/50 hover:bg-brand/5"
                    }`}
                  >
                    <span className="text-lg">{p.icon}</span>
                    {p.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={submit}
              disabled={!problem}
              className="hover-lift focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold text-paper transition disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
            >
              Get my repair quote
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Live selection summary footer */}
      <div className="ticket-perf mx-6" />
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-6 py-3.5 text-xs">
        <span className="font-mono-tag uppercase tracking-wide text-ink-soft">Your device:</span>
        <span className="font-semibold text-ink">{brand ? brand.name : "—"}</span>
        <span className="text-ink-soft">/</span>
        <span className="font-semibold text-ink">{model || "—"}</span>
        <span className="text-ink-soft">/</span>
        <span className="font-semibold text-brand">{problem ? problem.label : "—"}</span>
      </div>
    </div>
  );
}
