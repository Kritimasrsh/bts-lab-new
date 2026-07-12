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

const TRUST_ITEMS = [
  {
    title: "Verified",
    sub: "Trusted Partners",
    bg: "bg-mint/10",
    fg: "text-mint",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3 w-3">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
  {
    title: "Top Rated",
    sub: "Happy Customers",
    bg: "bg-sun/15",
    fg: "text-sun",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
        <path d="M12 2.5 15 9l7 1-5 5 1.2 7L12 18.8 5.8 22 7 15 2 10l7-1 3-6.5Z" />
      </svg>
    ),
  },
  {
    title: "Instant",
    sub: "Same Day Pay",
    bg: "bg-coral/10",
    fg: "text-coral",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
        <path d="M13 2 3 14h7l-1 8 11-13h-8l1-7Z" />
      </svg>
    ),
  },
  {
    title: "Secure",
    sub: "Data Safe",
    bg: "bg-indigo-50",
    fg: "text-indigo-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
        <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-paper-dim">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:pt-8">
        <div className="flex flex-col justify-center">
          <Eyebrow>Mobile repair experts</Eyebrow>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Your trusted destination
            <br />
            for professional <span className="text-violet">Mobile Repair</span> services.
          </h1>
          <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-ink-soft">
            Whether it's a cracked screen, battery issue, charging problem, water damage, or software malfunctions.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <span className="rounded-full bg-violet/10 px-4 py-1.5 font-display text-sm font-semibold text-violet">
              Repair
            </span>
            <span className="rounded-full bg-mint/10 px-4 py-1.5 font-display text-sm font-semibold text-mint">
              Sell
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
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

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="hover-lift focus-ring inline-flex items-center justify-center rounded-full bg-violet px-7 py-3.5 font-display text-sm font-bold text-paper"
            >
              Get Repair Quote
            </Link>
            <Link
              href="/buyback"
              className="hover-lift focus-ring inline-flex items-center justify-center rounded-full bg-violet px-7 py-3.5 font-display text-sm font-bold text-paper"

            >
              Sell Now
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {TRUST_ITEMS.map((item) => (
              <span
                key={item.title}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full ${item.bg} px-3 py-1.5 font-sans text-xs`}
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-paper ${item.fg}`}>
                  {item.icon}
                </span>
                <span className={`font-display font-bold ${item.fg}`}>{item.title}</span>
                <span className="text-ink-soft">{item.sub}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-mint/25 via-violet/10 to-paper-dim p-8 sm:p-10 lg:min-h-[560px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute right-10 top-8 h-8 w-8 text-violet/50">
              <path d="M9 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM21 21l-4.3-4.3" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute right-24 top-24 h-6 w-6 rotate-12 text-ink/30">
              <rect x="4" y="4" width="16" height="16" rx="3" />
              <path d="M9 9h6v6H9z" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute bottom-10 left-10 h-7 w-7 -rotate-12 text-mint/60">
              <path d="M4 20 20 4M14 4h6v6" />
            </svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute bottom-24 left-24 h-6 w-6 text-violet/40">
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M5 19l2.8-2.8M16.2 7.8 19 5" />
            </svg>

            <div className="relative z-10 max-w-xs">
              <h2 className="font-display text-3xl font-extrabold leading-[1.1] text-ink sm:text-4xl">
                Get Your
                <br />
                Phone Fixed
                <br />
                Instantly
              </h2>
              <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft">
                Fast, reliable, and affordable repairs — anytime, and,
                anywhere.
              </p>
              <Link
                href="/contact"
                className="hover-lift focus-ring mt-6 inline-flex items-center rounded-full bg-mint px-6 py-3 font-display text-sm font-bold text-paper"
              >
                Book Repair Now
              </Link>
            </div>

            <div className="pointer-events-none absolute -right-6 bottom-0 flex h-full w-[55%] items-end justify-center sm:-right-2">
              <svg viewBox="0 0 220 340" className="h-[85%] w-auto drop-shadow-xl">
                <rect x="30" y="10" width="150" height="300" rx="28" fill="var(--ink)" opacity="0.92" />
                <rect x="40" y="26" width="130" height="255" rx="6" fill="#eaf6f5" />
                <path d="M52 40 L150 40 L110 130 L165 130 L70 260 L92 165 L45 165 Z" fill="none" stroke="var(--violet)" strokeWidth="2.5" opacity="0.55" />
                <circle cx="105" cy="298" r="10" fill="#0b2a2d" opacity="0.6" />
              </svg>
            </div>
          </div>

          <button
            type="button"
            aria-label="Previous"
            className="focus-ring absolute left-0 top-1/2 hidden h-11 w-11 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-lg sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            className="focus-ring absolute right-0 top-1/2 hidden h-11 w-11 translate-x-5 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-lg sm:flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}