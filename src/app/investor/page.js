const statCards = [
  {
    label: "Total invested",
    value: "$240,000",
    change: "+3.2% this month",
  },
  {
    label: "Active farms",
    value: "8",
    change: "1 onboarding",
  },
  {
    label: "Realized returns",
    value: "$32,400",
    change: "+$4,100 this month",
  },
  {
    label: "Avg. yield (12m)",
    value: "9.4%",
    change: "+0.7 pts",
  },
];

const recentActivity = [
  {
    farm: "Riverside Citrus",
    amount: "$15,000",
    status: "Completed",
  },
  {
    farm: "Northfield Grains",
    amount: "$8,500",
    status: "Pending",
  },
  {
    farm: "Sunrise Berries",
    amount: "$4,200",
    status: "Completed",
  },
];

export default function InvestorDashboardPage() {
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
                Portfolio performance
              </h2>
              <p className="text-xs text-zinc-500">Last 12 months (mock data)</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
              Coming soon: charts
            </span>
          </div>

          <div className="mt-6 h-40 rounded-xl border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 flex items-center justify-center text-xs text-emerald-700">
            Placeholder for your portfolio performance chart
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
                  <p className="font-medium text-zinc-900">{item.farm}</p>
                  <p className="text-[11px] text-zinc-500">{item.status}</p>
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

