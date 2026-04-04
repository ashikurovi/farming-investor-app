"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Plus, LayoutGrid, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { AdminProjectConfirmDialog } from "@/app/admin/components/projects/AdminProjectConfirmDialog";
import { AdminDailyReportFormModal } from "@/app/admin/components/projects/AdminDailyReportFormModal";
import { AdminProjectsStats } from "@/app/admin/components/projects/AdminProjectsStats";
import { AdminProjectsGrid } from "@/app/admin/components/projects/AdminProjectsGrid";
import { AdminProjectsPrintButton } from "@/app/admin/components/projects/AdminProjectsPrintButton";
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
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

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
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <LayoutGrid className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Projects Overview
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Manage your agricultural investment portfolio.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <AdminSearchBar
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search projects..."
            className="w-full sm:w-64"
          />
          <div className="flex gap-2">
			<AdminProjectsPrintButton stats={projectStats} />

			{!isReadOnly && (
			  <Button
				type="button"
				onClick={() => router.push("/admin/projects/new")}
				className="inline-flex h-10 items-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-5 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-95"
			  >
				<Plus className="h-4 w-4" />
				<span>New Project</span>
			  </Button>
			)}
		  </div>
        </div>
      </header>

      {/* Stats Section */}
      <AdminProjectsStats stats={projectStats} isLoading={isStatsLoading} />

      {/* Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Active Projects
          </h2>
          <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Showing {visibleProjects.length} of {meta.total} projects
          </div>
        </div>

        <AdminProjectsGrid
          projects={visibleProjects}
          isBusy={isBusy}
          onView={(p) => router.push(`/admin/projects/${p.id}`)}
          onEdit={!isReadOnly ? ((p) => router.push(`/admin/projects/${p.id}/edit`)) : undefined}
          onDelete={!isReadOnly ? confirmDelete : undefined}
          onAddDailyReport={!isReadOnly ? openDailyReportModal : undefined}
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
