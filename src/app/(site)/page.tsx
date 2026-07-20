import Hero from "@/components/Hero";
import BrandCarousel from "@/components/BrandCarousel";
import BrandGrid from "@/components/BrandGrid";
import ServicesWheel from "@/components/ServicesWheel";
import Manifesto from "@/components/Manifesto";
import AboutSplit from "@/components/AboutSplit";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import GoogleReviews from "@/components/GoogleReviews";
import DoorstepCta from "@/components/DoorstepCta";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandCarousel />
      <BrandGrid />
      <ServicesWheel />
      <Manifesto />
      <HowItWorks />
      <AboutSplit />
      {/*<Testimonials />*/}
      <GoogleReviews />
      <DoorstepCta />
    </>
  );
}
