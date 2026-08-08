import StackingCards from "@/components/StackingCards";
import { SERVICE_STACK } from "@/lib/data/service-stack";
import Reveal from "@/components/animated/Reveal";

/**
 * "Everything we fix" — the full service menu presented as scroll-driven
 * stacking cards.
 */
export default function ServicesStack() {
  return (
    <section id="what-we-fix" className="scroll-mt-24 bg-paper pt-20 sm:pt-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Everything we fix
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            From cracked screens to board-level rescues — every repair runs through one lab,
            with genuine parts and a warranty on the work. Scroll to explore.
          </p>
        </Reveal>
      </div>

      <StackingCards items={SERVICE_STACK} />
    </section>
  );
}
