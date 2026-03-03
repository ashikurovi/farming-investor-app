export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200">
            <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-emerald-500 border-t-transparent" />
          </div>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Framing investor app
          </p>
          <p className="text-sm text-zinc-500">Loading your dashboard…</p>
        </div>
      </div>
    </div>
  );
}

