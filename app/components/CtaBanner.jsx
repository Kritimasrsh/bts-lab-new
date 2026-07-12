import Link from "next/link";

export default function CtaBanner({
  title = "Get Your Phone Fixed Instantly",
  subtitle = "Fast, reliable, and affordable repairs — anytime, anywhere.",
  ctaLabel = "Book Repair Now",
  ctaHref = "/contact",
}) {
  return (
    <section className="brand-gradient border-y border-ink/10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-tight text-paper sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-md font-sans text-base text-paper/85">{subtitle}</p>
        </div>
        <Link
          href={ctaHref}
          className="hover-lift focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-8 py-4 font-display text-sm font-bold text-violet"
        >
          {ctaLabel}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
