"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Wallet2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Removed invest UI
import { Pagination } from "@/components/ui/pagination";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
// Removed invest action import

const PAGE_SIZE = 6;
const cleanUrl = (u) =>
  typeof u === "string" ? u.replace(/[`"'()]/g, "").trim() : "";

export default function InvestorProjectsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // Removed invest amount state

  const user = useSelector((state) => state.auth?.user);
  const userId = user?.id ?? user?.userId ?? null;

  const { data, isLoading, isFetching, isError } = useGetProjectsQuery({
    page,
    limit: pageSize,
    search,
  });

  // Removed createInvestment mutation

  const raw = Array.isArray(data) ? data : data?.items ?? [];
  const filtered = search
    ? raw.filter((p) => {
        const hay = [
          p?.name ?? "",
          p?.location ?? "",
          p?.description ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(search.toLowerCase());
      })
    : raw;
  const total = filtered.length;
  const pageCount = pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const projects = filtered.slice(startIndex, endIndex);
  const meta = { page, pageCount, total };

  const isBusy = isLoading || isFetching;

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  // Removed handleAmountChange

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

  // Removed handleInvest

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Available projects
          </h1>
          <p className="text-sm text-zinc-500">
            Browse open farming projects and invest directly from here.
          </p>
        </div>

        <SearchBar
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search projects..."
        />
      </header>

      {isError && !isBusy && (
        <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not load projects. Please try again later.
        </div>
      )}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isBusy &&
          Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-50"
            />
          ))}

        {!isBusy && !projects.length && !isError && (
          <div className="col-span-full rounded-2xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-500">
            No projects are currently available for investment.
          </div>
        )}

        {!isBusy &&
          projects.map((project) => {
            const projectImageUrl = cleanUrl(project.photoUrl);
            const isOpen = true;

            return (
              <Card
                key={project.id}
                className="flex h-full flex-col overflow-hidden border-zinc-200 bg-white shadow-sm"
              >
                <Link href={`/investor/projects/${project.id}`} className="relative w-full overflow-hidden border-b border-zinc-100">
                  <div className="aspect-[16/9] w-full bg-zinc-100">
                    {projectImageUrl ? (
                      <Image
                        src={projectImageUrl}
                        alt={project.name || "Project image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
                        No image
                      </div>
                    )}
                  </div>
                </Link>

                <CardHeader className="space-y-2">
                  <Link href={`/investor/projects/${project.id}`} className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base font-semibold text-zinc-900">
                      {project.name || "Untitled project"}
                    </CardTitle>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      Active
                    </span>
                  </Link>

                  {project.location && (
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-600">
                      {project.location}
                    </p>
                  )}

                  <CardDescription className="line-clamp-3 text-xs leading-relaxed text-zinc-600">
                    {project.description || "No description provided."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Total cost
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {project.totalCost != null
                          ? `${formatNumber(project.totalCost)} BDT`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Total sell
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {project.totalSell != null
                          ? `${formatNumber(project.totalSell)} BDT`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Profit (BDT)
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {project.totalProfit != null
                          ? `${formatNumber(project.totalProfit)} BDT`
                          : `${formatNumber(
                              Number(project.totalSell || 0) -
                                Number(project.totalCost || 0),
                            )} BDT`}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Investment collected
                      </p>
                      <p className="mt-1 text-sm text-zinc-900">
                        {project.totalInvestment != null
                          ? `${formatNumber(project.totalInvestment)} BDT`
                          : "—"}
                      </p>
                    </div>
                  </div>

                  {/* Invest UI removed as requested */}
                </CardContent>
              </Card>
            );
          })}
      </section>

      <Pagination
        page={meta.page}
        pageCount={meta.pageCount}
        total={meta.total}
        pageSize={pageSize}
        onPageChange={(newPage) =>
          setPage((currentPage) =>
            newPage < 1
              ? 1
              : meta.pageCount
                ? Math.min(meta.pageCount, newPage)
                : newPage,
          )
        }
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
      />
    </div>
  );
}
