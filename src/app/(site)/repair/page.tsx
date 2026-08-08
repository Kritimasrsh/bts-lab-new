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
      <section className="relative isolate -mt-20 flex min-h-[62vh] items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero/repairing2.jpg"
            alt="A technician working on a phone"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0a4d54]/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-[#061a1c] via-[#061a1c]/70 to-[#061a1c]/60" />
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
        </div>

        <div className="mx-auto w-full max-w-4xl px-5 pt-28 pb-16 text-center sm:px-8 sm:pt-32">
          <Reveal>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Book your repair
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Pick your phone brand to get started. Next you&apos;ll choose the exact model, tell us
              what&apos;s wrong, and get a price on the spot.
            </p>
          </Reveal>

          {/* step indicator */}
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
              {STEPS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-mint text-[11px] font-bold text-[#08191a]">
                      {s.n}
                    </span>
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && <span className="hidden h-px w-5 bg-white/25 sm:block" />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand picker */}
      <section id="select-brand" className="scroll-mt-24 bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Choose your brand
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
              Tap your phone&apos;s brand to begin. It only takes about a minute.
            </p>
          </Reveal>

          <div className="mt-10">
            <BrandPicker />
          </div>

          <p className="mt-8 text-sm text-ink-soft">
            Don&apos;t see your brand?{" "}
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact us
            </Link>
            , we repair almost everything.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper-dim py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              What happens next
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Four quick steps from broken to booked. No jargon, no pressure.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.08 * i} className="h-full">
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-4xl font-extrabold leading-none text-ink/[0.08]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* trust row */}
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {TRUST.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <Icon className="h-4 w-4 text-brand" /> {label}
              </span>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
