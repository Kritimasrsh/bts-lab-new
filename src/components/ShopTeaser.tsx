import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";

const PRODUCTS = [
  { icon: "🛡️", name: "Tempered glass", price: "₨499", accent: "bg-violet/10" },
  { icon: "🔌", name: "Fast chargers", price: "₨899", accent: "bg-coral/10" },
  { icon: "🎧", name: "Wireless earbuds", price: "₨2,999", accent: "bg-mint/10" },
  { icon: "📱", name: "Cases & covers", price: "₨399", accent: "bg-sun/20" },
];

export default function ShopTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <Eyebrow>The shop</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Gear that keeps
            <br />
            it alive longer.
          </h2>
        </div>
        <Link
          href="/shop"
          className="hover-lift focus-ring inline-flex shrink-0 items-center rounded-full border border-ink/12 bg-paper px-6 py-3 font-display text-sm font-bold"
        >
          Browse the shop →
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((product) => (
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
  );
}
