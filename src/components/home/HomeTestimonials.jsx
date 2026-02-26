export default function HomeTestimonials() {
  return (
    <section className="bg-gradient-to-b from-zinc-50 via-white to-emerald-50/30 py-12 dark:from-zinc-950 dark:via-black dark:to-emerald-950/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-300">
              Testimonials
            </p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Trusted by investors and operators.
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              What stakeholders say about clarity, reporting, and day-to-day
              experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
              Mock testimonials
            </span>
            <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
              Swap in real quotes later
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <figure className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                  AM
                </div>
                <div>
                  <figcaption className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Amina M.
                  </figcaption>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Individual Investor
                  </p>
                </div>
              </div>
              <p
                className="text-[11px] font-semibold tracking-tight text-emerald-700 dark:text-emerald-300"
                aria-label="Rating: 5 out of 5"
                title="5 out of 5"
              >
                ★★★★★
              </p>
            </div>
            <blockquote className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              “The dashboard makes it easy to understand where my capital is,
              what changed this month, and what to expect next. Everything feels
              structured.”
            </blockquote>
          </figure>

          <figure className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                  JC
                </div>
                <div>
                  <figcaption className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    James C.
                  </figcaption>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Portfolio Manager
                  </p>
                </div>
              </div>
              <p
                className="text-[11px] font-semibold tracking-tight text-emerald-700 dark:text-emerald-300"
                aria-label="Rating: 5 out of 5"
                title="5 out of 5"
              >
                ★★★★★
              </p>
            </div>
            <blockquote className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              “Reporting is finally consistent. The structure helps us compare
              projects, spot risks earlier, and communicate updates to LPs
              without spreadsheets.”
            </blockquote>
          </figure>

          <figure className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200">
                  SK
                </div>
                <div>
                  <figcaption className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    Sofia K.
                  </figcaption>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Farm Operator
                  </p>
                </div>
              </div>
              <p
                className="text-[11px] font-semibold tracking-tight text-emerald-700 dark:text-emerald-300"
                aria-label="Rating: 4 out of 5"
                title="4 out of 5"
              >
                ★★★★☆
              </p>
            </div>
            <blockquote className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              “The process is straightforward—milestones, updates, and documents
              are all in one place. It saves time and keeps everyone aligned.”
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}

