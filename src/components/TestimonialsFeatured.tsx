"use client";

import { Star, Quote } from "lucide-react";
import Reveal from "@/components/animated/Reveal";
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

/**
 * Editorial testimonials layout: one large featured quote beside a stacked list
 * of shorter ones. Static (reveal-on-scroll) — deliberately distinct from the
 * moving Google-reviews marquee.
 */
export default function TestimonialsFeatured({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t.id !== featured?.id).slice(0, 4);

  return (
    <div className="mx-auto mt-12 grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
      {/* featured */}
      <Reveal direction="right" className="h-full">
        <figure className="glass flex h-full flex-col justify-between rounded-3xl p-8 sm:p-10">
          <div>
            <Quote className="h-10 w-10 text-brand/25" fill="currentColor" strokeWidth={0} />
            <blockquote className="mt-5 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
              {featured.quote}
            </blockquote>
          </div>
          <figcaption className="mt-8 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand font-display text-base font-bold text-white">
              {featured.author.charAt(0)}
            </span>
            <span>
              <span className="block font-display font-bold text-ink">{featured.author}</span>
              {featured.role && <span className="block text-xs text-ink-soft">{featured.role}</span>}
            </span>
            <span className="ml-auto">
              <Stars n={featured.rating} />
            </span>
          </figcaption>
        </figure>
      </Reveal>

      {/* stacked list */}
      <div className="flex flex-col gap-4">
        {rest.map((t, i) => (
          <Reveal key={t.id} delay={0.08 * i} className="h-full">
            <div className="glass glass-hover rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-mint/15 font-display text-sm font-bold text-brand">
                    {t.author.charAt(0)}
                  </span>
                  <span className="font-display text-sm font-bold text-ink">{t.author}</span>
                </div>
                <Stars n={t.rating} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{t.quote}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
