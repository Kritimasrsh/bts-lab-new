import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StackingCards from "@/components/StackingCards";
import { SERVICE_STACK } from "@/lib/data/service-stack";
import Reveal from "@/components/animated/Reveal";

/** Landing-page taste of the service menu: the four most-requested repairs as stacking cards. */
export default function HomeServicesStack() {
  const items = SERVICE_STACK.slice(0, 4);

  return (
    <section id="services" className="scroll-mt-24 bg-paper pt-20 sm:pt-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            What we fix, up close
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            The repairs people ask for most, with genuine parts, trained techs and a warranty on every fix.
          </p>
        </Reveal>
      </div>

      <StackingCards items={items} />

      <Reveal className="mt-4 flex justify-center pb-4">
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 px-6 py-3 font-display text-sm font-bold text-brand transition hover:bg-brand hover:text-paper"
        >
          See all repair services
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}
