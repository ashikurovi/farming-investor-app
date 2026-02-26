export default function HomeRecentProjects({ projects }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              Recent projects
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Explore the latest farm opportunities.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A quick preview of four projects. Browse the full list for terms,
              timelines, and target yield.
            </p>
          </div>

          <a
            href="/landing/project"
            className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-800 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-emerald-500 dark:hover:text-emerald-200"
          >
            View all projects
          </a>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.projectId}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                  {project.location}
                </p>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {project.title}
                </h3>
                <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                  {project.code} • {project.roi}% ROI
                </p>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-zinc-600 dark:text-zinc-400">
                <div>
                  <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                    Amount
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                    BDT {Number(project.amount || 0).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                    Duration
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                    {project.duration} months
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                    Highlight
                  </dt>
                  <dd className="mt-1 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                    {project.investment_highlight?.[0] ??
                      "Fully monitored operations with transparent reporting."}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

