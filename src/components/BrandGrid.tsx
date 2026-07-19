"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/lib/data/brands";

const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function BrandGrid() {
  return (
    <section id="select-brand" className="relative bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Choose your brand
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Pick your phone&apos;s brand to start a repair. Next you&apos;ll select the exact
              model and tell us what&apos;s wrong — and get an instant estimate.
            </p>
          </div>
        </div>

        {/* professional clickable brand cards — flat, bordered, crisp hover + press */}
        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
        >
          {BRANDS.map((brand) => (
            <motion.div key={brand.slug} variants={card}>
              <Link
                href={`/repair/${brand.slug}`}
                className="group relative flex aspect-4/3 flex-col items-center justify-center gap-3 bg-paper transition-colors duration-200 hover:bg-brand/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand active:bg-brand/7"
              >
                {/* corner arrow appears on hover */}
                <ArrowUpRight className="absolute right-2.5 top-2.5 h-4 w-4 text-brand opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                <span className="flex h-9 items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} repair`}
                    width={96}
                    height={40}
                    className="h-8 w-auto max-w-20 object-contain opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </span>
                <span className="font-display text-xs font-bold tracking-wide text-ink-soft transition-colors group-hover:text-ink">
                  {brand.name}
                </span>

                {/* bottom accent line grows on hover */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-brand transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-sm text-ink-soft">
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
