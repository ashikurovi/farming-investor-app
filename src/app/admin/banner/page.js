"use client";

import { useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  Image as ImageIcon,
  Eye,
  Megaphone,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
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
    <div className="space-y-6">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <Megaphone className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Banners Management
            </h1>
            <p className="text-sm font-medium text-zinc-500">
              Manage homepage banners, their order and visibility.
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
          <Button
            type="button"
            size="default"
            onClick={openCreateModal}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Banner</span>
          </Button>
        </div>
      </header>

      <section className="space-y-6">
        {items.length === 0 && !isBusy ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50">
            <div className="mb-4 rounded-full bg-white p-4 shadow-sm ring-1 ring-zinc-900/5">
              <ImageIcon className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900">
              No banners found
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Get started by adding a new banner.
            </p>
            <Button
              onClick={openCreateModal}
              variant="outline"
              className="mt-4 rounded-full"
            >
              Add your first banner
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((banner) => (
              <div
                key={banner.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image Area */}
                <div className="aspect-video w-full overflow-hidden bg-zinc-50 relative">
                  {banner.photoUrl ? (
                    <img
                      src={banner.photoUrl}
                      alt={banner.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-300 bg-zinc-50">
                      <ImageIcon className="h-12 w-12 opacity-20" />
                    </div>
                  )}

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={() => openEditModal(banner)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all duration-200"
                      title="Edit Banner"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDelete(banner)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-lg hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-200"
                      title="Delete Banner"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Order Badge */}
                  {banner.order && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-zinc-800 uppercase tracking-wide backdrop-blur-md shadow-sm border border-white/20">
                        Order: {banner.order}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex flex-1 flex-col p-5 gap-3">
                  <div>
                    <h3
                      className="truncate text-base font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors"
                      title={banner.title}
                    >
                      {banner.title || "Untitled Banner"}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-500 leading-relaxed h-10">
                      {banner.shortDescription || "No description provided."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-8 flex justify-center border-t border-zinc-100 pt-8">
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
        )}
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
