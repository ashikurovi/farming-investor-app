"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Wallet2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useGetInvestmentQuery } from "@/features/investor/investments/investmentsApiSlice";

export default function InvestorInvestmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const {
    data: investment,
    isLoading,
    isFetching,
    isError,
  } = useGetInvestmentQuery(id, {
    skip: !id,
  });

  const isBusy = isLoading || isFetching;

  const project = investment?.project ?? null;

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
            onClick={() => router.push("/investor")}
            className="h-9 w-9 rounded-full border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
              Investment details
            </h1>
            <p className="text-sm text-zinc-500">
              View your investment and the project information.
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

      <section className="grid gap-6 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1.1fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            {isBusy && (
              <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
                Loading investment...
              </div>
            )}

            {!isBusy && isError && (
              <div className="flex h-32 items-center justify-center text-sm text-red-600">
                Failed to load investment. Please try again.
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

          {!isBusy && !isError && investment && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Your investment summary
              </h3>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Amount (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {investment.amount != null
                      ? formatNumber(investment.amount)
                      : "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Profit percentage
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {project?.profitPercentage != null
                      ? `${project.profitPercentage}%`
                      : "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Created at
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {investment.createdAt
                      ? new Date(investment.createdAt).toLocaleString()
                      : "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Last updated
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {investment.updatedAt
                      ? new Date(investment.updatedAt).toLocaleString()
                      : "-"}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Project financials
                </CardTitle>
                <Wallet2 className="h-4 w-4 text-emerald-500" />
              </div>
              <CardDescription className="text-xs text-zinc-500">
                Key amounts for this project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Target amount
                </span>
                <span>
                  {project?.totalPrice != null
                    ? `${formatNumber(project.totalPrice)} BDT`
                    : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Collected
                </span>
                <span>
                  {project?.collectedAmount != null
                    ? `${formatNumber(project.collectedAmount)} BDT`
                    : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Remaining
                </span>
                <span>
                  {project?.totalPrice != null && project?.collectedAmount != null
                    ? `${formatNumber(
                        Number(project.totalPrice) -
                          Number(project.collectedAmount),
                      )} BDT`
                    : "-"}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-50/60">
            <CardHeader>
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Reminder
              </CardTitle>
              <CardDescription className="text-xs text-zinc-600">
                Keep track of your investments here. For any changes or issues,
                please contact support or your account manager.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}

