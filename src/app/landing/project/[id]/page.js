"use client";

import {
  useGetProjectQuery,
  useGetProjectsQuery,
} from "@/features/admin/projects/projectsApiSlice";
import { ProjectDetails } from "../../../../components/landing/project/ProjectDetails";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function ProjectDetailsPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const { data: rawProject, isLoading, isError } = useGetProjectQuery(id);

  const { data: projectsData } = useGetProjectsQuery({ limit: 100 });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-sm font-medium text-zinc-600">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !rawProject) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 text-center">
        <h3 className="text-lg font-semibold text-zinc-900">
          Project Not Found
        </h3>
        <p className="max-w-xs text-sm text-zinc-500">
          We couldn't retrieve the project details. It might have been deleted
          or doesn't exist.
        </p>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  // Helper for URL cleaning
  const cleanUrl = (u) =>
    typeof u === "string" ? u.replace(/[`]/g, "").trim() : u;

  // Map API response to component props
  const project = {
    projectId: rawProject.id || "",
    title: rawProject.name || "Untitled Project",
    location: rawProject.location || "Bangladesh",
    category: rawProject.category || "Others",
    roi: rawProject.roi || 0,
    images: rawProject.photoUrl ? [cleanUrl(rawProject.photoUrl)] : [],
    totalCost: Number(rawProject.totalCost || 0),
    totalInvestment: Number(rawProject.totalInvestment || 0),
    project_details: rawProject.description || "No description available.",
    amount: Number(rawProject.minInvestment || 0),
    duration: rawProject.duration || "0",
    code: rawProject.code || "N/A",
    investment_highlight: rawProject.investment_highlight || [],
  };

  // Process similar projects
  const rawProjectsList = Array.isArray(projectsData)
    ? projectsData
    : projectsData?.items || projectsData?.data || [];

  const similarProjects = rawProjectsList
    .filter(
      (p) =>
        (p.category || "Others") === project.category &&
        p.id !== project.projectId,
    )
    .slice(0, 3)
    .map((p) => ({
      projectId: p.id,
      title: p.name || "Untitled Project",
      images: p.photoUrl ? [cleanUrl(p.photoUrl)] : [],
      roi: p.roi || 0,
      duration: p.duration || "0",
    }));

  return <ProjectDetails project={project} similarProjects={similarProjects} />;
}
