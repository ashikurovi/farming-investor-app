export const metadata = {
  title: "About | Framing Investor App",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-50">
      <section className="relative h-[260px] overflow-hidden bg-zinc-900 sm:h-[320px] lg:h-[360px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/90 via-amber-900/75 to-amber-800/70 mix-blend-multiply" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 sm:space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-amber-300">
              About
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Company
            </h1>
            <p className="max-w-xl text-xs leading-relaxed text-amber-100/90 sm:text-sm">
              The point of using lorem ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using &quot;Content here,
              content here&quot;, making it look like readable English.
            </p>
            <p className="pt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-200/90">
              Home <span className="mx-2 text-amber-400">/</span> About
            </p>
            <div className="pt-3">
              <a
                href="#about-content"
                className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/10 px-9 py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-md backdrop-blur transition hover:bg-white/20"
              >
                Discover
              </a>
            </div>
          </div>
        </div>
      </section>

      <main
        id="about-content"
        className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
      >
        <section className="max-w-3xl space-y-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
            About Framing
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Building the operating system for modern farm investing.
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            Framing is an agri-finance platform focused on connecting long-term
            capital with resilient, real-world farm projects. We bring together
            investors, operators, and buyers in one transparent system so that
            everyone sees the same picture of risk, cash flows, and impact.
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            Our investor app is the front door into that system: clear portfolios
            for LPs, structured workflows for fund managers, and data that farm
            operators can trust.
          </p>
        </section>

        <section className="grid gap-6 rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur sm:grid-cols-4 dark:border-emerald-500/30 dark:bg-zinc-950">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Farmers
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              5K+
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Farmers in our pipeline and active projects.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Partners
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              10+
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Agri businesses, co-ops, and lenders we work with.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Regions
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              5+
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Growing footprints across farming regions.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Assets
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Mock data
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              This demo mirrors the structure of a live platform.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Our stakeholders
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Framing is built for everyone in the value chain, not just one
              side of the table.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Investors
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Capital allocators
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  See pipeline, allocations, and realized returns across farms,
                  all in one portfolio.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Farm operators
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  On-the-ground execution
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Plan raises, track capital, and share performance updates
                  without fighting spreadsheets.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Buyers
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Demand for output
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Align contracts and offtake with production and financing
                  timelines.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Partners
                </p>
                <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Lenders & service providers
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Plug in insurance, credit, and agronomy services at the right
                  moments in the lifecycle.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-emerald-100 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-emerald-500/40 dark:bg-zinc-950">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Why we&apos;re building this
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Agriculture deserves tools as serious as the capital behind it.
            </p>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Too often, farm investments live in PDFs, inboxes, and one-off
              spreadsheets. Framing is our attempt to give both investors and
              farmers a shared source of truth—so that good seasons and bad are
              visible, explainable, and actionable.
            </p>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              This demo app focuses on the investor experience. Underneath, you
              can imagine the workflows for origination, underwriting, and
              reporting that a full platform would provide.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

