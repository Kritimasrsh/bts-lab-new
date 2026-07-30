"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Tag,
  Smartphone,
  Wrench,
  ClipboardList,
  UsersRound,
  ExternalLink,
  LogOut,
  type LucideIcon,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: LucideIcon; exact?: boolean };
type NavGroup = { title: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  {
    title: "General",
    items: [{ href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true }],
  },
  {
    title: "Catalog",
    items: [
      { href: "/admin/brands", label: "Brands", icon: Tag },
      { href: "/admin/models", label: "Models", icon: Smartphone },
      { href: "/admin/services", label: "Repair Services", icon: Wrench },
    ],
  },
  {
    title: "Customers",
    items: [
      { href: "/admin/bookings", label: "Bookings", icon: ClipboardList },
      { href: "/admin/users", label: "Users", icon: UsersRound },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);

export default function AdminShell({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName?: string | null;
  userEmail?: string | null;
}) {
  const pathname = usePathname();
  const active = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="min-h-screen bg-paper-dim text-ink">
      <div className="flex w-full">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink/10 bg-paper px-4 py-5 lg:flex">
          <Link href="/admin" className="flex items-center gap-2 px-2">
            <Image src="/logo.png" alt="BTS Lab" width={40} height={40} className="h-8 w-auto object-contain" />
            <span className="font-display text-lg font-extrabold tracking-tight">
              BTS <span className="text-brand">Admin</span>
            </span>
          </Link>

          <nav className="mt-7 flex flex-1 flex-col gap-6 overflow-y-auto">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <p className="px-3 pb-1.5 font-mono-tag text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                  {group.title}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.items.map(({ href, label, icon: Icon, exact }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        active(href, exact)
                          ? "bg-brand/10 text-brand"
                          : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-4 space-y-2 border-t border-ink/10 pt-4">
            <div className="px-3">
              <p className="truncate text-sm font-semibold text-ink">{userName || "Admin"}</p>
              <p className="truncate text-xs text-ink-soft">{userEmail}</p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-ink/5 hover:text-brand"
            >
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-ink/70 transition hover:bg-ink/5 hover:text-brand"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Mobile top nav */}
          <header className="sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <Link href="/admin" className="font-display text-base font-extrabold">
                BTS <span className="text-brand">Admin</span>
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full p-2 text-ink/70 hover:text-brand"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
            <div className="no-scrollbar flex gap-1 overflow-x-auto px-4 pb-2">
              {ALL.map(({ href, label, icon: Icon, exact }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    active(href, exact) ? "bg-brand/10 text-brand" : "text-ink/70"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              ))}
            </div>
          </header>

          <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 sm:py-8 2xl:max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
