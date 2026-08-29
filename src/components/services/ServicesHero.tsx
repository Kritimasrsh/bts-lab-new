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
    <section className="relative isolate overflow-hidden bg-[#f6f3ef]">
      {/* ambient light blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-5 pb-16 pt-10 text-center sm:px-8 sm:pt-14">
        <motion.div
          variants={reduce ? undefined : wordContainer}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
        >
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <span className="flex flex-wrap justify-center gap-x-4">
              {LINE_1.map((w) => (
                <motion.span key={w} variants={wordBlur} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="flex flex-wrap justify-center gap-x-4 text-[#e85d04]">
              {LINE_2.map((w) => (
                <motion.span key={w} variants={wordBlur} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
          >
            Walk in with any brand, any issue. We check it for free and tell you the price
            before we touch a single screw. Genuine parts, trained techs, warranty on every fix.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/repair"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ff6b1a] px-7 py-3.5 font-display text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)] transition hover:bg-[#e85d04]"
            >
              Start a repair
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#what-we-fix"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-white/55 px-7 py-3.5 font-display text-sm font-bold text-ink/70 backdrop-blur-xl transition hover:bg-white/80 hover:text-ink"
            >
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
              <span className="text-sm font-bold text-ink">5.0</span>
              <span className="text-sm text-ink/55">· 500+ Google reviews</span>
            </div>
            <span className="hidden h-5 w-px bg-ink/15 sm:block" />
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono-tag text-[11px] font-bold uppercase tracking-widest text-ink/55">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-[#e85d04]" /> 90-day warranty
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 backdrop-blur-md">
                <Clock className="h-4 w-4 text-[#e85d04]" /> Same-day fixes
              </span>
            </div>
          </motion.div>

          {/* the bench photo, framed in glass instead of full-bleed */}
          <motion.div variants={rise} className="mt-12">
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/70 bg-white/55 p-2 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl sm:p-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
                  src="/hero/repairing-bg.jpg"
                  alt="A technician repairing a phone on the bench"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
