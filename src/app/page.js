import { getRecentProjects } from "../data/projects";
import HomeFaq from "../components/home/HomeFaq";
import HomeGalleryPreview from "../components/home/HomeGalleryPreview";
import HomeBlogSection from "../components/home/HomeBlogSection";
import HomeHero from "../components/home/HomeHero";
import HomeHowItWorks from "../components/home/HomeHowItWorks";
import HomeLiveKpis from "../components/home/HomeLiveKpis";
import HomeRecentProjects from "../components/home/HomeRecentProjects";
import HomeTestimonials from "../components/home/HomeTestimonials";
import HomeWhyChooseUs from "../components/home/HomeWhyChooseUs";
import HomeEntryModals from "../components/home/HomeEntryModals";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  const recentProjects = getRecentProjects(4);
  return (
    <main className="min-h-screen space-y-0 bg-[#f6f7f4] [background-image:radial-gradient(circle_at_top,rgba(77,140,30,0.10),transparent_55%)] ">
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
      {/* <HomeEntryModals /> */}
    </main>
  );
}
