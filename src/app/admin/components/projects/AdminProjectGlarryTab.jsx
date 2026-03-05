import { useMemo } from "react";

export function AdminProjectGlarryTab({ project, isBusy, isError }) {
  const cleanUrl = (u) => (typeof u === "string" ? u.replace(/`/g, "").trim() : u);
  const fallbackImage = useMemo(() => cleanUrl(project?.image ?? project?.photoUrl), [project]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Glarry</h3>
      {isBusy && (
        <div className="flex h-24 items-center justify-center text-xs text-zinc-500">Loading glarry...</div>
      )}
      {!isBusy && isError && (
        <div className="flex h-24 items-center justify-center text-xs text-red-600">Failed to load project.</div>
      )}
      {!isBusy && !isError && project && (
        <>
          {Array.isArray(project.glarry) && project.glarry.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {project.glarry.map((item, index) => {
                const src = cleanUrl(item.photoUrl || item.url || item.imageUrl || fallbackImage);
                return (
                  <div key={item.id ?? index} className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                    <div className="aspect-[4/3] w-full bg-zinc-100">
                      <img src={src} alt="Glarry image" className="h-full w-full object-cover" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-zinc-500">No glarry images attached to this project.</p>
          )}
        </>
      )}
    </section>
  );
}
