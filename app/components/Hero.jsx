import Link from "next/link";
import Eyebrow from "./Eyebrow";


function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const CHECKS = ["Pickup & Delivery", "Affordable Pricing", "Quick Fixes"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper-dim">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="flex flex-col justify-center">
          <Eyebrow>Mobile repair experts</Eyebrow>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.75rem]">
            Your trusted destination
            <br />
            for professional <span className="text-violet">Mobile Repair</span> services.
          </h1>
          <p className="mt-4 max-w-lg font-sans text-lg leading-relaxed text-ink-soft">
            Whether it's a cracked screen, battery issue, charging problem, water damage, or software malfunctions.
          </p>

          <div className="mt-3 flex flex-wrap gap-2.5">
            <span className="rounded-full bg-violet/10 px-4 py-1.5 font-display text-sm font-semibold text-violet">
              Repair
            </span>
            <span className="rounded-full bg-mint/10 px-4 py-1.5 font-display text-sm font-semibold text-mint">
              Sell
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {CHECKS.map((label) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1.5 font-sans text-xs font-medium text-ink-soft"
              >
                <CheckIcon className="h-3 w-3 text-mint" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="hover-lift focus-ring inline-flex items-center justify-center rounded-full bg-violet px-7 py-3.5 font-display text-sm font-bold text-paper"
            >
              Get Repair
            </Link>
            <Link
              href="/buyback"
              className="hover-lift focus-ring inline-flex items-center justify-center rounded-full bg-violet px-7 py-3.5 font-display text-sm font-bold text-paper"
            >
              Sell Now
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <video
            src="/images/hero1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-auto w-full max-w-2xl object-contain mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}