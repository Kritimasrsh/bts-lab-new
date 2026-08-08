"use client";

import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/components/TestimonialsDisplay";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-sun">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

const TINTS = ["bg-brand", "bg-brand-mint", "bg-brand-cyan", "bg-brand-deep"];

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <figure className="glass glass-hover flex w-[320px] shrink-0 flex-col rounded-2xl p-6 sm:w-[380px]">
      <Quote className="h-7 w-7 text-brand/20" fill="currentColor" strokeWidth={0} />
      <blockquote className="mt-3 line-clamp-4 flex-1 text-[15px] leading-relaxed text-ink/80">
        {t.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/8 pt-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white ${TINTS[i % TINTS.length]}`}
        >
          {t.author.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-bold text-ink">{t.author}</span>
          {t.role && <span className="block truncate text-xs text-ink-soft">{t.role}</span>}
        </span>
        <span className="ml-auto shrink-0">
          <Stars n={t.rating} />
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * A single, seamlessly-looping marquee row of testimonial cards. The list is
 * duplicated so the translateX(-50%) CSS loop is continuous; hover pauses it.
 */
export default function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="marquee-track marquee-mask relative mt-12 overflow-hidden">
      <div className="animate-marquee flex w-max gap-5">
        {doubled.map((t, i) => (
          <Card key={`${t.id}-${i}`} t={t} i={i} />
        ))}
      </div>
    </div>
  );
}
