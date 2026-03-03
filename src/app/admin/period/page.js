"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminPeriodFormModal } from "@/app/admin/components/period/AdminPeriodFormModal";
import {
  useGetProjectPeriodsQuery,
  useCreateProjectPeriodMutation,
  useUpdateProjectPeriodMutation,
  useDeleteProjectPeriodMutation,
} from "@/features/admin/project-periods/projectPeriodsApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminPeriodPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [duration, setDuration] = useState("");

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const { data, isLoading, isFetching } = useGetProjectPeriodsQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createProjectPeriod, { isLoading: isCreating }] =
    useCreateProjectPeriodMutation();
  const [updateProjectPeriod, { isLoading: isUpdating }] =
    useUpdateProjectPeriodMutation();
  const [deleteProjectPeriod, { isLoading: isDeleting }] =
    useDeleteProjectPeriodMutation();

  const periods = data?.items ?? [];
  const meta = data?.meta ?? { page: 1, pageCount: 1, total: 0 };

  const resetForm = () => {
    setDuration("");
    setEditingPeriod(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (period) => {
    setDuration(period.duration ?? "");
    setEditingPeriod(period);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!duration.trim()) {
      toast.error("Duration is required");
      return;
    }

    try {
      const payload = { duration: duration.trim() };

      if (editingPeriod) {
        await updateProjectPeriod({ id: editingPeriod.id, payload }).unwrap();
        toast.success("Period updated successfully");
      } else {
        await createProjectPeriod(payload).unwrap();
        toast.success("Period created successfully");
      }

      closeModal();
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Operation failed", { description: message });
    }
  };

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

  const confirmDelete = (period) => {
    openConfirm({
      title: "Delete period",
      description: `Delete period "${period.duration}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteProjectPeriod(period.id).unwrap();
          toast.success("Period deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete period.";
          toast.error("Delete failed", { description: message });
        } finally {
          closeConfirm();
        }
      },
    });
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const isBusy = isLoading || isFetching || isCreating || isUpdating || isDeleting;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Project periods
          </h1>
          <p className="text-sm text-zinc-500">
            Manage project investment periods and durations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search periods..."
          />

          <Button
            type="button"
            size="sm"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-emerald-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add period</span>
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
                cell: (period) =>
                  periods.findIndex((p) => p.id === period.id) + 1,
              },
              {
                key: "duration",
                header: "Duration",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                cell: (period) => period.duration || "-",
              },
            ]}
            data={periods}
            isLoading={isBusy}
            emptyMessage="No periods found."
            loadingLabel="Loading periods..."
            getRowKey={(period) => period.id}
            renderActions={(period) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(period)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(period)}
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

      <AdminPeriodFormModal
        isOpen={isModalOpen}
        editingPeriod={editingPeriod}
        duration={duration}
        isCreating={isCreating}
        isUpdating={isUpdating}
        onClose={closeModal}
        onChange={setDuration}
        onSubmit={handleSubmit}
      />

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

