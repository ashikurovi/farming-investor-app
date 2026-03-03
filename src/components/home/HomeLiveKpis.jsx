import {
  TrendingUp,
  ArrowUpRight,
  Activity,
  Sprout,
  Droplets,
  Sun,
  Wind,
} from "lucide-react";
import Image from "next/image";

export default function HomeLiveKpis() {
  const kpis = [
    {
      label: "Average Annual Yield",
      value: "12.4%",
      trend: "+2.1% vs last year",
      icon: TrendingUp,
      trendColor: "text-emerald-600",
      chart: "bg-emerald-500",
    },
    {
      label: "Total Assets Managed",
      value: "$45.2M",
      trend: "+$5.2M this quarter",
      icon: Activity,
      trendColor: "text-emerald-600",
      chart: "bg-emerald-500",
    },
    {
      label: "Active Hectares",
      value: "8,450",
      trend: "1,200 ha added 2024",
      icon: Sprout,
      trendColor: "text-emerald-600",
      chart: "bg-emerald-500",
    },
    {
      label: "Sustainability Score",
      value: "94/100",
      trend: "Top 5% Global Index",
      icon: ArrowUpRight,
      trendColor: "text-emerald-600",
      chart: "bg-emerald-500",
    },
  ];

  return (
    <section className="relative ">
      {/* Background Image with Overlay
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Agriculture Data Background"
          fill
          className="object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/80 via-transparent to-zinc-50/80"></div>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
              Built for <span className="font-serif italic">trust</span>, designed for{" "}
              <span className="font-serif italic text-emerald-700">growth</span>.
            </h2>
          </div>

          {/* Live Weather Widget */}
          <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm">
            <div className="flex items-center gap-3 pr-4 border-r border-zinc-100">
              <Sun className="w-8 h-8 text-amber-500" />
              <div>
                <div className="text-sm font-medium text-zinc-500">
                  Field Conditions
                </div>
                <div className="text-lg font-bold text-zinc-900">
                  Sunny, 24°C
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-blue-500" />
              <div>
                <div className="text-xs text-zinc-500">Humidity</div>
                <div className="font-semibold text-zinc-900">42%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Wind className="w-6 h-6 text-zinc-500" />
              <div>
                <div className="text-xs text-zinc-500">Wind</div>
                <div className="font-semibold text-zinc-900">12km/h</div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-3xl bg-white border border-zinc-100 hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  {/* Decorative Chart Line */}
                  <div className="flex items-end gap-1 h-8">
                    <div
                      className={`w-1 rounded-t-sm ${kpi.chart} opacity-20 group-hover:opacity-40 h-3 transition-all duration-300`}
                    ></div>
                    <div
                      className={`w-1 rounded-t-sm ${kpi.chart} opacity-40 group-hover:opacity-60 h-5 transition-all duration-300`}
                    ></div>
                    <div
                      className={`w-1 rounded-t-sm ${kpi.chart} opacity-60 group-hover:opacity-80 h-4 transition-all duration-300`}
                    ></div>
                    <div
                      className={`w-1 rounded-t-sm ${kpi.chart} opacity-80 group-hover:opacity-100 h-7 transition-all duration-300`}
                    ></div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-500 tracking-wide uppercase">
                    {kpi.label}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-zinc-900 tracking-tight font-display">
                      {kpi.value}
                    </p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-lg bg-emerald-50 ${kpi.trendColor} w-fit mt-2`}
                  >
                    <TrendingUp className="w-3 h-3" />
                    {kpi.trend}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
