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
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-primary" />
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
          We could not retrieve the project details. It might have been deleted
          or does not exist.
        </p>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  // Helper for URL cleaning
  const cleanUrl = (u) =>
    typeof u === "string" ? u.replace(/[`]/g, "").trim() : "";

  // Map API response to component props
  const project = {
    id: rawProject.id || "",
    name: rawProject.name || "Untitled Project",
    location: rawProject.location || "Bangladesh",
    photoUrl: rawProject.photoUrl ? cleanUrl(rawProject.photoUrl) : "",
    description: rawProject.description || "No description available.",
    glarry: rawProject.glarry || [],
    totalInvestment: rawProject.totalInvestment || 0,
    totalCost: rawProject.totalCost || 0,
    totalSell: rawProject.totalSell || 0,
    totalProfit: rawProject.totalProfit || 0,
    distributedProfit: rawProject.distributedProfit || 0,
    category: rawProject.category || "Others",
    roi: rawProject.roi || 0,
  };

  // Process similar projects
  const rawProjectsList = Array.isArray(projectsData)
    ? projectsData
    : projectsData?.items || projectsData?.data || [];

  const similarProjects = rawProjectsList
    .filter(
      (p) =>
        (p.category || "Others") === (rawProject.category || "Others") &&
        p.id !== project.id,
    )
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      name: p.name || "Untitled Project",
      photoUrl: p.photoUrl ? cleanUrl(p.photoUrl) : "",
    }));

  return <ProjectDetails project={project} similarProjects={similarProjects} />;
}
