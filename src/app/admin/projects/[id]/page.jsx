"use client";

import { useMemo } from "react";
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

export default function AdminProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

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

  const projectImageUrl = project?.image;

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

      <section className="space-y-4">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Funding progress
              </CardTitle>
              <Wallet2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-sm font-medium text-zinc-900">
              {isStatsLoading || isStatsFetching
                ? "Loading stats..."
                : isStatsError || !projectStats
                  ? "Stats unavailable"
                  : `${projectStats.progressPercent ?? 0}% funded`}
            </p>
            {projectStats?.title && (
              <CardDescription className="text-xs text-zinc-500">
                {projectStats.title}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {(isStatsLoading || isStatsFetching) && (
              <p className="text-xs text-zinc-500">Fetching latest funding stats…</p>
            )}

            {!isStatsLoading && !isStatsFetching && !isStatsError && projectStats && (
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, projectStats.progressPercent ?? 0),
                    )}%`,
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Target amount
              </CardTitle>
              <p className="text-lg font-semibold text-zinc-900">
                {isStatsLoading || isStatsFetching || isStatsError || !projectStats
                  ? "—"
                  : `${formatNumber(projectStats.totalTargetAmount)} BDT`}
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Collected
              </CardTitle>
              <p className="text-lg font-semibold text-zinc-900">
                {isStatsLoading || isStatsFetching || isStatsError || !projectStats
                  ? "—"
                  : `${formatNumber(projectStats.collectedAmount)} BDT`}
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Remaining
              </CardTitle>
              <p className="text-lg font-semibold text-zinc-900">
                {isStatsLoading || isStatsFetching || isStatsError || !projectStats
                  ? "—"
                  : `${formatNumber(projectStats.remainingAmount)} BDT`}
              </p>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Investors
              </CardTitle>
              <p className="text-lg font-semibold text-zinc-900">
                {isStatsLoading || isStatsFetching || isStatsError || !projectStats
                  ? "—"
                  : projectStats.investorCount ?? 0}
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1.1fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            {isBusy && (
              <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
                Loading project...
              </div>
            )}

            {!isBusy && isError && (
              <div className="flex h-32 items-center justify-center text-sm text-red-600">
                Failed to load project. Please try again.
              </div>
            )}

            {!isBusy && !isError && project && (
              <div className="space-y-4">
                {projectImageUrl && (
                  <div className="relative w-full overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
                    <div className="aspect-[16/9] w-full bg-zinc-100">
                      <img
                        src={projectImageUrl}
                        alt={project.title || "Project image"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {project.title || "Untitled project"}
                  </h2>
                  {project.projectPeriod?.duration && (
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                      {project.projectPeriod.duration}
                    </p>
                  )}
                  <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                    {project.description || "No description provided."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {!isBusy && !isError && project && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Project summary
              </h3>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Total amount (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {project.totalPrice ?? "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Minimum investment (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {project.minInvestmentAmount ?? "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Profit percentage (%)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {project.profitPercentage ?? "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Start / End dates
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {project.startDate || "-"}{" "}
                    <span className="text-zinc-400">→</span>{" "}
                    {project.endDate || "-"}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Investors
            </h3>

            {(isInvestorsLoading || isInvestorsFetching) && (
              <div className="flex h-24 items-center justify-center text-xs text-zinc-500">
                Loading investors...
              </div>
            )}

            {!isInvestorsLoading && !isInvestorsFetching && isInvestorsError && (
              <div className="flex h-24 items-center justify-center text-xs text-red-600">
                Failed to load investors.
              </div>
            )}

            {!isInvestorsLoading &&
              !isInvestorsFetching &&
              !isInvestorsError && (
                <>
                  {investorsData?.investors?.length ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-xs">
                        <thead className="border-b border-zinc-200 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                          <tr>
                            <th className="py-2 pr-4">Investor</th>
                            <th className="py-2 pr-4">Amount</th>
                            <th className="py-2">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                          {investorsData.investors.map((investor, index) => {
                            const name =
                              investor?.user?.fullName ||
                              investor?.name ||
                              investor?.investorName ||
                              "Unknown";
                            const amount =
                              investor?.amount ||
                              investor?.investmentAmount ||
                              investor?.totalAmount ||
                              "-";
                            const createdAt =
                              investor?.createdAt &&
                              new Date(investor.createdAt).toLocaleDateString();

                            return (
                              <tr key={investor.id ?? index}>
                                <td className="py-2 pr-4">{name}</td>
                                <td className="py-2 pr-4">{amount}</td>
                                <td className="py-2">
                                  {createdAt || "-"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500">
                      No investors yet for this project.
                    </p>
                  )}

                  {investorsData?.meta && (
                    <p className="mt-3 text-[11px] text-zinc-400">
                      Showing{" "}
                      <span className="font-medium">
                        {investorsData.investors?.length ?? 0}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {investorsData.meta.total ?? 0}
                      </span>{" "}
                      investors.
                    </p>
                  )}
                </>
              )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Investment info
            </h3>

            {(isInvestmentLoading || isInvestmentFetching) && (
              <div className="flex h-20 items-center justify-center text-xs text-zinc-500">
                Loading investment info...
              </div>
            )}

            {!isInvestmentLoading && !isInvestmentFetching && isInvestmentError && (
              <div className="flex h-20 items-center justify-center text-xs text-red-600">
                Failed to load investment info.
              </div>
            )}

            {!isInvestmentLoading &&
              !isInvestmentFetching &&
              !isInvestmentError &&
              investmentInfo && (
                <dl className="space-y-3 text-sm text-zinc-900">
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Total price
                    </dt>
                    <dd>{investmentInfo.totalPrice ?? "-"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Collected amount
                    </dt>
                    <dd>{investmentInfo.collectedAmount ?? "-"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Remaining amount
                    </dt>
                    <dd>{investmentInfo.remainingAmount ?? "-"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Minimum investment
                    </dt>
                    <dd>{investmentInfo.minInvestmentAmount ?? "-"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Status
                    </dt>
                    <dd className="capitalize">
                      {investmentInfo.status || "unknown"}
                    </dd>
                  </div>
                </dl>
              )}
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 text-xs text-zinc-600">
            <p className="font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Tips
            </p>
            <p className="mt-2">
              Use this page to review a project before editing it or making
              changes from the main list.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

