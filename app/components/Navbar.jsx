"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Repair" },
  { href: "/buyback", label: "Buyback" },
  { href: "/academy", label: "Training" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function PhoneIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/images/logo.png"
            alt="BTS LAB"
            width={220}
            height={70}
            priority
            className="h-12 w-auto object-contain md:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-gray-700 transition hover:text-[#0F6A73]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+9779866754678"
            className="inline-flex items-center gap-2 rounded-full border border-[#0F6A73] px-4 py-2 text-sm font-semibold text-[#0F6A73] transition hover:bg-[#0F6A73] hover:text-white"
          >
            <PhoneIcon className="h-4 w-4" />
            +977-9866754678
          </a>

          <Link
            href="/admin"
            className="rounded-full bg-[#0F6A73] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0c5961]"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md border p-2 lg:hidden"
          aria-label="Toggle Menu"
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-gray-100 py-3 text-gray-700"
              >
                {link.label}
              </Link>
            ))}

            <a
              href="tel:+9779866754678"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#0F6A73] px-4 py-2 font-semibold text-[#0F6A73]"
            >
              <PhoneIcon className="h-4 w-4" />
              +977-9866754678
            </a>

            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-fit rounded-full bg-[#0F6A73] px-5 py-2 font-semibold text-white"
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}