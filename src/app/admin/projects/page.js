"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { AdminDailyReportFormModal } from "@/app/admin/components/projects/AdminDailyReportFormModal";
import { AdminProjectsStats } from "@/app/admin/components/projects/AdminProjectsStats";
import { AdminProjectsGrid } from "@/app/admin/components/projects/AdminProjectsGrid";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useGetProjectsStatsQuery,
} from "@/features/admin/projects/projectsApiSlice";
import { useCreateDailyReportMutation } from "@/features/admin/dailyReport/dailyReportApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminProjectsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [dailyModalOpen, setDailyModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [dailyValues, setDailyValues] = useState({
    dailyCost: "",
    dailySell: "",
    reason: "",
    photoFile: null,
    date: "",
    time: "",
  });

  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "Cancel",
    onConfirm: null,
  });

  const { data: stats, isLoading: isStatsLoading } = useGetProjectsStatsQuery();

  const projectStats = {
    totalProjects: stats?.totalProjects ?? 0,
    totalInvestment: stats?.totalInvestment ?? 0,
    totalSell: stats?.totalSell ?? 0,
    totalCost: stats?.totalCost ?? 0,
    totalProfit: stats?.totalProfit ?? 0,
  };

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });

  const { data, isLoading, isFetching } = useGetProjectsQuery({
    page,
    limit: pageSize,
    search,
  });

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [createDailyReport, { isLoading: isPostingDaily }] = useCreateDailyReportMutation();

  const projects = Array.isArray(data) ? data : data?.items ?? [];
  const meta =
    data?.meta ??
    { page: 1, pageCount: Math.max(1, Math.ceil((projects.length || 1) / pageSize)), total: projects.length || 0 };
  const serverPaginated = Boolean(data?.meta);
  const visibleProjects = serverPaginated
    ? projects
    : projects.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setSearch(value.trim());
    setPage(1);
  };

  const isBusy = isLoading || isFetching || isDeleting;

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

  const confirmDelete = (project) => {
    openConfirm({
      title: "Delete project",
      description: `Delete project "${project.name}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      onConfirm: async () => {
        try {
          await deleteProject(project.id).unwrap();
          toast.success("Project deleted successfully");
        } catch (error) {
          const message =
            error?.data?.message ||
            (Array.isArray(error?.data?.message)
              ? error.data.message[0]
              : null) ||
            "Failed to delete project.";
          toast.error("Delete failed", { description: message });
        } finally {
          closeConfirm();
        }
      },
    });
  };

  const openDailyReportModal = (project) => {
    setSelectedProjectId(project.id);
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const time = `${hh}:${mm}:${ss}`;
    setDailyValues({
      dailyCost: "",
      dailySell: "",
      reason: "",
      photoFile: null,
      date,
      time,
    });
    setDailyModalOpen(true);
  };

  const closeDailyReportModal = () => {
    setDailyModalOpen(false);
    setSelectedProjectId(null);
    setDailyValues({
      dailyCost: "",
      dailySell: "",
      reason: "",
      photoFile: null,
      date: "",
      time: "",
    });
  };

  const onDailyChange = (key, value) =>
    setDailyValues((prev) => ({ ...prev, [key]: value }));

  const submitDailyReport = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    try {
      const projectId = Number(selectedProjectId);
      const jsonBody = {
        projectId,
        dailyCost: Number(dailyValues.dailyCost || 0),
        dailySell: Number(dailyValues.dailySell || 0),
        reason: dailyValues.reason || undefined,
        date: dailyValues.date,
        time: dailyValues.time,
      };
      let payload = jsonBody;
      if (dailyValues.photoFile) {
        const form = new FormData();
        form.set("projectId", String(jsonBody.projectId));
        form.set("dailyCost", String(jsonBody.dailyCost));
        form.set("dailySell", String(jsonBody.dailySell));
        if (jsonBody.reason) form.set("reason", jsonBody.reason);
        form.set("date", jsonBody.date);
        form.set("time", jsonBody.time);
        form.set("photo", dailyValues.photoFile);
        payload = form;
      }
      await createDailyReport({ payload, projectId }).unwrap();
      toast.success("Daily report posted");
      closeDailyReportModal();
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Failed to post daily report.";
      toast.error("Post failed", { description: message });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Projects
          </h1>
          <p className="text-sm text-zinc-500">
            Manage investment projects, timelines and returns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search projects..."
          />

          <Button
            type="button"
            size="sm"
            onClick={() => router.push("/admin/projects/new")}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md hover:bg-emerald-500"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add project</span>
          </Button>
        </div>
      </header>

      <AdminProjectsStats stats={projectStats} isLoading={isStatsLoading} />

      <AdminProjectsGrid
        projects={visibleProjects}
        isBusy={isBusy}
        onView={(p) => router.push(`/admin/projects/${p.id}`)}
        onEdit={(p) => router.push(`/admin/projects/${p.id}/edit`)}
        onDelete={confirmDelete}
        onAddDailyReport={openDailyReportModal}
      />
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
              : newPage
          )
        }
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPage(1);
        }}
      />

      <AdminDailyReportFormModal
        isOpen={dailyModalOpen}
        values={dailyValues}
        isSubmitting={isPostingDaily}
        onClose={closeDailyReportModal}
        onChange={onDailyChange}
        onSubmit={submitDailyReport}
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
