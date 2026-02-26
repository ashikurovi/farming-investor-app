const statCards = [
  {
    label: "Total invested",
    value: "$2.4M",
    change: "+8.3% this month",
  },
  {
    label: "Active investors",
    value: "128",
    change: "+12 new",
  },
  {
    label: "Active farms",
    value: "34",
    change: "3 onboarding",
  },
  {
    label: "Avg. yield (12m)",
    value: "9.4%",
    change: "+0.7 pts",
  },
];

const recentActivity = [
  {
    investor: "Green Horizon Fund",
    farm: "Riverside Citrus",
    amount: "$120,000",
    status: "Completed",
  },
  {
    investor: "Harvest Capital",
    farm: "Northfield Grains",
    amount: "$80,500",
    status: "Pending",
  },
  {
    investor: "Aurora Ventures",
    farm: "Sunrise Berries",
    amount: "$45,200",
    status: "Completed",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
              {card.value}
            </p>
            <p className="mt-1 text-xs font-medium text-emerald-600">
              {card.change}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">
                Investment activity
              </h2>
              <p className="text-xs text-zinc-500">Last 7 days (mock data)</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
              Coming soon: charts
            </span>
          </div>

          <div className="mt-6 h-40 rounded-xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 flex items-center justify-center text-xs text-emerald-700">
            Placeholder for performance chart / portfolio curve
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-900">
              Recent investments
            </h2>
            <button className="text-xs font-medium text-emerald-700 hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {recentActivity.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
              >
                <div>
                  <p className="font-medium text-zinc-900">{item.investor}</p>
                  <p className="text-[11px] text-zinc-500">
                    {item.farm} • {item.status}
                  </p>
                </div>
                <p className="text-sm font-semibold text-zinc-900">
                  {item.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

