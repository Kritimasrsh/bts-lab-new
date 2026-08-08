import ServicesHero from "@/components/services/ServicesHero";
import BrandStrip from "@/components/services/BrandStrip";
import ServicesStack from "@/components/services/ServicesStack";
import BoardLevelHighlight from "@/components/services/BoardLevelHighlight";
import ServiceSteps from "@/components/services/ServiceSteps";
import FAQ from "@/components/sections/FAQ";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Repair Services | BTS Lab",
  description:
    "Screen, battery, water damage, camera, audio and board-level repair for every major phone brand in Kathmandu. Free diagnosis, genuine parts, warranty on every fix.",
};

export default function ServicesPage() {
  return (
    <>
      {/* static content — top */}
      <ServicesHero />
      <BrandStrip />

      {/* the service menu — stacking cards */}
      <ServicesStack />

      {/* static content — bottom */}
      <BoardLevelHighlight />
      <ServiceSteps />
      <FAQ />
      <CtaBanner
        title="Not sure what's wrong with it?"
        subtitle="Bring it in for a free diagnostic. No pressure, no obligation, and we find the fault before you spend a rupee."
        ctaLabel="Start a repair"
        ctaHref="/#select-brand"
      />
    </>
  );
}
