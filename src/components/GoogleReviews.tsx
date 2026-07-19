import { Star } from "lucide-react";
import { getGoogleReviews } from "@/lib/queries/reviews";
import ReviewsCarousel from "@/components/ReviewsCarousel";

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
        <Star key={i} className="h-4 w-4" fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export default async function GoogleReviews() {
  const reviews = await getGoogleReviews();
  if (reviews.length === 0) return null;

  const avg =
    Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;

  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* header — mirrors the Google Reviews widget */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2.5">
            <GoogleG className="h-7 w-7" />
            <span className="font-display text-2xl font-extrabold text-ink">Google Reviews</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="font-display text-lg font-extrabold text-ink">{avg.toFixed(1)}</span>
            <Stars n={Math.round(avg)} />
            <span className="text-sm text-ink-soft">{reviews.length}+ verified reviews</span>
          </div>
        </div>
      </div>

      {/* endless auto-scrolling carousel of BorderGlow cards */}
      <ReviewsCarousel reviews={reviews} />
    </section>
  );
}
