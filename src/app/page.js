import { getRecentProjects } from "../data/projects";
import HomeFaq from "../components/home/HomeFaq";
import HomeGalleryPreview from "../components/home/HomeGalleryPreview";
import HomeBlogSection from "../components/home/HomeBlogSection";
import HomeHero from "../components/home/HomeHero";
import HomeHowItWorks from "../components/home/HomeHowItWorks";
import HomeLiveKpis from "../components/home/HomeLiveKpis";
import HomeRecentProjects from "../components/home/HomeRecentProjects";
import HomeStatsSnapshot from "../components/home/HomeStatsSnapshot";
import HomeTestimonials from "../components/home/HomeTestimonials";
import HomeWhyChooseUs from "../components/home/HomeWhyChooseUs";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  const recentProjects = getRecentProjects(4);
  // bg-[#f6f7f4] aii sectionns er bg coloor hoba ai ta
  return (
    <main className="min-h-screen space-y-0 bg-[#f6f7f4] mb-10">
      <HomeHero />
      {/* <HomeStatsSnapshot /> */}
      <HomeLiveKpis />
      <HomeRecentProjects projects={recentProjects} />
      <HomeHowItWorks />
      <HomeWhyChooseUs />
      <HomeGalleryPreview />
      <HomeBlogSection />
      {/* Blog */}
      <HomeTestimonials />
      <HomeFaq />
      <WhatsAppButton />
    </main>
  );
}
