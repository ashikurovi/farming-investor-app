export default function HomeLiveKpis() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              Live statistics
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Portfolio-level KPIs at a glance.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              In a live product, these would update automatically from your
              investor dashboard and reporting pipeline.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
              Demo values
            </span>
            <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
              Hook up to real data later
            </span>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Total Investors
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              1,284
            </dd>
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
              +24 this week
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Total Investment
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              $12.8M
            </dd>
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
              +$410k this month
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Active Farms
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              34
            </dd>
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
              3 onboarding
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Total Profit Paid
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              $2.1M
            </dd>
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
              Last payout: $180k
            </p>
          </div>
        </dl>
      </div>
    </section>
  );
}

