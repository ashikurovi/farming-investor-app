import { Card } from "@/components/ui/card";
import { useMemo } from "react";

export function AdminProjectInfoTab({ project, isBusy, isError }) {
  const cleanUrl = (u) => (typeof u === "string" ? u.replace(/`/g, "").trim() : u);
  const projectImageUrl = useMemo(() => cleanUrl(project?.photoUrl ?? project?.image), [project]);
  const name = project?.name || project?.title || "Untitled project";
  const location = project?.location;
  const description = project?.description || "No description provided.";

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1.1fr)]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          {isBusy && (
            <div className="flex h-32 items-center justify-center text-sm text-zinc-500">Loading project...</div>
          )}
          {!isBusy && isError && (
            <div className="flex h-32 items-center justify-center text-sm text-red-600">Failed to load project.</div>
          )}
          {!isBusy && !isError && project && (
            <div className="space-y-4">
              {projectImageUrl && (
                <div className="relative w-full overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
                  <div className="aspect-[16/9] w-full bg-zinc-100">
                    <img src={projectImageUrl} alt={name} className="h-full w-full object-cover" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-zinc-900">{name}</h2>
                {location && (
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{location}</p>
                )}
                <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {!isBusy && !isError && project && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Summary</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Total cost (BDT)</dt>
                <dd className="text-sm text-zinc-900">{project.totalCost ?? "-"}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Total sell (BDT)</dt>
                <dd className="text-sm text-zinc-900">{project.totalSell ?? "-"}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Total profit (BDT)</dt>
                <dd className="text-sm text-zinc-900">{project.totalProfit ?? "-"}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Total investment (BDT)</dt>
                <dd className="text-sm text-zinc-900">{project.totalInvestment ?? "-"}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Distributed profit (BDT)</dt>
                <dd className="text-sm text-zinc-900">{project.distributedProfit ?? "-"}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
