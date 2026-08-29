"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
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
  type LucideIcon,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

/* ------------------------------------------------------------------ */
/*  Dynamic-island floating navbar — a black glass pill that morphs   */
/*  open (like the iPhone Dynamic Island) for dropdowns & mobile menu */
/* ------------------------------------------------------------------ */

function initialsOf(name?: string | null) {
  if (!name) return "ME";
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

type SubLink = { label: string; href: string; desc?: string; icon?: LucideIcon };
type NavItem = { label: string; href: string; menu?: SubLink[]; menuTitle?: string };

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

const NAV: NavItem[] = [
  { label: "Services", href: "/services", menu: SERVICE_LINKS, menuTitle: "What we fix" },
  { label: "Shop", href: "/shop", menu: SHOP_LINKS, menuTitle: "Buy · Sell · Exchange" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const PROFILE = "__profile__";
const MOBILE = "__mobile__";

const spring = { type: "spring", stiffness: 420, damping: 36, mass: 0.9 } as const;

export default function IslandNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Collapse the island whenever the route changes.
  useEffect(() => setOpen(null), [pathname]);

  function expand(key: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }
  function scheduleCollapse() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const activeItem = NAV.find((n) => n.label === open);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
      <motion.nav
        layout
        transition={spring}
        onMouseLeave={scheduleCollapse}
        onMouseEnter={() => closeTimer.current && clearTimeout(closeTimer.current)}
        className="pointer-events-auto overflow-hidden border border-white/60 bg-white/55 text-ink shadow-[0_18px_50px_-16px_rgba(180,100,40,0.35)] ring-1 ring-ink/5 backdrop-blur-2xl backdrop-saturate-150"
        style={{ borderRadius: 28 }}
        animate={{ scale: scrolled && !open ? 0.97 : 1 }}
      >
        {/* ---- Pill row ---- */}
        <motion.div layout="position" className="flex h-[52px] items-center gap-1 pl-3 pr-2">
          <Link href="/" className="flex items-center gap-2 pr-2 transition-opacity hover:opacity-85">
            <Image
              src="/logo.png"
              alt="BTS Lab"
              width={72}
              height={72}
              priority
              className="h-7 w-auto object-contain"
            />
            <span className="hidden font-display text-sm font-extrabold tracking-tight sm:block">
              BTS <span className="text-[#e85d04]">Lab</span>
            </span>
          </Link>

          <span className="hidden h-5 w-px bg-ink/10 lg:block" aria-hidden />

          {/* Desktop links */}
          <div className="hidden items-center lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => (item.menu ? expand(item.label) : scheduleCollapse())}
                onFocus={() => item.menu && expand(item.label)}
                onClick={() => setOpen(null)}
                className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
                  isActive(item.href) || open === item.label
                    ? "text-[#e85d04]"
                    : "text-ink/65 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <span className="hidden h-5 w-px bg-ink/10 lg:block" aria-hidden />

          {/* CTA */}
          <Link
            href="/repair"
            onClick={() => setOpen(null)}
            className="group ml-1 hidden items-center gap-1.5 rounded-full bg-[#ff6b1a] py-1.5 pl-4 pr-1.5 font-display text-[13px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(232,93,4,0.7)] transition-colors hover:bg-[#e85d04] sm:inline-flex"
          >
            Book a Repair
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#ff6b1a] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </Link>

          {/* Profile / login */}
          {status === "loading" ? (
            <span className="ml-1 hidden h-8 w-8 animate-pulse rounded-full bg-ink/10 lg:block" />
          ) : session?.user ? (
            <button
              type="button"
              onMouseEnter={() => expand(PROFILE)}
              onClick={() => setOpen((m) => (m === PROFILE ? null : PROFILE))}
              aria-expanded={open === PROFILE}
              className="ml-1 hidden h-8 w-8 items-center justify-center rounded-full bg-[#ff6b1a]/12 font-display text-[11px] font-bold text-[#e85d04] ring-1 ring-[#ff6b1a]/30 transition hover:ring-[#ff6b1a]/60 lg:flex"
            >
              {initialsOf(session.user.name)}
            </button>
          ) : (
            <Link
              href="/login"
              className="ml-0.5 hidden rounded-full px-3 py-2 text-[13px] font-semibold text-ink/65 transition hover:text-ink lg:block"
            >
              Log in
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((m) => (m === MOBILE ? null : MOBILE))}
            aria-label="Toggle menu"
            aria-expanded={open === MOBILE}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-ink/5 hover:text-ink lg:hidden"
          >
            {open === MOBILE ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </motion.div>

        {/* ---- Expanded content (island morphs open) ---- */}
        <AnimatePresence mode="popLayout">
          {activeItem?.menu && (
            <motion.div
              key={activeItem.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.06 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
              className="hidden w-[560px] px-3 pb-3 lg:block"
            >
              <p className="px-2 pb-2 pt-1 font-mono-tag text-[10px] uppercase tracking-[0.2em] text-ink/45">
                {activeItem.menuTitle}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {activeItem.menu.map((sub) => {
                  const Icon = sub.icon;
                  return (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setOpen(null)}
                      className="group/item flex items-start gap-3 rounded-2xl p-2.5 transition-colors hover:bg-white/70"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff6b1a]/12 text-[#e85d04] transition-colors group-hover/item:bg-[#ff6b1a] group-hover/item:text-white">
                        {Icon && <Icon className="h-4.5 w-4.5" strokeWidth={2} />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-bold text-ink/85 group-hover/item:text-ink">
                          {sub.label}
                        </span>
                        {sub.desc && (
                          <span className="mt-0.5 block text-[11.5px] leading-snug text-ink/50">{sub.desc}</span>
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/repair"
                onClick={() => setOpen(null)}
                className="mt-2 flex items-center justify-between rounded-2xl bg-white/50 px-4 py-3 text-[13px] font-bold text-[#e85d04] transition-colors hover:bg-white/80"
              >
                Book a repair
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}

          {open === PROFILE && session?.user && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.06 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
              className="hidden w-[280px] px-3 pb-3 lg:block"
            >
              <div className="border-b border-ink/10 px-2 pb-2.5 pt-1">
                <p className="truncate font-display text-sm font-bold text-ink">
                  {session.user.name || "Your account"}
                </p>
                <p className="truncate text-xs text-ink/50">{session.user.email}</p>
              </div>
              <div className="pt-1.5">
                <Link href="/account" onClick={() => setOpen(null)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink/65 transition-colors hover:bg-white/70 hover:text-ink">
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link href="/account#requests" onClick={() => setOpen(null)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink/65 transition-colors hover:bg-white/70 hover:text-ink">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setOpen(null)} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-ink/65 transition-colors hover:bg-white/70 hover:text-ink">
                    <Shield className="h-4 w-4" /> Admin panel
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(null);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-ink/65 transition-colors hover:bg-white/70 hover:text-ink"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </motion.div>
          )}

          {/* ---- Mobile menu (island grows into a card) ---- */}
          {open === MOBILE && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.22, delay: 0.06 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
              className="w-[calc(100vw-24px)] max-w-sm px-3 pb-3 lg:hidden"
            >
              <div className="flex flex-col">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(null)}
                    className={`rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors hover:bg-white/70 ${
                      isActive(item.href) ? "text-[#e85d04]" : "text-ink/75 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="my-2 h-px bg-ink/10" />

                {session?.user ? (
                  <>
                    <Link href="/account" onClick={() => setOpen(null)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/65 hover:bg-white/70 hover:text-ink">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    {session.user.role === "ADMIN" && (
                      <Link href="/admin" onClick={() => setOpen(null)} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/65 hover:bg-white/70 hover:text-ink">
                        <Shield className="h-4 w-4" /> Admin panel
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(null);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink/65 hover:bg-white/70 hover:text-ink"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setOpen(null)} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/65 hover:bg-white/70 hover:text-ink">
                    Log in
                  </Link>
                )}

                <Link
                  href="/repair"
                  onClick={() => setOpen(null)}
                  className="group mt-2 flex items-center justify-between rounded-2xl bg-[#ff6b1a] py-3 pl-4 pr-2 font-display text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(232,93,4,0.7)]"
                >
                  Book a Repair
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#ff6b1a]">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
