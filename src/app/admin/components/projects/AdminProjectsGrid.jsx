import { FilePlus, Eye, Edit2, Trash2, MapPin, TrendingUp, Calendar } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyBDT } from "@/lib/utils";

export function AdminProjectsGrid({
  projects,
  isBusy,
  onView,
  onEdit,
  onDelete,
  onAddDailyReport,
}) {
  const formatCurrency = (val) => formatCurrencyBDT(val, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <section className="space-y-6">
      {isBusy && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent dark:border-emerald-400" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading projects...</p>
          </div>
        </div>
      )}

      {!isBusy && projects.length === 0 && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No projects found.</p>
        </div>
      )}

      {!isBusy && projects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => {
            const investment = Number(project.totalInvestment || 0);
            const profit = Number(project.totalProfit || 0);
            const profitPercentage = investment > 0 ? ((profit / investment) * 100).toFixed(1) : "0.0";
            const isProfitPositive = profit >= 0;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[color:rgba(124,194,46,0.35)] dark:hover:shadow-emerald-900/15"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  {project.photoUrl ? (
                    <Image
                      src={
                        project.photoUrl.startsWith("http")
                          ? project.photoUrl
                          : `/images/${project.photoUrl}`
                      }
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-300 dark:bg-zinc-800 dark:text-zinc-600">
                      <MapPin className="h-12 w-12 opacity-20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Status Badge */}
                  <div className="absolute right-3 top-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-xs font-medium text-zinc-900 backdrop-blur-sm hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-900"
                    >
                      {project.status || "Active"}
                    </Badge>
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      onClick={() => onEdit?.(project)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm backdrop-blur-sm hover:bg-emerald-500 hover:text-white transition-colors dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-[color:rgb(77,140,30)]"
                      title="Edit Project"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete?.(project)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm backdrop-blur-sm hover:bg-red-500 hover:text-white transition-colors dark:bg-zinc-900/80 dark:text-red-300 dark:hover:bg-red-500"
                      title="Delete Project"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        className="cursor-pointer text-lg font-bold text-zinc-900 transition-colors hover:text-emerald-600 line-clamp-1 dark:text-zinc-100 dark:hover:text-[color:rgb(124,194,46)]"
                        onClick={() => onView?.(project)}
                      >
                        {project.name}
                      </h3>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="line-clamp-1">{project.location || "Location not set"}</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="mb-6 grid grid-cols-2 gap-3">
                    <div className="space-y-1 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/40">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Investment</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(investment)}</p>
                    </div>
                    <div className="space-y-1 rounded-xl bg-emerald-50/50 p-3 dark:bg-emerald-500/10">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600/70 dark:text-emerald-300/80">Profit</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`h-3 w-3 ${isProfitPositive ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`} />
                        <p className={`text-sm font-bold ${isProfitPositive ? "text-emerald-700 dark:text-emerald-200" : "text-rose-700 dark:text-rose-200"}`}>
                          {formatCurrency(profit)}
                        </p>
                      </div>
                      <p className={`text-[10px] font-medium ${isProfitPositive ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
                        {isProfitPositive ? "+" : ""}{profitPercentage}% ROI
                      </p>
                    </div>
                    <div className="space-y-1 rounded-xl bg-rose-50/50 p-3 dark:bg-rose-500/10">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600/70 dark:text-rose-300/80">Total Cost</p>
                      <p className="text-sm font-bold text-rose-700 dark:text-rose-200">{formatCurrency(project.totalCost || 0)}</p>
                    </div>
                    <div className="space-y-1 rounded-xl bg-blue-50/50 p-3 dark:bg-blue-500/10">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600/70 dark:text-blue-300/80">Total Sell</p>
                      <p className="text-sm font-bold text-blue-700 dark:text-blue-200">{formatCurrency(project.totalSell || 0)}</p>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-auto flex items-center gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                    <button
                      onClick={() => onAddDailyReport?.(project)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-3 py-2 text-xs font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05]"
                    >
                      <FilePlus className="h-3.5 w-3.5" />
                      <span>Daily Report</span>
                    </button>
                    <button
                      onClick={() => onView?.(project)}
                      className="flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-[color:rgba(124,194,46,0.45)] dark:hover:bg-[color:rgba(124,194,46,0.12)] dark:hover:text-[color:rgb(124,194,46)]"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
