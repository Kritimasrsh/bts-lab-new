import Image from "next/image";
import PageHeader from "../components/PageHeader";
import Ticket from "../components/Ticket";
import CtaBanner from "../components/CtaBanner";
import Eyebrow from "../components/Eyebrow";

export const metadata = {
  title: "Repair Services | BTS Lab",
  description: "Screen, battery, water damage, back glass and motherboard repair in Kathmandu.",
};

const SERVICES = [
  { icon: "📱", title: "Screen replacement", desc: "LCD, OLED & AMOLED swaps for iPhone, Samsung, Xiaomi, Oppo, Vivo and more, with touch calibration on every job.", price: "From ₨2,999", code: "TKT-01", accent: "violet" },
  { icon: "🔋", title: "Battery replacement", desc: "Original and high-capacity batteries, safe disposal of the old one, and a full health diagnostic.", price: "From ₨1,499", code: "TKT-02", accent: "coral" },
  { icon: "💧", title: "Water damage rescue", desc: "Ultrasonic cleaning and board-level corrosion treatment — we've saved phones others called dead.", price: "From ₨3,999", code: "TKT-03", accent: "mint" },
  { icon: "🧩", title: "Back glass & housing", desc: "Laser-precision back glass replacement that keeps wireless charging fully intact.", price: "From ₨2,499", code: "TKT-04", accent: "sun" },
  { icon: "🛠️", title: "Motherboard repair", desc: "Chip-level diagnostics and micro-soldering for charging ports, boot loops and shorted boards.", price: "Custom quote", code: "TKT-05", accent: "violet" },
  { icon: "🩺", title: "Free diagnostics", desc: "Not sure what's wrong? We check it properly before you spend a single rupee.", price: "Always free", code: "TKT-06", accent: "coral" },
  { icon: "🔊", title: "Speaker & mic repair", desc: "Crackling calls or silent speakers, fixed with genuine replacement components.", price: "From ₨999", code: "TKT-07", accent: "mint" },
  { icon: "📷", title: "Camera module repair", desc: "Blurry, black, or cracked camera lenses replaced and recalibrated.", price: "From ₨1,999", code: "TKT-08", accent: "sun" },
  { icon: "🔓", title: "Software & unlocking", desc: "OS troubleshooting, data recovery support, and carrier unlocking where legally possible.", price: "From ₨799", code: "TKT-09", accent: "violet" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Repair menu"
        title="Every repair, one counter."
        desc="Walk in with any brand, any issue. We diagnose for free and quote before we touch a single screw."
      />

  
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Ticket key={service.code} {...service} />
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Eyebrow dark>How it works</Eyebrow>
          <div className="mt-8 grid gap-8 sm:grid-cols-4">
            {[
              { n: "01", t: "Drop in or book", d: "Visit the counter or reserve a slot online." },
              { n: "02", t: "Free diagnosis", d: "We find the real issue before quoting a price." },
              { n: "03", t: "We repair it", d: "Most fixes are done same day, on-site." },
              { n: "04", t: "Warranty included", d: "Every repair ships with up to 90 days cover." },
            ].map((step) => (
              <div key={step.n}>
                <span className="font-mono-tag text-xs text-mint">{step.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{step.t}</h3>
                <p className="mt-1 font-sans text-sm text-paper/70">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not sure what's wrong with it?"
        subtitle="Bring it in for a free diagnostic — no pressure, no obligation."
        ctaLabel="Book a Diagnostic"
      />
    </>
  );
}
