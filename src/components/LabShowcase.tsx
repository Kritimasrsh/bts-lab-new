"use client";

import { useEffect, useRef, useState } from "react";
import { Microscope, ShieldCheck, Sparkles, ArrowRight, Radio } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/animated/Reveal";

const POINTS = [
  { icon: Microscope, label: "Microscope benches", desc: "Board-level work under magnification" },
  { icon: ShieldCheck, label: "Genuine parts", desc: "Warranty on every repair" },
  { icon: Sparkles, label: "Dust-free stations", desc: "Anti-static, controlled environment" },
];

/**
 * Cinematic, centered showcase of the lab. A single wide clip plays as the hero
 * banner (lazy-loaded once near the viewport). A static glass caption sits over
 * the banner; content is centered and reveals on scroll. Always dark in both
 * light and dark themes.
 */
export default function LabShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="lab"
      ref={ref}
      className="surface-dark relative isolate overflow-hidden py-24 sm:py-28"
    >
      {/* ambient brand glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-8 h-80 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        aria-hidden
      />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* centered heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-3.5 py-1.5 text-xs font-semibold text-brand-mint">
              <Radio className="h-3.5 w-3.5" /> Inside the lab
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Real technicians. Real repairs.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Every device gets opened on a proper bench, then diagnosed, cleaned and repaired
              by real engineers. No blind part-swapping. Here&apos;s a look at how we actually work.
            </p>
          </Reveal>
        </div>

        {/* cinematic video banner */}
        <Reveal delay={0.1} blur className="relative mt-12">
          <div className="glass-dark relative aspect-video overflow-hidden rounded-[1.75rem] p-1.5 sm:aspect-[21/9]">
            {inView && (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/images/videoframe.png"
                className="h-full w-full rounded-[1.4rem] object-cover"
                aria-hidden
              >
                <source src="/repair-videos/6754816-uhd_3840_2160_25fps.mp4" type="video/mp4" />
              </video>
            )}
            {/* legibility gradient */}
            <div className="pointer-events-none absolute inset-1.5 rounded-[1.4rem] bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

            {/* live badge */}
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 font-mono-tag text-[10px] uppercase tracking-widest text-white/90 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-mint" />
              </span>
              Live from the bench
            </span>

            {/* static caption card (replaces the PiP clip) */}
            <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md font-display text-lg font-bold leading-snug text-white drop-shadow sm:text-xl">
                We diagnose under a microscope before touching a single screw.
              </p>
              <div className="glass-dark inline-flex shrink-0 items-center gap-4 rounded-2xl px-4 py-3">
                <div>
                  <span className="block font-display text-xl font-extrabold leading-none text-white">7,500+</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-widest text-white/60">Repairs done</span>
                </div>
                <span className="h-8 w-px bg-white/20" />
                <div>
                  <span className="block font-display text-xl font-extrabold leading-none text-brand-mint">98%</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-widest text-white/60">Success rate</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* point cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {POINTS.map(({ icon: Icon, label, desc }, i) => (
            <Reveal key={label} delay={0.08 * i}>
              <div className="glass-dark glass-hover h-full rounded-2xl p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mint">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-white">{label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Link
            href="/repair"
            className="btn-glass-dark is-primary group"
          >
            Book your repair
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
