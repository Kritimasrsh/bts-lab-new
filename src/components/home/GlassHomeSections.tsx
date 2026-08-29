"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smartphone,
  BatteryCharging,
  Camera,
  PlugZap,
  Layers,
  Cpu,
  CalendarCheck,
  Microscope,
  Wrench,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Counter from "@/components/Counter";

/* ------------------------------------------------------------------ */
/*  Light glassmorphism sections that follow the 3D journey. Each     */
/*  reveals with a GSAP ScrollTrigger stagger on [data-reveal].       */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll("[data-reveal]");
      if (!items?.length) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: ref.current, start: "top 78%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

const glassCard =
  "rounded-3xl border border-white/70 bg-white/55 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl";

function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-[#f6f3ef] ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#2fa89a]/10 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-reveal
      className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 font-mono-tag text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55 shadow-sm backdrop-blur-md"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b1a]" />
      {children}
    </span>
  );
}

/* ================= 1. Repair parts grid ================= */

const REPAIRS = [
  { icon: Smartphone, name: "Display Assembly", desc: "OLED replacement for cracks, dead pixels and the dreaded green line.", tag: "Most common" },
  { icon: BatteryCharging, name: "Battery", desc: "Health below 80%, fast drain or swelling — swapped with genuine cells.", tag: "45 min" },
  { icon: Camera, name: "Camera System", desc: "48MP triple camera, LiDAR and Face ID module repairs and calibration.", tag: "Calibrated" },
  { icon: PlugZap, name: "Charging Port", desc: "USB-C assembly replacement for loose, corroded or dead ports.", tag: "Same day" },
  { icon: Layers, name: "Back Housing", desc: "Aluminum unibody and back glass restored to factory finish.", tag: "OEM finish" },
  { icon: Cpu, name: "Logic Board", desc: "A19 Pro board-level micro-soldering and chip-level diagnostics.", tag: "Lab only" },
];

export function RepairServicesGlass() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <SectionShell>
      <div ref={ref}>
        <div className="flex flex-col items-start gap-4">
          <Eyebrow>What we fix</Eyebrow>
          <h2 data-reveal className="max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Every part you just saw —
            <span className="text-[#e85d04]"> we repair it.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REPAIRS.map(({ icon: Icon, name, desc, tag }) => (
            <Link
              key={name}
              href="/repair"
              data-reveal
              className={`group relative p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/75 hover:shadow-[0_28px_60px_-24px_rgba(232,93,4,0.45)] ${glassCard}`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff6b1a]/12 text-[#e85d04] transition-colors duration-300 group-hover:bg-[#ff6b1a] group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span className="rounded-full border border-white/70 bg-white/60 px-2.5 py-1 font-mono-tag text-[9px] font-bold uppercase tracking-widest text-ink/50 backdrop-blur-sm">
                  {tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-extrabold text-ink">{name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/55">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#e85d04] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Get a quote
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ================= 2. Process ================= */

const STEPS = [
  { icon: CalendarCheck, step: "01", name: "Book online", desc: "Pick your device and problem — get an instant quote with doorstep pickup." },
  { icon: Microscope, step: "02", name: "Free diagnosis", desc: "Certified techs open it up on camera and confirm the fault before any work." },
  { icon: Wrench, step: "03", name: "Precision repair", desc: "Genuine parts fitted in our ESD-safe lab — most fixes done the same day." },
  { icon: ShieldCheck, step: "04", name: "90-day warranty", desc: "Every repair leaves with a full test report and a written warranty." },
];

export function ProcessGlass() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <SectionShell>
      <div ref={ref}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 data-reveal className="max-w-xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            From broken to better in
            <span className="text-[#e85d04]"> four steps.</span>
          </h2>
        </div>

        <div className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div aria-hidden className="absolute left-[12%] right-[12%] top-12 hidden border-t border-dashed border-[#ff6b1a]/40 lg:block" />
          {STEPS.map(({ icon: Icon, step, name, desc }) => (
            <div key={step} data-reveal className={`relative p-6 text-center ${glassCard}`}>
              <span className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff6b1a]/12 text-[#e85d04]">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <p className="mt-4 font-mono-tag text-[10px] font-bold uppercase tracking-[0.2em] text-[#e85d04]">
                Step {step}
              </p>
              <h3 className="mt-1 font-display text-base font-extrabold text-ink">{name}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ================= 3. Stats band ================= */

const STATS = [
  { to: 10000, suffix: "+", label: "Devices repaired" },
  { to: 8000, suffix: "+", label: "Happy customers" },
  { to: 90, suffix: "-day", label: "Repair warranty" },
  { to: 98, suffix: "%", label: "Success rate" },
];

export function StatsGlass() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <SectionShell className="!overflow-visible">
      <div ref={ref} data-reveal className={`grid grid-cols-2 gap-y-10 px-6 py-10 sm:grid-cols-4 sm:px-10 ${glassCard}`}>
        {STATS.map(({ to, suffix, label }) => (
          <div key={label} className="text-center">
            <span className="block font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              <Counter to={to} suffix={suffix} />
            </span>
            <span className="mt-1.5 block font-mono-tag text-[10px] font-bold uppercase tracking-[0.18em] text-ink/50">
              {label}
            </span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ================= 4. Final CTA ================= */

export function CtaGlass() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <SectionShell>
      <div
        ref={ref}
        data-reveal
        className={`relative overflow-hidden px-7 py-14 text-center sm:px-12 sm:py-20 ${glassCard}`}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[#ff6b1a]/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#2fa89a]/16 blur-3xl" />
        </div>
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Your phone deserves the
            <span className="bg-gradient-to-r from-[#ff6b1a] to-[#e85d04] bg-clip-text text-transparent"> lab treatment.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60 sm:text-base">
            Instant quote in under a minute. Doorstep pickup across the valley. Genuine
            parts, always.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/repair"
              className="group inline-flex items-center gap-2 rounded-full bg-[#ff6b1a] py-3 pl-7 pr-2.5 font-display text-base font-bold text-white shadow-[0_16px_40px_-12px_rgba(232,93,4,0.7)] transition-colors hover:bg-[#e85d04]"
            >
              Book a Repair
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#ff6b1a] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/70 bg-white/55 px-7 py-3 text-sm font-bold text-ink/75 shadow-sm backdrop-blur-md transition hover:bg-white/85 hover:text-ink"
            >
              Talk to a technician
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
