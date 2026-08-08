"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ShieldCheck, Clock, Star, ArrowRight } from "lucide-react";

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
    <section className="relative isolate -mt-20 flex min-h-[88vh] items-center overflow-hidden">
      {/* full-bleed background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero/repairing-bg.jpg"
          alt="A technician repairing a phone on the bench"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a4d54]/55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-[#061a1c] via-[#061a1c]/70 to-[#061a1c]/55" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 50% 30%, transparent 40%, rgba(6,26,28,0.6) 100%)" }}
          aria-hidden
        />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      </div>

      <div className="mx-auto w-full max-w-4xl px-5 pt-28 pb-16 text-center sm:px-8 sm:pt-32">
        <motion.div
          variants={reduce ? undefined : wordContainer}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="flex flex-wrap justify-center gap-x-4">
              {LINE_1.map((w) => (
                <motion.span key={w} variants={wordBlur} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-4 text-brand-mint">
              {LINE_2.map((w) => (
                <motion.span key={w} variants={wordBlur} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Walk in with any brand, any issue. We diagnose for free and quote before we touch a
            single screw — genuine parts, certified techs, warranty on every fix.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/#select-brand" className="btn-glass-dark is-primary group">
              Start a repair
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link href="#what-we-fix" className="btn-glass-dark">
              Explore repairs
            </Link>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="flex text-sun">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-sm font-bold text-white">5.0</span>
              <span className="text-sm text-white/70">· 500+ Google reviews</span>
            </div>
            <span className="hidden h-5 w-px bg-white/20 sm:block" />
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono-tag text-[11px] font-bold uppercase tracking-widest text-white/75">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-mint" /> 90-day warranty
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-mint" /> Same-day fixes
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
