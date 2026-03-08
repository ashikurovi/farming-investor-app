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
  useGetInvestmentsAdminQuery,
  useCreateInvestmentAdminMutation,
  useDeleteInvestmentAdminMutation,
} from "@/features/investor/investments/investmentsApiSlice";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";
import { toast } from "sonner";
import { formatNumber, formatCurrencyBDT } from "@/lib/utils";

const PAGE_SIZE = 10;

export default function AdminInvestmentsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )}`;
  const defaultTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const [formValues, setFormValues] = useState({
    investorId: "",
    amount: "",
    date: defaultDate,
    time: defaultTime,
    reference: "",
    photoFile: null,
  });

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  

  const { data, isLoading, isFetching } = useGetInvestmentsAdminQuery();

  const [createInvestment, { isLoading: isCreating }] =
    useCreateInvestmentAdminMutation();
  const [deleteInvestment, { isLoading: isDeleting }] =
    useDeleteInvestmentAdminMutation();

  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    page: 1,
    limit: 100,
    search: "",
  });

  const investors =
    usersData?.items?.filter(
      (user) => user.role === "investor" && !user.isBanned,
    ) ?? [];

  const usersById = new Map(
    (usersData?.items ?? []).map((u) => [u.id, u]),
  );

  const allInvestments = Array.isArray(data) ? data : [];
  const filteredInvestments = search
    ? allInvestments.filter((inv) => {
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
        return haystack.includes(search.toLowerCase());
      })
    : allInvestments;
  const total = filteredInvestments.length;
  const pageCount = pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const investments = filteredInvestments.slice(startIndex, endIndex);
  const meta = { page, pageCount, total };

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

    if (!formValues.investorId) {
      toast.error("Investor is required");
      return;
    }
    const amountNumber = Number(formValues.amount);
    if (!amountNumber || amountNumber <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    if (!formValues.date) {
      toast.error("Date is required");
      return;
    }
    if (!formValues.time) {
      toast.error("Time is required");
      return;
    }

    try {
      await createInvestment({
        investorId: Number(formValues.investorId),
        amount: amountNumber,
        date: formValues.date,
        time: formValues.time,
        reference: formValues.reference || undefined,
        photoFile: formValues.photoFile || undefined,
      }).unwrap();

      toast.success("Investment created successfully");
      setFormValues({
        investorId: "",
        amount: "",
        date: defaultDate,
        time: defaultTime,
        reference: "",
        photoFile: null,
      });
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
    const user = usersById.get(investment?.investorId);
    const investorName = user?.name || user?.email || `Investor #${investment?.investorId}`;

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
                  htmlFor="investorId"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Investor
                </label>
                <select
                  id="investorId"
                  value={formValues.investorId}
                  onChange={(e) => handleFormChange("investorId", e.target.value)}
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

              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={formValues.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Time
                </label>
                <Input
                  id="time"
                  type="time"
                  value={formValues.time}
                  onChange={(e) => handleFormChange("time", e.target.value)}
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="reference"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Reference
                </label>
                <Input
                  id="reference"
                  type="text"
                  value={formValues.reference}
                  onChange={(e) => handleFormChange("reference", e.target.value)}
                  placeholder="Optional note"
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="photo"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Photo
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFormChange("photoFile", e.target.files?.[0] ?? null)
                  }
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsFormOpen(false);
                  setFormValues({
                    investorId: "",
                    amount: "",
                    date: defaultDate,
                    time: defaultTime,
                    reference: "",
                    photoFile: null,
                  });
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
              {isLoading ? "—" : total}
            </p>
            <CardDescription>
              {isLoading ? "Loading investment stats..." : "Number of individual investment records"}
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
              {isLoading
                ? "—"
                : formatCurrencyBDT(
                    filteredInvestments.reduce(
                      (sum, inv) => sum + Number(inv.amount || 0),
                      0,
                    ),
                  )}
            </p>
            <CardDescription>
              {isLoading ? "Loading amounts..." : "Sum of all investment amounts"}
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
              {isLoading
                ? "—"
                : new Set(filteredInvestments.map((inv) => inv.investorId)).size}
            </p>
            <CardDescription>
              {isLoading ? "Loading..." : "Distinct users who have invested"}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Average investment amount
              </CardTitle>
              <Wallet2 className="h-4 w-4 rotate-180 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isLoading
                ? "—"
                : formatCurrencyBDT(
                    total > 0
                      ? filteredInvestments.reduce(
                          (sum, inv) => sum + Number(inv.amount || 0),
                          0,
                        ) / total
                      : 0,
                  )}
            </p>
            <CardDescription>
              {isLoading ? "Loading..." : "Average per investment"}
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
                key: "investor",
                header: "Investor",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (investment) => {
                  const user = usersById.get(investment.investorId);
                  return (
                    user?.name ||
                    user?.email ||
                    (investment.investorId != null
                      ? `Investor #${investment.investorId}`
                      : "-")
                  );
                },
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
                key: "date",
                header: "Date",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                cell: (investment) => investment?.date ?? "-",
              },
              {
                key: "time",
                header: "Time",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                cell: (investment) => investment?.time ?? "-",
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
                : pageCount
                ? Math.min(pageCount, newPage)
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
