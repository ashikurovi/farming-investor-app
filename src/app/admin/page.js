"use client";

import { useGetProjectsStatsQuery } from "@/features/admin/projects/projectsApiSlice";
import { useGetRecentInvestmentsQuery } from "@/features/investor/investments/investmentsApiSlice";
import {
  Wallet,
  Users,
  Sprout,
  TrendingUp,
  Activity,
  ArrowRight,
} from "lucide-react";
import { formatNumber, formatCurrencyBDT } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useGetProjectsStatsQuery();
  const { data: recent, isLoading: recentLoading } =
    useGetRecentInvestmentsQuery({ limit: 5 });

  const statCards = [
    {
      label: "Total investment",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalInvestment),
      change: "",
      icon: Wallet,
      color: "emerald",
    },
    {
      label: "Total projects",
      value: statsLoading ? "—" : formatNumber(stats?.totalProjects),
      change: "",
      icon: Sprout,
      color: "amber",
    },
    {
      label: "Avg. yield (12m)",
      value: statsLoading
        ? "—"
        : `${Number(stats?.avgYieldPercent ?? 0).toFixed(1)}%`,
      change: "",
      icon: TrendingUp,
      color: "blue",
    },
    {
      label: "Total profit",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalProfit),
      change: "",
      icon: Activity,
      color: "rose",
    },
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <section className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Dynamic background gradient blob */}
            <div
              className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-${card.color}-50/50 blur-3xl transition-all duration-700 group-hover:bg-${card.color}-100/60 group-hover:scale-150`}
            />

            {/* Bottom left blob for balance */}
            <div
              className={`absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-${card.color}-50/30 blur-3xl transition-all duration-700 group-hover:bg-${card.color}-100/40 group-hover:scale-150`}
            />

            <div className="relative flex flex-col h-full justify-between z-10">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`relative rounded-2xl bg-${card.color}-50 p-3 text-${card.color}-600 ring-1 ring-${card.color}-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:ring-${card.color}-200`}
                >
                  <card.icon className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-12" />
                </div>
                {card.change && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm">
                    <TrendingUp className="h-3 w-3" />
                    {card.change}
                  </span>
                )}
              </div>

              <div className="flex flex-col lg:items-end lg:text-right space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-${card.color}-600/70 transition-colors duration-300">
                  {card.label}
                </p>
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 transition-transform duration-300 origin-left group-hover:scale-105 lg:text-3xl lg:origin-right">
                  {card.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom Panels */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
        {/* Activity Panel */}
        <div className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-100/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900">
                  Investment Activity
                </h2>
                <p className="text-[11px] font-medium text-zinc-400">
                  Real-time updates
                </p>
              </div>
            </div>
            <span className="rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Weekly
            </span>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-dashed border-emerald-100 bg-gradient-to-br from-emerald-50/30 via-white to-emerald-50/10 group-hover:border-emerald-200 transition-colors duration-300">
            <div className="flex items-start justify-between p-3">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Weekly Investments
              </div>
              <div className="text-xs font-bold text-emerald-600">
                {recentLoading ? "—" : formatCurrencyBDT((recent ?? []).reduce((s, r) => s + Number(r.amount || 0), 0))}
              </div>
            </div>
            <div className="h-64 w-full px-2 pb-2">
              {recentLoading || !(recent ?? []).length ? (
                <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                  {recentLoading ? "Loading activity…" : "No data"}
                </div>
              ) : (
                (() => {
                  const items = (recent ?? []).slice(0, 12).reverse();
                  const values = items.map((i) => Number(i.amount || 0));
                  const max = Math.max(1, ...values);
                  const W = 600;
                  const H = 180;
                  const P = 16;
                  const innerW = W - P * 2;
                  const innerH = H - P * 2;
                  const len = values.length;
                  const points = values.map((v, idx) => {
                    const x = len === 1 ? P + innerW / 2 : P + (idx / (len - 1)) * innerW;
                    const y = P + innerH - (v / max) * innerH;
                    return [x, y];
                  });
                  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
                  const area = `M${P},${P + innerH} ` + points.map(([x, y]) => `L${x},${y}`).join(" ") + ` L${P + innerW},${P + innerH} Z`;
                  return (
                    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full">
                      <defs>
                        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width={W} height={H} fill="transparent" />
                      {[0.25, 0.5, 0.75].map((g, i) => (
                        <line
                          key={i}
                          x1={P}
                          x2={P + innerW}
                          y1={P + innerH * g}
                          y2={P + innerH * g}
                          stroke="#e5e7eb"
                          strokeDasharray="4 6"
                          opacity="0.7"
                        />
                      ))}
                      <path d={area} fill="url(#grad)" />
                      <path d={path} fill="none" stroke="#10b981" strokeWidth="2" />
                      {points.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="2.5" fill="#10b981" />
                      ))}
                    </svg>
                  );
                })()
              )}
            </div>
          </div>
        </div>

        {/* Recent Investments Panel */}
        <div className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-100/50">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-2.5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Wallet className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-bold text-zinc-900">
                Recent Investments
              </h2>
            </div>
            <button className="group/btn flex items-center gap-1.5 text-xs font-bold text-zinc-400 transition-colors hover:text-blue-600">
              View All
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>

          <div className="space-y-3">
            {recentLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl border border-zinc-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-100" />
                      <div className="space-y-2">
                        <div className="h-3 w-24 animate-pulse rounded-full bg-zinc-100" />
                        <div className="h-2 w-16 animate-pulse rounded-full bg-zinc-100" />
                      </div>
                    </div>
                    <div className="h-4 w-16 animate-pulse rounded-full bg-zinc-100" />
                  </div>
                ))}
              </>
            ) : (recent ?? []).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-zinc-50 p-4 text-zinc-300 mb-3">
                  <Wallet className="h-8 w-8" />
                </div>
                <p className="text-xs font-medium text-zinc-400">
                  No recent investments found
                </p>
              </div>
            ) : (
              recent.map((item) => {
                const name =
                  item.investorName ?? `Investor #${item.investorId}`;
                const initials = name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase();

                return (
                  <div
                    key={item.id}
                    className="group/item flex cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-zinc-50/50 p-3 transition-all duration-300 hover:border-zinc-100 hover:bg-white hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white to-zinc-100 text-xs font-black text-zinc-700 shadow-sm ring-1 ring-zinc-100 transition-all duration-300 group-hover/item:from-blue-50 group-hover/item:to-blue-100 group-hover/item:text-blue-700 group-hover/item:ring-blue-200 group-hover/item:scale-110">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-700 transition-colors group-hover/item:text-zinc-900">
                          {name}
                        </p>
                        <p className="text-[10px] font-medium text-zinc-400 group-hover/item:text-zinc-500">
                          {item.date ?? ""} • {item.time ?? ""}
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-sm font-bold text-zinc-700 transition-colors group-hover/item:text-emerald-600">
                      {formatCurrencyBDT(item.amount)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
