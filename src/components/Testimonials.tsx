import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/queries/reviews";
import TestimonialsDisplay from "@/components/TestimonialsDisplay";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < n ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  const avg =
    Math.round((testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length) * 10) / 10;

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
            <span className="font-display text-5xl font-extrabold leading-none text-brand-mint">
              {avg.toFixed(1)}
            </span>
            <div>
              <Stars n={Math.round(avg)} />
              <p className="mt-1 text-xs text-paper/60">from {testimonials.length}+ happy customers</p>
            </div>
          </div>
        </div>

        <TestimonialsDisplay testimonials={testimonials} />
      </div>
    </section>
  );
}
