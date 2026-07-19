import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, Clock } from "lucide-react";

const PERKS = [
  { icon: ShieldCheck, text: "90-day warranty on every repair" },
  { icon: Truck, text: "Free doorstep pickup & delivery" },
  { icon: Clock, text: "Track your repair from your account" },
];

/** Split-screen auth layout: branded teal panel + form card. */
export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* left — brand panel (hidden on small screens) */}
      <div className="relative hidden overflow-hidden bg-brand-deep lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-10" aria-hidden />
        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper p-1">
            <Image src="/logo.png" alt="BTS Lab" width={44} height={44} className="h-full w-auto object-contain" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-paper">
            BTS <span className="text-brand-mint">Lab</span>
          </span>
        </Link>

        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold leading-tight text-paper">
            The repair lab that
            <br />
            actually earns your trust.
          </h2>
          <ul className="mt-8 space-y-4">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-paper/85">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/10 text-brand-mint">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative font-mono-tag text-xs uppercase tracking-widest text-paper/40">
          © {new Date().getFullYear()} BTS Lab · Kathmandu, Nepal
        </p>
      </div>

      {/* right — form */}
      <div className="flex flex-col items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {/* mobile logo (brand panel is hidden on small screens) */}
          <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink/10 bg-paper p-1">
              <Image src="/logo.png" alt="BTS Lab" width={40} height={40} className="h-full w-auto object-contain" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-ink">
              BTS <span className="text-brand">Lab</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>
          <div className="mt-8">{children}</div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-brand"
          >
            ← Back to btslab.com
          </Link>
        </div>
      </div>
    </div>
  );
}
