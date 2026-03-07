"use client";

import { useGetProjectsStatsQuery } from "@/features/admin/projects/projectsApiSlice";
import { useGetRecentInvestmentsQuery } from "@/features/investor/investments/investmentsApiSlice";

function formatNumber(n) {
  const num = Number(n ?? 0);
  return num.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
}

function formatCurrencyBDT(n) {
  const num = Number(n ?? 0);
  return `৳${num.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useGetProjectsStatsQuery();
  const { data: recent, isLoading: recentLoading } =
    useGetRecentInvestmentsQuery({ limit: 5 });

  const statCards = [
    {
      label: "Total invested",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalInvestment),
      change: "",
    },
    {
      label: "Active investors",
      value: statsLoading ? "—" : formatNumber(stats?.activeInvestors),
      change: "",
    },
    {
      label: "Active farms",
      value: statsLoading ? "—" : formatNumber(stats?.totalProjects),
      change: "",
    },
    {
      label: "Avg. yield (12m)",
      value: statsLoading
        ? "—"
        : `${Number(stats?.avgYieldPercent ?? 0).toFixed(1)}%`,
      change: "",
    },
  ];

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
            {card.change ? (
              <p className="mt-1 text-xs font-medium text-emerald-600">
                {card.change}
              </p>
            ) : null}
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
              <p className="text-xs text-zinc-500">Last updates</p>
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
            {recentLoading ? (
              <div className="text-zinc-500">Loading…</div>
            ) : (recent ?? []).length === 0 ? (
              <div className="text-zinc-500">No recent investments</div>
            ) : (
              recent.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
                >
                  <div>
                    <p className="font-medium text-zinc-900">
                      {item.investorName ?? `Investor #${item.investorId}`}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {item.date ?? ""} {item.time ?? ""}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {formatCurrencyBDT(item.amount)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
