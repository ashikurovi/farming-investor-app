"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2, Wallet2, Users, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  useGetInvestmentsQuery,
  useGetInvestmentsStatsQuery,
  useCreateInvestmentMutation,
  useDeleteInvestmentMutation,
} from "@/features/investor/investments/investmentsApiSlice";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminInvestmentsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    userId: "",
    projectId: "",
    amount: "",
  });

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const { data: stats, isLoading: isStatsLoading } =
    useGetInvestmentsStatsQuery();

  const investmentStats = {
    totalInvestments: stats?.totalInvestments ?? 0,
    totalAmountInvested: stats?.totalAmountInvested ?? 0,
    uniqueInvestors: stats?.uniqueInvestors ?? 0,
    uniqueProjectsInvested: stats?.uniqueProjectsInvested ?? 0,
  };

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

  const { data, isLoading, isFetching } = useGetInvestmentsQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createInvestment, { isLoading: isCreating }] =
    useCreateInvestmentMutation();
  const [deleteInvestment, { isLoading: isDeleting }] =
    useDeleteInvestmentMutation();

  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    page: 1,
    limit: 100,
    search: "",
  });

  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsQuery({
      page: 1,
      limit: 100,
      search: "",
    });

  const investors =
    usersData?.items?.filter(
      (user) => user.role === "investor" && !user.isBanned,
    ) ?? [];

  const openProjects =
    projectsData?.items?.filter((project) => project.status === "open") ?? [];

  const investments = data?.items ?? [];
  const meta = data?.meta ?? { page: 1, pageCount: 1, total: 0 };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.userId) {
      toast.error("Investor is required");
      return;
    }
    if (!formValues.projectId) {
      toast.error("Project is required");
      return;
    }
    const amountNumber = Number(formValues.amount);
    if (!amountNumber || amountNumber <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    try {
      await createInvestment({
        userId: Number(formValues.userId),
        projectId: Number(formValues.projectId),
        amount: amountNumber,
      }).unwrap();

      toast.success("Investment created successfully");
      setFormValues({ userId: "", projectId: "", amount: "" });
      setIsFormOpen(false);
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Create failed", { description: message });
    }
  };

  const isBusy = isLoading || isFetching || isDeleting;

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
    const projectTitle =
      investment?.project?.title || `Project #${investment.projectId}`;
    const investorName =
      investment?.user?.name || investment?.user?.email || "Investor";

    openConfirm({
      title: "Delete investment",
      description: `Delete ${formatNumber(
        investment.amount,
      )} BDT investment by "${investorName}" in "${projectTitle}"? This action cannot be undone.`,
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

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Investments
          </h1>
          <p className="text-sm text-zinc-500">
            View and manage all investments across projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by project or investor..."
          />

          <Button
            type="button"
            size="sm"
            onClick={() => setIsFormOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-emerald-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{isFormOpen ? "Close form" : "Add investment"}</span>
          </Button>
        </div>
      </header>

      {isFormOpen && (
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Record investment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor="investor"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Investor
                </label>
                <select
                  id="investor"
                  value={formValues.userId}
                  onChange={(e) => handleFormChange("userId", e.target.value)}
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  disabled={isUsersLoading || isCreating}
                  required
                >
                  <option value="">
                    {isUsersLoading ? "Loading investors..." : "Select investor"}
                  </option>
                  {investors.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.email}{" "}
                      {user.email ? `(${user.email})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="project"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Project
                </label>
                <select
                  id="project"
                  value={formValues.projectId}
                  onChange={(e) =>
                    handleFormChange("projectId", e.target.value)
                  }
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  disabled={isProjectsLoading || isCreating}
                  required
                >
                  <option value="">
                    {isProjectsLoading ? "Loading projects..." : "Select project"}
                  </option>
                  {openProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Amount (BDT)
                </label>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formValues.amount}
                  onChange={(e) => handleFormChange("amount", e.target.value)}
                  placeholder="e.g. 5000"
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false);
                  setFormValues({ userId: "", projectId: "", amount: "" });
                }}
                className="h-9 rounded-full border-zinc-200 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
              >
                {isCreating ? "Saving..." : "Save investment"}
              </Button>
            </div>
          </form>
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Total investments
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading ? "—" : investmentStats.totalInvestments}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading investment stats..."
                : "Number of individual investment records"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Total amount invested
              </CardTitle>
              <Wallet2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading
                ? "—"
                : `${formatNumber(investmentStats.totalAmountInvested)} BDT`}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading amounts..."
                : "Sum of all investment amounts"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Unique investors
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading ? "—" : investmentStats.uniqueInvestors}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading..."
                : "Distinct users who have invested"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Projects invested
              </CardTitle>
              <Wallet2 className="h-4 w-4 rotate-180 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading ? "—" : investmentStats.uniqueProjectsInvested}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading..."
                : "Projects that have received investments"}
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
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
                key: "investor",
                header: "Investor",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (investment) =>
                  investment?.user?.name ||
                  investment?.user?.email ||
                  `User #${investment.userId}` ||
                  "-",
              },
              {
                key: "amount",
                header: "Amount (BDT)",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (investment) =>
                  investment?.amount != null
                    ? formatNumber(investment.amount)
                    : "-",
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
            isLoading={isBusy}
            emptyMessage="No investments found."
            loadingLabel="Loading investments..."
            getRowKey={(investment) => investment.id}
            renderActions={(investment) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/admin/investment/${investment.id}`)
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/admin/investment/${investment.id}/edit`)
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(investment)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          />
        </div>

        <Pagination
          page={meta.page}
          pageCount={meta.pageCount}
          total={meta.total}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            setPage((p) =>
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
      </section>

      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel={confirmState.confirmLabel}
        cancelLabel={confirmState.cancelLabel}
        onConfirm={confirmState.onConfirm}
        onCancel={closeConfirm}
      />
    </div>
  );
}

