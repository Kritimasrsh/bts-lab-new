import ServicesHero from "@/components/services/ServicesHero";
import BrandStrip from "@/components/services/BrandStrip";
import ServicesShowcase from "@/components/services/ServicesShowcase";
import BoardLevelHighlight from "@/components/services/BoardLevelHighlight";
import ServiceSteps from "@/components/services/ServiceSteps";
import CtaBanner from "@/components/CtaBanner";

export const metadata = {
  title: "Repair Services | BTS Lab",
  description:
    "Screen, battery, water damage, camera, audio and board-level repair for every major phone brand in Kathmandu. Free diagnosis, genuine parts, warranty on every fix.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <BrandStrip />
      <ServicesShowcase />
      <BoardLevelHighlight />
      <ServiceSteps />
      <CtaBanner
        title="Not sure what's wrong with it?"
        subtitle="Bring it in for a free diagnostic — no pressure, no obligation. We find the fault before you spend a rupee."
        ctaLabel="Start a repair"
        ctaHref="/#select-brand"
      />

    </>
  );
}