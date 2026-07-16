import Hero from "@/components/Hero";
import BrandCarousel from "@/components/BrandCarousel";
import BrandGrid from "@/components/BrandGrid";
import AboutSplit from "@/components/AboutSplit";
import ServicesBento from "@/components/ServicesBento";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import DoorstepCta from "@/components/DoorstepCta";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandCarousel />
      <BrandGrid />
      <AboutSplit />
      <ServicesBento />
      <HowItWorks />
      <Testimonials />
      <DoorstepCta />
    </>
  );
}
