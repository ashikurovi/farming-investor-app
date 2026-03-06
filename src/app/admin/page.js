'use client';

import { useGetProjectsStatsQuery } from "@/features/admin/projects/projectsApiSlice";
import { useGetRecentInvestmentsQuery } from "@/features/investor/investments/investmentsApiSlice";
import { 
  TrendingUp, 
  Users, 
  Sprout, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar
} from "lucide-react";
import { format } from "date-fns";

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
  const {
    data: recentData,
    isLoading: recentLoading,
  } = useGetRecentInvestmentsQuery({ limit: 5 });

  const recent = recentData?.items || [];

  const statCards = [
    {
      label: "Total Investment",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalInvestment),
      change: "+12.5% from last month",
      trend: "up",
      icon: Wallet,
      color: "emerald",
    },
    {
      label: "Active Investors",
      value: statsLoading ? "—" : formatNumber(stats?.activeInvestors),
      change: "+4 new this week",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      label: "Active Farms",
      value: statsLoading ? "—" : formatNumber(stats?.totalProjects),
      change: "2 harvesting soon",
      trend: "neutral",
      icon: Sprout,
      color: "amber",
    },
    {
      label: "Avg. Yield (12m)",
      value: statsLoading
        ? "—"
        : `${(Number(stats?.avgYieldPercent ?? 0)).toFixed(1)}%`,
      change: "+1.2% vs last year",
      trend: "up",
      icon: TrendingUp,
      color: "rose",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-zinc-500">
            Welcome back! Here's what's happening with your farms today.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-1">
          <button className="rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-sm">
            Last 30 Days
          </button>
          <button className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900">
            Last Quarter
          </button>
          <button className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900">
            Year to Date
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-200/60"
          >
            <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-${card.color}-50/50 opacity-20 blur-2xl group-hover:bg-${card.color}-100/60 transition-colors`} />
            
            <div className="flex items-start justify-between">
              <div className={`rounded-xl bg-${card.color}-50 p-3 text-${card.color}-600 ring-1 ring-${card.color}-100/50`}>
                <card.icon className="h-6 w-6" />
              </div>
              {card.trend === "up" && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                  <ArrowUpRight className="h-3 w-3" />
                  {card.change.split(' ')[0]}
                </span>
              )}
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-500">{card.label}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                {card.value}
              </h3>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-medium text-zinc-500">{card.change}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Activity Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">Investment Activity</h3>
                <p className="text-sm text-zinc-500">Portfolio performance over time</p>
              </div>
              <button className="rounded-lg border border-zinc-200 p-2 hover:bg-zinc-50">
                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
              </button>
            </div>
            
            <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-50/50 to-white border border-zinc-100/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/50">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-medium text-zinc-900">Analytics Coming Soon</h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-[200px]">
                    Detailed investment charts and portfolio analysis will be available in the next update.
                  </p>
                </div>
              </div>
              {/* Decorative grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-zinc-100 bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 text-white shadow-lg">
              <div className="mb-4 rounded-full bg-white/10 p-3 w-fit backdrop-blur-sm">
                <Sprout className="h-6 w-6 text-emerald-300" />
              </div>
              <h3 className="text-lg font-semibold">New Farm Project?</h3>
              <p className="mt-2 text-sm text-emerald-100/80">
                Launch a new investment opportunity for your investors.
              </p>
              <button className="mt-6 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-emerald-900 shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98]">
                Create Project
              </button>
            </div>

            <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
              <div className="mb-4 rounded-full bg-blue-50 p-3 w-fit">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900">Investor Insights</h3>
              <p className="mt-2 text-sm text-zinc-500">
                Check recent investor registrations and verification status.
              </p>
              <button className="mt-6 w-full rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
                View Investors
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Investments */}
        <div className="lg:col-span-1">
          <div className="h-full rounded-3xl border border-zinc-100 bg-white shadow-sm flex flex-col">
            <div className="p-6 border-b border-zinc-100">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-zinc-900">Recent Investments</h3>
                <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                  View All
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-2">
              {recentLoading ? (
                <div className="space-y-4 p-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                      <div className="h-10 w-10 rounded-full bg-zinc-100" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-2/3 rounded bg-zinc-100" />
                        <div className="h-3 w-1/3 rounded bg-zinc-100" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recent.length > 0 ? (
                <div className="space-y-1">
                  {recent.map((investment, i) => (
                    <div
                      key={investment.id || i}
                      className="group flex items-center gap-4 rounded-xl p-3 hover:bg-zinc-50 transition-colors cursor-pointer"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 group-hover:bg-white group-hover:shadow-sm group-hover:text-emerald-600 transition-all">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-900">
                          {investment.investorName || "Anonymous Investor"}
                        </p>
                        <p className="truncate text-xs text-zinc-500">
                          {investment.projectName || "Project Investment"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-emerald-600">
                          {formatCurrencyBDT(investment.amount)}
                        </p>
                        <p className="text-[10px] text-zinc-400">
                          {investment.createdAt ? format(new Date(investment.createdAt), 'MMM d') : 'Just now'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center p-6">
                  <div className="h-12 w-12 rounded-full bg-zinc-50 flex items-center justify-center mb-3">
                    <Wallet className="h-6 w-6 text-zinc-300" />
                  </div>
                  <p className="text-sm font-medium text-zinc-900">No investments yet</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    When investors fund projects, they'll appear here.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 rounded-b-3xl">
              <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 py-2.5 text-xs font-medium text-zinc-500 hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-600 transition-all">
                <Calendar className="h-3.5 w-3.5" />
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
