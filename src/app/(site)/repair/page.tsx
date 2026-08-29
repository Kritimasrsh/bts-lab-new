import Image from "next/image";
import Link from "next/link";
import { Smartphone, Wrench, ReceiptText, CalendarCheck, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import BrandPicker from "@/components/repair/BrandPicker";
import Reveal from "@/components/animated/Reveal";

export const metadata = {
  title: "Book a Repair | BTS Lab",
  description:
    "Start your phone repair in a minute. Pick your brand and model, tell us what's wrong, and get an instant estimate. Genuine parts, trained techs, warranty on every fix.",
};

const STEPS = [
  { n: "1", label: "Brand" },
  { n: "2", label: "Model" },
  { n: "3", label: "Problem" },
  { n: "4", label: "Instant quote" },
];

const HOW = [
  { icon: Smartphone, title: "Pick brand & model", desc: "Choose your phone below, then find your exact model." },
  { icon: Wrench, title: "Tell us the problem", desc: "Cracked screen, dead battery, water damage, whatever it is." },
  { icon: ReceiptText, title: "Get an instant estimate", desc: "See a price straight away, with no obligation to book." },
  { icon: CalendarCheck, title: "Book it in", desc: "Drop by the shop or arrange doorstep pickup and delivery." },
];

const TRUST = [
  { icon: ShieldCheck, label: "90-day warranty" },
  { icon: BadgeCheck, label: "Genuine parts" },
  { icon: Clock, label: "Same-day on most repairs" },
];

export default function BookRepairPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate -mt-20 overflow-hidden bg-[#f6f3ef]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pt-32 pb-16 sm:px-8 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 font-mono-tag text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55 backdrop-blur-md">
                Repair booking
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl">
                Book your repair
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
                Pick your phone brand to get started. Next you&apos;ll choose the exact model, tell us
                what&apos;s wrong, and get a price on the spot.
              </p>
            </Reveal>

            {/* step indicator */}
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap items-center gap-2.5">
                {STEPS.map((s, i) => (
                  <div key={s.label} className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-ink backdrop-blur-md">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6b1a] text-[11px] font-bold text-white">
                        {s.n}
                      </span>
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && <span className="hidden h-px w-5 bg-ink/15 sm:block" />}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/55 p-2.5 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.25rem]">
                <Image
                  src="/hero/repairing2.jpg"
                  alt="A technician working on a phone"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand picker */}
      <section id="select-brand" className="relative scroll-mt-24 overflow-hidden bg-[#f6f3ef] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -right-32 -top-24 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Choose your brand
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink/60">
              Tap your phone&apos;s brand to begin. It only takes about a minute.
            </p>
          </Reveal>

          <div className="mt-10">
            <BrandPicker />
          </div>

          <p className="mt-8 text-sm text-ink/60">
            Don&apos;t see your brand?{" "}
            <Link href="/contact" className="font-semibold text-[#e85d04] hover:underline">
              Contact us
            </Link>
            , we repair almost everything.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-[#f6f3ef] py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-28 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              What happens next
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/60">
              Four quick steps from broken to booked. No jargon, no pressure.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.08 * i} className="h-full">
                <div className="h-full rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6b1a]/10 text-[#e85d04]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-4xl font-extrabold leading-none text-ink/[0.08]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* trust row */}
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <Icon className="h-4 w-4 text-[#e85d04]" /> {label}
              </span>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
