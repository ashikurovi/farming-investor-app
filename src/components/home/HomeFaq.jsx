export default function HomeFaq() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              FAQ
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions, answered.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Quick clarity on how investing, payouts, and onboarding work in
              this demo experience.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
          <div className="space-y-3">
            <details className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                What is Framing?
                <span className="text-zinc-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Framing is a demo investor experience for farm investing—showing
                how projects, allocations, and reporting could be presented in a
                clean, transparent way.
              </p>
            </details>

            <details className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Is this real data?
                <span className="text-zinc-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Not yet. The numbers and projects are placeholders meant to
                illustrate the layout. You can later connect these sections to
                your database or analytics pipeline.
              </p>
            </details>

            <details className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                How do investments work?
                <span className="text-zinc-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                In a production platform, you would review a project’s terms,
                allocate capital, then track milestones and cash flows over time
                in the Investor dashboard.
              </p>
            </details>

            <details className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                When are profits paid?
                <span className="text-zinc-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                Payout timing depends on the project structure (e.g., seasonal
                harvest cycles, revenue share, or fixed-term notes). The
                dashboard would show expected schedules and actual
                distributions.
              </p>
            </details>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-xs text-emerald-950 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              Need help?
            </p>
            <p className="mt-2 text-sm font-semibold">Our team is available 24/7.</p>
            <p className="mt-1 leading-relaxed">
              In a live product, you could add chat, email, or ticketing here.
              For now, this block is a placeholder for your support CTA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

