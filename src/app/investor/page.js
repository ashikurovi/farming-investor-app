"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  TrendingUp,
  Users,
  Sprout,
  Wallet,
  DollarSign,
} from "lucide-react";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { useGetProjectsStatsQuery } from "@/features/admin/projects/projectsApiSlice";
import {
  useGetMyInvestmentsQuery,
  useGetInvestmentsStatsQuery,
} from "@/features/investor/investments/investmentsApiSlice";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const KPIStatCard = ({ label, value, loading, Icon, accent = "emerald", secondary }) => {
  const isBusy = Boolean(loading) || value == null;
  const text = isBusy
    ? "—"
    : Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 0 });
  const iconBg =
    accent === "emerald"
      ? "bg-emerald-50 text-emerald-600"
      : accent === "teal"
        ? "bg-teal-50 text-teal-600"
        : "bg-zinc-100 text-zinc-600";

  const secondaryText = (() => {
    if (!secondary) return null;
    if (secondary.percentage && typeof secondary.value === "number") {
      return `${Math.round(secondary.value)}%`;
    }
    if (secondary.value == null) return "—";
    return Number(secondary.value).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });
  })();

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:p-5 ring-1 ring-transparent transition-all hover:shadow-md hover:ring-emerald-200">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
          {label}
        </p>
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl ${iconBg} ring-1 ring-inset ring-black/5`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums">
        {text}
      </p>
      {secondary?.label && (
        <p className="mt-1 text-[11px] font-medium text-zinc-500">
          {secondary.label}: <span className="text-zinc-900">{secondaryText}</span>
        </p>
      )}
    </div>
  );
};

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

  const { data: stats, isLoading: statsLoading } = useGetProjectsStatsQuery();
  const { data: invStats, isLoading: invStatsLoading } =
    useGetInvestmentsStatsQuery();

  const investments = myInvestments?.items ?? [];
  const meta = myInvestments?.meta ?? {
    page,
    pageCount: 1,
    total: investments.length,
  };

  const isInvestmentsBusy = isInvestmentsLoading || isInvestmentsFetching;

  const [investorPage, setInvestorPage] = useState(1);
  const [investorPageSize, setInvestorPageSize] = useState(10);
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isFetching: isUsersFetching,
  } = useGetUsersQuery({
    page: investorPage,
    limit: investorPageSize,
    search: "",
  });
  const allUsers = usersData?.items ?? [];
  const investors = allUsers.filter((u) => u.role === "investor");
  const investorsMeta = usersData?.meta ?? {
    page: investorPage,
    pageCount: 1,
    total: investors.length,
  };
  const isInvestorsBusy = isUsersLoading || isUsersFetching;
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const openDetail = (user) => {
    setSelectedInvestor(user);
    setDetailOpen(true);
  };
  const closeDetail = () => {
    setDetailOpen(false);
    setSelectedInvestor(null);
  };

  return (
    <div className="space-y-8  mx-auto -mt-2">
      <section className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <KPIStatCard
          label="Collect Investment"
          value={invStats?.totalInvestmentCollect}
          loading={invStatsLoading}
          Icon={Wallet}
          accent="emerald"
          secondary={{
            label: "Avg/project",
            value:
              (stats?.totalProjects ?? 0) > 0
                ? (stats?.totalInvestment ?? 0) / (stats?.totalProjects ?? 1)
                : null,
          }}
        />
        <KPIStatCard
          label="Total Investor"
          value={invStats?.totalInvestorCount}
          loading={invStatsLoading}
          Icon={Users}
          accent="teal"
          secondary={{
            label: "New",
            value: invStats?.newInvestorCount,
          }}
        />
        <KPIStatCard
          label="New Investor"
          value={invStats?.newInvestorCount}
          loading={invStatsLoading}
          Icon={TrendingUp}
          accent="emerald"
          secondary={{
            label: "Share",
            value:
              (invStats?.totalInvestorCount ?? 0) > 0
                ? ((invStats?.newInvestorCount ?? 0) * 100) /
                  (invStats?.totalInvestorCount ?? 1)
                : null,
            percentage: true,
          }}
        />
        <KPIStatCard
          label="Total projects"
          value={stats?.totalProjects}
          loading={statsLoading}
          Icon={Sprout}
          accent="teal"
        />
        <KPIStatCard
          label="Project Investment"
          value={stats?.totalInvestment}
          loading={statsLoading}
          Icon={DollarSign}
          accent="emerald"
          secondary={{
            label: "Per project",
            value:
              (stats?.totalProjects ?? 0) > 0
                ? (stats?.totalInvestment ?? 0) / (stats?.totalProjects ?? 1)
                : null,
          }}
        />
        <KPIStatCard
          label="Total cost"
          value={stats?.totalCost}
          loading={statsLoading}
          Icon={DollarSign}
          accent="teal"
          secondary={{
            label: "Per project",
            value:
              (stats?.totalProjects ?? 0) > 0
                ? (stats?.totalCost ?? 0) / (stats?.totalProjects ?? 1)
                : null,
          }}
        />
        <KPIStatCard
          label="Total sell"
          value={stats?.totalSell}
          loading={statsLoading}
          Icon={DollarSign}
          accent="emerald"
          secondary={{
            label: "Per project",
            value:
              (stats?.totalProjects ?? 0) > 0
                ? (stats?.totalSell ?? 0) / (stats?.totalProjects ?? 1)
                : null,
          }}
        />
        <KPIStatCard
          label="Total profit"
          value={stats?.totalProfit}
          loading={statsLoading}
          Icon={TrendingUp}
          accent="teal"
          secondary={{
            label: "Per project",
            value:
              (stats?.totalProjects ?? 0) > 0
                ? (stats?.totalProfit ?? 0) / (stats?.totalProjects ?? 1)
                : null,
          }}
        />
      </section>

      <section className="grid gap-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:p-6">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                All investors
              </h2>
              <p className="text-xs text-zinc-500">
                List of registered investors
              </p>
            </div>
          </header>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-x-auto">
            <DataTable
              columns={[
                {
                  key: "sl",
                  header: "SL",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                  cell: (user) =>
                    investors.findIndex((u) => u.id === user.id) + 1,
                },
                {
                  key: "name",
                  header: "Name",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                  cell: (user) => user.name || "-",
                },
                {
                  key: "email",
                  header: "Email",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                  cell: (user) => user.email || "-",
                },
                {
                  key: "phone",
                  header: "Phone",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                  cell: (user) => user.phone || "-",
                },
                {
                  key: "investorType",
                  header: "Type",
                  tdClassName:
                    "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                  cell: (user) =>
                    user.investorType
                      ? user.investorType.type
                      : user.investorTypeId
                        ? `Type #${user.investorTypeId}`
                        : "-",
                },
              ]}
              data={investors}
              isLoading={isInvestorsBusy}
              emptyMessage="No investors found."
              loadingLabel="Loading investors..."
              getRowKey={(user) => user.id}
              renderActions={(user) => (
                <button
                  type="button"
                  onClick={() => openDetail(user)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
              )}
            />
            <Pagination
              page={investorsMeta.page}
              pageCount={investorsMeta.pageCount}
              total={investorsMeta.total}
              pageSize={investorPageSize}
              onPageChange={(newPage) =>
                setInvestorPage((currentPage) =>
                  newPage < 1
                    ? 1
                    : investorsMeta.pageCount
                      ? Math.min(investorsMeta.pageCount, newPage)
                      : newPage,
                )
              }
              onPageSizeChange={(newSize) => {
                setInvestorPageSize(newSize);
                setInvestorPage(1);
              }}
            />
          </div>
        </div>
      </section>

      <Modal
        isOpen={detailOpen}
        onClose={closeDetail}
        title="Investor details"
        size="md"
        footer={
          <div className="flex items-center justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={closeDetail}
              className="h-8 rounded-full text-xs"
            >
              Close
            </Button>
          </div>
        }
      >
        {selectedInvestor ? (
          <>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50 text-lg font-semibold text-emerald-700 ring-1 ring-emerald-100">
                {selectedInvestor?.photoUrl ? (
                  <img
                    src={
                      typeof selectedInvestor.photoUrl === "string"
                        ? selectedInvestor.photoUrl.replace(/`/g, "").trim()
                        : ""
                    }
                    alt={
                      selectedInvestor.name ||
                      selectedInvestor.email ||
                      "Investor"
                    }
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                ) : (
                  <span>
                    {(selectedInvestor.name || selectedInvestor.email || "?")
                      .substring(0, 2)
                      .toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  {selectedInvestor.name || "Investor"}
                </h3>
                <p className="text-xs text-zinc-500">
                  {selectedInvestor.email || "-"}
                </p>
              </div>
            </div>

            <dl className="space-y-3 text-sm text-zinc-900">
              <div className="flex items-center justify-between">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Name
                </dt>
                <dd>{selectedInvestor.name || "-"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Email
                </dt>
                <dd>{selectedInvestor.email || "-"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Phone
                </dt>
                <dd>{selectedInvestor.phone || "-"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Location
                </dt>
                <dd>{selectedInvestor.location || "-"}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Type
                </dt>
                <dd>
                  {selectedInvestor.investorType?.type ||
                    selectedInvestor.investorTypeId ||
                    "-"}
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <div className="flex h-24 items-center justify-center text-sm text-zinc-500">
            No investor selected.
          </div>
        )}
      </Modal>
    </div>
  );
}
