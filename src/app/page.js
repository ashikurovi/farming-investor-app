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

export default function Home() {
  const recentProjects = getRecentProjects(4);

  return (
    <main className="min-h-screen bg-zinc-50">
      <HomeHero />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20 -mt-10">
        <section id="live-kpis">
          <HomeLiveKpis />
        </section>

        <section id="recent-projects" className="space-y-6">
          <HomeRecentProjects projects={recentProjects} />
        </section>

        <section id="how-it-works" className="border-t border-zinc-200 pt-16">
          <HomeHowItWorks />
        </section>

        <section id="why-choose-us" className="border-t border-zinc-200 pt-16">
          <HomeWhyChooseUs />
        </section>

        <section id="gallery" className="border-t border-zinc-200 pt-16">
          <HomeGalleryPreview />
        </section>

        <section id="blog" className="border-t border-zinc-200 pt-16">
          <HomeBlogSection />
        </section>

        <section id="testimonials" className="border-t border-zinc-200 pt-16">
          <HomeTestimonials />
        </section>

        <section id="faq" className="border-t border-zinc-200 pt-16 pb-20">
          <HomeFaq />
        </section>
      </div>
    </main>
  );
}
