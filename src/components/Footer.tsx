import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Repair",
    links: [
      { href: "/services", label: "Screen repair" },
      { href: "/services", label: "Battery swap" },
      { href: "/services", label: "Water damage" },
      { href: "/services", label: "Motherboard" },
    ],
  },
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Refurbished" },
      { href: "/shop", label: "Accessories" },
      { href: "/services", label: "All services" },
      { href: "/contact", label: "Get a quote" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About BTS Lab" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper p-1">
                <Image
                  src="/logo.png"
                  alt="BTS Lab"
                  width={44}
                  height={44}
                  className="h-full w-auto object-contain"
                />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight">
                BTS <span className="text-brand-mint">Lab</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-paper/70">
              Your one-stop solution for mobile repairs &amp; buyback expert
              technicians, genuine parts, and fair prices, every time.
            </p>
            <p className="mt-5 font-sans text-sm text-paper/60">
              +977-1-5354999
            </p>
            <p className="mt-1 font-mono-tag text-xs uppercase tracking-wide text-paper/50">
              New Road, Kathmandu, Nepal
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono-tag text-xs uppercase tracking-widest text-mint">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-paper/80 hover:text-paper focus-ring rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-paper/15 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono-tag text-xs text-paper/50">
            © {new Date().getFullYear()} BTS Lab. All rights reserved.
          </p>
          <div className="flex gap-5 font-mono-tag text-xs uppercase tracking-wide text-paper/60">
            <a href="#" className="hover:text-mint">Instagram</a>
            <a href="#" className="hover:text-mint">Facebook</a>
            <a href="#" className="hover:text-mint">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
