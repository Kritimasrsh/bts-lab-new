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
    <section id="board-level" className="relative overflow-hidden bg-[#f6f3ef] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
          The repairs other shops refuse.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/60">
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
            glowColor="24 95% 53%"
            backgroundColor="#fdfaf6"
            colors={["#ff6b1a", "#e85d04", "#ffb27d"]}
            borderRadius={28}
            className="mx-auto max-w-3xl shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)]"
          >
            <div className="p-8 text-left sm:p-10">
              <div className="grid gap-6 sm:grid-cols-3">
                {POINTS.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6b1a]/10 text-[#e85d04]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold leading-snug text-ink/80">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center">
                <p className="font-mono-tag text-[11px] uppercase tracking-[0.2em] text-ink/55">
                  Free diagnosis · Quote before we start
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-display text-sm font-bold text-[#e85d04] transition hover:gap-3"
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
