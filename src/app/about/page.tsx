import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import Eyebrow from "@/components/Eyebrow";

export const metadata = {
  title: "About | BTS Lab",
  description: "BTS Lab — Kathmandu's trusted mobile repair, buyback and training destination.",
};

const VALUES = [
  { icon: "✓", title: "Genuine parts, always", desc: "Every component is sourced from vetted vendors and tested before it goes in." },
  { icon: "🛡", title: "Your data, protected", desc: "Devices are handled with strict privacy protocols at every step of the repair." },
  { icon: "⚡", title: "Speed without shortcuts", desc: "Most repairs finish same day — because our process is efficient, not rushed." },
  { icon: "🎓", title: "Knowledge, shared", desc: "We believe repair skills should be taught, not gatekept." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About BTS Lab"
        title="Behind every screen is a story."
        desc="We started as a two-person repair counter in Kathmandu. Today we're a full lab: repairs, buyback, training, and a shop — all under one roof."
      />

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <p className="font-sans text-lg leading-relaxed text-ink-soft">
          BTS Lab —
          was built on a simple idea: a broken phone shouldn&apos;t mean a
          broken week. We invested early in proper tools — OCA bonding
          stations, CNC glass cutters, laser precision machines — so repairs
          that other shops turn away become routine here.
        </p>
        <p className="mt-5 font-sans text-lg leading-relaxed text-ink-soft">
          As demand grew, so did the mission. We opened a buyback counter for
          people upgrading devices, launched an academy to train the next
          generation of technicians, and stocked a shop so protecting your
          next phone is as easy as fixing your last one.
        </p>
      </section>

      <section className="border-y border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Eyebrow dark>What we stand for</Eyebrow>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/25 text-lg">
                  {value.icon}
                </span>
                <h3 className="mt-4 font-display text-base font-bold">
                  {value.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-paper/70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="ticket mx-auto max-w-2xl bg-paper p-8 text-center">
          <p className="font-mono-tag text-xs uppercase tracking-widest text-ink-soft">
            Visit the lab
          </p>
          <p className="mt-3 font-display text-2xl font-bold">
            New Road, Kathmandu
          </p>
          <p className="mt-1 font-sans text-sm text-ink-soft">
            New Road, Kathmandu, Nepal
          </p>
          <p className="mt-4 font-mono-tag text-sm">
            +977 98-0101-8203 · 01-5354999
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
