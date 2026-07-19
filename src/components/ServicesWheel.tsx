"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Clock } from "lucide-react";
import OptionWheel from "@/components/animated/OptionWheel";
import ShineButton from "@/components/ShineButton";
import { SHOWCASE_SERVICES } from "@/lib/data/services";

const ITEMS = SHOWCASE_SERVICES.map((s) => s.title);

export default function ServicesWheel() {
  const [index, setIndex] = useState(0);
  const active = SHOWCASE_SERVICES[index] ?? SHOWCASE_SERVICES[0];

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl" aria-hidden />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="font-mono-tag text-xs uppercase tracking-[0.24em] text-brand-mint">
            What we fix
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Spin through our
            <br />
            repair services.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/70">
            Scroll or drag the dial to explore what our lab handles — from cracked screens to
            board-level rescues, every job with genuine parts and a warranty.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* interactive wheel */}
          <div className="relative h-[380px] select-none sm:h-[460px]">
            <OptionWheel
              items={ITEMS}
              defaultSelected={0}
              side="left"
              textColor="rgba(255,255,255,0.32)"
              activeColor="#ffffff"
              fontSize={1.9}
              spacing={1.5}
              tilt={7}
              blur={1.5}
              fade={0.22}
              curve={1}
              draggable
              onChange={(i) => setIndex(i)}
            />
          </div>

          {/* detail — no card, open editorial layout that fills the height */}
          <div className="flex min-h-[460px] flex-col justify-center border-l border-paper/10 lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{active.icon}</span>
                  <span className="font-mono-tag text-[11px] uppercase tracking-[0.2em] text-brand-mint">
                    {active.tagline}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl">
                  {active.title}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/70">
                  {active.desc}
                </p>

                <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {active.covers.map((c) => (
                    <li key={c} className="flex items-center gap-2.5 text-sm text-paper/85">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-mint/20 text-brand-mint">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-6">
                  <span className="inline-flex items-center gap-2 text-sm text-paper/70">
                    <Clock className="h-4 w-4 text-brand-mint" />
                    {active.turnaround}
                  </span>
                  <ShineButton href="/services" onDark>
                    Book this repair
                  </ShineButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-2 text-sm font-semibold text-paper/60">
          <span>See everything we repair</span>
          <ArrowRight className="h-4 w-4 text-brand-mint" />
          <a href="/services" className="text-brand-mint hover:underline">
            All repair services
          </a>
        </div>
      </div>
    </section>
  );
}
