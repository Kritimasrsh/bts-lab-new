"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/Toast";
import SmoothScroll from "@/components/SmoothScroll";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        forcedTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <SmoothScroll>
          <ToastProvider>{children}</ToastProvider>
        </SmoothScroll>
      </ThemeProvider>
    </SessionProvider>
  );
}
