"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Edit2,
  Trash2,
  Plus,
  ExternalLink,
  Eye,
  ScrollText,
} from "lucide-react";
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
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeed, setEditingDeed] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    investmentId: "",
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
      investmentId: "",
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
      investmentId: deed.investmentId ?? "",
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
    if (!formValues.investmentId) {
      toast.error("Investment ID is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", formValues.title.trim());
      formData.append("investmentId", formValues.investmentId);
      if (formValues.issueDate) {
        formData.append("issueDate", formValues.issueDate);
      }
      if (formValues.file) formData.append("file", formValues.file);
      if (formValues.uploadPdf)
        formData.append("uploadPdf", formValues.uploadPdf);
      if (formValues.signature)
        formData.append("signature", formValues.signature);

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
    <div className="space-y-8 p-2">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <ScrollText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Deeds Management
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Manage investment deeds, attachments, and signatures.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search deeds..."
            className="w-full sm:w-64"
          />
          {!isReadOnly && (
            <Button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:brightness-[1.05] active:scale-95 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Deed</span>
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
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-xs font-bold text-zinc-400 w-16 dark:text-zinc-500",
                cell: (deed) => items.findIndex((d) => d.id === deed.id) + 1,
              },
              {
                key: "title",
                header: "TITLE",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100",
                cell: (deed) => deed.title || "-",
              },
              {
                key: "investment",
                header: "INVESTMENT",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (deed) => (
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Inv #{deed.investmentId || "-"}
                  </span>
                ),
              },
              {
                key: "investor",
                header: "INVESTOR",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (deed) => {
                  const investor = deed.investment?.investor;
                  return (
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {investor?.name || "-"}
                      </span>
                      {investor?.email && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {investor.email}
                        </span>
                      )}
                    </div>
                  );
                },
              },
              {
                key: "issueDate",
                header: "ISSUE DATE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (deed) =>
                  deed.issueDate ? (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
                      {deed.issueDate}
                    </span>
                  ) : (
                    <span className="text-zinc-400 italic text-xs dark:text-zinc-500">
                      —
                    </span>
                  ),
              },
              {
                key: "file",
                header: "FILE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (deed) =>
                  deed.file ? (
                    <a
                      href={deed.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20 dark:hover:bg-emerald-500/15"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-500/10 italic dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700">
                      None
                    </span>
                  ),
              },
              {
                key: "uploadPdf",
                header: "PDF",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (deed) =>
                  deed.uploadPdf ? (
                    <a
                      href={deed.uploadPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-600/10 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20 dark:hover:bg-blue-500/15"
                    >
                      <ExternalLink className="h-3 w-3" />
                      PDF
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-500/10 italic dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700">
                      None
                    </span>
                  ),
              },
              {
                key: "signature",
                header: "SIGNATURE",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (deed) =>
                  deed.signature ? (
                    <a
                      href={deed.signature}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-purple-50 px-2 py-1 text-xs font-bold text-purple-700 ring-1 ring-inset ring-purple-600/10 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-500/20 dark:hover:bg-purple-500/15"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Sign
                    </a>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-500/10 italic dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700">
                      None
                    </span>
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
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-blue-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-blue-300"
                >
                  <Link href={`/admin/deed/${deed.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                {!isReadOnly && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModal(deed)}
                      className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-amber-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-amber-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete(deed)}
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
