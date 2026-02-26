import { getRecentProjects } from "../data/projects";
import HomeFaq from "../components/home/HomeFaq";
import HomeGalleryPreview from "../components/home/HomeGalleryPreview";
import HomeHero from "../components/home/HomeHero";
import HomeHowItWorks from "../components/home/HomeHowItWorks";
import HomeLiveKpis from "../components/home/HomeLiveKpis";
import HomeRecentProjects from "../components/home/HomeRecentProjects";
import HomeStatsSnapshot from "../components/home/HomeStatsSnapshot";
import HomeTestimonials from "../components/home/HomeTestimonials";
import HomeWhyChooseUs from "../components/home/HomeWhyChooseUs";

export default function Home() {
  const recentProjects = getRecentProjects(4);

  return (
    <div className="bg-white text-zinc-900 dark:bg-black dark:text-zinc-50">
      <HomeHero />
      {/* <HomeStatsSnapshot /> */}
      <HomeLiveKpis />
      <HomeHowItWorks />
      <HomeWhyChooseUs />
      <HomeRecentProjects projects={recentProjects} />
      <HomeGalleryPreview />
      <HomeTestimonials />
      <HomeFaq />
    </div>
  );
}
