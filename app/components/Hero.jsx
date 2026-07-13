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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
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
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
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
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden border-b border-ink/10 bg-paper-dim">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-10 pt-0 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="flex flex-col justify-center">
          <Eyebrow>Mobile repair experts</Eyebrow>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.75rem]">
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

          <div className="mt-8 grid grid-cols-2 gap-1.5 rounded-xl p-2 sm:grid-cols-4">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-2 text-center"
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center ${item.fg}`}>
                  {item.icon}
                </span>
                <span className={`font-display text-[11px] font-bold leading-tight ${item.fg}`}>{item.title}</span>
                <span className="font-sans text-[9px] leading-tight text-ink-soft">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-start justify-center pt-2">
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
