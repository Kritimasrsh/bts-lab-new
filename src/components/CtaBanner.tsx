import Link from "next/link";

type CtaBannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function CtaBanner({
  title = "Ready to fix your phone?",
  subtitle = "Pick your brand, model and problem, get an instant estimate, and we'll take it from there.",
  ctaLabel = "Start a repair",
  ctaHref = "/repair",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden bg-[#f6f3ef]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/70 bg-white/55 p-8 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-md font-sans text-base text-ink/60">{subtitle}</p>
          </div>
          <Link
            href={ctaHref}
            className="hover-lift focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ff6b1a] px-8 py-4 font-display text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)] transition-colors hover:bg-[#e85d04]"
          >
            {ctaLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
