"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Check, Clock, ShieldCheck, BadgeCheck } from "lucide-react";
import ScrollReveal from "@/components/animated/ScrollReveal";
import ShineButton from "@/components/ShineButton";
import { SHOWCASE_SERVICES } from "@/lib/data/services";

const reveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// Real repair imagery, framed and brand-tinted for a cohesive, professional feel.
const IMAGES = [
  "/images/screen-repair.jpg", // Screen & Display
  "/images/battery-and-power.jpg", // Battery & Power
  "/images/motherboard-reapair.jpg", // Motherboard / Board-level
  "/images/water-damage-rescue.png", // Water Damage
  "/images/camera-faceid.jpg", // Camera & Face ID
  "/images/audio-buttons-body.jpg", // Audio, Buttons & Body
  "/images/laptop-tablet-repair.avif", // Tablet & Laptop
];

function FramedVisual({
  index,
  image,
  title,
}: {
  index: number;
  image: string;
  title: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/70 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)]">
      <Image
        src={image}
        alt={`${title} — repair at BTS Lab`}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      {/* brand wash unifies the varied source photos */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#ff6b1a]/35 via-[#ff6b1a]/5 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />

      <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/90 font-display text-sm font-extrabold text-[#e85d04] shadow-md backdrop-blur">
        {num}
      </span>
    </div>
  );
}

export default function ServicesShowcase() {
  return (
    <section id="what-we-fix" className="relative scroll-mt-24 overflow-hidden bg-[#f6f3ef] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-[#2fa89a]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* animated statement */}
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal
            baseOpacity={0.12}
            blurStrength={5}
            containerClassName=""
            textClassName="text-ink"
          >
            From cracked screens to board-level rescues — every repair runs through one lab, with genuine parts and a warranty on the work.
          </ScrollReveal>
        </div>

        {/* alternating feature rows */}
        <div className="mt-16 flex flex-col gap-16 sm:gap-24">
          {SHOWCASE_SERVICES.map((s, i) => {
            const flip = i % 2 === 1;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={s.title}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-90px" }}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                {/* visual */}
                <div className={flip ? "lg:order-2" : ""}>
                  <FramedVisual index={i} image={IMAGES[i]} title={s.title} />
                </div>

                {/* content */}
                <div className={flip ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tag text-sm font-bold text-[#e85d04]/50">{num}</span>
                    <span className="font-mono-tag text-[11px] uppercase tracking-[0.2em] text-[#e85d04]">
                      {s.tagline}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-ink/60">
                    {s.desc}
                  </p>

                  <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {s.covers.map((c) => (
                      <li key={c} className="flex items-center gap-2.5 text-sm text-ink/70">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff6b1a]/10 text-[#e85d04]">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>

                  {/* professional spec strip */}
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl border border-white/70 bg-white/55 px-5 py-4 backdrop-blur-xl">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      <Clock className="h-4 w-4 text-[#e85d04]" /> {s.turnaround}
                    </span>
                    <span className="hidden h-4 w-px bg-ink/15 sm:block" />
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      <ShieldCheck className="h-4 w-4 text-[#e85d04]" /> 90-day warranty
                    </span>
                    <span className="hidden h-4 w-px bg-ink/15 sm:block" />
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      <BadgeCheck className="h-4 w-4 text-[#e85d04]" /> Genuine parts
                    </span>
                  </div>

                  <div className="mt-7">
                    <ShineButton href="/#select-brand">Book this repair</ShineButton>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
