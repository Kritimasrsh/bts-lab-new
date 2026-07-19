import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import Eyebrow from "@/components/Eyebrow";

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

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Eyebrow>Accessories</Eyebrow>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ACCESSORIES.map((product) => (
            <div
              key={product.name}
              className={`hover-lift rounded-2xl border border-ink/12 p-6 ${product.accent}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/12 bg-paper text-2xl">
                {product.icon}
              </span>
              <h3 className="mt-5 font-display text-base font-bold">{product.name}</h3>
              <p className="mt-1 font-mono-tag text-sm text-ink-soft">
                from {product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper-dim">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Eyebrow>Refurbished phones</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            Verified, tested, guaranteed.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {PHONES.map((phone) => (
              <div key={phone.name} className="ticket bg-paper">
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold">{phone.name}</h3>
                  <span className="mt-2 inline-block rounded-full bg-mint px-3 py-1 font-mono-tag text-xs font-bold text-ink">
                    {phone.grade}
                  </span>
                </div>
                <div className="ticket-perf mx-6" />
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="font-mono-tag text-xs text-ink-soft">
                    30-day warranty
                  </span>
                  <span className="font-display text-sm font-bold">
                    {phone.price}
                  </span>
                </div>
              </div>
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
