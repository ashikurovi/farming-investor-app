"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetProjectQuery } from "@/features/admin/projects/projectsApiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

const cleanUrl = (u) =>
  typeof u === "string" ? u.replace(/[`\"'()]/g, "").trim() : "";

const fmt = (n) =>
  Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function ProjectDetailPage() {
  const params = useParams();
  const id = useMemo(() => Number(params?.id), [params?.id]);
  const { data: project, isLoading, isError, isFetching } = useGetProjectQuery(
    id,
    { skip: !id },
  );
  const busy = isLoading || isFetching;

  const reports = project?.dailyReports ?? [];
  const columns = [
    { key: "date", header: "Date" },
    { key: "time", header: "Time" },
    {
      key: "dailyCost",
      header: "Cost (BDT)",
      cell: (r) => fmt(r.dailyCost),
    },
    {
      key: "dailySell",
      header: "Sell (BDT)",
      cell: (r) => fmt(r.dailySell),
    },
    {
      key: "reason",
      header: "Reason",
      tdClassName: "whitespace-normal max-w-xs",
      cell: (r) => r.reason || "—",
    },
    {
      key: "photoUrl",
      header: "Photo",
      cell: (r) =>
        r.photoUrl ? (
          <a
            href={cleanUrl(r.photoUrl)}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 hover:underline"
          >
            View
          </a>
        ) : (
          "—"
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            {project?.name ?? "Project details"}
          </h1>
          <p className="text-sm text-zinc-500">
            {project?.location ? `Location: ${project.location}` : ""}
          </p>
        </div>
        <Link
          href="/investor/projects"
          className="text-sm font-medium text-emerald-700 hover:underline"
        >
          Back to projects
        </Link>
      </header>

      <Card className="overflow-hidden border-zinc-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Total cost
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {fmt(project?.totalCost)} BDT
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Total sell
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {fmt(project?.totalSell)} BDT
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Total profit
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {fmt(project?.totalProfit)} BDT
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Investment collected
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-900">
                {fmt(project?.totalInvestment)} BDT
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isError && !busy && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load project details. Please try again later.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-zinc-900">Daily report</h2>
        <DataTable
          columns={columns}
          data={reports}
          isLoading={busy}
          emptyMessage="No daily reports found."
          loadingLabel="Loading daily reports..."
          getRowKey={(r) => r.id}
        />
      </section>
    </div>
  );
}
