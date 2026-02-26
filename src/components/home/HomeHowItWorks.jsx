export default function HomeHowItWorks() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              How it works
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Start investing in a few simple steps.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A straightforward flow—from signing up to tracking profit—designed
              to feel as clear as the dashboards.
            </p>
          </div>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                1
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Create an Account
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Set up your profile and complete the basics so we can tailor the
              right opportunities for you.
            </p>
          </li>

          <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                2
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Choose a Plan
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Pick an approach that matches your goals—ticket size, term, and
              risk profile—then review the details.
            </p>
          </li>

          <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                3
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Invest
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Allocate capital to a specific project or strategy and track the
              position from onboarding through harvest.
            </p>
          </li>

          <li className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                4
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Earn Profit
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Follow cash flows and updates in the dashboard and see profits
              realized as projects complete.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

