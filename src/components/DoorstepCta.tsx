import Link from "next/link";
import { Check } from "lucide-react";

const PERKS = ["Doorstep service", "Safety with no risk", "90-day warranty"];

export default function DoorstepCta() {
  return (
    <section className="bg-paper px-5 pb-20 pt-4 sm:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand-deep">
        <div className="relative flex flex-col gap-8 px-7 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          {/* decorative dotted grid */}
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" aria-hidden />

          <div className="relative">
            <h2 className="display-heading text-2xl text-paper sm:text-3xl lg:text-4xl">
              Repair phone, tablet and
              <br />
              laptop at your doorstep
            </h2>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {PERKS.map((perk) => (
                <span key={perk} className="inline-flex items-center gap-2 text-sm text-paper/85">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-yellow text-brand-deep">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {perk}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="hover-lift focus-ring relative inline-flex shrink-0 items-center justify-center rounded-full bg-accent-yellow px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-ink"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
