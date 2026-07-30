"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown, ArrowUpRight, User, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

function initialsOf(name?: string | null) {
  if (!name) return "ME";
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

const PROFILE_MENU = "__profile__";

/* ---------------- Nav model — trimmed to the essentials ---------------- */

type SubLink = { label: string; href: string };
type NavLink = { label: string; href: string; menu?: SubLink[] };

const SERVICE_LINKS: SubLink[] = [
  { label: "Screen replacement", href: "/services" },
  { label: "Battery replacement", href: "/services" },
  { label: "Water damage rescue", href: "/services" },
  { label: "Board-level repair", href: "/services" },
  { label: "All repair services", href: "/services" },
];

const NAV: NavLink[] = [
  { label: "Services", href: "/services", menu: SERVICE_LINKS },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ---------------- Signature CTA (arrow-badge pill) ---------------- */

function BookCta({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href="/services"
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

/* ---------------- Navbar ---------------- */

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Only "float" once the user has scrolled past 40% of the viewport height.
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function open(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Light text only over the homepage hero, before scrolling.
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;
  const linkColor = transparent
    ? "text-paper/85 hover:text-paper"
    : "text-ink/70 hover:text-brand";

  // Same width in both states. At the top it's flat (no border/shadow); once
  // past 40% of the viewport it detaches into a floating, elevated pill.
  const chrome = scrolled
    ? "mt-3 rounded-full border-ink/10 bg-paper/90 shadow-[0_14px_36px_-14px_rgba(13,43,46,0.42)] backdrop-blur-md"
    : "mt-0 rounded-none border-transparent bg-transparent shadow-none";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-5">
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 border px-5 transition-[margin-top,background-color,border-color,box-shadow,border-radius] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 ${chrome}`}
      >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png"
              alt="BTS Lab"
              width={96}
              height={96}
              priority
              className={`h-9 w-auto object-contain ${transparent ? "brightness-0 invert" : ""}`}
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span
                className={`font-display text-base font-extrabold tracking-tight ${
                  transparent ? "text-paper" : "text-ink"
                }`}
              >
                BTS <span className={transparent ? "text-brand-mint" : "text-brand"}>Lab</span>
              </span>
              <span
                className={`mt-0.5 font-mono-tag text-[8px] uppercase tracking-[0.18em] ${
                  transparent ? "text-paper/60" : "text-ink-soft"
                }`}
              >
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
                      activeState
                        ? transparent
                          ? "text-paper"
                          : "text-brand"
                        : linkColor
                    }`}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${
                          menuOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {hasMenu && menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3"
                      >
                        <div className="w-60 overflow-hidden rounded-2xl border border-ink/10 bg-paper p-1.5 shadow-[0_24px_50px_-20px_rgba(13,43,46,0.4)]">
                          {item.menu!.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setOpenMenu(null)}
                              className="block rounded-xl px-3.5 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right side — Book a Repair first, profile/login on the far right */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <BookCta onClick={() => setOpenMenu(null)} />

            {status === "loading" ? (
              <span
                className={`h-9 w-9 rounded-full ${
                  transparent ? "skeleton skeleton-dark" : "skeleton"
                }`}
              />
            ) : session?.user ? (
              <div
                className="relative"
                onMouseEnter={() => open(PROFILE_MENU)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu((m) => (m === PROFILE_MENU ? null : PROFILE_MENU))
                  }
                  aria-expanded={openMenu === PROFILE_MENU}
                  aria-haspopup="menu"
                  className={`focus-ring flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 transition ${
                    transparent ? "hover:bg-paper/10" : "hover:bg-ink/5"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand font-display text-xs font-bold text-paper">
                    {initialsOf(session.user.name)}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      openMenu === PROFILE_MENU ? "rotate-180" : ""
                    } ${transparent ? "text-paper/80" : "text-ink/60"}`}
                  />
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
                          <p className="truncate font-display text-sm font-bold text-ink">
                            {session.user.name || "Your account"}
                          </p>
                          <p className="truncate text-xs text-ink-soft">{session.user.email}</p>
                        </div>
                        <Link
                          href="/account"
                          onClick={() => setOpenMenu(null)}
                          className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand"
                        >
                          <User className="h-4 w-4" /> Profile
                        </Link>
                        <Link
                          href="/account#requests"
                          onClick={() => setOpenMenu(null)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Link>
                        {session.user.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            onClick={() => setOpenMenu(null)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/75 transition-colors hover:bg-brand/5 hover:text-brand"
                          >
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
              <Link
                href="/login"
                className={`focus-ring inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                  transparent ? "text-paper hover:bg-paper/10" : "text-ink/75 hover:text-brand"
                }`}
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden ${
              transparent
                ? "border-paper/30 text-paper hover:border-paper"
                : "border-ink/10 text-ink hover:border-brand hover:text-brand"
            }`}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-4 mt-1 rounded-2xl border border-ink/10 bg-paper p-3 shadow-[0_24px_50px_-20px_rgba(13,43,46,0.4)] lg:hidden"
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
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    href="/account#requests"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand"
                    >
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
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-3 font-semibold text-ink/80 hover:bg-brand/5 hover:text-brand"
                >
                  Log in
                </Link>
              )}

              <div className="mt-2 px-1">
                <BookCta
                  onClick={() => setMobileOpen(false)}
                  className="w-full justify-between"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
