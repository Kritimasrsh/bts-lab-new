"use client";

import { motion, type Variants } from "motion/react";
import { Star, Quote } from "lucide-react";

export type Testimonial = {
  id: string;
  author: string;
  role: string | null;
  rating: number;
  quote: string;
  featured: boolean;
};

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

export default function TestimonialsDisplay({ testimonials }: { testimonials: Testimonial[] }) {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t.id !== featured?.id);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]"
    >
      {/* featured quote */}
      {featured && (
        <motion.figure variants={item} className="relative flex flex-col justify-center">
          <Quote className="h-12 w-12 text-brand-mint/30" fill="currentColor" />
          <blockquote className="mt-4 font-display text-2xl font-bold leading-snug text-paper sm:text-3xl">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mint/20 font-display font-bold text-brand-mint">
              {featured.author.charAt(0)}
            </span>
            <span>
              <span className="block font-display font-bold text-paper">{featured.author}</span>
              {featured.role && <span className="block text-xs text-paper/60">{featured.role}</span>}
            </span>
          </figcaption>
        </motion.figure>
      )}

      {/* stacked shorter reviews */}
      <div className="flex flex-col divide-y divide-paper/10">
        {rest.map((t) => (
          <motion.div key={t.id} variants={item} className="py-5 first:pt-0">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-bold text-paper">{t.author}</span>
              <Stars n={t.rating} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-paper/70">&ldquo;{t.quote}&rdquo;</p>
            {t.role && (
              <span className="mt-1.5 inline-block font-mono-tag text-[10px] uppercase tracking-widest text-paper/40">
                {t.role}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
