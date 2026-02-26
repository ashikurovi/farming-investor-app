export default function HomeGalleryPreview() {
  return (
    <section className="bg-gradient-to-b from-emerald-50/30 via-white to-zinc-50 py-12 dark:from-emerald-950/10 dark:via-black dark:to-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              Recent gallery
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A quick look from the field.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Preview the visual stories behind the dashboards. Swap these
              placeholders for real farm photography later.
            </p>
          </div>

          <a
            href="/landing/gallery"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-800 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-emerald-500 dark:hover:text-emerald-200"
          >
            View full gallery
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-44 rounded-2xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-200 shadow-inner dark:from-emerald-500/20 dark:via-zinc-900 dark:to-emerald-700/20" />
          <div className="h-44 rounded-2xl bg-gradient-to-br from-amber-100 via-emerald-50 to-emerald-100 shadow-inner dark:from-amber-500/20 dark:via-zinc-900 dark:to-emerald-600/20" />
          <div className="h-44 rounded-2xl bg-gradient-to-br from-sky-100 via-emerald-50 to-emerald-100 shadow-inner dark:from-sky-500/20 dark:via-zinc-900 dark:to-emerald-600/20" />
          <div className="h-44 rounded-2xl bg-gradient-to-br from-lime-100 via-emerald-50 to-emerald-200 shadow-inner dark:from-lime-500/15 dark:via-zinc-900 dark:to-emerald-700/20" />
          <div className="h-44 rounded-2xl bg-gradient-to-br from-rose-100 via-amber-50 to-emerald-100 shadow-inner dark:from-rose-500/15 dark:via-zinc-900 dark:to-emerald-700/15" />
          <div className="h-44 rounded-2xl bg-gradient-to-br from-violet-100 via-emerald-50 to-emerald-100 shadow-inner dark:from-violet-500/15 dark:via-zinc-900 dark:to-emerald-700/15" />
        </div>
      </div>
    </section>
  );
}

