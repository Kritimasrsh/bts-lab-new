"use client";

import { motion, type Variants } from "motion/react";
import StatIcon from "@/components/icons/StatIcon";

const STEPS = [
  { n: "01", t: "Drop in or book", d: "Visit the counter or start a repair online in under a minute." },
  { n: "02", t: "Free diagnosis", d: "We find the real fault before quoting. No guesswork, no pressure." },
  { n: "03", t: "We repair it", d: "Genuine parts, certified techs. Most fixes are done the same day." },
  { n: "04", t: "Warranty included", d: "Every repair leaves with up to 90 days of cover on the work." },
];

const STATS = [
  { name: "repaired" as const, value: "10,000+", label: "Devices repaired" },
  { name: "customers" as const, value: "8,000+", label: "Happy customers" },
  { name: "warranty" as const, value: "90-day", label: "Repair warranty" },
  { name: "success" as const, value: "98%", label: "Success rate" },
];

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function ServiceSteps() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 overflow-hidden bg-[#f6f3ef] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[#2fa89a]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Four steps, zero surprises.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((step) => (
            <motion.div key={step.n} variants={item} className="relative">
              <span className="font-display text-5xl font-extrabold text-[#ff6b1a]/20">
                {step.n}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-ink">{step.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{step.d}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* trust stats band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 rounded-3xl border border-white/70 bg-white/55 px-8 py-12 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.name} className="flex items-center justify-center gap-3 lg:justify-start">
              <StatIcon name={s.name} className="h-9 w-9 shrink-0 text-[#e85d04]" />
              <div className="text-left">
                <span className="block font-display text-2xl font-extrabold leading-none text-ink">
                  {s.value}
                </span>
                <span className="mt-1 block whitespace-nowrap font-mono-tag text-[10px] font-bold uppercase tracking-widest text-ink/55">
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
