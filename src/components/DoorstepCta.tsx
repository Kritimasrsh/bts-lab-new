import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";

const WHATSAPP = "9779866754678";

export default function DoorstepCta() {
  return (
    <section className="bg-paper-dim px-5 py-16 sm:px-8 sm:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-ink/10 bg-paper shadow-[0_30px_60px_-30px_rgba(13,43,46,0.25)]">
        {/* faint illustration background on the right */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src="/illustration3.jpeg"
            alt=""
            fill
            className="object-cover object-right opacity-[0.08]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-paper via-paper/90 to-transparent" />
        </div>

        <div className="relative flex flex-col gap-10 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          {/* left — copy + CTA */}
          <div className="max-w-md">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Speak to an Expert
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Not sure what&apos;s wrong, or need help booking? Our technicians are on hand to
              answer questions and guide you no obligation, no pressure.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift focus-ring mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-paper transition hover:bg-brand-deep"
            >
              <MessageCircle className="h-4 w-4" />
              Talk with us
            </a>
          </div>

          {/* right — expert profile */}
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-brand/15">
              <Image src="/illustration3.jpeg" alt="BTS Lab technician" fill className="object-cover" />
            </div>
            <div>
              <p className="font-display font-bold text-ink">
                Sujan · <span className="text-ink-soft">Kathmandu</span>
              </p>
              <p className="mt-0.5 text-xs text-ink-soft">Lead Repair Technician</p>
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                <Phone className="h-3.5 w-3.5" />
                +977-9866754678
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
