import { Wrench, ShieldCheck, Cpu, HeartHandshake } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { CONTACT } from "@/lib/data/contact";
import DoorstepCta from "@/components/DoorstepCta";
import Counter from "@/components/Counter";
import Reveal from "@/components/animated/Reveal";

export const metadata = {
  title: "About | BTS Lab",
  description: "BTS Lab is Kathmandu's trusted spot for mobile repair, buyback and training.",
};

const STATS = [
  { to: 7580, suffix: "+", label: "Devices repaired" },
  { to: 460, suffix: "+", label: "5-star reviews" },
  { to: 120, suffix: "+", label: "Trained technicians" },
  { to: 8, suffix: "+", label: "Years on the bench" },
];

const DIFFERENCE = [
  { icon: Cpu, title: "Board-level expertise", desc: "Chip-level diagnostics and micro-soldering that most shops send away, done in-house under a microscope." },
  { icon: ShieldCheck, title: "Genuine parts & warranty", desc: "Vetted components, tested before they go in, and a warranty on the work every single time." },
  { icon: Wrench, title: "Free, honest diagnosis", desc: "We find the real fault and quote before we touch a screw. No guesswork, no mystery charges." },
  { icon: HeartHandshake, title: "Trusted across Nepal", desc: "Thousands of repairs, buybacks and trained technicians. A lab the community actually relies on." },
];

const VALUES = [
  { icon: "✓", title: "Genuine parts, always", desc: "Every component is sourced from vetted vendors and tested before it goes in." },
  { icon: "🛡", title: "Your data, protected", desc: "Devices are handled with strict privacy protocols at every step of the repair." },
  { icon: "⚡", title: "Speed without shortcuts", desc: "Most repairs finish the same day, because our process is tight, not rushed." },
  { icon: "🎓", title: "Knowledge, shared", desc: "We believe repair skills should be taught, not gatekept." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Behind every screen is a story."
        desc="We started as a two-person repair counter in Kathmandu. Today we're a full lab: repairs, buyback, training and a shop, all under one roof."
      />

      <section className="relative overflow-hidden bg-[#f6f3ef]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 py-20 sm:px-8">
          <Reveal>
            <p className="font-sans text-lg leading-relaxed text-ink/70">
              BTS Lab started with a simple idea: a broken phone shouldn&apos;t wreck
              your whole week. We put money into proper kit early on, OCA bonding
              stations, CNC glass cutters and laser machines, so the repairs other
              shops turn away are just routine for us.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 font-sans text-lg leading-relaxed text-ink/70">
              As demand grew, so did the mission. We opened a buyback counter for
              people upgrading devices, launched an academy to train the next
              generation of technicians, and stocked a shop so protecting your
              next phone is as easy as fixing your last one.
            </p>
          </Reveal>

          {/* stats band */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.06 * i} className="h-full">
                <div className="h-full rounded-3xl border border-white/70 bg-white/55 p-5 text-center shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl">
                  <span className="font-display text-3xl font-extrabold tracking-tight text-[#e85d04]">
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/55">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* what makes us different */}
      <section className="relative overflow-hidden bg-[#f6f3ef] py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              What makes us different
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              Not just another phone counter. A proper lab built for the repairs everyone else avoids.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENCE.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.08 * i} className="h-full">
                <div className="h-full rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff6b1a]/10 text-[#e85d04]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f3ef]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -right-32 -top-24 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">What we stand for</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={0.08 * i} className="h-full">
                <div className="h-full rounded-3xl border border-white/70 bg-white/55 p-6 text-ink shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/50 text-lg text-[#e85d04] backdrop-blur-md">
                    {value.icon}
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-ink/70">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f3ef]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal blur className="mx-auto block max-w-2xl rounded-3xl border border-white/70 bg-white/55 p-8 text-center shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-1.5 font-mono-tag text-[10px] font-bold uppercase tracking-[0.2em] text-ink/55 backdrop-blur-md">
              Visit the lab
            </p>
            <p className="mt-3 font-display text-2xl font-bold text-ink">
              New Road, Kathmandu
            </p>
            <p className="mt-1 font-sans text-sm text-ink/70">
              New Road, Kathmandu, Nepal
            </p>
            <p className="mt-4 font-mono-tag text-sm text-[#e85d04]">
              {CONTACT.phonesDisplay.join(" · ")}
            </p>
            <p className="mt-1 font-mono-tag text-sm text-ink/55">
              Landline {CONTACT.landlineDisplay}
            </p>
          </Reveal>
        </div>
      </section>

      <DoorstepCta />
    </>
  );
}
