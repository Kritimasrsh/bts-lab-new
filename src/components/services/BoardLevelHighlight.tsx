"use client";

import { motion } from "motion/react";
import { Microscope, Cpu, Zap, ArrowRight } from "lucide-react";
import BorderGlow from "@/components/animated/BorderGlow";
import Link from "next/link";

const POINTS = [
  { icon: Cpu, label: "Charging IC & power faults" },
  { icon: Zap, label: "Boot loops & dead boards" },
  { icon: Microscope, label: "Micro-soldering under a scope" },
];

export default function BoardLevelHighlight() {
  return (
    <section id="board-level" className="surface-dark relative overflow-hidden py-20 sm:py-24">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-5 text-center text-white sm:px-8">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          The repairs other shops refuse.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
          When a phone is written off elsewhere, it usually lands on our microscope bench.
          Chip-level diagnostics and micro-soldering by certified board engineers.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <BorderGlow
            animated
            glowColor="176 65% 55%"
            backgroundColor="#0b2124"
            colors={["#2fa89a", "#14919b", "#5eead4"]}
            borderRadius={28}
            className="mx-auto max-w-3xl"
          >
            <div className="p-8 text-left sm:p-10">
              <div className="grid gap-6 sm:grid-cols-3">
                {POINTS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-mint/15 text-brand-mint">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-white/85">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
                <p className="font-mono-tag text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Free diagnosis · Quote before we start
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-display text-sm font-bold text-brand-mint transition hover:gap-3"
                >
                  Talk to a board engineer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </section>
  );
}
