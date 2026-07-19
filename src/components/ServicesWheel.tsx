"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import OptionWheel from "@/components/animated/OptionWheel";
import ShineButton from "@/components/ShineButton";
import { SERVICES } from "@/lib/data/services";

const ITEMS = SERVICES.map((s) => s.title);

export default function ServicesWheel() {
  const [index, setIndex] = useState(0);
  const active = SERVICES[index] ?? SERVICES[0];

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
      {/* ambient glow */}
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
            Scroll or drag the dial to explore what our lab handles — every job with genuine
            parts and a warranty.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* interactive wheel */}
          <div className="relative h-[360px] select-none sm:h-[420px]">
            <OptionWheel
              items={ITEMS}
              defaultSelected={0}
              side="left"
              textColor="rgba(255,255,255,0.35)"
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

          {/* synced detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.code}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-3xl border border-paper/10 bg-paper/[0.03] p-8 backdrop-blur-sm"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/20 text-3xl">
                {active.icon}
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold">{active.title}</h3>
              <p className="mt-3 leading-relaxed text-paper/70">{active.desc}</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="font-display text-lg font-extrabold text-brand-mint">
                  {active.price}
                </span>
                <span className="font-mono-tag text-[11px] uppercase tracking-widest text-paper/40">
                  {active.code}
                </span>
              </div>
              <div className="mt-8">
                <ShineButton href="/services" onDark>
                  Book this repair
                </ShineButton>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-2 text-sm font-semibold text-paper/60">
          <span>See the full menu</span>
          <ArrowRight className="h-4 w-4 text-brand-mint" />
          <a href="/services" className="text-brand-mint hover:underline">
            All repair services
          </a>
        </div>
      </div>
    </section>
  );
}
