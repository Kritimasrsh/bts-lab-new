import { Star } from "lucide-react";
import { getTestimonials, getGoogleReviews } from "@/lib/queries/reviews";
import TestimonialsFeatured from "@/components/TestimonialsFeatured";
import ReviewsMarquee from "@/components/ReviewsMarquee";
import Reveal from "@/components/animated/Reveal";

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
    <div className="flex gap-0.5 text-sun">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

/**
 * Combined social-proof group: written testimonials (auto-scrolling marquee) and
 * Google reviews (carousel), bound under one trust header on a light glass
 * surface so it never sits dark-on-dark next to the lab section.
 */
export default async function SocialProof() {
  const [testimonials, reviews] = await Promise.all([getTestimonials(), getGoogleReviews()]);
  if (testimonials.length === 0 && reviews.length === 0) return null;

  const pool = [
    ...testimonials.map((t) => t.rating),
    ...reviews.map((r) => r.rating),
  ];
  const avg = pool.length
    ? Math.round((pool.reduce((s, n) => s + n, 0) / pool.length) * 10) / 10
    : 5;
  const total = testimonials.length + reviews.length;

  return (
    <section id="reviews" className="relative scroll-mt-24 overflow-hidden bg-paper-dim py-20 sm:py-24">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand/10 blur-[110px]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-mint/10 blur-[110px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* unified trust header */}
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Loved by thousands of repairs
          </h2>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-ink/10 bg-paper/70 px-5 py-2.5 shadow-sm backdrop-blur">
            <GoogleG className="h-5 w-5" />
            <span className="font-display text-lg font-extrabold text-ink">{avg.toFixed(1)}</span>
            <Stars n={Math.round(avg)} />
            <span className="text-sm text-ink-soft">from {total}+ verified customers</span>
          </div>
        </Reveal>
      </div>

      {/* written testimonials — editorial featured layout (static) */}
      {testimonials.length > 0 && <TestimonialsFeatured testimonials={testimonials} />}

      {/* google reviews — endless auto-scrolling wall (distinct design) */}
      {reviews.length > 0 && (
        <div className="mt-16">
          <Reveal className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex items-center gap-2.5">
              <GoogleG className="h-6 w-6" />
              <span className="font-display text-lg font-extrabold text-ink">Straight from Google</span>
              <span className="ml-1 text-sm text-ink-soft">— live, unedited</span>
            </div>
          </Reveal>
          <ReviewsMarquee reviews={reviews} />
        </div>
      )}
    </section>
  );
}
