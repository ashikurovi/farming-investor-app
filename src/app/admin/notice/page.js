"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Edit2, Trash2, Plus, ExternalLink, Eye, Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminNoticeFormModal } from "@/app/admin/components/notice/AdminNoticeFormModal";
import {
  useGetNoticesQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
} from "@/features/admin/notice/noticeApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminNoticePage() {
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    isPublic: true,
    file: null,
    fileUrl: "",
  });

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const { data, isLoading, isFetching } = useGetNoticesQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createNotice, { isLoading: isCreating }] = useCreateNoticeMutation();
  const [updateNotice, { isLoading: isUpdating }] = useUpdateNoticeMutation();
  const [deleteNotice, { isLoading: isDeleting }] = useDeleteNoticeMutation();

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
      title: "",
      description: "",
      isPublic: true,
      file: null,
      fileUrl: "",
    });
    setEditingNotice(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (notice) => {
    setFormValues({
      title: notice.title ?? "",
      description: notice.description ?? "",
      isPublic: notice.isPublic ?? true,
      file: null,
      fileUrl: notice.fileUrl ?? "",
    });
    setEditingNotice(notice);
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

    if (!formValues.description.trim()) {
      toast.error("Description is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", formValues.title.trim());
      formData.append("description", formValues.description.trim());
      formData.append("isPublic", formValues.isPublic);

      if (formValues.file) {
        formData.append("file", formValues.file);
      } else if (formValues.fileUrl) {
        formData.append("fileUrl", formValues.fileUrl);
      }

      if (editingNotice) {
        await updateNotice({ id: editingNotice.id, formData }).unwrap();
        toast.success("Notice updated successfully");
      } else {
        await createNotice(formData).unwrap();
        toast.success("Notice created successfully");
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

  const confirmDelete = (notice) => {
    openConfirm({
      title: "Delete notice",
      description: `Delete notice "${notice.title}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteNotice(notice.id).unwrap();
          toast.success("Notice deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete notice.";
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
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Notices Management
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Manage system notices, documents, and news.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search notices..."
            className="w-full sm:w-64"
          />
          {!isReadOnly && (
            <Button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:brightness-[1.05] active:scale-95 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Notice</span>
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
                cell: (notice) =>
                  items.findIndex((n) => n.id === notice.id) + 1,
              },
              {
                key: "title",
                header: "TITLE",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100",
                cell: (notice) => notice.title || "-",
              },
              {
                key: "description",
                header: "DESCRIPTION",
                tdClassName:
                  "px-6 py-4 text-sm text-zinc-500 max-w-xs dark:text-zinc-300",
                cell: (notice) =>
                  notice.description ? (
                    <div
                      className="truncate max-w-xs [&>*]:inline [&>*]:truncate"
                      dangerouslySetInnerHTML={{ __html: notice.description }}
                    />
                  ) : (
                    "-"
                  ),
              },
              {
                key: "isPublic",
                header: "VISIBILITY",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (notice) => (
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ${
                      notice.isPublic
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                        : "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20"
                    }`}
                  >
                    {notice.isPublic ? "Public" : "Private"}
                  </span>
                ),
              },
              {
                key: "file",
                header: "ATTACHMENT",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (notice) =>
                  notice.fileUrl ? (
                    <a
                      href={notice.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/10 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20 dark:hover:bg-emerald-500/15"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View File
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
            emptyMessage="No notices found."
            loadingLabel="Loading notices..."
            getRowKey={(notice) => notice.id}
            renderActions={(notice) => (
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-blue-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-blue-300"
                >
                  <Link href={`/admin/notice/${notice.id}`}>
                    <Eye className="h-4 w-4" />
                  </Link>
                </Button>
                {!isReadOnly && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModal(notice)}
                      className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-amber-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-amber-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete(notice)}
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

      <AdminNoticeFormModal
        isOpen={isModalOpen}
        editingNotice={editingNotice}
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
