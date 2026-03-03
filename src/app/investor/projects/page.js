"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Wallet2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useCreateInvestmentMutation } from "@/features/investor/investments/investmentsApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 6;

export default function InvestorProjectsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [amounts, setAmounts] = useState({});

  const user = useSelector((state) => state.auth?.user);
  const userId = user?.id ?? user?.userId ?? null;

  const { data, isLoading, isFetching, isError } = useGetProjectsQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createInvestment, { isLoading: isCreating }] =
    useCreateInvestmentMutation();

  const projects = data?.items ?? [];
  const meta = data?.meta ?? { page: 1, pageCount: 1, total: 0 };

  const isBusy = isLoading || isFetching;

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const handleAmountChange = (projectId, value) => {
    setAmounts((prev) => ({
      ...prev,
      [projectId]: value,
    }));
  };

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

  const handleInvest = async (project) => {
    if (!userId) {
      toast.error("You need to be logged in as an investor to invest.");
      return;
    }

    if (project.status !== "open") {
      toast.error("This project is not open for investment.");
      return;
    }

    const rawAmount = amounts[project.id];
    const amountNumber = Number(rawAmount);

    if (!amountNumber || amountNumber <= 0) {
      toast.error("Please enter a valid investment amount.");
      return;
    }

    if (
      project.minInvestmentAmount != null &&
      amountNumber < Number(project.minInvestmentAmount)
    ) {
      toast.error(
        `Minimum investment for this project is ${formatNumber(
          project.minInvestmentAmount,
        )} BDT.`,
      );
      return;
    }

    try {
      await createInvestment({
        userId: Number(userId),
        projectId: Number(project.id),
        amount: amountNumber,
      }).unwrap();

      toast.success("Investment successful.");
      setAmounts((prev) => ({
        ...prev,
        [project.id]: "",
      }));
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";

      toast.error("Investment failed", {
        description: message,
      });
    }
  };

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
            const projectImageUrl = project.image;
            const isOpen = project.status === "open";
            const amountValue = amounts[project.id] ?? "";

            return (
              <Card
                key={project.id}
                className="flex h-full flex-col overflow-hidden border-zinc-200 bg-white shadow-sm"
              >
                {projectImageUrl && (
                  <div className="relative w-full overflow-hidden border-b border-zinc-100">
                    <div className="aspect-[16/9] w-full bg-zinc-100">
                      <img
                        src={projectImageUrl}
                        alt={project.title || "Project image"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-base font-semibold text-zinc-900">
                      {project.title || "Untitled project"}
                    </CardTitle>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                        isOpen
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {project.status || "Unknown"}
                    </span>
                  </div>

                  {project.projectPeriod?.duration && (
                    <p className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-600">
                      <Leaf className="h-3 w-3" />
                      {project.projectPeriod.duration}
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
                        Target amount
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {project.totalPrice != null
                          ? `${formatNumber(project.totalPrice)} BDT`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Min. investment
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {project.minInvestmentAmount != null
                          ? `${formatNumber(project.minInvestmentAmount)} BDT`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Profit (%)
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {project.profitPercentage != null
                          ? `${project.profitPercentage}%`
                          : "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        Period
                      </p>
                      <p className="mt-1 text-sm text-zinc-900">
                        {project.startDate || "-"}{" "}
                        <span className="text-zinc-400">→</span>{" "}
                        {project.endDate || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 rounded-xl border border-zinc-100 bg-zinc-50/60 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        <Wallet2 className="h-3 w-3 text-emerald-500" />
                        Your investment
                      </p>
                      {project.minInvestmentAmount != null && (
                        <p className="text-[11px] text-zinc-500">
                          Min {formatNumber(project.minInvestmentAmount)} BDT
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={amountValue}
                        onChange={(e) =>
                          handleAmountChange(project.id, e.target.value)
                        }
                        placeholder="Enter amount"
                        className="h-9 flex-1 rounded-full border-zinc-200 bg-white text-sm"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleInvest(project)}
                        disabled={!isOpen || isCreating}
                        className="h-9 rounded-full bg-emerald-600 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
                      >
                        {isOpen ? "Invest" : "Closed"}
                      </Button>
                    </div>
                  </div>
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

