import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import Reveal from "@/components/animated/Reveal";
import { CONTACT } from "@/lib/data/contact";

export const metadata = {
  title: "Contact | BTS Lab",
  description: "Book a repair, ask a question, or visit BTS Lab in Kathmandu.",
};

const MAP_SRC = CONTACT.mapEmbed;
const DIRECTIONS = CONTACT.directions;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-sm font-extrabold uppercase tracking-wide text-[#e85d04]">
      {children}
    </h3>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="font-mono-tag text-xs uppercase tracking-wide text-ink/55">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="focus-ring mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 font-sans text-sm text-ink outline-none backdrop-blur-md placeholder:text-ink/40 focus:border-[#ff6b1a]"
      />
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Map hero */}
      <section className="relative w-full">
        <div className="relative h-[56vh] min-h-[380px] w-full overflow-hidden bg-[#f6f3ef]">
          <iframe
            title="BTS Lab on the map, New Road, Kathmandu"
            src={MAP_SRC}
            className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* floating address card */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center px-5">
            <div className="pointer-events-auto flex w-full max-w-2xl flex-col items-start gap-4 rounded-3xl border border-white/70 bg-white/55 p-5 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff6b1a]/10 text-[#e85d04]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-bold text-ink">BTS Lab, New Road</p>
                  <p className="text-sm text-ink/60">New Road, Kathmandu, Nepal</p>
                </div>
              </div>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ff6b1a] px-6 py-3 font-display text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)] transition-colors hover:bg-[#e85d04]"
              >
                <Navigation className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form + content */}
      <section className="relative overflow-hidden bg-[#f6f3ef]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* LEFT: content + form */}
            <div>
              <Reveal>
                <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                  Broken phone? Let&apos;s sort it out.
                </h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/60">
                  Pop into the shop in New Road, or just tell us what happened below. We usually
                  reply within the hour, and there&apos;s no charge to find out what&apos;s wrong.
                </p>
              </Reveal>

              <Reveal
                as="div"
                delay={0.1}
                className="mt-8 rounded-3xl border border-white/70 bg-white/55 p-8 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl"
              >
                <form>
                  <p className="font-mono-tag text-xs uppercase tracking-widest text-ink/55">
                    Tell us about it
                  </p>
                  <div className="mt-6 space-y-5">
                    <Field label="Name" placeholder="Your full name" />
                    <Field label="Phone" placeholder="98XXXXXXXX" />
                    <Field label="Device" placeholder="e.g. iPhone 13, Samsung S22" />
                    <div>
                      <label className="font-mono-tag text-xs uppercase tracking-wide text-ink/55">
                        What&apos;s going on?
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Cracked screen, won't charge, took a swim..."
                        className="focus-ring mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-4 py-3 font-sans text-sm text-ink outline-none backdrop-blur-md placeholder:text-ink/40 focus:border-[#ff6b1a]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="focus-ring mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6b1a] px-6 py-3.5 font-display text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(232,93,4,0.7)] transition-colors hover:bg-[#e85d04]"
                  >
                    Send it over
                  </button>
                </form>
              </Reveal>
            </div>

            {/* RIGHT: info */}
            <div className="flex flex-col gap-6">
              <Reveal className="rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl">
                <Label>Visit us</Label>
                <p className="mt-3 font-display text-xl font-bold text-ink">New Road, Kathmandu</p>
                <p className="mt-1 font-sans text-sm text-ink/60">
                  Right in the heart of the city. Walk-ins are always welcome.
                </p>
              </Reveal>
              <Reveal
                delay={0.08}
                className="rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl"
              >
                <Label>Call or message</Label>
                <div className="mt-3 space-y-1.5">
                  {CONTACT.phonesDisplay.map((num, i) => (
                    <a
                      key={num}
                      href={`tel:${CONTACT.phonesTel[i]}`}
                      className="flex items-center gap-2 font-mono-tag text-lg font-bold text-ink hover:text-[#e85d04]"
                    >
                      <Phone className="h-4 w-4 text-[#e85d04]" /> {num}
                    </a>
                  ))}
                </div>
                <a
                  href={`tel:${CONTACT.landlineTel}`}
                  className="mt-1.5 inline-block font-mono-tag text-sm text-ink/55 hover:text-[#e85d04]"
                >
                  Landline {CONTACT.landlineDisplay}
                </a>
              </Reveal>
              <Reveal
                delay={0.16}
                className="rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl"
              >
                <Label>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Hours
                  </span>
                </Label>
                <ul className="mt-3 space-y-2 font-sans text-sm text-ink">
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
        </div>
      </section>
    </>
  );
}
