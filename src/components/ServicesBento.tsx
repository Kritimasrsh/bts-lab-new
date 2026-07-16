import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data/services";

export default function ServicesBento() {
  const featured = SERVICES.slice(0, 6);

  return (
    <section className="relative bg-paper-dim py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT — headline in yellow block (reference style) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div className="absolute -left-4 -top-6 h-40 w-[90%] rounded-xl bg-accent-yellow" aria-hidden />
              <div className="relative pt-6">
                <span className="section-label text-brand">Our Services</span>
                <h2 className="display-heading mt-4 text-3xl text-ink sm:text-4xl lg:text-5xl">
                  Tech Solutions
                  <br />
                  You Can Trust
                </h2>
              </div>
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              We fix all kinds of faults with the most cost-effective solutions to keep your
              devices running. Genuine parts, honest pricing and a warranty on every repair.
            </p>
            <Link
              href="/services"
              className="hover-lift focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-paper"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* RIGHT — service cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {featured.map((service) => (
              <Link
                key={service.code}
                href="/services"
                className="soft-card group flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_22px_46px_-24px_rgba(15,106,115,0.5)]"
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
