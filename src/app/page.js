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

  return (
    <main className="min-h-screen bg-zinc-50">
      <HomeHero />
      {/* <HomeStatsSnapshot /> */}
      <div className="py-10">
        <HomeLiveKpis />
      </div>
      <div className="py-10">
        <HomeRecentProjects projects={recentProjects} />
      </div>
      <div className="py-10">
        <HomeHowItWorks />
      </div>
      <div className="py-10">
        <HomeWhyChooseUs />
      </div>
      <div className="py-10">
        <HomeGalleryPreview />
      </div>
      <div className="py-10">
        <HomeBlogSection />
      </div>
      {/* Blog */}
      <div className="py-10">
        <HomeTestimonials />
      </div>
      <div className="py-10">
        <HomeFaq />
      </div>
      <WhatsAppButton />
    </main>
  );
}
