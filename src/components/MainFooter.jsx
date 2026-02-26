export function MainFooter() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white/80 text-xs text-zinc-500 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80 dark:text-zinc-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Framing · Agriculture investing dashboards (demo)</span>
        </p>
        <div className="flex flex-wrap gap-3">
          <span>Mock data only</span>
          <span className="hidden text-zinc-400 sm:inline">•</span>
          <span>Investor &amp; Admin views for exploration</span>
        </div>
      </div>
    </footer>
  );
}

