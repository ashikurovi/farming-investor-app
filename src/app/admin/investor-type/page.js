"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
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

const PAGE_SIZE = 10;

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
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Investor types
          </h1>
          <p className="text-sm text-zinc-500">
            Manage investor types and their percentage values.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by type..."
          />
          <Button
            type="button"
            size="sm"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-emerald-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add type</span>
          </Button>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "SL",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                cell: (item) =>
                  items.findIndex((i) => i.id === item.id) + 1,
              },
              {
                key: "type",
                header: "Type",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                cell: (item) => item.type || "-",
              },
              {
                key: "percentage",
                header: "Percentage",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (item) =>
                  item.percentage != null ? `${item.percentage}%` : "-",
              },
            ]}
            data={items}
            isLoading={isBusy}
            emptyMessage="No investor types found."
            loadingLabel="Loading investor types..."
            getRowKey={(item) => item.id}
            renderActions={(item) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(item)}
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

