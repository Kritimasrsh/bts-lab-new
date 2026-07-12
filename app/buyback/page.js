import PageHeader from "../components/PageHeader";
import CtaBanner from "../components/CtaBanner";
import Eyebrow from "../components/Eyebrow";

export const metadata = {
  title: "Sell & Trade-In | Mobizilla",
  description: "Get a fair, fast quote to sell or trade in your used phone at Mobizilla.",
};

const STEPS = [
  { n: "01", title: "Tell us about it", desc: "Model, storage, condition — 60 seconds online or at the counter." },
  { n: "02", title: "Get a fair quote", desc: "Real market pricing, no lowball tactics, shown to you upfront." },
  { n: "03", title: "Free device check", desc: "A quick inspection confirms the quote — usually under 10 minutes." },
  { n: "04", title: "Walk out paid", desc: "Cash, bank transfer, or credit toward a refurbished upgrade." },
];

const TIERS = [
  { grade: "Like New", desc: "No visible wear, screen and battery at full health.", modifier: "100% of quote" },
  { grade: "Good", desc: "Light scratches, everything works perfectly.", modifier: "~85% of quote" },
  { grade: "Fair", desc: "Visible wear or a worn battery, still fully functional.", modifier: "~65% of quote" },
];

export default function BuybackPage() {
  return (
    <>
      <PageHeader
        eyebrow="Buy · Sell · Exchange"
        title="Your old phone is worth more here."
        desc="Sell it outright, trade it toward an upgrade, or let us refurbish and resell it for you."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Eyebrow>How buyback works</Eyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="ticket bg-paper p-6">
              <span className="font-mono-tag text-xs text-violet">{step.n}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-violet text-paper">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Eyebrow dark>Condition grading</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Honest grading, no surprises.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <div key={tier.grade} className="rounded-2xl border border-paper/25 bg-paper/10 p-6">
                <h3 className="font-display text-xl font-bold">{tier.grade}</h3>
                <p className="mt-2 font-sans text-sm text-paper/80">{tier.desc}</p>
                <p className="mt-4 font-mono-tag text-sm font-bold text-sun">
                  {tier.modifier}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Or trade in</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Swap it for something better.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft">
              Trade your current phone toward any verified refurbished device
              in our shop and only pay the difference. No separate sale, no
              waiting for payment.
            </p>
          </div>
          <div className="ticket bg-paper p-8">
            <p className="font-mono-tag text-xs uppercase tracking-wide text-ink-soft">
              What we accept
            </p>
            <ul className="mt-4 space-y-3 font-sans text-sm">
              <li>✓ Any iPhone, Samsung, Xiaomi, Oppo, Vivo, Realme model</li>
              <li>✓ Working or non-working devices (price adjusted)</li>
              <li>✓ Tablets and select smartwatches</li>
              <li>✓ Devices with cracked screens — still valued fairly</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to see what it's worth?"
        subtitle="Bring your device in, or start a quote online in under a minute."
        ctaLabel="Start My Quote"
      />
    </>
  );
}
