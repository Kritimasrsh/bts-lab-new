import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import ShineButton from "@/components/ShineButton";
import ScrollReveal from "@/components/animated/ScrollReveal";

export default function ServicesBento() {
  const featured = SERVICES.slice(0, 6);

  return (
    <section className="relative bg-paper-dim py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT — headline + scroll-revealed intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono-tag text-xs uppercase tracking-[0.24em] text-brand">
              02 / Our Services
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Tech solutions
              <br />
              <span className="text-brand">you can trust.</span>
            </h2>

            {/* per-word blur reveal on scroll */}
            <ScrollReveal
              baseOpacity={0.12}
              baseRotation={2}
              blurStrength={5}
              containerClassName="mt-2"
              textClassName="!text-base !leading-relaxed !font-normal text-ink-soft max-w-md"
            >
              We fix every kind of fault with cost-effective, board-level solutions genuine
              parts, honest pricing, and a warranty on every single repair.
            </ScrollReveal>

            <div className="mt-4">
              <ShineButton href="/services">View all services</ShineButton>
            </div>
          </div>

          {/* RIGHT — flat, professional service cards */}
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {featured.map((service) => (
              <Link
                key={service.code}
                href="/services"
                className="group relative flex flex-col bg-paper p-6 transition-colors duration-200 hover:bg-brand/3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-2xl">
                  {service.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{service.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-brand">
                  Book Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
