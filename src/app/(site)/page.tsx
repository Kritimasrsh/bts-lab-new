import Hero from "@/components/Hero";
import BrandCarousel from "@/components/BrandCarousel";
import BrandGrid from "@/components/BrandGrid";
import HomeServicesStack from "@/components/HomeServicesStack";
import Manifesto from "@/components/Manifesto";
import AboutSplit from "@/components/AboutSplit";
import HowItWorks from "@/components/HowItWorks";
import LabShowcase from "@/components/LabShowcase";
import SocialProof from "@/components/SocialProof";
import DoorstepCta from "@/components/DoorstepCta";
import FAQ from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandCarousel />
      <BrandGrid />
      <HomeServicesStack />
      <Manifesto />
      <HowItWorks />
      <LabShowcase />
      <AboutSplit />
      <SocialProof />
      <DoorstepCta />
      <FAQ />
    </>
  );
}
