"use client";
import { useState } from "react";
import { Edit2, Trash2, Plus, PieChart, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminInvestorTypeFormModal } from "@/app/admin/components/investorType/AdminInvestorTypeFormModal";
import {
  useGetInvestorTypesQuery,
  useCreateInvestorTypeMutation,
  useUpdateInvestorTypeMutation,
  useDeleteInvestorTypeMutation,
} from "@/features/admin/investorType/investorTypeApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 12;

export default function AdminInvestorTypePage() {
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
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <PieChart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Investor Types
            </h1>
            <p className="text-sm font-medium text-zinc-500">
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
          <Button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Type</span>
          </Button>
        </div>
      </header>

      {/* Grid Section */}
      <div className="space-y-4">
        {isBusy ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-2xl bg-zinc-100"
              />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-100 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <PieChart className="h-5 w-5" />
                  </div>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(item)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    {item.type}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <Percent className="h-3 w-3" />
                      {item.percentage}% Share
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50">
              <PieChart className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="mt-2 text-sm font-semibold text-zinc-900">
              No investor types found
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Get started by creating a new investor type.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-8">
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

