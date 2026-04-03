"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Eye,
  Trash2,
  Wallet2,
  Users,
  Plus,
  Pencil,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  useGetInvestmentsAdminQuery,
  useDeleteInvestmentAdminMutation,
} from "@/features/investor/investments/investmentsApiSlice";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";
import { useGetDeedsQuery } from "@/features/admin/deed/deedApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminInvestmentsPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

  const { data, isLoading, isFetching } = useGetInvestmentsAdminQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [deleteInvestment, { isLoading: isDeleting }] =
    useDeleteInvestmentAdminMutation();

  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    page: 1,
    limit: 100,
    search: "",
  }, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const usersById = new Map((usersData?.items ?? []).map((u) => [u.id, u]));

  const { data: deedsData } = useGetDeedsQuery({
    page: 1,
    limit: 1000,
  }, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const deedsByInvestmentId = new Map(
    (deedsData?.data ?? deedsData?.items ?? []).map((d) => [d.investmentId, d]),
  );

  const allInvestments = Array.isArray(data) ? data : [];
  const filteredInvestments = allInvestments.filter((inv) => {
    // Expiration check
    const end = inv.endDate ? new Date(inv.endDate) : null;
    const isExpired = end && !isNaN(end) && end < new Date();
    const effectiveActive = inv.isActive && !isExpired;

    // Status filter
    if (filterStatus === "active" && !effectiveActive) return false;
    if (filterStatus === "expired" && effectiveActive) return false;

    // Search filter
    if (search) {
      const user = usersById.get(inv.investorId);
      const haystack = [
        String(inv.id ?? ""),
        String(inv.investorId ?? ""),
        String(inv.amount ?? ""),
        String(inv.reference ?? ""),
        user?.name ?? "",
        user?.email ?? "",
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }

    // Exclude partner investments
    const user = usersById.get(inv.investorId);
    if (user?.role === "partner") return false;

    return true;
  });

  // Group investments by investor
  const groupedInvestmentsMap = new Map();
  filteredInvestments.forEach((inv) => {
    const investorId = inv.investorId;
    if (!groupedInvestmentsMap.has(investorId)) {
      groupedInvestmentsMap.set(investorId, {
        id: `grouped-${investorId}`,
        investorId: investorId,
        investments: [],
        amount: 0,
        startDate: null,
        endDate: null,
        isActive: false,
        isExpired: false,
        hasDeed: false,
      });
    }
    const group = groupedInvestmentsMap.get(investorId);
    group.investments.push(inv);
    group.amount += Number(inv.amount || 0);

    const end = inv.endDate ? new Date(inv.endDate) : null;
    const isExpired = end && !isNaN(end) && end < new Date();
    const effectiveActive = inv.isActive && !isExpired;

    if (effectiveActive) group.isActive = true;
    if (isExpired) group.isExpired = true;
    if (deedsByInvestmentId.has(inv.id)) group.hasDeed = true;

    if (!group.startDate || new Date(inv.startDate) < new Date(group.startDate)) {
      group.startDate = inv.startDate;
    }
    if (!group.endDate || new Date(inv.endDate) > new Date(group.endDate)) {
      group.endDate = inv.endDate;
    }
  });

  const groupedInvestments = Array.from(groupedInvestmentsMap.values());
  const total = groupedInvestments.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const investments = groupedInvestments.slice(startIndex, endIndex);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const isBusy = isLoading || isUsersLoading || isDeleting;

  const closeConfirm = () =>
    setConfirmState((prev) => ({ ...prev, isOpen: false, onConfirm: null }));

  const openConfirm = (options) =>
    setConfirmState({
      isOpen: true,
      title: "",
      description: "",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: null,
      ...options,
    });

  const confirmDelete = (investment) => {
    const user = usersById.get(investment?.investorId);
    const investorName =
      user?.name || user?.email || `Investor #${investment?.investorId}`;

    openConfirm({
      title: "Delete investment",
      description: `Delete ${formatNumber(
        investment.amount,
      )} BDT investment by "${investorName}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteInvestment(investment.id).unwrap();
          toast.success("Investment deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete investment.";
          toast.error("Delete failed", { description: message });
        } finally {
          closeConfirm();
        }
      },
    });
  };

  // Calculations for stats
  const totalAmount = filteredInvestments.reduce(
    (sum, inv) => sum + Number(inv.amount || 0),
    0,
  );
  const uniqueInvestors = new Set(
    filteredInvestments.map((inv) => inv.investorId),
  ).size;
  const avgAmount = total > 0 ? totalAmount / total : 0;
  const pendingDeedsCount = filteredInvestments.filter(
    (inv) => !deedsByInvestmentId.has(inv.id),
  ).length;

  // Mock trend calculations (randomized for demo feel, or simple logic)
  const growthRate = 12.5; // Example fixed growth
  const investorGrowth = 5.2;

  return (
    <div className="w-full space-y-8 pb-10">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Investments Management
              </h1>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                View and manage all investments across projects.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <AdminSearchBar
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search by project or investor..."
              className="w-full sm:w-64"
            />

            {!isReadOnly && (
              <Button
                type="button"
                onClick={() => router.push("/admin/investment/new")}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/30 active:scale-95"
              >
                <Plus className="h-4 w-4" />
                <span>Add Investment</span>
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-zinc-50 pt-4 dark:border-zinc-800">
          {[
            { id: "all", label: "All Investments" },
            { id: "active", label: "Active" },
            { id: "expired", label: "Expired" },
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => {
                setFilterStatus(status.id);
                setPage(1);
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${filterStatus === status.id
                ? "bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-[0_14px_40px_-26px_rgba(77,140,30,0.75)] ring-1 ring-white/10"
                : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Total Investments */}
        <div className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[color:rgba(124,194,46,0.18)] blur-3xl transition-all group-hover:bg-[color:rgba(124,194,46,0.28)] dark:bg-[color:rgba(124,194,46,0.14)] dark:group-hover:bg-[color:rgba(124,194,46,0.22)]"></div>
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.16)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.20)]">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[color:rgba(124,194,46,0.14)] px-2 py-1 text-[10px] font-bold text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.14)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.18)]">
              <TrendingUp className="h-3 w-3" />
              <span>+{investorGrowth}%</span>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Total Investments
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {isLoading ? "..." : total}
            </p>
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-[70%] rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
          </div>
        </div>

        {/* Total Amount Invested */}
        <div className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[color:rgba(124,194,46,0.18)] blur-3xl transition-all group-hover:bg-[color:rgba(124,194,46,0.28)] dark:bg-[color:rgba(124,194,46,0.14)] dark:group-hover:bg-[color:rgba(124,194,46,0.22)]"></div>
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.16)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.20)]">
              <Wallet2 className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[color:rgba(124,194,46,0.14)] px-2 py-1 text-[10px] font-bold text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.14)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.18)]">
              <TrendingUp className="h-3 w-3" />
              <span>+{growthRate}%</span>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Total Amount
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {isLoading ? "..." : `৳${formatNumber(totalAmount)}`}
            </p>
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-[85%] rounded-full bg-emerald-500 dark:bg-emerald-400"></div>
          </div>
        </div>

        {/* Unique Investors */}
        <div className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[color:rgba(59,130,246,0.16)] blur-3xl transition-all group-hover:bg-[color:rgba(59,130,246,0.22)] dark:bg-[color:rgba(59,130,246,0.14)] dark:group-hover:bg-[color:rgba(59,130,246,0.18)]"></div>
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:rgba(59,130,246,0.12)] text-blue-700 ring-1 ring-[color:rgba(59,130,246,0.18)] dark:bg-[color:rgba(59,130,246,0.12)] dark:text-blue-300 dark:ring-[color:rgba(59,130,246,0.20)]">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[color:rgba(59,130,246,0.12)] px-2 py-1 text-[10px] font-bold text-blue-700 ring-1 ring-[color:rgba(59,130,246,0.16)] dark:bg-[color:rgba(59,130,246,0.12)] dark:text-blue-300 dark:ring-[color:rgba(59,130,246,0.18)]">
              <ArrowUpRight className="h-3 w-3" />
              <span>Active</span>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Unique Investors
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {isLoading ? "..." : uniqueInvestors}
            </p>
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-[60%] rounded-full bg-blue-500 dark:bg-blue-400"></div>
          </div>
        </div>

        {/* Avg Investment - Red Mark as requested */}
        <div className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[color:rgba(239,68,68,0.14)] blur-3xl transition-all group-hover:bg-[color:rgba(239,68,68,0.20)] dark:bg-[color:rgba(239,68,68,0.12)] dark:group-hover:bg-[color:rgba(239,68,68,0.16)]"></div>
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:rgba(239,68,68,0.12)] text-red-700 ring-1 ring-[color:rgba(239,68,68,0.18)] dark:bg-[color:rgba(239,68,68,0.12)] dark:text-red-300 dark:ring-[color:rgba(239,68,68,0.20)]">
              <Wallet2 className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[color:rgba(239,68,68,0.12)] px-2 py-1 text-[10px] font-bold text-red-700 ring-1 ring-[color:rgba(239,68,68,0.16)] dark:bg-[color:rgba(239,68,68,0.12)] dark:text-red-300 dark:ring-[color:rgba(239,68,68,0.18)]">
              <TrendingDown className="h-3 w-3" />
              <span>-2.1%</span>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Avg. Investment
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {isLoading ? "..." : `৳${formatNumber(avgAmount)}`}
            </p>
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full w-[45%] rounded-full bg-red-500 dark:bg-red-400"></div>
          </div>
        </div>

        {/* Pending Deeds */}
        <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-amber-50/10 p-6 shadow-sm transition-all hover:shadow-md hover:bg-amber-50/20 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-[color:rgba(245,158,11,0.16)] blur-3xl transition-all group-hover:bg-[color:rgba(245,158,11,0.24)] dark:bg-[color:rgba(245,158,11,0.14)] dark:group-hover:bg-[color:rgba(245,158,11,0.20)]"></div>
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:rgba(245,158,11,0.18)] text-amber-800 ring-1 ring-[color:rgba(245,158,11,0.22)] dark:bg-[color:rgba(245,158,11,0.16)] dark:text-amber-300 dark:ring-[color:rgba(245,158,11,0.22)]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-[color:rgba(245,158,11,0.16)] px-2 py-1 text-[10px] font-bold text-amber-800 ring-1 ring-[color:rgba(245,158,11,0.18)] dark:bg-[color:rgba(245,158,11,0.14)] dark:text-amber-300 dark:ring-[color:rgba(245,158,11,0.20)]">
              <span>Required</span>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Pending Deeds
            </h3>
            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
              {isLoading ? "..." : pendingDeedsCount}
            </p>
          </div>
          <div className="mt-4 h-1 w-full rounded-full bg-amber-100/30 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-amber-500 dark:bg-amber-400"
              style={{ width: `${(pendingDeedsCount / (total || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="w-full rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "#",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-xs font-bold text-zinc-400 w-16",
                cell: (investment) =>
                  investments.findIndex((i) => i.id === investment.id) + 1,
              },
              {
                key: "investor",
                header: "INVESTOR",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => {
                  const user = usersById.get(investment.investorId);
                  const name =
                    user?.name ||
                    user?.email ||
                    `Investor #${investment.investorId}`;
                  const email = user?.email || "";
                  const count = investment.investments.length;
                  return (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:rgba(124,194,46,0.18)] text-xs font-bold text-[color:rgb(77,140,30)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)]">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {name}
                          </span>
                          {count > 1 && (
                            <span className="inline-flex items-center rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/20 dark:text-amber-300">
                              {count} Investments
                            </span>
                          )}
                        </div>
                        {email && (
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {email}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                },
              },
              {
                key: "amount",
                header: "AMOUNT",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                      <span className="text-xs font-bold">৳</span>
                    </div>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {investment?.amount != null
                        ? formatNumber(investment.amount)
                        : "-"}
                    </span>
                  </div>
                ),
              },
              {
                key: "startDate",
                header: "START DATE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => (
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {investment?.startDate || "-"}
                  </span>
                ),
              },
              {
                key: "endDate",
                header: "END DATE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => (
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    {investment?.endDate || "-"}
                  </span>
                ),
              },
              {
                key: "totalDays",
                header: "TOTAL DAYS",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => {
                  const start = investment?.startDate
                    ? new Date(investment.startDate)
                    : null;
                  const end = investment?.endDate
                    ? new Date(investment.endDate)
                    : null;
                  if (start && end && !isNaN(start) && !isNaN(end)) {
                    const diffTime = Math.abs(end - start);
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24),
                    );
                    return (
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
                        {diffDays} Days
                      </span>
                    );
                  }
                  return "-";
                },
              },
              {
                key: "status",
                header: "STATUS",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => {
                  return (
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${!investment.isActive && investment.isExpired
                        ? "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20"
                        : "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                        }`}
                    >
                      {!investment.isActive && investment.isExpired ? "Expired" : "Active"}
                    </span>
                  );
                },
              },
              {
                key: "deedStatus",
                header: "DEED",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => {
                  return (
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${investment.hasDeed
                        ? "bg-zinc-50 text-zinc-700 ring-zinc-600/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700"
                        : "bg-amber-50 text-amber-700 ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20"
                        }`}
                    >
                      {investment.hasDeed ? "Issued" : "Deed Pending"}
                    </span>
                  );
                },
              },
              {
                key: "reference",
                header: "REFERENCE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (investment) => {
                  const count = investment.investments.length;
                  if (count > 1) {
                    return (
                      <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
                        {count} References
                      </span>
                    );
                  }
                  return (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
                      {investment.investments[0]?.reference || "N/A"}
                    </span>
                  );
                },
              },
            ]}
            data={investments}
            isLoading={isBusy}
            emptyMessage="No investments found."
            loadingLabel="Loading investments..."
            getRowKey={(investment) => investment.id}
            getRowClassName={(investment) => investment.investments.length > 1 ? "bg-amber-50/10 hover:bg-amber-50/30 dark:bg-amber-900/10" : ""}
            onRowClick={(investment) =>
              router.push(`/admin/investment/investor/${investment.investorId}`)
            }
            renderActions={(investment) => (
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/admin/investment/investor/${investment.investorId}`);
                  }}
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-emerald-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-emerald-300"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div >
            )
            }
          />
        </div >

        <div className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/40">
          <Pagination
            page={page}
            pageCount={Math.max(1, Math.ceil(total / pageSize))}
            total={total}
            pageSize={pageSize}
            onPageChange={(newPage) =>
              setPage(
                Math.max(1, Math.min(Math.ceil(total / pageSize), newPage)),
              )
            }
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(1);
            }}
          />
        </div>
      </section >

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        onCancel={closeConfirm}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel={confirmState.confirmLabel}
        cancelLabel={confirmState.cancelLabel}
        onConfirm={confirmState.onConfirm}
        isConfirming={isDeleting}
        variant="danger"
      />
    </div >
  );
}
