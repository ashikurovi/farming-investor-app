import { FilePlus, Eye, Edit2, Trash2 } from "lucide-react";

export function AdminProjectsGrid({
  projects,
  isBusy,
  onView,
  onEdit,
  onDelete,
  onAddDailyReport,
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      {isBusy && (
        <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
          Loading projects...
        </div>
      )}
      {!isBusy && projects.length === 0 && (
        <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
          No projects found.
        </div>
      )}
      {!isBusy && projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900">
                    {project.name || "—"}
                  </h3>
                  <div className="flex items-center gap-1.5 opacity-0 transition group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onAddDailyReport?.(project)}
                      title="Add daily report"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <FilePlus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onView?.(project)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit?.(project)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete?.(project)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-zinc-500">{project.location || "—"}</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-zinc-50 p-2">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Investment</div>
                    <div className="font-medium text-zinc-900">
                      {project.totalInvestment != null
                        ? Number(project.totalInvestment).toLocaleString("en-US", { maximumFractionDigits: 0 })
                        : "—"}
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-2">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Sell</div>
                    <div className="font-medium text-zinc-900">
                      {project.totalSell != null
                        ? Number(project.totalSell).toLocaleString("en-US", { maximumFractionDigits: 0 })
                        : "—"}
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-2">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Cost</div>
                    <div className="font-medium text-zinc-900">
                      {project.totalCost != null
                        ? Number(project.totalCost).toLocaleString("en-US", { maximumFractionDigits: 0 })
                        : "—"}
                    </div>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-2">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">Profit</div>
                    <div className="font-medium text-zinc-900">
                      {project.totalProfit != null
                        ? Number(project.totalProfit).toLocaleString("en-US", { maximumFractionDigits: 0 })
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
