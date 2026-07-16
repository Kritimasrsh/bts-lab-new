import Image from "next/image";
import { BRANDS } from "@/lib/data/brands";

/**
 * Auto-scrolling brand marquee.
 * The track is rendered twice back-to-back and translated -50% so the loop
 * is seamless. Pauses on hover; disabled under prefers-reduced-motion (CSS).
 */
export default function BrandCarousel() {
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="border-y border-ink/10 bg-paper-dim py-10">
      <p className="mb-7 text-center text-sm font-semibold uppercase tracking-[0.22em] text-ink-soft">
        Trusted with every major brand
      </p>

      <div className="marquee-mask marquee-track overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-14 px-7">
          {row.map((brand, i) => (
            <div
              key={`${brand.slug}-${i}`}
              className="flex h-12 shrink-0 items-center justify-center"
              aria-hidden={i >= BRANDS.length}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={110}
                height={48}
                className="h-8 w-auto max-w-[110px] object-contain opacity-55 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
