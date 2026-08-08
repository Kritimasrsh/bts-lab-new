"use client";

import { Star } from "lucide-react";
import type { Review } from "@/components/ReviewsCarousel";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-[#fbbc05]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

const TINTS = ["bg-brand", "bg-brand-mint", "bg-brand-cyan", "bg-brand-deep", "bg-emerald-600", "bg-teal-600"];
function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function Card({ r, i }: { r: Review; i: number }) {
  return (
    <figure className="glass glass-hover flex w-[340px] shrink-0 flex-col rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white ${TINTS[i % TINTS.length]}`}>
            {initials(r.author)}
          </span>
          <div>
            <figcaption className="font-display text-sm font-bold text-ink">{r.author}</figcaption>
            <Stars n={r.rating} />
          </div>
        </div>
        <GoogleG className="h-5 w-5" />
      </div>
      <blockquote className="mt-4 line-clamp-4 flex-1 text-[15px] leading-relaxed text-ink/80">
        {r.text}
      </blockquote>
      <span className="mt-4 border-t border-ink/8 pt-3 font-mono-tag text-[10px] uppercase tracking-widest text-ink-soft">
        {r.service || "Verified customer"}
      </span>
    </figure>
  );
}

/**
 * Endless auto-scrolling wall of Google reviews — two rows drifting in opposite
 * directions, paused on hover. Deliberately distinct from the testimonials
 * (static editorial) layout.
 */
export default function ReviewsMarquee({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  // Ensure the row has enough cards for a seamless -50% loop.
  const base = reviews.length < 4 ? [...reviews, ...reviews] : reviews;
  const row = [...base, ...base];

  return (
    <div className="marquee-track marquee-mask relative mt-10 overflow-hidden">
      <div className="animate-marquee flex w-max gap-5">
        {row.map((r, i) => (
          <Card key={`r-${r.id}-${i}`} r={r} i={i} />
        ))}
      </div>
    </div>
  );
}
