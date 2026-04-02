"use client";

import { ProjectCard } from "./ProjectCard";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
import { Loader } from "@/components/ui/loader";

export function ProjectFeed() {
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetProjectsQuery({
    limit: 100,
    page: 1,
  });

  const rawProjects = Array.isArray(projectsData)
    ? projectsData
    : projectsData?.items || projectsData?.data || [];

  const projects = rawProjects.map((item) => {
    const cleanUrl = (u) =>
      typeof u === "string" ? u.replace(/[`]/g, "").trim() : "";
    return {
      projectId: item.id,
      title: item.name || "Untitled Project",
      location: item.location || "Bangladesh",
      category: item.category || "Others",
      roi: item.roi || 0,
      images: [cleanUrl(item.photoUrl)],
      totalCost: Number(item.totalCost || 0),
      totalInvestment: Number(item.totalInvestment || 0),
      totalSell: Number(item.totalSell || 0),
      totalProfit: Number(item.totalProfit || 0),
      distributedProfit: Number(item.distributedProfit || 0),
      project_details: item.description || "No description available.",
    };
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-zinc-50 min-h-screen flex justify-center items-center">
        <Loader size="lg" />
      </section>
    );
  }

  return (
    <section id="project-feed" className="py-14 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Projects
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
              Explore <span className="font-serif italic">real</span>{" "}
              <span className="font-serif italic text-emerald-700">
                farming investments
              </span>
              .
            </h2>

            <p className="text-zinc-500 text-xs md:text-lg leading-relaxed max-w-xl">
              Browse active opportunities with transparent cost, funding, and
              progress updates.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-600 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {projects.length} items
          </div>
        </div>

        {isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-lg font-medium text-zinc-900">
              Projects load hoyni
            </h3>
            <p className="text-zinc-500 max-w-md mt-2">
              Network issue ba server error hote pare. Pore abar try korun.
            </p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-lg font-medium text-zinc-900">
              No projects found
            </h3>
            <p className="text-zinc-500 max-w-md mt-2">
              Currently kono project available nei.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
