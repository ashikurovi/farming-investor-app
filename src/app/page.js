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
    <main className="min-h-screen space-y-10 bg-zinc-50">
      <HomeHero />
      {/* <HomeStatsSnapshot /> */}
      <div className="py-5">
        <HomeLiveKpis />
      </div>
      <div className="py-5">
        <HomeRecentProjects projects={recentProjects} />
      </div>
      <div className="py-5">
        <HomeHowItWorks />
      </div>
      <div className="py-5">
        <HomeWhyChooseUs />
      </div>
      <div className="py-5">
        <HomeGalleryPreview />
      </div>
      <div className="py-5">
        <HomeBlogSection />
      </div>
      {/* Blog */}
      <div className="py-5">
        <HomeTestimonials />
      </div>
      <div className="py-5">
        <HomeFaq />
      </div>
      <WhatsAppButton />
    </main>
  );
}
