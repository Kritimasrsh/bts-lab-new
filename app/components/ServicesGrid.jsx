import Link from "next/link";
import Eyebrow from "./Eyebrow";
import Ticket from "./Ticket";

const SERVICES = [
  {
    icon: "📱",
    title: "Screen replacement",
    desc: "LCD, OLED & AMOLED swaps with post-repair touch calibration.",
    price: "From ₨2,999",
    code: "TKT-01",
    accent: "violet",
  },
  {
    icon: "🔋",
    title: "Battery replacement",
    desc: "Same-day swaps with a full battery health diagnostic.",
    price: "From ₨1,499",
    code: "TKT-02",
    accent: "coral",
  },
  {
    icon: "💧",
    title: "Water damage rescue",
    desc: "Ultrasonic cleaning and board-level treatment, no data loss.",
    price: "From ₨3,999",
    code: "TKT-03",
    accent: "mint",
  },
  {
    icon: "🧩",
    title: "Back glass & housing",
    desc: "Laser-precision back glass replacement, wireless charging intact.",
    price: "From ₨2,499",
    code: "TKT-04",
    accent: "sun",
  },
  {
    icon: "🛠️",
    title: "Motherboard repair",
    desc: "Chip-level diagnostics and micro-soldering for the tricky stuff.",
    price: "Custom quote",
    code: "TKT-05",
    accent: "violet",
  },
  {
    icon: "🩺",
    title: "Free diagnostics",
    desc: "Not sure what's wrong? We'll find it before you pay for anything.",
    price: "Always free",
    code: "TKT-06",
    accent: "coral",
  },
];

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>What we fix</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Pick a ticket,
            <br />
            we&apos;ll handle the rest.
          </h2>
        </div>
        <Link
          href="/services"
          className="hover-lift focus-ring inline-flex shrink-0 items-center rounded-full border border-ink/12 bg-paper px-6 py-3 font-display text-sm font-bold"
        >
          See all services →
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Ticket key={service.code} {...service} />
        ))}
      </div>
    </section>
  );
}
