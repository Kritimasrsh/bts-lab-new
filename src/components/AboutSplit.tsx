import Image from "next/image";
import Link from "next/link";
import { Smartphone, Star, Wrench } from "lucide-react";
import Counter from "@/components/Counter";

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
            {/* yellow offset panel behind the heading (reference style) */}
            <div className="relative">
              <div className="absolute -left-4 -top-6 h-44 w-[86%] rounded-xl bg-accent-yellow sm:-left-8" aria-hidden />
              <div className="relative pt-6">
                <span className="section-label text-brand">About Us</span>
                <h2 className="display-heading mt-4 text-3xl text-ink sm:text-4xl lg:text-[2.9rem]">
                  Award Winning
                  <br />
                  Repair Lab in the City
                </h2>
              </div>
            </div>

            {/* overlapping photos */}
            <div className="mt-8 flex items-end gap-4">
              <div className="relative aspect-[4/5] w-3/5 overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(13,43,46,0.5)]">
                <Image
                  src="/illustration3.jpeg"
                  alt="Technician performing a delicate phone repair"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square w-2/5 overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(13,43,46,0.5)]">
                <Image
                  src="/parts-decomposed.png"
                  alt="Exploded view of phone parts"
                  fill
                  className="bg-paper-dim object-contain p-3"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — what we do + stats */}
          <div>
            <h3 className="font-display text-xl font-extrabold text-ink">What we do?</h3>
            <div className="mt-4 grid gap-6 text-[15px] leading-relaxed text-ink-soft sm:grid-cols-2">
              <p>
                We&apos;re one of the few labs that perform board-level repair for any device —
                saving you time and money. We don&apos;t just swap parts; we diagnose the real
                fault and fix it right the first time.
              </p>
              <p>
                From cracked screens to shorted motherboards, we cover phones, tablets and
                laptops across all major brands — with a success rate of over 90% on the
                boards we take on.
              </p>
            </div>

            <Link
              href="/contact"
              className="hover-lift focus-ring mt-7 inline-flex items-center rounded-full bg-accent-yellow px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-ink"
            >
              Contact Us
            </Link>

            {/* stat tiles with animated counters */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {STATS.map(({ icon: Icon, to, suffix, label }) => (
                <div key={label} className="soft-card p-5">
                  <span className="text-3xl font-extrabold tracking-tight text-brand">
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
