"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Eye, Trash2, Plus, Edit2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
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
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

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
    <div className="space-y-8 p-2">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Glarry Images
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              View and manage glarry photos attached to projects.
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
          {!isReadOnly && (
            <Button
              type="button"
              onClick={openCreateModal}
              className="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 transition-all hover:brightness-[1.05] active:scale-95 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Glarry</span>
            </Button>
          )}
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "SL",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400",
                cell: (item) => items.findIndex((i) => i.id === item.id) + 1,
              },
              {
                key: "project",
                header: "Project",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100",
                cell: (item) =>
                  item?.projectName ||
                  item?.project?.name ||
                  (item.projectId ? `Project #${item.projectId}` : "-"),
              },
              {
                key: "photo",
                header: "Photo",
                tdClassName: "whitespace-nowrap px-4 py-3",
                cell: (item) =>
                  item.photoUrl ? (
                    <img
                      src={item.photoUrl}
                      alt="Glarry"
                      className="h-16 w-24 rounded-md object-cover border border-zinc-200 dark:border-zinc-700"
                    />
                  ) : (
                    <span className="text-sm text-zinc-400 dark:text-zinc-500">No image</span>
                  ),
              },
            ]}
            data={items}
            isLoading={isBusy}
            emptyMessage="No glarry images found."
            loadingLabel="Loading glarry images..."
            getRowKey={(item) => item.id}
            minWidth="min-w-full"
            renderActions={(item) => (
              <div className="flex items-center justify-end gap-2">
                {item.projectId && (
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/admin/projects/${item.projectId}`)
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[color:rgba(124,194,46,0.45)] dark:hover:bg-[color:rgba(124,194,46,0.12)] dark:hover:text-[color:rgb(124,194,46)]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                )}
                {!isReadOnly && (
                  <>
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-[color:rgba(124,194,46,0.45)] dark:hover:bg-[color:rgba(124,194,46,0.12)] dark:hover:text-[color:rgb(124,194,46)]"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDelete(item)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50 dark:border-red-500/30 dark:bg-zinc-900 dark:text-red-300 dark:hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
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
