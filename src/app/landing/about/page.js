import { AboutHero } from "../../../components/landing/about/AboutHero";
import { AboutMission } from "../../../components/landing/about/AboutMission";
import { AboutStakeholders } from "../../../components/landing/about/AboutStakeholders";

export const metadata = {
  title: "About Us | Framing Investor App",
  description: "Building the operating system for modern farm investing. Connecting capital with resilient, real-world farm projects.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutMission />
      <AboutStakeholders />
    </main>
  );
}
