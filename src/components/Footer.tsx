import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/data/contact";

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
    <footer className="relative overflow-hidden bg-[#f6f3ef]">
      {/* ambient glass backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#ff6b1a]/10 blur-3xl" />
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-[#2fa89a]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-4 sm:px-8">
        <div className="rounded-3xl border border-white/70 bg-white/55 px-6 py-10 shadow-[0_20px_50px_-24px_rgba(180,100,40,0.3)] backdrop-blur-xl sm:px-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/70 bg-white/70 p-1 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="BTS Lab"
                    width={44}
                    height={44}
                    className="h-full w-auto object-contain"
                  />
                </span>
                <span className="font-display text-lg font-extrabold tracking-tight text-ink">
                  BTS <span className="text-[#e85d04]">Lab</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-ink/60">
                Your one-stop shop for mobile repairs and buyback. Real technicians,
                genuine parts, and fair prices, every time.
              </p>
              <div className="mt-5 space-y-0.5 font-sans text-sm text-ink/55">
                {CONTACT.phonesDisplay.map((num, i) => (
                  <a key={num} href={`tel:${CONTACT.phonesTel[i]}`} className="block hover:text-[#e85d04]">
                    {num}
                  </a>
                ))}
                <a href={`tel:${CONTACT.landlineTel}`} className="block hover:text-[#e85d04]">
                  {CONTACT.landlineDisplay}
                </a>
              </div>
              <p className="mt-3 font-mono-tag text-xs uppercase tracking-wide text-ink/45">
                {CONTACT.address}
              </p>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono-tag text-xs uppercase tracking-widest text-[#e85d04]">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="focus-ring rounded font-sans text-sm text-ink/70 hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row sm:items-center">
            <p className="font-mono-tag text-xs text-ink/45">
              © {new Date().getFullYear()} BTS Lab. All rights reserved.
            </p>
            <div className="flex gap-5 font-mono-tag text-xs uppercase tracking-wide text-ink/55">
              <a href="#" className="hover:text-[#e85d04]">Instagram</a>
              <a href="#" className="hover:text-[#e85d04]">Facebook</a>
              <a href="#" className="hover:text-[#e85d04]">TikTok</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
