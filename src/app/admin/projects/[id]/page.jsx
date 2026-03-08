"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Wallet2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  useGetProjectQuery,
  useGetProjectStatsQuery,
  useGetProjectInvestmentInfoQuery,
  useGetProjectInvestorsQuery,
} from "@/features/admin/projects/projectsApiSlice";
import { AdminProjectInfoTab } from "@/app/admin/components/projects/AdminProjectInfoTab";
import { AdminProjectDailyReportsTab } from "@/app/admin/components/projects/AdminProjectDailyReportsTab";
import { AdminProjectGlarryTab } from "@/app/admin/components/projects/AdminProjectGlarryTab";

export default function AdminProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [activeTab, setActiveTab] = useState("info");

  const {
    data: project,
    isLoading,
    isFetching,
    isError,
  } = useGetProjectQuery(id, {
    skip: !id,
  });

  const {
    data: projectStats,
    isLoading: isStatsLoading,
    isFetching: isStatsFetching,
    isError: isStatsError,
  } = useGetProjectStatsQuery(id, {
    skip: !id,
  });

  const {
    data: investmentInfo,
    isLoading: isInvestmentLoading,
    isFetching: isInvestmentFetching,
    isError: isInvestmentError,
  } = useGetProjectInvestmentInfoQuery(id, {
    skip: !id,
  });

  const {
    data: investorsData,
    isLoading: isInvestorsLoading,
    isFetching: isInvestorsFetching,
    isError: isInvestorsError,
  } = useGetProjectInvestorsQuery(
    { id, page: 1, limit: 10 },
    {
      skip: !id,
    }
  );

  const isBusy = isLoading || isFetching;

  
  const statusConfig = useMemo(() => {
    if (!project) return null;

    const status = project.status ?? "unknown";

    if (status === "open") {
      return {
        label: "Open",
        className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
      };
    }

    if (status === "upcoming") {
      return {
        label: "Upcoming",
        className: "bg-amber-50 text-amber-700 ring-amber-100",
      };
    }

    if (status === "closed") {
      return {
        label: "Closed",
        className: "bg-zinc-100 text-zinc-700 ring-zinc-200",
      };
    }

    return {
      label: status,
      className: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    };
  }, [project]);
 
  const cleanUrl = (u) => (typeof u === "string" ? u.replace(/`/g, "").trim() : u);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/projects")}
            className="mt-1 h-10 w-10 shrink-0 rounded-xl border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              {project?.name || "Project Details"}
            </h1>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                Investment Project
              </span>
              {project?.location && (
                <>
                  <span className="text-zinc-300">•</span>
                  <span>{project.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {statusConfig && (
          <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusConfig.className.replace("bg-", "border-").replace("text-", "text-").replace("ring-", "bg-").replace("ring-opacity-", "bg-opacity-")}`}>
            <span className={`h-2 w-2 rounded-full ${statusConfig.className.includes("emerald") ? "bg-emerald-500" : statusConfig.className.includes("amber") ? "bg-amber-500" : "bg-zinc-500"}`}></span>
            {statusConfig.label}
          </div>
        )}
      </header>

      <div className="border-b border-zinc-200">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("info")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "info"
                ? "text-emerald-600"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Project Overview
            {activeTab === "info" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("daily")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "daily"
                ? "text-emerald-600"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Daily Reports
            {activeTab === "daily" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("glarry")}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === "glarry"
                ? "text-emerald-600"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Gallery
            {activeTab === "glarry" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-emerald-600" />
            )}
          </button>
        </div>
      </div>

      {activeTab === "info" && (
        <AdminProjectInfoTab project={project} isBusy={isBusy} isError={isError} />
      )}

      {activeTab === "daily" && (
        <AdminProjectDailyReportsTab project={project} isBusy={isBusy} isError={isError} />
      )}

      {activeTab === "glarry" && (
        <AdminProjectGlarryTab project={project} isBusy={isBusy} isError={isError} />
      )}
    </div>
  );
}
