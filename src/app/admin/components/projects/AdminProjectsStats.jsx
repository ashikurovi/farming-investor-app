import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Layers, Wallet2, Users } from "lucide-react";

export function AdminProjectsStats({ stats, isLoading }) {
  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const profitValue = Number(stats?.totalProfit ?? 0);
  const profitClass =
    profitValue < 0
      ? "text-red-600"
      : profitValue > 0
        ? "text-emerald-700"
        : "text-zinc-900";

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Projects
            </CardTitle>
            <Layers className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-semibold text-zinc-900">
            {isLoading ? "—" : stats.totalProjects}
          </p>
          <CardDescription>Project count</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Total investment
            </CardTitle>
            <Wallet2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-semibold text-zinc-900">
            {isLoading ? "—" : formatNumber(stats.totalInvestment)}
          </p>
          <CardDescription>Across all projects</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Total sell
            </CardTitle>
            <Wallet2 className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-semibold text-zinc-900">
            {isLoading ? "—" : formatNumber(stats.totalSell)}
          </p>
          <CardDescription>Across all projects</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Total cost
            </CardTitle>
            <Wallet2 className="h-4 w-4 rotate-180 text-emerald-500" />
          </div>
          <p className="text-2xl font-semibold text-zinc-900">
            {isLoading ? "—" : formatNumber(stats.totalCost)}
          </p>
          <CardDescription>Across all projects</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              Total profit
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </div>
          <p className={`text-2xl font-semibold ${isLoading ? "text-zinc-900" : profitClass}`}>
            {isLoading ? "—" : formatNumber(stats.totalProfit)}
          </p>
          <CardDescription>Summed across projects</CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
