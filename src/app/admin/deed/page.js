"use client";

import { useState } from "react";
import { Edit2, Trash2, Plus, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminDeedFormModal } from "@/app/admin/components/deed/AdminDeedFormModal";
import {
  useGetDeedsQuery,
  useCreateDeedMutation,
  useUpdateDeedMutation,
  useDeleteDeedMutation,
} from "@/features/admin/deed/deedApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminDeedPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeed, setEditingDeed] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    investorId: "",
    issueDate: "",
    file: null,
    uploadPdf: null,
    signature: null,
  });

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const { data, isLoading, isFetching } = useGetDeedsQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createDeed, { isLoading: isCreating }] = useCreateDeedMutation();
  const [updateDeed, { isLoading: isUpdating }] = useUpdateDeedMutation();
  const [deleteDeed, { isLoading: isDeleting }] = useDeleteDeedMutation();

  const items = data?.data ?? data?.items ?? data ?? [];
  const meta = data?.meta ?? {
    page: 1,
    pageCount: 1,
    total: Array.isArray(items) ? items.length : 0,
  };

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
      title: "",
      investorId: "",
      issueDate: "",
      file: null,
      uploadPdf: null,
      signature: null,
    });
    setEditingDeed(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (deed) => {
    setFormValues({
      title: deed.title ?? "",
      investorId: deed.investorId ?? "",
      issueDate: deed.issueDate ?? "",
      file: null,
      uploadPdf: null,
      signature: null,
    });
    setEditingDeed(deed);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!formValues.investorId) {
      toast.error("Investor ID is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", formValues.title.trim());
      formData.append("investorId", formValues.investorId);
      if (formValues.issueDate) {
        formData.append("issueDate", formValues.issueDate);
      }
      if (formValues.file) formData.append("file", formValues.file);
      if (formValues.uploadPdf) formData.append("uploadPdf", formValues.uploadPdf);
      if (formValues.signature) formData.append("signature", formValues.signature);

      if (editingDeed) {
        await updateDeed({ id: editingDeed.id, formData }).unwrap();
        toast.success("Deed updated successfully");
      } else {
        await createDeed(formData).unwrap();
        toast.success("Deed created successfully");
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

  const isBusy = isLoading || isFetching || isCreating || isUpdating || isDeleting;

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

  const confirmDelete = (deed) => {
    openConfirm({
      title: "Delete deed",
      description: `Delete deed "${deed.title}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteDeed(deed.id).unwrap();
          toast.success("Deed deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete deed.";
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
            Deeds
          </h1>
          <p className="text-sm text-zinc-500">
            Manage investor deeds, attachments, and signatures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search deeds..."
          />
          <Button
            type="button"
            size="sm"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-emerald-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add deed</span>
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
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                cell: (deed) => items.findIndex((d) => d.id === deed.id) + 1,
              },
              {
                key: "title",
                header: "Title",
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                cell: (deed) => deed.title || "-",
              },
              {
                key: "investor",
                header: "Investor",
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (deed) => deed.investor?.name || deed.investorId || "-",
              },
              {
                key: "issueDate",
                header: "Issue Date",
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm",
                cell: (deed) => deed.issueDate || "-",
              },
              {
                key: "file",
                header: "File",
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm",
                cell: (deed) =>
                  deed.file ? (
                    <a
                      href={deed.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-500 font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View
                    </a>
                  ) : (
                    <span className="text-zinc-500">None</span>
                  ),
              },
              {
                key: "uploadPdf",
                header: "PDF",
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm",
                cell: (deed) =>
                  deed.uploadPdf ? (
                    <a
                      href={deed.uploadPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-500 font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      PDF
                    </a>
                  ) : (
                    <span className="text-zinc-500">None</span>
                  ),
              },
              {
                key: "signature",
                header: "Signature",
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm",
                cell: (deed) =>
                  deed.signature ? (
                    <a
                      href={deed.signature}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-500 font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Sign
                    </a>
                  ) : (
                    <span className="text-zinc-500">None</span>
                  ),
              },
            ]}
            data={items}
            isLoading={isBusy}
            emptyMessage="No deeds found."
            loadingLabel="Loading deeds..."
            getRowKey={(deed) => deed.id}
            renderActions={(deed) => (
              <div className="flex items-center justify-end gap-2">
                <Link
                  href={`/admin/deed/${deed.id}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => openEditModal(deed)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(deed)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          />
        </div>

        <Pagination
          page={meta.currentPage ?? meta.page}
          pageCount={meta.totalPages ?? meta.pageCount}
          total={meta.totalItems ?? meta.total}
          pageSize={pageSize}
          onPageChange={(newPage) =>
            setPage((p) =>
              newPage < 1
                ? 1
                : (meta.totalPages ?? meta.pageCount)
                  ? Math.min(meta.totalPages ?? meta.pageCount, newPage)
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

      <AdminDeedFormModal
        isOpen={isModalOpen}
        editingDeed={editingDeed}
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
