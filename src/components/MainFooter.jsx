export function MainFooter() {
  return (
    <footer className="relative border-t border-zinc-200/80 bg-gradient-to-b from-emerald-50/50 via-white/90 to-emerald-50/40 text-xs text-zinc-500 backdrop-blur dark:border-zinc-800/80 dark:bg-gradient-to-b dark:from-zinc-950/95 dark:via-zinc-950/90 dark:to-zinc-900/90 dark:text-zinc-500">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/60 to-emerald-400/0" />

      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 shadow-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900">
                  AG
                </span>
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-800 dark:text-zinc-100">
                  Framing
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Agriculture investing dashboards · Demo
                </p>
              </div>
            </div>
            <p className="max-w-md text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              Explore how investor, admin, and portfolio views could come
              together in a single interface for farm finance.
            </p>

            <div className="flex flex-wrap gap-2 text-[10px]">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-medium text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live-style demo UI
              </span>
              <span className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 font-medium uppercase tracking-[0.18em] text-[9px] text-amber-100 dark:bg-zinc-800">
                Mock data only
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-5 sm:flex-row sm:justify-end">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Product
              </p>
              <div className="flex flex-col gap-1.5">
                <a
                  href="/landing/project"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Projects
                </a>
                <a
                  href="/landing/gallery"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Gallery
                </a>
                <a
                  href="/landing/about"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  About
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Workspaces
              </p>
              <div className="flex flex-col gap-1.5">
                <a
                  href="/investor"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Investor app
                </a>
                <a
                  href="/admin"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  Admin console
                </a>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Environment
              </p>
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Demo workspace
                </span>
                <p className="max-w-xs text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  No real investment flows or personal data are used in this
                  environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-zinc-200/70 pt-4 text-[11px] text-zinc-400 dark:border-zinc-800/80 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Framing · Interface exploration only</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden h-1 w-1 rounded-full bg-zinc-300 sm:inline-block dark:bg-zinc-600" />
            <span>Investors · Operators · Partners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

