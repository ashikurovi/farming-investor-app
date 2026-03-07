import { FilePlus, Eye, Edit2, Trash2, MapPin, TrendingUp, Calendar } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function AdminProjectsGrid({
  projects,
  isBusy,
  onView,
  onEdit,
  onDelete,
  onAddDailyReport,
}) {
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val || 0);

  return (
    <section className="space-y-6">
      {isBusy && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <p className="text-sm text-zinc-500">Loading projects...</p>
          </div>
        </div>
      )}

      {!isBusy && projects.length === 0 && (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50">
          <p className="text-sm text-zinc-500">No projects found.</p>
        </div>
      )}

      {!isBusy && projects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
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
                  <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-300">
                    <MapPin className="h-12 w-12 opacity-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Status Badge */}
                <div className="absolute right-3 top-3">
                  <Badge 
                    variant="secondary" 
                    className="bg-white/90 text-xs font-medium text-zinc-900 backdrop-blur-sm hover:bg-white"
                  >
                    {project.status || "Active"}
                  </Badge>
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-all duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    onClick={() => onEdit?.(project)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm backdrop-blur-sm hover:bg-emerald-500 hover:text-white transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete?.(project)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-sm backdrop-blur-sm hover:bg-red-500 hover:text-white transition-colors"
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
                      className="cursor-pointer text-lg font-bold text-zinc-900 transition-colors hover:text-emerald-600 line-clamp-1"
                      onClick={() => onView?.(project)}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="line-clamp-1">{project.location || "Location not set"}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <div className="space-y-1 rounded-xl bg-zinc-50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Investment</p>
                    <p className="text-sm font-bold text-zinc-900">{formatCurrency(project.totalInvestment)}</p>
                  </div>
                  <div className="space-y-1 rounded-xl bg-emerald-50/50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600/70">Profit</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-emerald-600" />
                      <p className="text-sm font-bold text-emerald-700">{formatCurrency(project.totalProfit)}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto flex items-center gap-2 border-t border-zinc-100 pt-4">
                  <button
                    onClick={() => onAddDailyReport?.(project)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
                  >
                    <FilePlus className="h-3.5 w-3.5" />
                    <span>Daily Report</span>
                  </button>
                  <button
                    onClick={() => onView?.(project)}
                    className="flex items-center justify-center rounded-lg border border-zinc-200 p-2 text-zinc-500 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
