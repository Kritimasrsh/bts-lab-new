"use client";

import { motion, type Variants } from "motion/react";
import { Star, Quote } from "lucide-react";

const FEATURED = {
  name: "Priya Maharjan",
  role: "iPhone 12 Pro · Water damage",
  quote:
    "They fixed my water-damaged phone when three other shops told me it was dead. Honest pricing, kept me updated the whole time, and it works like new.",
};

const REVIEWS = [
  { name: "Rajesh K.", role: "Screen replacement", stars: 5, quote: "Excellent work and the price was very fair. Done the same day." },
  { name: "Suman S.", role: "Buyback", stars: 5, quote: "Sold my old Samsung through them — fast payment, smooth process." },
  { name: "Anita T.", role: "Battery swap", stars: 5, quote: "Genuine battery, proper diagnostics. My phone lasts all day again." },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* header — inline, no pill badge */}
        <div className="flex flex-col gap-6 border-b border-paper/10 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-md font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Trusted by thousands
            <br />
            of repairs.
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl font-extrabold leading-none text-brand-mint">4.9</span>
            <div>
              <Stars n={5} />
              <p className="mt-1 text-xs text-paper/60">from 460+ reviews on Google &amp; Trustpilot</p>
            </div>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]"
        >
          {/* featured quote */}
          <motion.figure variants={item} className="relative flex flex-col justify-center">
            <Quote className="h-12 w-12 text-brand-mint/30" fill="currentColor" />
            <blockquote className="mt-4 font-display text-2xl font-bold leading-snug text-paper sm:text-3xl">
              &ldquo;{FEATURED.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mint/20 font-display font-bold text-brand-mint">
                {FEATURED.name.charAt(0)}
              </span>
              <span>
                <span className="block font-display font-bold text-paper">{FEATURED.name}</span>
                <span className="block text-xs text-paper/60">{FEATURED.role}</span>
              </span>
            </figcaption>
          </motion.figure>

          {/* stacked shorter reviews */}
          <div className="flex flex-col divide-y divide-paper/10">
            {REVIEWS.map((r) => (
              <motion.div key={r.name} variants={item} className="py-5 first:pt-0">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-paper">{r.name}</span>
                  <Stars n={r.stars} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">&ldquo;{r.quote}&rdquo;</p>
                <span className="mt-1.5 inline-block font-mono-tag text-[10px] uppercase tracking-widest text-paper/40">
                  {r.role}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
