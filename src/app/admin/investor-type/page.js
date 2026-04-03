"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Edit2, Trash2, Plus, PieChart, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminInvestorTypeFormModal } from "@/app/admin/components/investorType/AdminInvestorTypeFormModal";
import { DataTable } from "@/components/ui/data-table";
import {
  useGetInvestorTypesQuery,
  useCreateInvestorTypeMutation,
  useUpdateInvestorTypeMutation,
  useDeleteInvestorTypeMutation,
} from "@/features/admin/investorType/investorTypeApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 12;

export default function AdminInvestorTypePage() {
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formValues, setFormValues] = useState({
    type: "",
    percentage: "",
  });

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const { data, isLoading, isFetching } = useGetInvestorTypesQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createInvestorType, { isLoading: isCreating }] =
    useCreateInvestorTypeMutation();
  const [updateInvestorType, { isLoading: isUpdating }] =
    useUpdateInvestorTypeMutation();
  const [deleteInvestorType, { isLoading: isDeleting }] =
    useDeleteInvestorTypeMutation();

  const items = data?.items ?? data ?? [];
  const meta =
    data?.meta ??
    (Array.isArray(items)
      ? {
        page,
        pageCount: 1,
        total: items.length,
      }
      : { page: 1, pageCount: 1, total: 0 });

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormValues({
      type: "",
      percentage: "",
    });
    setEditingItem(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormValues({
      type: item.type ?? "",
      percentage:
        item.percentage != null
          ? String(item.percentage)
          : "",
    });
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedType = formValues.type.trim();
    const percentageValue = Number(formValues.percentage);

    if (!trimmedType) {
      toast.error("Type name is required");
      return;
    }

    if (Number.isNaN(percentageValue)) {
      toast.error("Percentage must be a number");
      return;
    }

    if (percentageValue < 0 || percentageValue > 100) {
      toast.error("Percentage must be between 0 and 100");
      return;
    }

    try {
      const payload = {
        type: trimmedType,
        percentage: percentageValue,
      };

      if (editingItem) {
        await updateInvestorType({ id: editingItem.id, body: payload }).unwrap();
        toast.success("Investor type updated successfully");
      } else {
        await createInvestorType(payload).unwrap();
        toast.success("Investor type created successfully");
      }

      closeModal();
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Save failed", { description: message });
    }
  };

  const isBusy =
    isLoading || isFetching || isCreating || isUpdating || isDeleting;

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

  const confirmDelete = (item) => {
    openConfirm({
      title: "Delete investor type",
      description: `Delete investor type "${item.type}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteInvestorType(item.id).unwrap();
          toast.success("Investor type deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete investor type.";
          toast.error("Delete failed", { description: message });
        } finally {
          closeConfirm();
        }
      },
    });
  };

  return (
    <div className="space-y-8 p-4 md:p-5 max-w-[1600px] mx-auto -mt-6">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <PieChart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Investor Types
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Manage investor categories and share percentages.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search types..."
            className="w-full sm:w-64"
          />
          {!isReadOnly && (
            <Button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:brightness-[1.05] active:scale-95 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Type</span>
            </Button>
          )}
        </div>
      </header>

      <section className="w-full rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "#",
                tdClassName: "whitespace-nowrap px-6 py-4 text-xs font-bold text-zinc-400 w-16 dark:text-zinc-500",
                cell: (item) => items.findIndex((i) => i.id === item.id) + 1,
              },
              {
                key: "type",
                header: "TYPE NAME",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (item) => (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
                      <PieChart className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.type}</span>
                  </div>
                ),
              },
              {
                key: "percentage",
                header: "SHARE %",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (item) => (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
                    <Percent className="h-3 w-3" />
                    {item.percentage}% Share
                  </span>
                ),
              },
            ]}
            data={items}
            isLoading={isBusy}
            emptyMessage={
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
                  <PieChart className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
                </div>
                <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">No investor types found</h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Get started by creating a new investor type.</p>
              </div>
            }
            loadingLabel="Loading investor types..."
            getRowKey={(item) => item.id}
            minWidth="min-w-full"
            renderActions={(item) => (
              <div className="flex items-center justify-end gap-2">
                {!isReadOnly && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModal(item)}
                      className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-amber-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-amber-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete(item)}
                      className="h-8 w-8 rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:text-zinc-500 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            )}
          />
        </div>

        <div className="border-t border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/40">
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
        </div>
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

      <AdminInvestorTypeFormModal
        isOpen={isModalOpen}
        editingItem={editingItem}
        formValues={formValues}
        isCreating={isCreating}
        isUpdating={isUpdating}
        onClose={closeModal}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

