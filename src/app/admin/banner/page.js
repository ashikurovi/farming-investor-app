"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Edit2, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminBannerFormModal } from "@/app/admin/components/banner/AdminBannerFormModal";
import {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "@/features/admin/banner/bannerApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminBannerPage() {
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    shortDescription: "",
    order: "",
    photo: null,
    photoUrl: "",
  });

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const { data, isLoading, isFetching } = useGetBannersQuery({
    page,
    limit: pageSize,
    search,
  });

  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

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
      shortDescription: "",
      order: "",
      photo: null,
      photoUrl: "",
    });
    setEditingBanner(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setFormValues({
      title: banner.title ?? "",
      shortDescription: banner.shortDescription ?? "",
      order: banner.order != null ? String(banner.order) : "",
      photo: null,
      photoUrl: banner.photoUrl ?? "",
    });
    setEditingBanner(banner);
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

    if (!formValues.shortDescription.trim()) {
      toast.error("Short description is required");
      return;
    }

    if (!formValues.photo && !formValues.photoUrl) {
      toast.error("Please upload a photo or provide a photo URL");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", formValues.title.trim());
      formData.append("shortDescription", formValues.shortDescription.trim());
      if (formValues.order) {
        formData.append("order", String(formValues.order));
      }
      if (formValues.photo) {
        formData.append("photo", formValues.photo);
      } else if (formValues.photoUrl) {
        formData.append("photoUrl", formValues.photoUrl);
      }

      if (editingBanner) {
        await updateBanner({ id: editingBanner.id, formData }).unwrap();
        toast.success("Banner updated successfully");
      } else {
        await createBanner(formData).unwrap();
        toast.success("Banner created successfully");
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

  const confirmDelete = (banner) => {
    openConfirm({
      title: "Delete banner",
      description: `Delete banner "${banner.title}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteBanner(banner.id).unwrap();
          toast.success("Banner deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete banner.";
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
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Banners Management
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Manage homepage banners, their order and images.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search banners..."
            className="w-full sm:w-64"
          />
          {!isReadOnly && (
            <Button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:brightness-[1.05] active:scale-95 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Banner</span>
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
                cell: (banner) =>
                  items.findIndex((b) => b.id === banner.id) + 1,
              },
              {
                key: "title",
                header: "TITLE",
                tdClassName:
                  "whitespace-nowrap px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100",
                cell: (banner) => banner.title || "-",
              },
              {
                key: "shortDescription",
                header: "DESCRIPTION",
                tdClassName:
                  "px-6 py-4 text-sm text-zinc-500 max-w-xs truncate dark:text-zinc-300",
                cell: (banner) => banner.shortDescription || "-",
              },
              {
                key: "order",
                header: "ORDER",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (banner) =>
                  banner.order != null ? (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-bold text-zinc-700 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700">
                      #{banner.order}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-500/10 italic dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700">
                      —
                    </span>
                  ),
              },
              {
                key: "photo",
                header: "PHOTO",
                tdClassName: "whitespace-nowrap px-6 py-4",
                cell: (banner) =>
                  banner.photoUrl ? (
                    <img
                      src={banner.photoUrl}
                      alt="Banner"
                      className="h-16 w-32 rounded-lg object-cover border border-zinc-200 dark:border-zinc-700"
                    />
                  ) : (
                    <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-zinc-500/10 italic dark:bg-zinc-800 dark:text-zinc-500 dark:ring-zinc-700">
                      No image
                    </span>
                  ),
              },
            ]}
            data={items}
            isLoading={isBusy}
            emptyMessage="No banners found."
            loadingLabel="Loading banners..."
            getRowKey={(banner) => banner.id}
            minWidth="min-w-full"
            renderActions={(banner) => (
              <div className="flex items-center justify-end gap-2">
                {!isReadOnly && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModal(banner)}
                      className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-amber-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-amber-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete(banner)}
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

      <AdminBannerFormModal
        isOpen={isModalOpen}
        editingBanner={editingBanner}
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
