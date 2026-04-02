"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

  const statusConfig = useMemo(() => {
    if (!project) return null;

    const status = project.status ?? "unknown";

    if (status === "open") {
      return {
        label: "Open",
        dotClassName: "bg-emerald-500",
        badgeClassName:
          "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
      };
    }

    if (status === "upcoming") {
      return {
        label: "Upcoming",
        dotClassName: "bg-amber-500",
        badgeClassName:
          "bg-amber-50 text-amber-700 ring-1 ring-amber-200/60 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
      };
    }

    if (status === "closed") {
      return {
        label: "Closed",
        dotClassName: "bg-zinc-500",
        badgeClassName:
          "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/70 dark:bg-zinc-800/60 dark:text-zinc-200 dark:ring-zinc-700",
      };
    }

    return {
      label: status,
      dotClassName: "bg-zinc-500",
      badgeClassName:
        "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/70 dark:bg-zinc-800/60 dark:text-zinc-200 dark:ring-zinc-700",
    };
  }, [project]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/projects")}
            className="mt-1 h-10 w-10 shrink-0 rounded-xl border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-100">
              {project?.name || "Project Details"}
            </h1>
            <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                Investment Project
              </span>
              {project?.location && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-600">•</span>
                  <span>{project.location}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {statusConfig && (
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusConfig.badgeClassName}`}
          >
            <span className={`h-2 w-2 rounded-full ${statusConfig.dotClassName}`}></span>
            {statusConfig.label}
          </div>
        )}
      </header>

      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab("info")}
            className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === "info"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
          >
            Project Overview
            {activeTab === "info" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("daily")}
            className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === "daily"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
          >
            Daily Reports
            {activeTab === "daily" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("glarry")}
            className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === "glarry"
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
          >
            Gallery
            {activeTab === "glarry" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
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
