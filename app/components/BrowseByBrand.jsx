import Image from "next/image";
import Link from "next/link";
import Eyebrow from "./Eyebrow";

const BRANDS = [
  { name: "Apple", slug: "apple", logo: "/images/brands/apple.svg" },
  { name: "ASUS", slug: "asus", logo: "/images/brands/asus.svg" },
  { name: "Google", slug: "google", logo: "/images/brands/google.svg" },
  { name: "Huawei", slug: "huawei", logo: "/images/brands/huawei.svg" },
  { name: "IQOO", slug: "iqoo", logo: "/images/brands/iqoo.svg" },
  { name: "Motorola", slug: "motorola", logo: "/images/brands/motorola.svg" },
  { name: "Nothing", slug: "nothing", logo: "/images/brands/nothing.svg" },
  { name: "OnePlus", slug: "oneplus", logo: "/images/brands/oneplus.svg" },
  { name: "OPPO", slug: "oppo", logo: "/images/brands/oppo.svg" },
  { name: "POCO", slug: "poco", logo: "/images/brands/poco.svg" },
  { name: "Realme", slug: "realme", logo: "/images/brands/realme.svg" },
  { name: "Samsung", slug: "samsung", logo: "/images/brands/samsung.svg" },
  { name: "VIVO", slug: "vivo", logo: "/images/brands/vivo.svg" },
  { name: "Xiaomi", slug: "xiaomi", logo: "/images/brands/xiaomi.svg" },
];

export default function BrowseByBrand() {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Eyebrow>Browse by Brand</Eyebrow>
        <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          We repair every major brand.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href="/services"
              className="hover-lift focus-ring group flex flex-col items-center gap-3 rounded-2xl border border-transparent bg-paper px-4 py-5 transition-colors hover:border-violet/30"
            >
              <span className="flex h-14 w-full items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={96}
                  height={48}
                  className="h-10 w-auto max-w-[88px] object-contain opacity-80 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="font-display text-xs font-bold tracking-wide text-ink-soft group-hover:text-ink">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}