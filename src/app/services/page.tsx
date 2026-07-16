import PageHeader from "@/components/PageHeader";
import Ticket from "@/components/Ticket";
import CtaBanner from "@/components/CtaBanner";
import Eyebrow from "@/components/Eyebrow";
import { SERVICES } from "@/lib/data/services";

export const metadata = {
  title: "Repair Services | BTS Lab",
  description: "Screen, battery, water damage, back glass and motherboard repair in Kathmandu.",
};

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
