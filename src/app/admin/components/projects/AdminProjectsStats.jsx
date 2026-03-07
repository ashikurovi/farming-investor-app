import { Card, CardContent } from "@/components/ui/card";
import { Layers, Wallet2, Users, TrendingUp, TrendingDown, DollarSign, Minus } from "lucide-react";

export function AdminProjectsStats({ stats, isLoading }) {
  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalCost = Number(stats?.totalCost || 0);
  const totalInvestment = Number(stats?.totalInvestment || 0);
  const totalProfit = Number(stats?.totalProfit || 0);

  const investmentProgress = totalCost > 0 ? (totalInvestment / totalCost) * 100 : 0;
  const profitMargin = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;

  const StatCard = ({ title, value, icon: Icon, trend = "neutral", trendValue = "0%", trendLabel = "from last month", colorClass, bgClass }) => (
    <Card className="relative overflow-hidden border-zinc-100 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_4px_20px_-3px_rgba(0,0,0,0.08)]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse rounded bg-zinc-100" />
              ) : (
                value
              )}
            </h3>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgClass}`}>
            <Icon className={`h-6 w-6 ${colorClass}`} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
          {trend === "down" && <TrendingDown className="h-4 w-4 text-rose-500" />}
          {trend === "neutral" && <Minus className="h-4 w-4 text-zinc-400" />}
          <span 
            className={`text-xs font-medium ${
              trend === "up" ? "text-emerald-600" : 
              trend === "down" ? "text-rose-600" : 
              "text-zinc-500"
            }`}
          >
            {trendValue}
          </span>
          {trendLabel && <span className="text-xs text-zinc-400">{trendLabel}</span>}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={stats?.totalProjects ?? 0}
        icon={Layers}
        trend="neutral"
        trendValue="0%"
        trendLabel="Growth"
        colorClass="text-blue-600"
        bgClass="bg-blue-50"
      />
      <StatCard
        title="Total Investment"
        value={`৳${formatNumber(stats?.totalInvestment)}`}
        icon={Wallet2}
        trend="up"
        trendValue={`+${investmentProgress.toFixed(1)}%`}
        trendLabel="Funded"
        colorClass="text-emerald-600"
        bgClass="bg-emerald-50"
      />
      <StatCard
        title="Total Sell"
        value={`৳${formatNumber(stats?.totalSell)}`}
        icon={DollarSign}
        trend="neutral"
        trendValue="0%"
        trendLabel="Growth"
        colorClass="text-amber-600"
        bgClass="bg-amber-50"
      />
      <StatCard
        title="Net Profit"
        value={`৳${formatNumber(stats?.totalProfit)}`}
        icon={Users}
        trend={totalProfit >= 0 ? "up" : "down"}
        trendValue={`${totalProfit >= 0 ? "+" : ""}${profitMargin.toFixed(1)}%`}
        trendLabel="ROI"
        colorClass="text-violet-600"
        bgClass="bg-violet-50"
      />
    </section>
  );
}
