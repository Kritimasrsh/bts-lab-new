"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
  Smartphone,
  BatteryCharging,
  Droplets,
  Cpu,
  Wrench,
  Headphones,
  Repeat,
  Tag,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

function initialsOf(name?: string | null) {
  if (!name) return "ME";
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

const PROFILE_MENU = "__profile__";

/* ---------------- Nav model ---------------- */

type SubLink = { label: string; href: string; desc?: string; icon?: LucideIcon };
type Feature = { title: string; desc: string; href: string; cta: string };
type NavLink = {
  label: string;
  href: string;
  menu?: SubLink[];
  menuTitle?: string;
  feature?: Feature;
};

const SERVICE_LINKS: SubLink[] = [
  { label: "Screen replacement", href: "/services", desc: "Cracked & unresponsive displays", icon: Smartphone },
  { label: "Battery replacement", href: "/services", desc: "Fast drain, swelling & health", icon: BatteryCharging },
  { label: "Water damage rescue", href: "/services", desc: "Board-level corrosion cleaning", icon: Droplets },
  { label: "Board-level repair", href: "/services", desc: "Micro-soldering & diagnostics", icon: Cpu },
  { label: "All repair services", href: "/services", desc: "Browse everything we fix", icon: Wrench },
];

const SHOP_LINKS: SubLink[] = [
  { label: "Accessories", href: "/shop", desc: "Cases, chargers, cables & more", icon: Headphones },
  { label: "Refurbished phones", href: "/shop", desc: "Tested, warrantied devices", icon: Smartphone },
  { label: "Trade-in & buy-back", href: "/shop", desc: "Sell or exchange your device", icon: Repeat },
  { label: "Deals & offers", href: "/shop", desc: "Current bundles and savings", icon: Tag },
];

const NAV: NavLink[] = [
  {
    label: "Services",
    href: "/services",
    menu: SERVICE_LINKS,
    menuTitle: "What we fix",
    feature: {
      title: "Board-level lab",
      desc: "Micro-soldering & chip-level diagnostics other shops refuse.",
      href: "/services#board-level",
      cta: "Explore the lab",
    },
  },
  {
    label: "Shop",
    href: "/shop",
    menu: SHOP_LINKS,
    menuTitle: "Buy · Sell · Exchange",
    feature: {
      title: "Trade in your device",
      desc: "Get instant value toward a refurbished upgrade.",
      href: "/shop",
      cta: "Get a quote",
    },
  },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* ---------------- Signature CTA ---------------- */

function BookCta({ onClick, className = "" }: { onClick?: () => void; className?: string }) {
  return (
    <Link
      href="/repair"
      onClick={onClick}
      className={`group focus-ring inline-flex items-center gap-2 rounded-full bg-brand py-1.5 pl-5 pr-1.5 font-display text-sm font-bold text-paper shadow-sm transition-colors hover:bg-brand-deep ${className}`}
    >
      Book a Repair
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-brand transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
      </span>
    </Link>
  );
}

/* ---------------- Notch shell hairlines ---------------- */

function Hairlines() {
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
      <line x1="0" y1="79.5" x2="100%" y2="79.5" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
      <line x1="0" y1="76.5" x2="100%" y2="76.5" stroke="currentColor" strokeOpacity={0.08} strokeWidth={0.5} />
    </svg>
  );
}

/* ---------------- Navbar (notch style) ---------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close any open dropdown / mobile menu whenever the route changes so a menu
  // never stays stuck open (e.g. the Services menu after landing on /services).
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  function open(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 text-white">
      {/* Left rail */}
      <div className="relative hidden h-12 min-w-0 flex-1 bg-[#0b1c1d]/95 backdrop-blur-md md:block">
        <Hairlines />
      </div>

      {/* Notch container */}
      <div className="relative z-10 flex h-20 min-w-0 flex-1 shrink-0 md:flex-initial">
        {/* Left corner */}
        <div className="relative hidden h-full w-[46px] shrink-0 md:block">
          <div
            className="absolute inset-0 bg-[#0b1c1d]/95 backdrop-blur-md"
            style={{ clipPath: "path('M0 0 H46 V80 C23 80 23 48 0 48 Z')" }}
          />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 46 80" preserveAspectRatio="none">
            <path d="M0 47.5 C23 47.5 23 79.5 46 79.5" fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
          </svg>
        </div>

        {/* Center content */}
        <div className="relative -ml-px h-full min-w-0 flex-1">
          <div className="absolute inset-0 bg-[#0b1c1d]/95 backdrop-blur-md md:rounded-b-none">
            <Hairlines />
          </div>

          <div className="relative flex h-full items-center justify-between gap-3 px-4 md:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <Image src="/logo.png" alt="BTS Lab" width={96} height={96} priority className="h-9 w-auto object-contain brightness-0 invert" />
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-display text-base font-extrabold tracking-tight text-white">
                  BTS <span className="text-brand-mint">Lab</span>
                </span>
                <span className="mt-0.5 font-mono-tag text-[8px] uppercase tracking-[0.18em] text-white/55">
                  Fix · Sell · Trust
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 lg:flex">
              {NAV.map((item) => {
                const hasMenu = !!item.menu;
                const menuOpen = openMenu === item.label;
                const activeState = isActive(item.href) || menuOpen;
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hasMenu && open(item.label)}
                    onMouseLeave={() => hasMenu && scheduleClose()}
                  >
                    <Link
                      href={item.href}
                      onFocus={() => hasMenu && open(item.label)}
                      onClick={() => setOpenMenu(null)}
                      aria-expanded={hasMenu ? menuOpen : undefined}
                      aria-haspopup={hasMenu || undefined}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors ${
                        activeState ? "text-brand-mint" : "text-white/75 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {hasMenu && (
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
                      )}
                    </Link>

                    <AnimatePresence>
                      {hasMenu && menuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3"
                        >
                          <div
                            className={`grid overflow-hidden rounded-2xl border border-ink/10 bg-paper/95 shadow-[0_30px_60px_-22px_rgba(13,43,46,0.45)] backdrop-blur-xl ${
                              item.feature ? "w-[620px] grid-cols-[1.4fr_1fr]" : "w-[380px]"
                            }`}
                          >
                            <div>
                              <p className="border-b border-ink/8 px-4 pb-2.5 pt-3.5 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                                {item.menuTitle ?? "What we fix"}
                              </p>
                              <div className="p-1.5">
                                {item.menu!.map((sub) => {
                                  const Icon = sub.icon;
                                  return (
                                    <Link
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={() => setOpenMenu(null)}
                                      className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-brand/5"
                                    >
                                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover/item:bg-brand group-hover/item:text-paper">
                                        {Icon && <Icon className="h-5 w-5" strokeWidth={2} />}
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm font-bold text-ink transition-colors group-hover/item:text-brand">
                                          {sub.label}
                                        </span>
                                        {sub.desc && (
                                          <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{sub.desc}</span>
                                        )}
                                      </span>
                                    </Link>
                                  );
                                })}
                              </div>
                              <Link
                                href="/repair"
                                onClick={() => setOpenMenu(null)}
                                className="flex items-center justify-between border-t border-ink/8 bg-paper-dim px-4 py-3 text-sm font-bold text-brand transition-colors hover:bg-brand/5"
                              >
                                Book a repair
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>

                            {item.feature && (
                              <Link
                                href={item.feature.href}
                                onClick={() => setOpenMenu(null)}
                                className="group/feat relative flex flex-col justify-end overflow-hidden bg-linear-to-br from-brand to-brand-deep p-5 text-paper"
                              >
                                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-mint/30 blur-2xl" aria-hidden />
                                <Sparkles className="h-6 w-6 text-brand-mint" />
                                <span className="mt-3 font-display text-base font-extrabold leading-tight">{item.feature.title}</span>
                                <span className="mt-1.5 text-xs leading-relaxed text-paper/80">{item.feature.desc}</span>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-mint">
                                  {item.feature.cta}
                                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/feat:translate-x-0.5" />
                                </span>
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="hidden items-center gap-2 lg:flex">
              <BookCta onClick={() => setOpenMenu(null)} />

              {status === "loading" ? (
                <span className="h-9 w-9 rounded-full skeleton skeleton-dark" />
              ) : session?.user ? (
                <div className="relative" onMouseEnter={() => open(PROFILE_MENU)} onMouseLeave={scheduleClose}>
                  <button
                    type="button"
                    onClick={() => setOpenMenu((m) => (m === PROFILE_MENU ? null : PROFILE_MENU))}
                    aria-expanded={openMenu === PROFILE_MENU}
                    aria-haspopup="menu"
                    className="focus-ring flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition hover:bg-white/10"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-xs font-bold text-paper">
                      {initialsOf(session.user.name)}
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 text-white/60 transition-transform ${openMenu === PROFILE_MENU ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {openMenu === PROFILE_MENU && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute right-0 top-full z-40 pt-3"
                      >
                        <div className="w-60 overflow-hidden rounded-2xl border border-ink/10 bg-paper p-1.5 shadow-[0_24px_50px_-20px_rgba(13,43,46,0.4)]">
                          <div className="border-b border-ink/8 px-3 py-2.5">
                            <p className="truncate font-display text-sm font-bold text-ink">{session.user.name || "Your account"}</p>
                            <p className="truncate text-xs text-ink-soft">{session.user.email}</p>
                          </div>
                          <Link href="/account" onClick={() => setOpenMenu(null)} className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand">
                            <User className="h-4 w-4" /> Profile
                          </Link>
                          <Link href="/account#requests" onClick={() => setOpenMenu(null)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                          </Link>
                          {session.user.role === "ADMIN" && (
                            <Link href="/admin" onClick={() => setOpenMenu(null)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand">
                              <Shield className="h-4 w-4" /> Admin panel
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenu(null);
                              signOut({ callbackUrl: "/" });
                            }}
                            className="mt-1 flex w-full items-center gap-2.5 rounded-xl border-t border-ink/8 px-3 py-2.5 text-left text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand"
                          >
                            <LogOut className="h-4 w-4" /> Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="focus-ring inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white">
                  Log in
                </Link>
              )}
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-1 lg:hidden">
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-brand-mint hover:text-brand-mint"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right corner */}
        <div className="relative -ml-px hidden h-full w-[46px] shrink-0 md:block">
          <div
            className="absolute inset-0 bg-[#0b1c1d]/95 backdrop-blur-md"
            style={{ clipPath: "path('M0 0 H46 V48 C23 48 23 80 0 80 Z')" }}
          />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 46 80" preserveAspectRatio="none">
            <path d="M0 79.5 C23 79.5 23 47.5 46 47.5" fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} />
          </svg>
        </div>
      </div>

      {/* Right rail */}
      <div className="relative -ml-px hidden h-12 min-w-0 flex-1 bg-[#0b1c1d]/95 backdrop-blur-md md:block">
        <Hairlines />
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-3 top-[5.5rem] rounded-2xl border border-ink/10 bg-paper p-3 shadow-[0_24px_50px_-20px_rgba(13,43,46,0.4)] lg:hidden"
          >
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-3 text-[15px] font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand"
                  >
                    {item.label}
                  </Link>
                  {item.menu && (
                    <div className="mb-1 ml-3 border-l border-ink/10 pl-3">
                      {item.menu.slice(0, -1).map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-ink/60 hover:text-brand"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="my-2 h-px bg-ink/8" />

              {session?.user ? (
                <>
                  <Link href="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link href="/account#requests" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand">
                      <Shield className="h-4 w-4" /> Admin panel
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center gap-2 rounded-xl px-3 py-3 text-left font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand"
                  >
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand">
                  Log in
                </Link>
              )}

              <div className="mt-2 px-1">
                <BookCta onClick={() => setMobileOpen(false)} className="w-full justify-between" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
