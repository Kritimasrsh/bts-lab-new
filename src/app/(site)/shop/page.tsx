import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/animated/Reveal";

export const metadata = {
  title: "Shop | BTS Lab",
  description: "Accessories and verified refurbished phones from BTS Lab.",
};

const ACCESSORIES = [
  { icon: "🛡️", name: "Tempered glass", price: "₨499", accent: "bg-violet/10" },
  { icon: "🔌", name: "Fast chargers", price: "₨899", accent: "bg-coral/10" },
  { icon: "🎧", name: "Wireless earbuds", price: "₨2,999", accent: "bg-mint/10" },
  { icon: "📱", name: "Cases & covers", price: "₨399", accent: "bg-sun/20" },
  { icon: "🔋", name: "Power banks", price: "₨1,799", accent: "bg-violet/10" },
  { icon: "🧵", name: "Cables", price: "₨299", accent: "bg-coral/10" },
  { icon: "⌚", name: "Smartwatch straps", price: "₨599", accent: "bg-mint/10" },
  { icon: "🖐️", name: "Pop grips & stands", price: "₨249", accent: "bg-sun/20" },
];

const PHONES = [
  { name: "iPhone 12, 64GB", grade: "Good", price: "₨48,000" },
  { name: "Samsung S21, 128GB", grade: "Like New", price: "₨52,000" },
  { name: "Xiaomi 13, 256GB", grade: "Good", price: "₨39,500" },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The shop"
        title="Gear that keeps it alive longer."
        desc="Accessories to protect what you've got, and verified refurbished phones if you're ready for something new."
      />

      <section className="relative overflow-hidden bg-[#f6f3ef]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Accessories</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ACCESSORIES.map((product, i) => (
              <Reveal key={product.name} delay={0.05 * i} className="h-full">
                <div className="h-full rounded-3xl border border-white/70 bg-white/55 p-6 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/60 text-2xl backdrop-blur-md">
                    {product.icon}
                  </span>
                  <h3 className="mt-5 font-display text-base font-bold text-ink">{product.name}</h3>
                  <p className="mt-1 font-mono-tag text-sm text-ink/55">
                    from {product.price}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f6f3ef]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -right-32 -top-20 h-80 w-80 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#2fa89a]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Verified, tested, guaranteed.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PHONES.map((phone, i) => (
              <Reveal
                key={phone.name}
                delay={0.08 * i}
                className="rounded-3xl border border-white/70 bg-white/55 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.35)] backdrop-blur-xl"
              >
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{phone.name}</h3>
                  <span className="mt-2 inline-block rounded-full bg-[#ff6b1a]/10 px-3 py-1 font-mono-tag text-xs font-bold text-[#e85d04]">
                    {phone.grade}
                  </span>
                </div>
                <div className="ticket-perf mx-6" />
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="font-mono-tag text-xs text-ink/55">
                    30-day warranty
                  </span>
                  <span className="font-display text-sm font-bold text-ink">
                    {phone.price}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Want B2B or bulk pricing?"
        subtitle="We supply wholesalers and businesses with parts, accessories, and repair solutions at scale."
        ctaLabel="Talk to Sales"
      />
    </>
  );
}
