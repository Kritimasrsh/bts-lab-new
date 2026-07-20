import Image from "next/image";
import { Smartphone, Star, Wrench } from "lucide-react";
import Counter from "@/components/Counter";
import AnimatedButton from "@/components/AnimatedButton";
import ScrollReveal from "@/components/animated/ScrollReveal";

const STATS = [
  { icon: Smartphone, to: 7580, suffix: "+", label: "Phones & PCs repaired in the last two years" },
  { icon: Star, to: 460, suffix: "+", label: "5-star reviews on Google and Trustpilot" },
  { icon: Wrench, to: 120, suffix: "+", label: "Professional and well-trained technicians" },
];

export default function AboutSplit() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* LEFT — heading over yellow block + photos */}
          <div className="relative">
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.9rem]">
                Award-winning
                <br />
                <span className="text-brand">repair lab</span> in the city.
              </h2>
            </div>

            {/* overlapping photos — clean, minimal framing */}
            <div className="mt-8 flex items-end gap-4">
              <div className="relative aspect-4/5 w-3/5 overflow-hidden rounded-2xl ring-1 ring-ink/10">
                <Image
                  src="/illustration3.jpeg"
                  alt="Technician performing a delicate phone repair"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-2/5 overflow-hidden rounded-2xl bg-ink ring-1 ring-ink/10">
                <Image
                  src="/parts-decomposed.png"
                  alt="Exploded view of phone parts"
                  fill
                  className="object-contain p-2 mix-blend-screen"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — what we do + stats */}
          <div>
            <h3 className="font-display text-xl font-extrabold text-ink">What we do?</h3>

            {/* per-word blur reveal on scroll */}
            <ScrollReveal
              baseOpacity={0.12}
              baseRotation={2}
              blurStrength={5}
              containerClassName="mt-2"
              textClassName="!text-base !leading-relaxed !font-normal text-ink-soft"
            >
              We&apos;re one of the few labs that perform board-level repair for any device we
              don&apos;t just swap parts, we diagnose the real fault and fix it right the first
              time, across every major brand, with a 90%+ success rate on the boards we take on.
            </ScrollReveal>

            <div className="mt-7">
              <AnimatedButton href="/contact">Contact Us</AnimatedButton>
            </div>

            {/* stat tiles — flat, bordered (no drop shadow) */}
            <div className="mt-10 grid overflow-hidden rounded-2xl border border-ink/10 sm:grid-cols-3">
              {STATS.map(({ icon: Icon, to, suffix, label }) => (
                <div
                  key={label}
                  className="border-ink/10 p-5 not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r"
                >
                  <span className="font-display text-3xl font-extrabold tracking-tight text-brand">
                    <Counter to={to} suffix={suffix} />
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">{label}</p>
                  <Icon className="mt-4 h-6 w-6 text-brand-mint" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
