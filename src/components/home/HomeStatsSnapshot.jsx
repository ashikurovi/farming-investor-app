export default function HomeStatsSnapshot() {
  return (
    <section
      id="discover"
      className="bg-gradient-to-b from-amber-50/60 via-white to-emerald-50/30 py-12 dark:from-zinc-950 dark:via-black dark:to-emerald-950/20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              Stats
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A snapshot of the ecosystem we serve.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              These are illustrative numbers that mirror the kind of high-level
              metrics you&apos;d surface to investors and partners.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
              Mock data
            </span>
            <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
              Replace with live KPIs later
            </span>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-emerald-500/30 dark:bg-zinc-950">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Farmers
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              5K+
            </dd>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Operators in pipeline and active projects.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-emerald-500/30 dark:bg-zinc-950">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Partners
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              10+
            </dd>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Co-ops, buyers, lenders, and service providers.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-emerald-500/30 dark:bg-zinc-950">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Regions
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              5+
            </dd>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Coverage across key farming corridors.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur dark:border-emerald-500/30 dark:bg-zinc-950">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Assets tracked
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              120+
            </dd>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Deals, farms, and facilities (demo representation).
            </p>
          </div>
        </dl>
      </div>
    </section>
  );
}

