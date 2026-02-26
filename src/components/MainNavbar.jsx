export function MainNavbar() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary text-xs font-semibold text-primary-foreground shadow-sm">
            FI
          </div>
          <div className="hidden text-left text-xs sm:block">
            <div className="font-semibold uppercase tracking-[0.2em] text-primary">
              Framing
            </div>
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Investor Platform
            </div>
          </div>
        </a>

        <nav className="flex items-center gap-3 text-xs font-medium sm:gap-4 sm:text-[13px]">
          <a
            href="/"
            className="rounded-full px-3 py-1 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Home
          </a>
          <a
            href="/investor"
            className="hidden rounded-full px-3 py-1 text-zinc-700 transition hover:bg-zinc-100 sm:inline-flex dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Investor
          </a>
          <a
            href="/admin"
            className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 sm:text-[13px]"
          >
            Admin
          </a>
        </nav>
      </div>
    </header>
  );
}

