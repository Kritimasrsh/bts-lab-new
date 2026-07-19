import "./globals.css";
import type { ReactNode } from "react";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import Providers from "@/components/Providers";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  title: "BTS Lab — Mobile Repair, Genuine Parts & Buyback | Nepal",
  description:
    "BTS Lab is your one-stop lab for mobile repairs, genuine parts and buyback in Nepal. Pick your brand, model and problem to get an instant quote — expert technicians, genuine parts, pickup & delivery, and same-day fixes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
