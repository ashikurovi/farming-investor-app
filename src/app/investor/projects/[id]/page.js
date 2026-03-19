"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGetProjectQuery } from "@/features/admin/projects/projectsApiSlice";
import {
  ArrowLeft,
  MapPin,
  BadgeDollarSign,
  ShoppingCart,
  TrendingUp,
  Landmark,
  CalendarDays,
  Clock3,
  FileText,
  ExternalLink,
  Layers,
  Activity,
  ChevronRight,
} from "lucide-react";

/* ─── helpers ─────────────────────────────────── */
const cleanUrl = (u) =>
  typeof u === "string" ? u.replace(/[`"'()]/g, "").trim() : "";

const fmt = (n) =>
  Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ─── SKELETON ────────────────────────────────── */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-zinc-100 ${className}`} />
);

/* ─── STAT CARD ───────────────────────────────── */
const StatCard = ({
  Icon,
  label,
  value,
  gradient,
  iconBg,
  iconColor,
  valueColor,
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm ring-1 ring-black/[0.03]`}
  >
    <div className={`absolute inset-x-0 top-0 h-[3px] ${gradient}`} />
    <div className="flex items-start justify-between gap-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </p>
      <span
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${iconBg} ring-1 ring-black/5`}
      >
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </span>
    </div>
    <p
      className={`mt-3 text-xl font-bold tabular-nums tracking-tight ${valueColor}`}
    >
      ৳{fmt(value)}
    </p>
    <p className="mt-0.5 text-[10px] text-zinc-400">BDT</p>
  </div>
);

/* ─── SKELETON STAT CARD ──────────────────────── */
const SkeletonStatCard = () => (
  <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
    <div className="h-[3px] w-full animate-pulse rounded bg-zinc-100" />
    <div className="mt-4 space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-6 w-28" />
    </div>
  </div>
);

/* ─── SKELETON ROW ────────────────────────────── */
const SkeletonRow = () => (
  <tr className="border-b border-zinc-100">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-4 py-3.5">
        <div className="h-4 animate-pulse rounded-md bg-zinc-100" />
      </td>
    ))}
  </tr>
);

/* ─── DAILY REPORT TABLE ──────────────────────── */
const DailyReportTable = ({ reports, isLoading }) => (
  <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
    {/* Table header bar */}
    <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
      <div>
        <h2 className="text-sm font-bold text-zinc-900">Daily Reports</h2>
        <p className="text-xs text-zinc-400">
          {reports.length} report{reports.length !== 1 ? "s" : ""} recorded
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
        <Activity className="h-3 w-3" />
        Live data
      </span>
    </div>

    {/* Responsive scroll wrapper */}
    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-fixed divide-y divide-zinc-100 text-sm">
        <colgroup>
          <col className="w-10" />
          <col className="w-32 min-w-[110px]" />
          <col className="w-28 min-w-[100px]" />
          <col className="w-32 min-w-[110px]" />
          <col className="w-32 min-w-[110px]" />
          <col className="w-48 min-w-[160px]" />
          <col className="w-20" />
        </colgroup>

        <thead>
          <tr className="bg-zinc-50/80">
            {[
              "#",
              "Date",
              "Time",
              "Cost (BDT)",
              "Sell (BDT)",
              "Reason",
              "Photo",
            ].map((h) => (
              <th
                key={h}
                scope="col"
                className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400 first:pl-5"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-100 bg-white">
          {isLoading ? (
            [...Array(4)].map((_, i) => <SkeletonRow key={i} />)
          ) : reports.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                    <FileText className="h-6 w-6 text-zinc-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-500">
                      No daily reports
                    </p>
                    <p className="text-xs text-zinc-400">
                      Reports will appear here once added.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          ) : (
            reports.map((r, idx) => (
              <tr
                key={r.id}
                className="group transition-colors hover:bg-emerald-50/40"
              >
                {/* SL */}
                <td className="pl-5 pr-4 py-3.5 text-xs font-medium tabular-nums text-zinc-400">
                  {idx + 1}
                </td>

                {/* Date */}
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-700">
                    <CalendarDays className="h-3 w-3 shrink-0 text-zinc-400" />
                    {r.date || "—"}
                  </span>
                </td>

                {/* Time */}
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-700">
                    <Clock3 className="h-3 w-3 shrink-0 text-zinc-400" />
                    {r.time || "—"}
                  </span>
                </td>

                {/* Cost */}
                <td className="px-4 py-3.5">
                  <span className="font-semibold tabular-nums text-zinc-800">
                    ৳{fmt(r.dailyCost)}
                  </span>
                </td>

                {/* Sell */}
                <td className="px-4 py-3.5">
                  <span className="font-semibold tabular-nums text-blue-700">
                    ৳{fmt(r.dailySell)}
                  </span>
                </td>

                {/* Reason */}
                <td className="px-4 py-3.5">
                  <span className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
                    {r.reason || "—"}
                  </span>
                </td>

                {/* Photo */}
                <td className="px-4 py-3.5">
                  {cleanUrl(r.photoUrl) ? (
                    <a
                      href={cleanUrl(r.photoUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                    >
                      View
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-zinc-300 text-xs">—</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

/* ─── PAGE ────────────────────────────────────── */
export default function ProjectDetailPage() {
  const params = useParams();
  const id = useMemo(() => Number(params?.id), [params?.id]);
  const {
    data: project,
    isLoading,
    isError,
    isFetching,
  } = useGetProjectQuery(id, { skip: !id });

  const busy = isLoading || isFetching;
  const reports = project?.dailyReports ?? [];
  const imgUrl = cleanUrl(project?.photoUrl ?? "");

  const stats = [
    {
      Icon: BadgeDollarSign,
      label: "Total Cost",
      value: project?.totalCost,
      gradient: "bg-gradient-to-r from-zinc-400 to-zinc-500",
      iconBg: "bg-zinc-100",
      iconColor: "text-zinc-600",
      valueColor: "text-zinc-800",
    },
    {
      Icon: ShoppingCart,
      label: "Total Sell",
      value: project?.totalSell,
      gradient: "bg-gradient-to-r from-blue-400 to-indigo-400",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
    },
    {
      Icon: TrendingUp,
      label: "Total Profit",
      value: project?.totalProfit,
      gradient: "bg-gradient-to-r from-emerald-400 to-teal-400",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      valueColor: "text-emerald-700",
    },
    {
      Icon: Landmark,
      label: "Investment Collected",
      value: project?.totalInvestment,
      gradient: "bg-gradient-to-r from-violet-400 to-purple-400",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      valueColor: "text-violet-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ══════════════════════════════════════════
          PREMIUM HEADER CARD
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />

        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-6">
          {/* Project image thumbnail */}
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200 sm:h-24 sm:w-24">
            {busy ? (
              <div className="h-full w-full animate-pulse bg-zinc-100" />
            ) : imgUrl ? (
              <Image
                src={imgUrl}
                alt={project?.name || "Project"}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                <Layers className="h-8 w-8 text-emerald-300" />
              </div>
            )}
          </div>

          {/* Title + meta */}
          <div className="flex flex-1 flex-col gap-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px] text-zinc-400">
              <Link
                href="/investor/projects"
                className="transition-colors hover:text-emerald-600"
              >
                Projects
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="truncate font-medium text-zinc-600">
                {busy ? "Loading…" : (project?.name ?? "Project details")}
              </span>
            </nav>

            {busy ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            ) : (
              <>
                <h1 className="text-xl font-bold tracking-tight text-zinc-900">
                  {project?.name ?? "Project details"}
                </h1>
                {project?.location && (
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {project.location}
                  </p>
                )}
                {project?.description && (
                  <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500">
                    {project.description}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Back button */}
          <div className="shrink-0">
            <Link
              href="/investor/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-semibold text-zinc-600 shadow-sm transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STAT CARDS
      ══════════════════════════════════════════ */}
      <section className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {busy
          ? [...Array(4)].map((_, i) => <SkeletonStatCard key={i} />)
          : stats.map((s) => <StatCard key={s.label} {...s} />)}
      </section>

      {/* ══════════════════════════════════════════
          ERROR
      ══════════════════════════════════════════ */}
      {isError && !busy && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="h-2 w-2 shrink-0 rounded-full bg-red-400" />
          Could not load project details. Please try again later.
        </div>
      )}

      {/* ══════════════════════════════════════════
          DAILY REPORTS TABLE
      ══════════════════════════════════════════ */}
      <DailyReportTable reports={reports} isLoading={busy} />
    </div>
  );
}
