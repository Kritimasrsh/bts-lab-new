"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BRANDS } from "@/lib/data/brands";

const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function BrandGrid() {
  return (
    <section id="select-brand" className="relative bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* header with reference-style yellow label */}
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="offset-block inline-block px-3 py-1.5">
              <span className="section-label text-ink">Select your device</span>
            </span>
            <h2 className="display-heading mt-5 text-3xl text-ink sm:text-4xl lg:text-5xl">
              Pick your brand to
              <br />
              start a repair.
            </h2>
            <p className="mt-4 max-w-xl text-base text-ink-soft">
              Choose your phone&apos;s brand, then select the exact model and tell us what&apos;s
              wrong. You&apos;ll get an instant estimate — no guesswork.
            </p>
          </div>

          <Link
            href="/services"
            className="hover-lift focus-ring inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3 font-display text-sm font-bold text-ink"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* clickable brand cards */}
        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
        >
          {BRANDS.map((brand) => (
            <motion.div key={brand.slug} variants={card}>
              <Link
                href={`/services?brand=${brand.slug}`}
                className="focus-ring group flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-ink/8 bg-paper p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:bg-brand/5 hover:shadow-[0_18px_40px_-22px_rgba(15,106,115,0.5)]"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} repair`}
                  width={96}
                  height={48}
                  className="h-9 w-auto max-w-[80px] object-contain opacity-75 transition group-hover:opacity-100"
                />
                <span className="font-display text-xs font-bold tracking-wide text-ink-soft group-hover:text-ink">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-ink-soft">
          Don&apos;t see your brand?{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            Contact us
          </Link>{" "}
          — we repair almost everything.
        </p>
      </div>
    </section>
  );
}
