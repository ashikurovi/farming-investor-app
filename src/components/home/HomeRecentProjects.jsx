"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
import { Loader } from "@/components/ui/loader";
import { ProjectCard } from "@/components/landing/project/ProjectCard";

export default function HomeRecentProjects() {
  const { data: projectsData, isLoading } = useGetProjectsQuery({
    limit: 4,
    page: 1,
  });

  const rawProjects = Array.isArray(projectsData)
    ? projectsData
    : projectsData?.items || projectsData?.data || [];

  const resolveImageSrc = (img) => {
    if (!img) return "";
    const s = String(img).replace(/[`]/g, "").trim();
    if (!s) return "";
    if (s.startsWith("http") || s.startsWith("/")) return s;
    return `/images/${s}`;
  };

  const projects = rawProjects.map((item) => ({
    projectId: item.id,
    title: item.name || "Untitled Project",
    location: item.location || "Bangladesh",
    category: item.category || "Others",

    images: item.photoUrl ? [resolveImageSrc(item.photoUrl)] : [],
    totalCost: Number(item.totalCost || 0),
    totalInvestment: Number(item.totalInvestment || 0),
    totalSell: Number(item.totalSell || 0),
    totalProfit: Number(item.totalProfit || 0),
    distributedProfit: Number(item.distributedProfit || 0),
    project_details: item.description || "No description available.",
  }));

  if (isLoading) {
    return (
      <section className="home-section bg-zinc-50 flex justify-center">
        <Loader size="lg" />
      </section>
    );
  }

  return (
    <section className="home-section bg-[#f6f7f4]">
      <div className="home-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="home-tag w-fit">
              <span className="home-tag-dot" />
              Opportunities
            </div>

            <h2 className="home-title leading-tight">
              Latest <span className="italic">investment</span>{" "}
              <span className="italic text-primary">opportunities</span>
              .
            </h2>

            <p className="home-subtitle max-w-xl">
              Curated agricultural assets offering stable yields and long-term
              capital appreciation.
            </p>
          </div>

          <Link
            href="/landing/project"
            className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-900 bg-white border border-zinc-200 rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.projectId} project={project} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/landing/project"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
