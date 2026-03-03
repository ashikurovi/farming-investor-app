 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { useGetMyInvestmentsQuery } from "@/features/investor/investments/investmentsApiSlice";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";

const PAGE_SIZE = 5;

export default function InvestorDashboardPage() {
  const router = useRouter();

  const {
    data: meResponse,
    isLoading: isMeLoading,
    isError: isMeError,
  } = useMeQuery();

  const user = meResponse?.data ?? meResponse ?? null;
  const allInvestments = user?.investments ?? [];

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const {
    data: myInvestments,
    isLoading: isInvestmentsLoading,
    isFetching: isInvestmentsFetching,
    isError: isInvestmentsError,
  } = useGetMyInvestmentsQuery({ page, limit: pageSize });

  const recentInvestments = allInvestments;
  const investments = myInvestments?.items ?? [];
  const meta =
    myInvestments?.meta ?? {
      page,
      pageCount: 1,
      total: investments.length,
    };

  const isInvestmentsBusy = isInvestmentsLoading || isInvestmentsFetching;

  const totalInvested = recentInvestments.reduce((sum, inv) => {
    const amount = Number(inv.amount) || 0;
    return sum + amount;
  }, 0);

  const activeFarms = Array.from(
    new Set(
      recentInvestments.map((inv) => inv.projectId ?? inv.project?.id).filter(Boolean)
    )
  ).length;

  const realizedReturns = recentInvestments.reduce((sum, inv) => {
    const amount = Number(inv.amount) || 0;
    const profitPercentage = inv.project?.profitPercentage
      ? Number(inv.project.profitPercentage)
      : 0;
    return sum + (amount * profitPercentage) / 100;
  }, 0);

  const avgYield =
    recentInvestments.length > 0
      ? recentInvestments.reduce((sum, inv) => {
          const profitPercentage = inv.project?.profitPercentage
            ? Number(inv.project.profitPercentage)
            : 0;
          return sum + profitPercentage;
        }, 0) / recentInvestments.length
      : 0;

  const statCards = [
    {
      label: "Total invested",
      value: totalInvested.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      change: "",
    },
    {
      label: "Active projects",
      value: String(activeFarms),
      change: "",
    },
    {
      label: "Realized returns",
      value: realizedReturns.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
      change: "",
    },
    {
      label: "Avg. yield (12m)",
      value: `${avgYield.toFixed(1)}%`,
      change: "",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
              {card.value}
            </p>
            {card.change && (
              <p className="mt-1 text-xs font-medium text-emerald-600">
                {card.change}
              </p>
            )}
          </div>
        ))}
      </section>

      <section className="grid gap-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-900">
              My investments
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <DataTable
              columns={[
                {
                  key: "sl",
                  header: "SL",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                  cell: (investment) =>
                    investments.findIndex((i) => i.id === investment.id) + 1,
                },
                {
                  key: "project",
                  header: "Project",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                  cell: (investment) =>
                    investment?.project?.title ||
                    `Project #${investment.projectId}` ||
                    "-",
                },
                {
                  key: "amount",
                  header: "Amount (BDT)",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                  cell: (investment) =>
                    investment?.amount != null
                      ? Number(investment.amount || 0).toLocaleString("en-US", {
                          maximumFractionDigits: 0,
                        })
                      : "-",
                },
                {
                  key: "profit",
                  header: "Profit %",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                  cell: (investment) =>
                    investment.project?.profitPercentage != null
                      ? `${Number(
                          investment.project.profitPercentage,
                        ).toFixed(1)}%`
                      : "-",
                },
                {
                  key: "status",
                  header: "Status",
                  tdClassName: "whitespace-nowrap px-4 py-3 text-xs",
                  cell: (investment) => (
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
                      {investment.project?.status ?? "pending"}
                    </span>
                  ),
                },
                {
                  key: "createdAt",
                  header: "Date",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                  cell: (investment) =>
                    investment?.createdAt
                      ? new Date(investment.createdAt).toLocaleDateString()
                      : "-",
                },
              ]}
              data={investments}
              isLoading={isInvestmentsBusy}
              emptyMessage="You have no investments yet."
              loadingLabel="Loading your investments..."
              getRowKey={(investment) => investment.id}
              renderActions={(investment) => (
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/investor/investments/${investment.id}`)
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              )}
            />
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
        </div>
      </section>
    </div>
  );
}

