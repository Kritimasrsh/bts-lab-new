"use client";

import { motion, type Variants } from "motion/react";
import { ClipboardCheck, Wrench, PackageCheck } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Tell us your device & problem",
    desc: "Select your brand, model and the issue you're facing. Takes under a minute and gives you an instant estimate.",
    Icon: ClipboardCheck,
  },
  {
    num: "02",
    title: "We diagnose & fix it",
    desc: "Free doorstep pickup or walk-in. Certified technicians diagnose the fault and repair with genuine, quality-tested parts.",
    Icon: Wrench,
  },
  {
    num: "03",
    title: "Get it back — warrantied",
    desc: "Delivered back tested and warrantied. Track everything from your BTS Lab account, from quote to delivery.",
    Icon: PackageCheck,
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const step: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowItWorks() {
  return (
    <section className="border-b border-ink/10 bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono-tag text-xs uppercase tracking-[0.24em] text-brand">
            How it works
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
            From broken to brand-new
            <br />
            in three steps.
          </h2>
          <p className="mt-4 text-base text-ink-soft">
            No guesswork, no runaround. BTS Lab turns a stressful repair into a simple,
            trackable process.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8"
        >
          {/* connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-linear-to-r from-brand/0 via-brand/30 to-brand/0 md:block"
            aria-hidden
          />

          {STEPS.map(({ num, title, desc, Icon }) => (
            <motion.div key={num} variants={step} className="relative">
              {/* node: icon circle + big ghost number */}
              <div className="flex items-center gap-4">
                <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-brand/20 bg-paper text-brand shadow-[0_8px_24px_-12px_rgba(15,106,115,0.5)]">
                  <Icon className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <span className="font-display text-6xl font-extrabold leading-none text-ink/[0.06]">
                  {num}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
