"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MapPin,
  TrendingUp,
  Landmark,
  ShoppingCart,
  BadgeDollarSign,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpRight,
  Layers,
  SlidersHorizontal,
  Sparkles,
  FolderOpen,
  Activity,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";

/* ─── helpers ─────────────────────────────────── */
const PAGE_SIZE = 6;

const cleanUrl = (u) =>
  typeof u === "string" ? u.replace(/[`"'()]/g, "").trim() : "";

const fmt = (n) =>
  Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ─── SKELETON CARD ───────────────────────────── */
const SkeletonCard = () => (
  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
    <div className="aspect-[4/3] w-full animate-pulse bg-zinc-100 dark:bg-zinc-800" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-2/3 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="h-3 w-1/3 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="h-3 w-full animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="h-3 w-5/6 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
      <div className="grid grid-cols-2 gap-3 pt-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-2 w-14 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-4 w-20 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
      <div className="h-11 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
    </div>
  </div>
);

/* ─── PROJECT CARD ────────────────────────────── */
const ProjectCard = ({ project }) => {
  const imgUrl = cleanUrl(project.photoUrl);
  const profit =
    project.totalProfit != null
      ? project.totalProfit
      : Number(project.totalSell || 0) - Number(project.totalCost || 0);

  const stats = [
    {
      icon: BadgeDollarSign,
      label: "Total Cost",
      value: project.totalCost,
      valueClass: "text-zinc-800 dark:text-zinc-100",
    },
    {
      icon: ShoppingCart,
      label: "Total Sell",
      value: project.totalSell,
      valueClass: "text-primary",
    },
    {
      icon: TrendingUp,
      label: "Profit",
      value: profit,
      valueClass: "text-primary",
    },
    {
      icon: Landmark,
      label: "Collected",
      value: project.totalInvestment,
      valueClass: "text-primary",
    },
  ];

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-[color:rgba(77,140,30,0.22)] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:ring-zinc-700">

      {/* ── Image ── */}
      <Link
        href={`/investor/projects/${project.id}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={project.name || "Project"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
            <Layers className="h-10 w-10 text-zinc-300" />
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">No image</span>
          </div>
        )}

        {/* Dark gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Active badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm ring-1 ring-[color:rgba(77,140,30,0.14)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Active
        </span>

        {/* Arrow on hover */}
        <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-600 opacity-0 shadow backdrop-blur-sm ring-1 ring-zinc-200 transition-all duration-200 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col gap-4 p-5">

        {/* Title + location */}
        <div>
          <Link href={`/investor/projects/${project.id}`}>
            <h2 className="line-clamp-1 text-[15px] font-bold text-zinc-900 transition-colors hover:text-primary dark:text-zinc-100">
              {project.name || "Untitled project"}
            </h2>
          </Link>
          {project.location && (
            <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              <MapPin className="h-3 w-3 shrink-0" />
              {project.location}
            </p>
          )}
        </div>

        {/* Description */}
        {project.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {project.description}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

        {/* Stats 2×2 */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
          {stats.map(({ icon: Icon, label, value, valueClass }) => (
            <div key={label}>
              <p className="mb-0.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                <Icon className="h-3 w-3 shrink-0" />
                {label}
              </p>
              <p className={`text-sm font-bold tabular-nums ${valueClass}`}>
                ৳{fmt(value)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/investor/projects/${project.id}`}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-[color:var(--brand-to)] active:scale-[0.98]"
        >
          View project
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

/* ─── PAGINATION ──────────────────────────────── */
const TablePagination = ({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Showing{" "}
        <span className="font-semibold text-zinc-700 dark:text-zinc-200">{from}–{to}</span> of{" "}
        <span className="font-semibold text-zinc-700 dark:text-zinc-200">{total}</span> projects
      </p>
      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-9 rounded-xl border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:rgba(77,140,30,0.20)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
        >
          {[3, 6, 12, 24].map((s) => (
            <option key={s} value={s}>
              {s} / page
            </option>
          ))}
        </select>
        {[
          { Icon: ChevronsLeft, label: "First", target: 1 },
          { Icon: ChevronLeft, label: "Prev", target: page - 1 },
          { Icon: ChevronRight, label: "Next", target: page + 1 },
          { Icon: ChevronsRight, label: "Last", target: pageCount },
        ].map(({ Icon, label, target }) => (
          <button
            key={label}
            onClick={() => onPageChange(target)}
            disabled={
              label === "First" || label === "Prev"
                ? page <= 1
                : page >= pageCount
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-[color:rgba(77,140,30,0.24)] hover:bg-secondary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-label={label}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── PAGE ────────────────────────────────────── */
export default function InvestorProjectsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const user = useSelector((state) => state.auth?.user);

  const { data, isLoading, isFetching, isError } = useGetProjectsQuery({
    page,
    limit: pageSize,
    search,
  });

  const raw = Array.isArray(data) ? data : (data?.items ?? []);
  const filtered = search
    ? raw.filter((p) =>
      [p?.name ?? "", p?.location ?? "", p?.description ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    : raw;

  const total = filtered.length;
  const pageCount = pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const projects = filtered.slice((page - 1) * pageSize, page * pageSize);
  const meta = { page, pageCount, total };
  const isBusy = isLoading || isFetching;

  const handleSearch = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  return (
    <div className="space-y-6">

      {/* ══════════════════════════════════════════
          PREMIUM HEADER CARD
      ══════════════════════════════════════════ */}
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />

        {/* Main header row */}
        <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary ring-1 ring-[color:rgba(77,140,30,0.14)]">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Available Projects
              </h1>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Browse open farming projects and invest directly.
              </p>
            </div>
          </div>

          {/* Right: search + filter */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-60">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search projects…"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-9 pr-8 text-sm text-zinc-800 placeholder-zinc-400 transition focus:border-[color:rgba(77,140,30,0.32)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[color:rgba(77,140,30,0.14)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus:bg-zinc-900"
              />
              {searchInput && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <button className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-500 transition hover:border-[color:rgba(77,140,30,0.32)] hover:bg-secondary hover:text-primary">
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mini stats strip */}
        <div className="grid grid-cols-2 divide-x divide-zinc-100 border-t border-zinc-100 sm:grid-cols-4 dark:divide-zinc-800 dark:border-zinc-800">
          {[
            { Icon: FolderOpen, label: "Total Projects", value: total },
            { Icon: Activity, label: "Active", value: total },
            { Icon: Layers, label: "This Page", value: projects.length },
            {
              Icon: ChevronRight,
              label: "Page",
              value: `${meta.page} / ${meta.pageCount}`,
            },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3">
              <Icon className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
                  {label}
                </p>
                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ERROR BANNER ── */}
      {isError && !isBusy && (
        <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="h-2 w-2 shrink-0 rounded-full bg-red-400" />
          Could not load projects. Please try again later.
        </div>
      )}

      {/* ── GRID ── */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {isBusy &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}

        {!isBusy && !projects.length && !isError && (
          <div className="col-span-full flex flex-col items-center gap-4 rounded-3xl border border-dashed border-zinc-200 bg-white py-20 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-700">
              <Layers className="h-7 w-7 text-zinc-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                No projects available
              </p>
              <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                {search
                  ? `No results for "${search}". Try a different keyword.`
                  : "Check back later for new investment opportunities."}
              </p>
            </div>
            {search && (
              <button
                onClick={() => handleSearch("")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 shadow-sm hover:border-[color:rgba(77,140,30,0.32)] hover:text-primary dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <X className="h-3.5 w-3.5" />
                Clear search
              </button>
            )}
          </div>
        )}

        {!isBusy &&
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </section>

      {/* ── PAGINATION ── */}
      {!isBusy && total > 0 && (
        <TablePagination
          page={meta.page}
          pageCount={meta.pageCount}
          total={meta.total}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            setPage(Math.max(1, Math.min(meta.pageCount, newPage)))
          }
          onPageSizeChange={(s) => {
            setPageSize(s);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
