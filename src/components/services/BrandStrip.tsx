import Image from "next/image";

const BRANDS = [
  "apple", "samsung", "xiaomi", "oppo", "vivo", "realme",
  "oneplus", "google", "huawei", "poco", "motorola", "nothing",
];

export default function BrandStrip() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="border-y border-ink/10 bg-paper py-12">
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="font-mono-tag text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          Every major brand. If it powers on (or doesn&apos;t), we fix it
        </p>
      </div>
      <div className="marquee-mask marquee-track mt-8 overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-14">
          {row.map((b, i) => (
            <Image
              key={`${b}-${i}`}
              src={`/images/brands/${b}.svg`}
              alt={b}
              width={120}
              height={40}
              className="h-7 w-auto object-contain opacity-55 grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
