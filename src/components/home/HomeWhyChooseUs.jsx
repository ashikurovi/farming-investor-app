export default function HomeWhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-emerald-50/40 via-white to-amber-50/30 py-12 dark:from-emerald-950/20 dark:via-black dark:to-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
            Why choose us
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Built for trust, designed for clarity.
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            We focus on security, experienced operations, transparency, and
            always-on support—so you can invest with confidence.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/30 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg dark:bg-emerald-500/15"
                aria-hidden="true"
              >
                🔒
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Secure Investment
                </h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Clear controls, investor-grade workflows, and protection-first
                  design throughout the platform.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/30 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg dark:bg-emerald-500/15"
                aria-hidden="true"
              >
                🌱
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Experienced Farm Management
                </h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Work with operators who understand agronomy, timelines, and
                  risk—so projects execute predictably.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/30 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg dark:bg-emerald-500/15"
                aria-hidden="true"
              >
                📊
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Transparent Process
                </h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Terms, updates, and performance signals are presented in plain
                  language—no guesswork.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-500/30 dark:bg-zinc-950">
            <div className="flex items-start gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg dark:bg-emerald-500/15"
                aria-hidden="true"
              >
                24/7
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Customer Support
                </h3>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Get help anytime—account questions, allocations, reporting, or
                  general guidance.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

