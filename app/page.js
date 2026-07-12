import Hero from "./components/Hero";
import ServicesGrid from "./components/ServicesGrid";
import BuybackSection from "./components/BuybackSection";
import AcademySection from "./components/AcademySection";
import ShopTeaser from "./components/ShopTeaser";
import Testimonials from "./components/Testimonials";
import CtaBanner from "./components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <BuybackSection />
      <AcademySection />
      <ShopTeaser />
      <Testimonials />
      <CtaBanner />
    </>
  );
}