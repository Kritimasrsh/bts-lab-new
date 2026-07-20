import Image from "next/image";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-base font-bold text-ink">{title}</h3>
        <p className="mt-1 font-sans text-sm leading-relaxed text-ink-soft">{desc}</p>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: "Certified technicians",
    desc: "Board-level specialists with thousands of successful repairs — not a random back-alley fix.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "100% genuine parts",
    desc: "OLED/AMOLED panels, original batteries and quality-tested components — every part traceable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M3.3 7 12 12l8.7-5M12 22V12" />
      </svg>
    ),
  },
  {
    title: "Upfront, honest pricing",
    desc: "See your estimate before you commit. No surprise charges, no inflated bills — ever.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9.5 9.5a2.5 2 0 0 1 5 0c0 2-5 1.5-5 3.5a2.5 2 0 0 0 5 0" />
      </svg>
    ),
  },
  {
    title: "Pickup & delivery",
    desc: "Don't leave home. We collect your device, repair it, and drop it back at your door.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M10 17h4V5H2v12h3" />
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Warranty on every repair",
    desc: "Post-repair warranty on parts and workmanship. If it's not right, we make it right.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 2a4 4 0 0 0-4 4H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3a4 4 0 0 0-4-4Z" />
        <path d="m9 13 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Your data stays safe",
    desc: "Privacy-first handling. We never access your personal data, and everything is logged.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

export default function WhyBtsLab() {
  return (
    <section className="border-b border-ink/10 bg-paper-dim">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Left: brand statement */}
        <div className="lg:sticky lg:top-28">
          <Eyebrow>Why BTS Lab</Eyebrow>
          <div className="mt-5 inline-flex items-center rounded-2xl border border-ink/10 bg-paper px-5 py-4">
            <Image
              src="/images/logo.png"
              alt="BTS Lab"
              width={200}
              height={64}
              className="h-11 w-auto object-contain"
            />
          </div>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            The repair lab that
            <br />
            actually earns your trust.
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-ink-soft">
            BTS Lab isn&apos;t just a repair shop it&apos;s a proper lab. Every device is
            diagnosed, repaired with genuine parts, and returned warrantied. From a cracked
            screen to a dead motherboard, we treat your phone like it&apos;s our own.
          </p>
          <Link
            href="/about"
            className="focus-ring mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-brand hover:gap-3 transition-all"
          >
            Learn more about us
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Right: feature grid */}
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Feature key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
