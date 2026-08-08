import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import Reveal from "@/components/animated/Reveal";

export const metadata = {
  title: "Contact | BTS Lab",
  description: "Book a repair, ask a question, or visit BTS Lab in Kathmandu.",
};

const MAP_SRC =
  "https://www.google.com/maps?q=New+Road,+Kathmandu,+Nepal&z=15&output=embed";
const DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=New+Road,+Kathmandu,+Nepal";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-brand">
      {children}
    </h3>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="focus-ring mt-2 w-full rounded-xl border border-ink/12 bg-paper px-4 py-3 font-sans text-sm outline-none"
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Map hero */}
      <section className="relative w-full">
        <div className="relative h-[56vh] min-h-[380px] w-full overflow-hidden bg-paper-dim">
          <iframe
            title="BTS Lab on the map, New Road, Kathmandu"
            src={MAP_SRC}
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* floating address card */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-5">
            <div className="glass pointer-events-auto flex w-full max-w-2xl flex-col items-start gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink">BTS Lab, New Road</p>
                  <p className="text-sm text-ink-soft">New Road, Kathmandu, Nepal</p>
                </div>
              </div>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass shrink-0"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form + content */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT: content + form */}
          <div>
            <Reveal>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Broken phone? Let&apos;s sort it out.
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                Pop into the shop in New Road, or just tell us what happened below. We usually
                reply within the hour, and there&apos;s no charge to find out what&apos;s wrong.
              </p>
            </Reveal>

            <Reveal as="div" delay={0.1} className="glass mt-8 rounded-3xl p-8">
              <form>
                <p className="font-mono-tag text-xs uppercase tracking-widest text-ink-soft">
                  Tell us about it
                </p>
                <div className="mt-6 space-y-5">
                  <Field label="Name" placeholder="Your full name" />
                  <Field label="Phone" placeholder="98XXXXXXXX" />
                  <Field label="Device" placeholder="e.g. iPhone 13, Samsung S22" />
                  <div>
                    <label className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">
                      What&apos;s going on?
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Cracked screen, won't charge, took a swim..."
                      className="focus-ring mt-2 w-full rounded-xl border border-ink/12 bg-paper px-4 py-3 font-sans text-sm outline-none"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-glass mt-7 w-full">
                  Send it over
                </button>
              </form>
            </Reveal>
          </div>

          {/* RIGHT: info */}
          <div className="flex flex-col gap-6">
            <Reveal className="glass rounded-2xl p-6">
              <Label>Visit us</Label>
              <p className="mt-3 font-display text-xl font-bold">New Road, Kathmandu</p>
              <p className="mt-1 font-sans text-sm text-ink-soft">
                Right in the heart of the city. Walk-ins are always welcome.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="glass rounded-2xl p-6">
              <Label>Call or message</Label>
              <p className="mt-3 flex items-center gap-2 font-mono-tag text-lg font-bold">
                <Phone className="h-4 w-4 text-brand" /> +977 98-0101-8203
              </p>
              <p className="mt-1 font-mono-tag text-sm text-ink-soft">Landline 01-5354999</p>
            </Reveal>
            <Reveal delay={0.16} className="glass rounded-2xl p-6">
              <Label>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Hours
                </span>
              </Label>
              <ul className="mt-3 space-y-2 font-sans text-sm">
                <li className="flex justify-between border-b border-ink/10 pb-2">
                  <span>Sunday to Friday</span>
                  <span className="font-mono-tag">10:00 to 19:00</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Saturday</span>
                  <span className="font-mono-tag">11:00 to 17:00</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
