import { TrendingUp, ArrowUpRight, Activity, Sprout } from "lucide-react";

export default function HomeLiveKpis() {
  const kpis = [
    {
      label: "Average Annual Yield",
      value: "12.4%",
      trend: "+2.1% vs last year",
      icon: TrendingUp,
      trendColor: "text-emerald-600",
    },
    {
      label: "Total Assets Managed",
      value: "$45.2M",
      trend: "+$5.2M this quarter",
      icon: Activity,
      trendColor: "text-emerald-600",
    },
    {
      label: "Active Hectares",
      value: "8,450",
      trend: "1,200 ha added 2024",
      icon: Sprout,
      trendColor: "text-emerald-600",
    },
    {
      label: "Sustainability Score",
      value: "94/100",
      trend: "Top 5% Global Index",
      icon: ArrowUpRight,
      trendColor: "text-emerald-600",
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Live Market Data
              </span>
            </div>
            <h2 className="text-3xl font-light text-zinc-900 sm:text-4xl tracking-tight">
              Real-time <span className="font-serif italic text-zinc-500">agricultural</span> performance.
            </h2>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest">
              Last Updated: Just Now
            </p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12 lg:gap-x-12 relative mx-auto">
          {/* Dividers for Desktop */}
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/4 w-px bg-zinc-100" />
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-zinc-100" />
          <div className="hidden lg:block absolute top-0 bottom-0 left-3/4 w-px bg-zinc-100" />

          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="relative group text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-zinc-50 text-zinc-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1 sm:mt-0">
                    {kpi.label}
                  </h3>
                </div>
                
                <div className="flex justify-center sm:justify-start items-baseline gap-2">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
                    {kpi.value}
                  </p>
                </div>
                
                <p className={`mt-3 text-[10px] sm:text-xs font-medium ${kpi.trendColor} flex justify-center sm:justify-start items-center gap-1`}>
                  {kpi.trend}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
