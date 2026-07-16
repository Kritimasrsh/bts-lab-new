import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

const STEPS = [
  {
    n: "01",
    title: "Tell us about it",
    desc: "Model, condition, storage — takes 60 seconds online or in-store.",
  },
  {
    n: "02",
    title: "Get a fair quote",
    desc: "Transparent pricing based on real market value, not lowball offers.",
  },
  {
    n: "03",
    title: "Walk out paid",
    desc: "Instant payment via cash, bank transfer, or store credit toward a new device.",
  },
];

export default function BuybackSection() {
  return (
    <section className="border-y border-ink/10 bg-violet text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Eyebrow dark>Buy · Sell · Exchange</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Your old phone is
            <br />
            worth more here.
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/80">
            Sell your used device for top value, trade it in toward a
            refurbished upgrade, or let us verify and resell it for you.
          </p>
          <Link
            href="/buyback"
            className="hover-lift focus-ring mt-8 inline-flex items-center rounded-full border border-paper/40 bg-sun px-7 py-3.5 font-display text-sm font-bold text-ink"
          >
            Get my quote →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-paper/25 bg-paper/10 p-6 backdrop-blur-sm"
            >
              <span className="font-mono-tag text-xs text-mint">{step.n}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-paper/75">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
