import PhoneExperience from "@/components/home/PhoneExperience";
import {
  RepairServicesGlass,
  ProcessGlass,
  StatsGlass,
  CtaGlass,
} from "@/components/home/GlassHomeSections";

export default function Home() {
  return (
    <>
      <PhoneExperience />
      <RepairServicesGlass />
      <ProcessGlass />
      <StatsGlass />
      <CtaGlass />
    </>
  );
}
