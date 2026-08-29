import type { ReactNode } from "react";
import Reveal from "@/components/animated/Reveal";

type PageHeaderProps = {
  /** Retained for API compatibility; eyebrows are no longer rendered. */
  eyebrow?: ReactNode;
  title: ReactNode;
  desc?: ReactNode;
};

export default function PageHeader({ title, desc }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/60 bg-[#f6f3ef]">
      {/* ambient glow + dotted grid */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.5]" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[38rem] max-w-full -translate-x-1/2 rounded-full bg-[#ff6b1a]/12 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-[#2fa89a]/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <Reveal>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {desc && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
              {desc}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
