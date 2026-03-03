"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Eye, Layers, Wallet2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useGetProjectsStatsQuery,
} from "@/features/admin/projects/projectsApiSlice";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminProjectsPage() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

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
    openProjects: stats?.openProjects ?? 0,
    closedProjects: stats?.closedProjects ?? 0,
    totalTargetAmount: stats?.totalTargetAmount ?? 0,
    totalCollectedAmount: stats?.totalCollectedAmount ?? 0,
    totalRemainingAmount: stats?.totalRemainingAmount ?? 0,
    totalInvestors: stats?.totalInvestors ?? 0,
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

  const projects = data?.items ?? [];
  const meta = data?.meta ?? { page: 1, pageCount: 1, total: 0 };

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
      description: `Delete project "${project.title}"? This action cannot be undone.`,
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

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Projects
              </CardTitle>
              <Layers className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading ? "—" : projectStats.totalProjects}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading project stats..."
                : `${projectStats.openProjects} open · ${projectStats.closedProjects} closed`}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Target amount
              </CardTitle>
              <Wallet2 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading ? "—" : formatNumber(projectStats.totalTargetAmount)}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading amounts..."
                : `Collected ${formatNumber(
                    projectStats.totalCollectedAmount,
                  )} · Remaining ${formatNumber(projectStats.totalRemainingAmount)}`}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Collected vs remaining
              </CardTitle>
              <Wallet2 className="h-4 w-4 rotate-180 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading ? "—" : formatNumber(projectStats.totalCollectedAmount)}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading..."
                : `${formatNumber(
                    projectStats.totalRemainingAmount,
                  )} remaining across all projects`}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Investors
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-semibold text-zinc-900">
              {isStatsLoading ? "—" : projectStats.totalInvestors}
            </p>
            <CardDescription>
              {isStatsLoading
                ? "Loading investors..."
                : "Total unique investors across all projects"}
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <DataTable
            columns={[
              {
                key: "sl",
                header: "SL",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                cell: (project) =>
                  projects.findIndex((p) => p.id === project.id) + 1,
              },
              {
                key: "title",
                header: "Title",
                tdClassName:
                  "whitespace-nowrap px-4 py-3 text-sm font-medium text-zinc-900",
                cell: (project) => project.title || "-",
              },
              {
                key: "status",
                header: "Status",
                tdClassName: "whitespace-nowrap px-4 py-3 text-xs",
                cell: (project) => (
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 font-medium ${
                      project.status === "open"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {project.status ?? "—"}
                  </span>
                ),
              },
              {
                key: "period",
                header: "Period",
                tdClassName: "whitespace-nowrap px-4 py-3 text-sm text-zinc-600",
                cell: (project) =>
                  project.projectPeriod?.duration
                    ? project.projectPeriod.duration
                    : "-",
              },
              {
                key: "dates",
                header: "Start / End",
                tdClassName: "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                cell: (project) => (
                  <div className="flex flex-col">
                    <span>{project.startDate || "-"}</span>
                    <span className="text-zinc-400">{project.endDate || "-"}</span>
                  </div>
                ),
              },
            ]}
            data={projects}
            isLoading={isBusy}
            emptyMessage="No projects found."
            loadingLabel="Loading projects..."
            getRowKey={(project) => project.id}
            renderActions={(project) => (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => router.push(`/admin/projects/${project.id}`)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/admin/projects/${project.id}/edit`)
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => confirmDelete(project)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
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
    </div>
  );
}

