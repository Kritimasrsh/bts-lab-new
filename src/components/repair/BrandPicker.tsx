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

/** Animated grid of phone brands. Each card starts a repair for that brand. */
export default function BrandPicker() {
  return (
    <motion.div
      variants={gridStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/70 bg-ink/10 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7"
    >
      {BRANDS.map((brand) => (
        <motion.div key={brand.slug} variants={card}>
          <Link
            href={`/repair/${brand.slug}`}
            className="group relative flex aspect-4/3 flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-md transition-colors duration-200 hover:bg-[#ff6b1a]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ff6b1a] active:bg-[#ff6b1a]/10"
          >
            <ArrowUpRight className="absolute right-2.5 top-2.5 h-4 w-4 text-[#e85d04] opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />

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

            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-center scale-x-0 bg-[#ff6b1a] transition-transform duration-200 group-hover:scale-x-100" />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
