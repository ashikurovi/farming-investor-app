export const metadata = {
  title: "Projects | Framing Investor App",
};

const sampleProjects = [
  {
    name: "Riverside Citrus Expansion",
    region: "Delta valley",
    ticket: "From $5,000",
    term: "24–30 months",
    targetYield: "8–11% IRR (modelled)",
    status: "Accepting interest",
  },
  {
    name: "Highland Coffee Renovation",
    region: "Upland estates",
    ticket: "From $10,000",
    term: "36–48 months",
    targetYield: "10–13% IRR (modelled)",
    status: "Pipeline",
  },
  {
    name: "Grain Storage & Working Capital",
    region: "Central grain belt",
    ticket: "From $2,500",
    term: "12–18 months",
    targetYield: "7–9% IRR (modelled)",
    status: "Live in demo",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
            Projects
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Explore sample farm investments you could track in Framing.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            This page mirrors how a real project marketplace might be organized:
            clear economics, timelines, and risk notes—presented in a way that
            investors and operators can both understand.
          </p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200">
              Mock data only
            </span>
            <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300">
              Use the Investor dashboard to see portfolio views
            </span>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Featured projects
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              <button className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                All
              </button>
              <button className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-700 hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                Permanent crops
              </button>
              <button className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-700 hover:border-emerald-400 hover:text-emerald-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                Working capital
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sampleProjects.map((project) => (
              <article
                key={project.name}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    {project.region}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {project.name}
                  </h3>
                  <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                    {project.status}
                  </p>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                      Ticket size
                    </dt>
                    <dd className="mt-1 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                      {project.ticket}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                      Duration
                    </dt>
                    <dd className="mt-1 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                      {project.term}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                      Target yield
                    </dt>
                    <dd className="mt-1 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                      {project.targetYield}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-zinc-500 dark:text-zinc-400">
                      Risk notes
                    </dt>
                    <dd className="mt-1 text-xs">
                      Weather, market access, and operator track record.
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-sm backdrop-blur lg:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] dark:border-emerald-500/40 dark:bg-zinc-950">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              How funding could work
            </h2>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              In a live platform, investors would review project details here,
              run scenarios, and commit capital—then monitor everything in the
              Investor dashboard.
            </p>
            <ol className="mt-2 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  1. Explore projects
                </span>{" "}
                – Filter by crop, region, or structure.
              </li>
              <li>
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  2. Review terms
                </span>{" "}
                – Understand cash flows, risks, and return profiles.
              </li>
              <li>
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  3. Allocate capital
                </span>{" "}
                – Commit to specific raises or pooled strategies.
              </li>
              <li>
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                  4. Track outcomes
                </span>{" "}
                – See realized returns and impact over time.
              </li>
            </ol>
          </div>

          <div className="space-y-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-xs text-emerald-900 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-100">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              In this demo
            </p>
            <p className="text-sm font-semibold">
              Use this page as the &quot;front door&quot; to the Investor app.
            </p>
            <p>
              The cards above are static examples. To see how these could roll up
              into a real portfolio, jump into the Investor dashboard from the
              main navigation and imagine each card as a position with cash flows
              over time.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

