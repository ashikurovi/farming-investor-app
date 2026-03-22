 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { useGetProjectsStatsQuery } from "@/features/admin/projects/projectsApiSlice";
import { useGetMyInvestmentsQuery, useGetInvestmentsStatsQuery } from "@/features/investor/investments/investmentsApiSlice";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";
import { useGetNoticesQuery } from "@/features/admin/notice/noticeApiSlice";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const { data: invStats, isLoading: invStatsLoading } = useGetInvestmentsStatsQuery();
  
  const { data: noticesData, isLoading: noticesLoading } = useGetNoticesQuery({ page: 1, limit: 10 });
  const publicNotices = noticesData?.items?.filter(n => n.isPublic) || [];

  const investments = myInvestments?.items ?? [];
  const meta =
    myInvestments?.meta ?? {
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
  } = useGetUsersQuery({ page: investorPage, limit: investorPageSize, search: "" });
  const allUsers = usersData?.items ?? [];
  const investors = allUsers.filter((u) => u.role === "investor");
  const investorsMeta =
    usersData?.meta ?? {
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
    <div className="space-y-8">
      {/* Notice Marquee */}
      {!noticesLoading && publicNotices.length > 0 && (
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm flex items-center h-12">
          <div className="bg-emerald-600 text-white px-4 h-full flex items-center justify-center font-bold uppercase tracking-wider text-xs whitespace-nowrap z-10 shrink-0">
            Latest News
          </div>
          <div className="flex-1 overflow-hidden relative flex items-center h-full">
            <marquee className="text-sm font-medium text-zinc-800" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()}>
              {publicNotices.map((notice, i) => (
                <span key={notice.id}>
                  <Link href={`/investor/notice/${notice.id}`} className="hover:text-emerald-600 hover:underline mx-4">
                    {notice.title}
                  </Link>
                  {i < publicNotices.length - 1 && <span className="text-zinc-300 mx-2">|</span>}
                </span>
              ))}
            </marquee>
          </div>
        </section>
      )}

      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
           
          { label: "Collect Investment", value: invStats?.totalInvestmentCollect },
            { label: "Total Investor", value: invStats?.totalInvestorCount },
            {label : "New Investor", value : invStats?.newInvestorCount},

           { label: "Total projects", value: stats?.totalProjects },
          { label: "Project Investment", value: stats?.totalInvestment},
         
          { label: "Total cost", value: stats?.totalCost },
          { label: "Total sell", value: stats?.totalSell },
          { label: "Total profit", value: stats?.totalProfit },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
              {(card.loading ?? statsLoading) || card.value == null
                ? "—"
                : formatNumber(card.value, { maximumFractionDigits: 0 })}
            </p>
          </div>
        ))}
      </section>

      

      <section className="grid gap-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-900">
              All investors
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
                  cell: (user) => investors.findIndex((u) => u.id === user.id) + 1,
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
            <Button type="button" variant="outline" onClick={closeDetail} className="h-8 rounded-full text-xs">
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
                    alt={selectedInvestor.name || selectedInvestor.email || "Investor"}
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
                <p className="text-xs text-zinc-500">{selectedInvestor.email || "-"}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-zinc-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Name
                </span>
                <span>{selectedInvestor.name || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Email
                </span>
                <span>{selectedInvestor.email || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Phone
                </span>
                <span>{selectedInvestor.phone || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Location
                </span>
                <span>{selectedInvestor.location || "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Type
                </span>
                <span>{selectedInvestor.investorType?.type || selectedInvestor.investorTypeId || "-"}</span>
              </div>
            </div>
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
