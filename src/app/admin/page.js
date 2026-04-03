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
  FileText,
  Bell,
  Monitor,
  Camera,
  MessageSquare,
  CreditCard,
  Shield,
  Coins,
  LayoutDashboard,
  CircleDollarSign,
  Banknote,
  PiggyBank,
  Briefcase
} from "lucide-react";
import { formatNumber, formatCurrencyBDT } from "@/lib/utils";

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useGetProjectsStatsQuery();
  const { data: recent, isLoading: recentLoading } =
    useGetRecentInvestmentsQuery({ limit: 5 });

  const statCards = [

    {
      label: "Investor capital",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.investorTotalInvestment),
      change: "",
      icon: PiggyBank,
    },

    {
      label: "Partner capital",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.partnerTotalInvestment),
      change: "",
      icon: Briefcase,
    },

    {
      label: "Total projects",
      value: statsLoading ? "—" : formatNumber(stats?.totalProjects),
      change: "",
      icon: Sprout,
    },

    {
      label: "Active investors",
      value: statsLoading ? "—" : formatNumber(stats?.activeInvestors),
      change: "",
      icon: Users,
    },

    {
      label: "Project Collect Investment",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalInvestment),
      change: "",
      icon: Wallet,
    },
    {
      label: "Total sell",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalSell),
      change: "",
      icon: Banknote,
    },
    {
      label: "Total cost",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalCost),
      change: "",
      icon: CircleDollarSign,
    },
    {
      label: "Total profit",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalProfit),
      change: "",
      icon: Activity,
    },


    // {
    //   label: "Avg. yield (12m)",
    //   value: statsLoading
    //     ? "—"
    //     : `${Number(stats?.avgYieldPercent ?? 0).toFixed(1)}%`,
    //   change: "",
    //   icon: TrendingUp,
    // },
  ];

  const moduleCounters = [
    { label: "Accounts", count: stats?.moduleCounts?.users ?? 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20" },
    { label: "Investments", count: stats?.moduleCounts?.investments ?? 0, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20" },
    { label: "Agreements", count: stats?.moduleCounts?.deeds ?? 0, icon: FileText, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20" },
    // { label: "Yield Reports", count: stats?.moduleCounts?.reports ?? 0, icon: Activity, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-500/10", border: "border-cyan-100 dark:border-cyan-500/20" },
    { label: "Partner Payouts", count: stats?.moduleCounts?.partnerPayouts ?? 0, icon: CreditCard, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10", border: "border-violet-100 dark:border-violet-500/20" },
    { label: "Inquiries", count: stats?.moduleCounts?.contacts ?? 0, icon: MessageSquare, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-100 dark:border-rose-500/20" },
    { label: "Notices", count: stats?.moduleCounts?.notices ?? 0, icon: Bell, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10", border: "border-red-100 dark:border-red-500/20" },
    { label: "Banners", count: stats?.moduleCounts?.banners ?? 0, icon: Monitor, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20" },
    { label: "Gallery", count: stats?.moduleCounts?.glarry ?? 0, icon: Camera, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10", border: "border-pink-100 dark:border-pink-500/20" },
    { label: "Investor Types", count: stats?.moduleCounts?.investorTypes ?? 0, icon: Shield, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10", border: "border-indigo-100 dark:border-indigo-500/20" },
    { label: "Tier Packages", count: stats?.moduleCounts?.investAmounts ?? 0, icon: Coins, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-100 dark:border-orange-500/20" },
  ];

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CircleDollarSign className="w-5 h-5 text-emerald-500" /> Financial & Sales Overview
        </h2>
      </div>
      <section className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((card, index) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Dynamic background gradient blob */}
            <div
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"
              style={{ background: "rgba(124,194,46,0.18)" }}
            />

            {/* Bottom left blob for balance */}
            <div
              className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150"
              style={{ background: "rgba(77,140,30,0.14)" }}
            />

            <div className="relative flex flex-col h-full justify-between z-10">
              <div className="flex items-center justify-between mb-6">
                <div
                  className="relative rounded-2xl p-3 text-white ring-1 ring-[color:rgba(124,194,46,0.25)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(135deg,var(--brand-from),var(--brand-to))",
                  }}
                >
                  <card.icon className="h-6 w-6 transition-transform duration-500 group-hover:-rotate-12" />
                </div>
                {card.change && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-emerald-100 shadow-sm dark:text-emerald-400 dark:bg-emerald-900/30 dark:border-emerald-800">
                    <TrendingUp className="h-3 w-3" />
                    {card.change}
                  </span>
                )}
              </div>

              <div className="flex flex-col lg:items-end lg:text-right space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  {card.label}
                </p>
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 transition-transform duration-300 origin-left group-hover:scale-105 lg:text-3xl lg:origin-right dark:text-zinc-100">
                  {card.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Module Counts Section */}
      <section className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-zinc-50 p-2.5 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                System Overview
              </h2>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Total counts across all platform modules
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {moduleCounters.map((item, i) => (
            <div
              key={item.label}
              className={`group flex items-center gap-4 rounded-2xl border ${item.border} p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md bg-white dark:bg-zinc-800/20`}
              style={{ animationDelay: `${50 * i}ms` }}
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 ${item.bg} ${item.color}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  {statsLoading ? "—" : formatNumber(item.count)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 line-clamp-1">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* Bottom Panels */}
      < section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]" >
        {/* Activity Panel */}
        < div className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-100/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800/50" >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[color:rgba(124,194,46,0.18)] p-2.5 text-[color:rgb(77,140,30)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-[color:rgba(124,194,46,0.18)] dark:text-[color:rgb(124,194,46)]">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Investment Activity
                </h2>
                <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                  Real-time updates
                </p>
              </div>
            </div>
            <span className="rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
              Weekly
            </span>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-dashed border-[color:rgba(77,140,30,0.25)] bg-gradient-to-br from-[color:rgba(124,194,46,0.10)] via-white to-[color:rgba(77,140,30,0.06)] group-hover:border-[color:rgba(77,140,30,0.38)] transition-colors duration-300 dark:border-[color:rgba(124,194,46,0.20)] dark:from-[color:rgba(124,194,46,0.08)] dark:via-zinc-900 dark:to-[color:rgba(77,140,30,0.04)] dark:group-hover:border-[color:rgba(124,194,46,0.28)]">
            <div className="flex items-start justify-between p-3">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Weekly Investments
              </div>
              <div className="text-xs font-bold text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]">
                {recentLoading ? "—" : formatCurrencyBDT((recent ?? []).reduce((s, r) => s + Number(r.amount || 0), 0))}
              </div>
            </div>
            <div className="h-64 w-full px-2 pb-2">
              {recentLoading || !(recent ?? []).length ? (
                <div className="flex h-full items-center justify-center text-xs text-zinc-400 dark:text-zinc-500">
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
                          <stop offset="0%" stopColor="#7cc22e" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#4d8c1e" stopOpacity="0.03" />
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
                      <path d={path} fill="none" stroke="#4d8c1e" strokeWidth="2" />
                      {points.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r="2.5" fill="#7cc22e" />
                      ))}
                    </svg>
                  );
                })()
              )}
            </div>
          </div>
        </div >

        {/* Recent Investments Panel */}
        < div className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-100/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800/50" >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-2.5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:bg-blue-900/30 dark:text-blue-400">
                <Wallet className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Recent Investments
              </h2>
            </div>
            <button className="group/btn flex items-center gap-1.5 text-xs font-bold text-zinc-400 transition-colors hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400">
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
                    className="flex items-center justify-between rounded-2xl border border-zinc-50 p-3 dark:border-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                      <div className="space-y-2">
                        <div className="h-3 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-2 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                      </div>
                    </div>
                    <div className="h-4 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                  </div>
                ))}
              </>
            ) : (recent ?? []).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-zinc-50 p-4 text-zinc-300 mb-3 dark:bg-zinc-800 dark:text-zinc-600">
                  <Wallet className="h-8 w-8" />
                </div>
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
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
                    className="group/item flex cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-zinc-50/50 p-3 transition-all duration-300 hover:border-zinc-100 hover:bg-white hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:scale-[1.02] dark:bg-zinc-800/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white to-zinc-100 text-xs font-black text-zinc-700 shadow-sm ring-1 ring-zinc-100 transition-all duration-300 group-hover/item:from-blue-50 group-hover/item:to-blue-100 group-hover/item:text-blue-700 group-hover/item:ring-blue-200 group-hover/item:scale-110 dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:group-hover/item:from-blue-900/50 dark:group-hover/item:to-blue-800/50 dark:group-hover/item:text-blue-300 dark:group-hover/item:ring-blue-700">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-700 transition-colors group-hover/item:text-zinc-900 dark:text-zinc-300 dark:group-hover/item:text-zinc-100">
                          {name}
                        </p>
                        <p className="text-[10px] font-medium text-zinc-400 group-hover/item:text-zinc-500 dark:text-zinc-500 dark:group-hover/item:text-zinc-400">
                          {item.date ?? ""} • {item.time ?? ""}
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-sm font-bold text-zinc-700 transition-colors group-hover/item:text-emerald-600 dark:text-zinc-300 dark:group-hover/item:text-emerald-400">
                      {formatCurrencyBDT(item.amount)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div >
      </section >
    </div >
  );
}
