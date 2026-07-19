import type { ReactNode } from "react";

// Auth pages render standalone (no site navbar/footer) — the AuthShell provides
// its own branded chrome.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen">{children}</main>;
}
