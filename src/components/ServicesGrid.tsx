import Link from "next/link";
import { SERVICES } from "@/lib/data/services";

import Eyebrow from "@/components/Eyebrow";
import Ticket from "@/components/Ticket";

export default function ServicesGrid() {
  return (
   <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
  <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
    <div>
      <Eyebrow>What we fix</Eyebrow>

      <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
        Our Repair Services
      </h2>

      <p className="mt-3 max-w-2xl text-base text-ink/70">
        Professional repair solutions for all your devices.
      </p>
    </div>

    <Link
      href="/services"
      className="hover-lift focus-ring inline-flex shrink-0 items-center rounded-full border border-ink/12 bg-paper px-6 py-3 font-display text-sm font-bold"
    >
      See all services →
    </Link>
  </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.slice(0, 6).map((service) => (
          <Ticket key={service.code} {...service} />
        ))}
      </div>
    </section>
  );
}