"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Counter from "@/components/Counter";
import HeroBackground from "@/components/HeroBackground";
import HeroSearch from "@/components/HeroSearch";
import StatIcon from "@/components/icons/StatIcon";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const wordBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

type StatName = "repaired" | "customers" | "warranty" | "success";
type Stat = { name: StatName; to: number; suffix: string; label: string };

const STATS: Stat[] = [
  { name: "repaired", to: 10000, suffix: "+", label: "Devices repaired" },
  { name: "customers", to: 8000, suffix: "+", label: "Happy customers" },
  { name: "warranty", to: 90, suffix: "-day", label: "Repair warranty" },
  { name: "success", to: 98, suffix: "%", label: "Success rate" },
];

const HEADLINE = ["We", "Fix", "What", "Others"];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate -mt-20 flex min-h-[92vh] flex-col overflow-hidden pt-20">
      <HeroBackground />

      {/* content pushed toward the bottom of the hero */}
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-end px-5 pb-10 text-center sm:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 px-3.5 py-1.5 font-mono-tag text-[10px] uppercase tracking-[0.24em] text-brand-mint backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" />
            Certified Repair Lab · Nepal
          </motion.span>

          <motion.h1
            variants={wordContainer}
            className="mt-5 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl"
          >
            <span className="flex flex-wrap justify-center gap-x-3.5">
              {HEADLINE.map((word) => (
                <motion.span key={word} variants={wordBlur} className="inline-block">
                  {word}
                </motion.span>
              ))}
              <motion.span variants={wordBlur} className="inline-block text-brand-mint">
                Can&apos;t Fix.
              </motion.span>
            </span>
          </motion.h1>

          {/* tagline dots (reference style) */}
          <motion.p
            variants={rise}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono-tag text-[11px] font-bold uppercase tracking-widest text-paper/70"
          >
            <span>Genuine Parts</span>
            <span className="text-brand-mint">•</span>
            <span>Certified Techs</span>
            <span className="text-brand-mint">•</span>
            <span>Warranty on Every Fix</span>
          </motion.p>

          {/* global search */}
          <motion.div variants={rise} className="mt-7 flex w-full justify-center">
            <HeroSearch />
          </motion.div>
        </motion.div>

        {/* stats row — reference style: icon left, value/label stacked right, no bg tiles */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-x-8 gap-y-7 lg:grid-cols-4"
        >
          {STATS.map(({ name, to, suffix, label }) => (
            <div key={name} className="flex items-center justify-center gap-3 lg:justify-start">
              <StatIcon name={name} className="h-9 w-9 shrink-0 text-paper" />
              <div className="text-left">
                <span className="block font-display text-2xl font-extrabold leading-none tracking-tight text-paper sm:text-3xl">
                  <Counter to={to} suffix={suffix} />
                </span>
                <span className="mt-1 block font-mono-tag text-[10px] font-bold uppercase tracking-widest text-paper/70">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

