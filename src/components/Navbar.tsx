"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Repair" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-paper/90 backdrop-blur-md shadow-[0_4px_20px_-12px_rgba(13,43,46,0.3)]"
          : "border-b border-transparent bg-paper/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <Image
            src="/logo.png"
            alt="BTS Lab"
            width={120}
            height={120}
            priority
            className="h-11 w-auto object-contain md:h-12"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            BTS <span className="text-brand">Lab</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                  active ? "text-brand" : "text-ink/70 hover:text-brand"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+9779866754678"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-brand"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Phone className="h-4 w-4" />
            </span>
            +977-9866754678
          </a>

          <Link
            href="/services"
            className="hover-lift focus-ring inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-paper transition hover:bg-brand-deep"
          >
            Book a Repair
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/10 bg-paper lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/5 py-3 font-semibold text-ink/80 hover:text-brand"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="tel:+9779866754678"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-brand px-4 py-2 font-semibold text-brand"
              >
                <Phone className="h-4 w-4" />
                +977-9866754678
              </a>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="inline-flex w-fit rounded-full bg-brand px-5 py-2.5 font-bold text-paper"
              >
                Book a Repair
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
