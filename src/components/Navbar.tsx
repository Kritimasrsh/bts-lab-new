"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ArrowRight, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { NAV_ITEMS, NAV_FOOTER, type NavItem } from "@/lib/data/nav";

/* ---------------- Desktop mega-menu panel ---------------- */

function MegaPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
      className="absolute inset-x-0 top-full z-40"
    >
      {/* invisible hover bridge so moving cursor down doesn't close the menu */}
      <div className="h-3 w-full" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_60px_-24px_rgba(13,43,46,0.35)]">
          <div className="grid gap-8 p-7 lg:grid-cols-[1fr_1fr_0.9fr]">
            {item.columns?.map((col) => (
              <div key={col.heading}>
                <p className="section-label mb-4 text-ink-soft">{col.heading}</p>
                <ul className="space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={onNavigate}
                        className="focus-ring group block rounded-lg px-3 py-2 transition-colors hover:bg-brand/5"
                      >
                        <span className="block font-display text-sm font-bold text-ink group-hover:text-brand">
                          {link.label}
                        </span>
                        {link.desc && (
                          <span className="mt-0.5 block text-xs text-ink-soft">{link.desc}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* promo card */}
            {item.promo && (
              <div className="flex flex-col justify-between rounded-xl bg-brand p-6 text-paper">
                <div>
                  <p className="font-display text-lg font-extrabold leading-tight">
                    {item.promo.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/85">{item.promo.desc}</p>
                </div>
                <Link
                  href={item.promo.href}
                  onClick={onNavigate}
                  className="focus-ring mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-paper px-5 py-2.5 font-display text-sm font-bold text-brand transition hover:gap-3"
                >
                  {item.promo.ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* footer quick-actions bar */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-ink/8 bg-paper-dim px-7 py-3.5">
            {NAV_FOOTER.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onNavigate}
                className="focus-ring rounded text-sm font-semibold text-ink-soft transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Mobile accordion item ---------------- */

function MobileItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.columns) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className="block border-b border-ink/5 py-3 font-semibold text-ink/80 hover:text-brand"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-ink/5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 font-semibold text-ink/80"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-3">
          {item.columns.map((col) => (
            <div key={col.heading} className="mb-2">
              <p className="section-label px-1 py-1.5 text-ink-soft">{col.heading}</p>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onNavigate}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink/75 hover:bg-brand/5 hover:text-brand"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Navbar ---------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the open mega-menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  }

  const isActive = (href: string) => pathname === href;
  const active = NAV_ITEMS.find((i) => i.label === activeMenu);

  // Transparent (light text) only over the homepage hero, at the top, no menu open.
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !activeMenu;
  const linkColor = transparent
    ? "text-paper/80 hover:text-paper"
    : "text-ink/70 hover:text-brand";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-ink/10 bg-paper/95 backdrop-blur-md shadow-[0_4px_20px_-12px_rgba(13,43,46,0.3)]"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo + slogan */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <Image
            src="/logo.png"
            alt="BTS Lab"
            width={120}
            height={120}
            priority
            className={`h-11 w-auto object-contain md:h-12 ${transparent ? "brightness-0 invert" : ""}`}
          />
          <span className="flex flex-col leading-none">
            <span
              className={`font-display text-lg font-extrabold tracking-tight ${
                transparent ? "text-paper" : "text-ink"
              }`}
            >
              BTS <span className={transparent ? "text-brand-mint" : "text-brand"}>Lab</span>
            </span>
            <span
              className={`mt-1 font-mono-tag text-[9px] uppercase tracking-[0.18em] ${
                transparent ? "text-paper/60" : "text-ink-soft"
              }`}
            >
              Fix · Sell · Trust
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
              isActive("/") ? (transparent ? "text-paper" : "text-brand") : linkColor
            }`}
          >
            Home
          </Link>

          {NAV_ITEMS.map((item) => {
            const hasMenu = !!item.columns;
            const menuOpen = activeMenu === item.label;
            return (
              <div
                key={item.label}
                onMouseEnter={() => hasMenu && openMenu(item.label)}
              >
                <Link
                  href={item.href}
                  onFocus={() => hasMenu && openMenu(item.label)}
                  onClick={() => setActiveMenu(null)}
                  aria-expanded={hasMenu ? menuOpen : undefined}
                  aria-haspopup={hasMenu || undefined}
                  className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-[15px] font-semibold transition-colors ${
                    menuOpen ? "text-brand" : linkColor
                  }`}
                >
                  {item.label}
                  {hasMenu && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-2.5 lg:flex">
          {/* Auth state */}
          {status === "loading" ? (
            <span className={`h-9 w-24 rounded-full ${transparent ? "skeleton skeleton-dark" : "skeleton"}`} />
          ) : session?.user ? (
            <Link
              href="/account"
              className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                transparent
                  ? "border-paper/30 text-paper hover:border-paper hover:bg-paper/10"
                  : "border-ink/15 text-ink hover:border-brand hover:text-brand"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  transparent ? "bg-paper/20 text-paper" : "bg-brand/10 text-brand"
                }`}
              >
                <User className="h-3.5 w-3.5" />
              </span>
              {session.user.name?.split(" ")[0] || "Account"}
            </Link>
          ) : (
            <Link
              href="/login"
              className={`focus-ring inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                transparent
                  ? "text-paper hover:bg-paper/10"
                  : "text-ink hover:text-brand"
              }`}
            >
              Log in
            </Link>
          )}

          {/* CTA — outlined-fill hover */}
          <Link
            href="/services"
            className={`group focus-ring relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
              transparent
                ? "bg-paper text-brand hover:bg-brand-mint hover:text-ink"
                : "bg-brand text-paper hover:bg-brand-deep"
            }`}
          >
            Book a Repair
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border transition lg:hidden ${
            transparent ? "border-paper/30 text-paper" : "border-ink/10 text-ink"
          }`}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop mega-menu panel */}
      <AnimatePresence>
        {active?.columns && (
          <div onMouseEnter={() => openMenu(active.label)} onMouseLeave={scheduleClose}>
            <MegaPanel item={active} onNavigate={() => setActiveMenu(null)} />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-ink/10 bg-paper lg:hidden">
          <nav className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block border-b border-ink/5 py-3 font-semibold text-ink/80 hover:text-brand"
            >
              Home
            </Link>
            {NAV_ITEMS.map((item) => (
              <MobileItem key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
            ))}

            {/* Auth (mobile) */}
            {session?.user ? (
              <div className="mt-2 flex flex-col gap-1 border-t border-ink/5 pt-2">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-3 font-semibold text-ink/80 hover:text-brand"
                >
                  <User className="h-4 w-4" /> My account
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center gap-2 py-3 text-left font-semibold text-ink/80 hover:text-brand"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block border-t border-ink/5 py-3 font-semibold text-ink/80 hover:text-brand"
              >
                Log in
              </Link>
            )}

            <div className="mt-4 pb-4">
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-paper"
              >
                Book a Repair
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
