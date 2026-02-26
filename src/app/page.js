export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50/40 to-white text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-xs font-semibold text-white shadow-sm">
              FI
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
                Framing
              </div>
              <div className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Investor Platform
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <a
              href="/investor"
              className="hidden rounded-full border border-emerald-200 bg-white/70 px-3 py-1.5 font-medium text-emerald-700 shadow-sm backdrop-blur hover:border-emerald-400 hover:bg-emerald-50 sm:inline-flex"
            >
              Investor dashboard
            </a>
            <a
              href="/admin"
              className="inline-flex items-center rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:text-sm"
            >
              Admin portal
            </a>
          </div>
        </header>

        <section className="mt-14 grid flex-1 items-center gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3 py-1 text-[11px] font-medium text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/40">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Real assets. Transparent yields. Shared upside.
            </div>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
                Connect long-term capital with resilient farms.
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                Framing helps professional investors and farm operators structure,
                track, and report agricultural investments in one modern dashboard.
                Clear terms, live portfolio views, and workflows that keep everyone
                aligned.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/investor"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Explore investor view
              </a>
              <a
                href="/admin"
                className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white/80 px-6 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-50 dark:bg-zinc-950/40 dark:text-emerald-200"
              >
                Manage farms & capital
              </a>
              <p className="w-full text-xs text-zinc-500 sm:w-auto">
                No real money here yet — dashboards are mock data.
              </p>
            </div>

            <div className="grid gap-4 text-xs text-zinc-600 sm:grid-cols-3 sm:text-sm dark:text-zinc-400">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Structured for institutions
                </p>
                <p>Cash flow schedules, capital accounts, and audit-ready trails.</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Built for operators
                </p>
                <p>Pipeline, active raises, and portfolio performance in one place.</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Designed for clarity
                </p>
                <p>Simple views for LPs, GPs, and farm managers to stay aligned.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <div className="rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-emerald-500/40 dark:bg-zinc-950">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">
                    For investors
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Live portfolio overview
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                  Sample view
                </span>
              </div>
              <div className="grid gap-3 text-xs text-zinc-600 sm:grid-cols-2 dark:text-zinc-400">
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Total invested
                  </p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    $2.4M
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
                    +8.3% this month
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/60">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Active farms
                  </p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    34
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
                    3 onboarding
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                For farm operators
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                See capital flows and investor demand in real time.
              </p>
              <ul className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li>• Track active raises and committed capital by farm.</li>
                <li>• Keep investors updated with structured, consistent reporting.</li>
                <li>• Share dashboards instead of spreadsheets and email threads.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 border-t border-emerald-100 pt-6 text-xs text-zinc-500 sm:mt-14 sm:flex sm:items-center sm:justify-between sm:text-[13px] dark:border-zinc-800 dark:text-zinc-500">
          <div className="mb-3 flex items-center gap-2 sm:mb-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Built as a demo for an agriculture investing platform.</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span>Mock data only</span>
            <span className="hidden text-zinc-400 sm:inline">•</span>
            <span>Investor & Admin dashboards available from here</span>
          </div>
        </section>
      </main>
    </div>
  );
}
