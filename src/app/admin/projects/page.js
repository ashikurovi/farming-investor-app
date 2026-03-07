"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { AdminProjectConfirmDialog } from "@/app/admin/components/projects/AdminProjectConfirmDialog";
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
  const [createDailyReport, { isLoading: isPostingDaily }] =
    useCreateDailyReportMutation();

  const projects = Array.isArray(data) ? data : (data?.items ?? []);
  const meta = data?.meta ?? {
    page: 1,
    pageCount: Math.max(1, Math.ceil((projects.length || 1) / pageSize)),
    total: projects.length || 0,
  };
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
    <div className="space-y-8 -mt-6 p-4 md:p-5 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            </span>
            Live Portfolio
          </div>
          
          <div className="max-w-2xl">
            <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 shadow-sm">
                <LayoutGrid className="h-5 w-5" />
              </div>
              Projects Overview
            </h1>
            <p className="mt-2 text-sm text-zinc-500 leading-relaxed max-w-lg">
              Manage your agricultural investment portfolio. Track growth, analyze returns, and generate reports.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="w-full sm:w-72 relative group">
            <AdminSearchBar
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Search projects..."
            />
          </div>

          <Button
            type="button"
            onClick={() => router.push("/admin/projects/new")}
            className="inline-flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      <div className="h-px w-full bg-zinc-100" />

      {/* Stats Section */}
      <AdminProjectsStats stats={projectStats} isLoading={isStatsLoading} />

      {/* Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">Active Projects</h2>
          <div className="text-xs font-medium text-zinc-500">
            Showing {visibleProjects.length} of {meta.total} projects
          </div>
        </div>
        
        <AdminProjectsGrid
          projects={visibleProjects}
          isBusy={isBusy}
          onView={(p) => router.push(`/admin/projects/${p.id}`)}
          onEdit={(p) => router.push(`/admin/projects/${p.id}/edit`)}
          onDelete={confirmDelete}
          onAddDailyReport={openDailyReportModal}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-8">
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

      <AdminDailyReportFormModal
        isOpen={dailyModalOpen}
        values={dailyValues}
        isSubmitting={isPostingDaily}
        onClose={closeDailyReportModal}
        onChange={onDailyChange}
        onSubmit={submitDailyReport}
      />

      <AdminProjectConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel={confirmState.confirmLabel}
        cancelLabel={confirmState.cancelLabel}
        onConfirm={confirmState.onConfirm}
        onClose={closeConfirm}
        isConfirming={isDeleting}
      />
    </div>
  );
}
