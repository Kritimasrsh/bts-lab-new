"use client";

import { motion, type Variants } from "motion/react";
import MaskIcon from "@/components/icons/MaskIcon";

const STEPS = [
  {
    num: "01",
    title: "Tell us your device & problem",
    desc: "Select your brand, model and the issue you're facing. Takes under a minute and gives you an instant estimate.",
    icon: "/svgs/phone.svg",
  },
  {
    num: "02",
    title: "We diagnose & fix it",
    desc: "Free doorstep pickup or walk-in. Certified technicians diagnose the fault and repair with genuine, quality-tested parts.",
    icon: "/svgs/repiaring.svg",
  },
  {
    num: "03",
    title: "Get it back — warrantied",
    desc: "Delivered back tested and warrantied. Track everything from your BTS Lab account, from quote to delivery.",
    icon: "/svgs/fixed-check.svg",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const step: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/** A horizontal rail with an electric pulse racing along it. */
function LightningBar() {
  return (
    <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
      {/* filled base with flicker glow */}
      <div className="lightning-glow absolute inset-0 rounded-full bg-linear-to-r from-brand/40 via-brand to-brand-mint" />
      {/* racing pulse */}
      <div
        className="lightning-pulse absolute inset-y-0 left-0 w-1/3 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(47,168,154,0.9), #ffffff, rgba(47,168,154,0.9), transparent)",
          boxShadow: "0 0 12px 2px rgba(47,168,154,0.7)",
        }}
      />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="border-b border-ink/10 bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
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
          className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3"
        >
          {STEPS.map(({ num, title, desc, icon }, i) => (
            <motion.div key={num} variants={step} className="relative">
              {/* icon + big ghost number (no card) */}
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center text-brand">
                  <MaskIcon src={icon} className="h-11 w-11" />
                </span>
                <span className="font-display text-6xl font-extrabold leading-none text-ink/[0.06]">
                  {num}
                </span>
              </div>

              {/* lightning progress bar (connects steps visually) */}
              <div className="mt-6 flex items-center gap-3">
                <LightningBar />
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
