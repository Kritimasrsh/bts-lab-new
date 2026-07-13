import Link from "next/link";
import { SERVICES } from "../data/services";

import Eyebrow from "./Eyebrow";
import Ticket from "./Ticket";

export default function ServicesGrid() {
  return (
    
   <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
    <div className="flex-1">
      <Eyebrow>What we fix</Eyebrow>

      <div className="mt-3 text-center">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Our Repair Services
        </h2>

        <p className="mt-3 text-base text-ink/70">
          Professional repair solutions for all your devices.
        </p>
      </div>
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