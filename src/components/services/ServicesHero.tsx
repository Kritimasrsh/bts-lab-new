"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ShieldCheck, Clock, Star } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";
import ShineButton from "@/components/ShineButton";

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const wordBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 14 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const LINE_1 = ["Every", "repair,"];
const LINE_2 = ["one", "counter."];

export default function ServicesHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-paper-dim">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* content */}
        <motion.div
          variants={reduce ? undefined : wordContainer}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1.5 font-mono-tag text-xs uppercase tracking-widest text-brand"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Repair menu
          </motion.span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            <span className="flex flex-wrap gap-x-3">
              {LINE_1.map((w) => (
                <motion.span key={w} variants={wordBlur} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap gap-x-3 text-brand">
              {LINE_2.map((w) => (
                <motion.span key={w} variants={wordBlur} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            Walk in with any brand, any issue. We diagnose for free and quote before
            we touch a single screw — genuine parts, certified techs, warranty on every fix.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-4">
            <AnimatedButton href="/#select-brand">Start a repair</AnimatedButton>
            <ShineButton href="#what-we-fix">Explore repairs</ShineButton>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-sun">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-sm font-bold text-ink">5.0</span>
              <span className="text-sm text-ink-soft">· 500+ Google reviews</span>
            </div>
            <span className="hidden h-5 w-px bg-ink/15 sm:block" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-tag text-[11px] font-bold uppercase tracking-widest text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand" /> 90-day warranty
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand" /> Same-day fixes
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* visual */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" aria-hidden />
          <Image
            src="/phone-decomposed.png"
            alt="Exploded view of a smartphone being repaired"
            width={720}
            height={720}
            priority
            className="animate-float relative z-10 mx-auto h-auto w-full max-w-[420px] object-contain drop-shadow-[0_30px_50px_rgba(13,43,46,0.25)]"
          />

          {/* floating chips */}
          <div className="absolute left-2 top-6 z-20 hidden rounded-2xl border border-ink/10 bg-paper/90 px-4 py-3 shadow-lg backdrop-blur sm:block">
            <p className="font-display text-lg font-extrabold text-brand">30 min</p>
            <p className="font-mono-tag text-[9px] uppercase tracking-widest text-ink-soft">
              Battery swap
            </p>
          </div>
          <div className="absolute bottom-8 right-2 z-20 hidden rounded-2xl border border-ink/10 bg-paper/90 px-4 py-3 shadow-lg backdrop-blur sm:block">
            <p className="font-display text-lg font-extrabold text-brand">Board-level</p>
            <p className="font-mono-tag text-[9px] uppercase tracking-widest text-ink-soft">
              Micro-soldering
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
