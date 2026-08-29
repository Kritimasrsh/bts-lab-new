import type { ReactNode } from "react";
import IslandNav from "@/components/IslandNav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <IslandNav />
      {/* pt-20 clears the floating island nav; the home hero reclaims it with -mt-20 */}
      <main className="flex-1 bg-[#f6f3ef] pt-20">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
