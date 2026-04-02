import { useMemo } from "react";
import { Image as ImageIcon } from "lucide-react";

export function AdminProjectGlarryTab({ project, isBusy, isError }) {
  const cleanUrl = (u) =>
    typeof u === "string" ? u.replace(/`/g, "").trim() : u;
  const fallbackImage = useMemo(
    () => cleanUrl(project?.image ?? project?.photoUrl),
    [project],
  );

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
          <ImageIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Project Gallery
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Photos and updates from the field
          </p>
        </div>
      </div>

      {isBusy && (
        <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/40">
          <div className="text-center">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-200" />
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Loading gallery...
            </p>
          </div>
        </div>
      )}

      {!isBusy && isError && (
        <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 text-xs text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          Failed to load gallery images.
        </div>
      )}

      {!isBusy && !isError && project && (
        <>
          {Array.isArray(project.glarry) && project.glarry.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {project.glarry.map((item, index) => {
                const src = cleanUrl(
                  item.photoUrl || item.url || item.imageUrl || fallbackImage,
                );
                return (
                  <div
                    key={item.id ?? index}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10 dark:group-hover:bg-black/25" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/40">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                No images available in the gallery.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
