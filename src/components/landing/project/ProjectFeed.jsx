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
      typeof u === "string" ? u.replace(/[`]/g, "").trim() : u;
    return {
      projectId: item.id,
      title: item.name || "Untitled Project",
      location: item.location || "Bangladesh",
      category: item.category || "Others",
      roi: item.roi || 0,
      images: [cleanUrl(item.photoUrl)],
      totalCost: Number(item.totalCost || 0),
      totalInvestment: Number(item.totalInvestment || 0),
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
    <section id="project-feed" className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
              Projects
            </h2>
            <p className="text-sm text-zinc-500">
              Browse active investment opportunities.
            </p>
          </div>
          <div className="hidden md:block text-sm text-zinc-500">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
