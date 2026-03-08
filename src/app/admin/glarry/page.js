"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2, Plus, Edit2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminGlarryFormModal } from "@/app/admin/components/glarry/AdminGlarryFormModal";
import {
  useGetGlarryQuery,
  useCreateGlarryMutation,
  useUpdateGlarryMutation,
  useDeleteGlarryMutation,
} from "@/features/admin/glarry/glarryApiSlice";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminGlarryPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGlarry, setEditingGlarry] = useState(null);
  const [formValues, setFormValues] = useState({
    projectId: "",
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

  const { data, isLoading, isFetching } = useGetGlarryQuery({
    page,
    limit: pageSize,
    search,
  });

  const { data: projectsData, isLoading: isProjectsLoading } =
    useGetProjectsQuery({
      page: 1,
      limit: 100,
      search: "",
    });

  const [createGlarry, { isLoading: isCreating }] = useCreateGlarryMutation();
  const [updateGlarry, { isLoading: isUpdating }] = useUpdateGlarryMutation();
  const [deleteGlarry, { isLoading: isDeleting }] = useDeleteGlarryMutation();

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
      projectId: "",
      photo: null,
      photoUrl: "",
    });
    setEditingGlarry(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setFormValues({
      projectId: item.projectId ? String(item.projectId) : "",
      photo: null,
      photoUrl: item.photoUrl || "",
    });
    setEditingGlarry(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.projectId) {
      toast.error("Project is required");
      return;
    }

    if (!editingGlarry && !formValues.photo && !formValues.photoUrl) {
      toast.error("Please upload a photo or provide a photo URL");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("projectId", String(formValues.projectId));

      if (formValues.photo) {
        formData.append("photo", formValues.photo);
      } else if (formValues.photoUrl) {
        formData.append("photoUrl", formValues.photoUrl);
      }

      if (editingGlarry) {
        await updateGlarry({ id: editingGlarry.id, formData }).unwrap();
        toast.success("Glarry image updated successfully");
      } else {
        await createGlarry(formData).unwrap();
        toast.success("Glarry image created successfully");
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
    const projectTitle =
      item?.project?.title || `Project #${item.projectId}` || "Project";

    openConfirm({
      title: "Delete glarry image",
      description: `Delete glarry image for "${projectTitle}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteGlarry(item.id).unwrap();
          toast.success("Glarry image deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete glarry image.";
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
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">
              Gallery Management
            </h1>
            <p className="text-sm font-medium text-zinc-500">
              Manage project photos and visual assets.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by project..."
            className="w-full sm:w-64"
          />
          <Button
            type="button"
            size="default"
            onClick={openCreateModal}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Gallery</span>
          </Button>
        </div>
      </header>

      <section className="space-y-6">
        {isBusy ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] w-full bg-zinc-100"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-zinc-100"></div>
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 rounded-full bg-zinc-100"></div>
                    <div className="h-8 w-8 rounded-full bg-zinc-100"></div>
                    <div className="h-8 w-8 rounded-full bg-zinc-100"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 py-20 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
              <ImageIcon className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-zinc-900">
              No glarry images found
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Get started by adding a new glarry image.
            </p>
            <Button
              onClick={openCreateModal}
              className="mt-6 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Add Glarry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-50 relative">
                  {item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt={
                        item?.projectName ||
                        item?.project?.name ||
                        "Glarry Image"
                      }
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-300 bg-zinc-50">
                      <ImageIcon className="h-12 w-12 opacity-20" />
                    </div>
                  )}

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    {item.projectId && (
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/admin/projects/${item.projectId}`)
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all duration-200"
                        title="View Project"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg hover:bg-blue-500 hover:text-white hover:scale-110 transition-all duration-200"
                      title="Edit Image"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDelete(item)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-200"
                      title="Delete Image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Project
                    </span>
                    {item.projectId && (
                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">
                        ID: {item.projectId}
                      </span>
                    )}
                  </div>
                  <h3
                    className="truncate text-base font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors"
                    title={
                      item?.projectName ||
                      item?.project?.name ||
                      `Project #${item.projectId}`
                    }
                  >
                    {item?.projectName ||
                      item?.project?.name ||
                      (item.projectId ? `Project #${item.projectId}` : "-")}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="border-t border-zinc-200 pt-6">
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

      <AdminGlarryFormModal
        isOpen={isModalOpen}
        editingGlarry={editingGlarry}
        formValues={formValues}
        isCreating={isCreating}
        isUpdating={isUpdating}
        onClose={closeModal}
        onChange={handleFormChange}
        onSubmit={handleSubmit}
        projects={
          Array.isArray(projectsData)
            ? projectsData
            : (projectsData?.items ?? [])
        }
        isProjectsLoading={isProjectsLoading}
      />
    </div>
  );
}
