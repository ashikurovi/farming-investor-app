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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/projects")}
            className="h-9 w-9 rounded-full border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
              Project details
            </h1>
            <p className="text-sm text-zinc-500">
              View key information about this investment project.
            </p>
          </div>
        </div>

        {statusConfig && (
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusConfig.className}`}
            >
              {statusConfig.label}
            </span>
          </div>
        )}
      </header>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setActiveTab("info")}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${activeTab === "info" ? "bg-zinc-900 text-white border-zinc-900" : "text-zinc-700 border-zinc-200 hover:bg-zinc-50"}`}
        >
          Project info
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setActiveTab("daily")}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${activeTab === "daily" ? "bg-zinc-900 text-white border-zinc-900" : "text-zinc-700 border-zinc-200 hover:bg-zinc-50"}`}
        >
          Daily reports
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setActiveTab("glarry")}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${activeTab === "glarry" ? "bg-zinc-900 text-white border-zinc-900" : "text-zinc-700 border-zinc-200 hover:bg-zinc-50"}`}
        >
          Glarry
        </Button>
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
