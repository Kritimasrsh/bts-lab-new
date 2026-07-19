import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/* pt-20 clears the fixed navbar; the home hero reclaims it with -mt-20 */}
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
