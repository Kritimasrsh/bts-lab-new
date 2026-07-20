import ScrollReveal from "@/components/animated/ScrollReveal";

/**
 * A calm, editorial statement section. The headline reveals word-by-word on
 * scroll (GSAP), followed by a short supporting line that reveals after it.
 */
export default function Manifesto() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <ScrollReveal
          baseOpacity={0.08}
          baseRotation={2}
          blurStrength={6}
          textClassName="!text-3xl sm:!text-4xl lg:!text-5xl !font-extrabold !leading-[1.15] tracking-tight text-ink font-display"
        >
          We treat every device like it&apos;s our own diagnosed properly, repaired with
          genuine parts, and returned with a warranty.
        </ScrollReveal>

        <ScrollReveal
          baseOpacity={0.12}
          baseRotation={1}
          blurStrength={4}
          containerClassName="mt-4"
          textClassName="!text-base sm:!text-lg !font-normal !leading-relaxed text-ink-soft"
        >
          No upselling, no mystery charges, no guesswork. Just honest, board-level repair
          done right the first time that&apos;s the BTS Lab standard.
        </ScrollReveal>
      </div>
    </section>
  );
}
