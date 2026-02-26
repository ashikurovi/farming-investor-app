export const metadata = {
  title: "Gallery | Framing Investor App",
};

const impactStories = [
  {
    name: "Riverside Citrus Cooperative",
    role: "Citrus growers",
    location: "River delta region",
    highlight:
      "Used structured capital to expand orchard area and invest in cold storage.",
  },
  {
    name: "Highland Coffee Collective",
    role: "Smallholder coffee farmers",
    location: "Highland slopes",
    highlight:
      "Renovated aging trees and improved processing quality to access premium buyers.",
  },
  {
    name: "Central Grain Partnership",
    role: "Grain aggregation & storage",
    location: "Central grain belt",
    highlight:
      "Financed inventory and storage to reduce distress sales at harvest.",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/10 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <section className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">
            Gallery
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            A visual tour of the farms and projects behind the dashboards.
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            In a production app this page would feature photography, maps, and
            impact highlights from across your portfolio. Here we use soft
            gradients as placeholders you can later swap for real media.
          </p>
        </section>

        <section className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm backdrop-blur sm:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] sm:p-6 dark:border-emerald-500/40 dark:bg-zinc-950">
          <div className="space-y-3">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Portfolio at a glance
            </h2>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              Replace these gradient blocks with farm photos, field days, team
              shots, or maps showing where capital is at work.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="h-28 rounded-xl bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-200 shadow-inner dark:from-emerald-500/20 dark:via-zinc-900 dark:to-emerald-700/20" />
              <div className="h-28 rounded-xl bg-gradient-to-br from-amber-100 via-emerald-50 to-emerald-100 shadow-inner dark:from-amber-500/20 dark:via-zinc-900 dark:to-emerald-600/20" />
              <div className="h-28 rounded-xl bg-gradient-to-br from-sky-100 via-emerald-50 to-emerald-100 shadow-inner dark:from-sky-500/20 dark:via-zinc-900 dark:to-emerald-600/20" />
            </div>
          </div>

          <div className="grid gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Mock metrics
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                5K+ farmers · 10+ partners · 5+ regions
              </p>
              <p className="mt-1 text-xs">
                These numbers mirror the kind of high-level metrics you might
                showcase to stakeholders.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                Use cases
              </p>
              <p className="mt-2 text-xs">
                Show before/after stories, harvest shots, infrastructure builds,
                and community impact to bring the numbers in your dashboards to
                life.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Sample stories from the field
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {impactStories.map((story) => (
              <article
                key={story.name}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-4 text-xs shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                    {story.location}
                  </p>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {story.name}
                  </h3>
                  <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    {story.role}
                  </p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {story.highlight}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-2 rounded-2xl border border-emerald-100 bg-white/90 p-5 text-xs text-zinc-600 shadow-sm backdrop-blur dark:border-emerald-500/40 dark:bg-zinc-950 dark:text-zinc-400">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Next steps
          </p>
          <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Use this gallery as a storytelling layer on top of your data.
          </p>
          <p className="mt-1">
            As you evolve the product, you could connect each story or image
            here to a real project in the Investor dashboard—so visitors can move
            seamlessly from narrative to numbers.
          </p>
        </section>
      </main>
    </div>
  );
}

