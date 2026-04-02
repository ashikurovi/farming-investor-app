"use client";

import { Leaf, Sprout, Truck, BadgeCheck } from "lucide-react";

const bottomCards = [
  {
    icon: <Sprout className="h-5 w-5" />,
    title: "Organic Crop Production",
    desc: "Augue laoreet mattis platea nec nullam suscipit aliquam lorem.",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Sustainable Farm Management",
    desc: "Augue laoreet mattis platea nec nullam suscipit aliquam lorem.",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Export & Supply Partnership",
    desc: "Augue laoreet mattis platea nec nullam suscipit aliquam lorem.",
  },
];

export default function HomeLiveKpis() {
  return (
    <section id="live-kpis" className="relative">
      <div className="absolute inset-0 pointer-events-none [background:radial-gradient(80%_60%_at_50%_-10%,rgba(16,185,129,0.08),transparent)]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-100 w-fit shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Live KPIs
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 leading-tight">
              Real-time portfolio indicators and field conditions
            </h2>

            <p className="text-[15px] leading-relaxed text-[#6b7466] font-light max-w-[420px] mb-7">
              Luctus felis diam lectus in aptent vehicula curabitur duis
              ultrices. Consequat nulla nostra tempor ridiculus sociosqu maximus
              laoreet.
            </p>

            <a
              href="/landing/about"
              className="inline-flex items-center gap-2 w-fit rounded-full px-7 py-3 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.97]"
              style={{
                background: "linear-gradient(135deg, #4d8c1e, #7cc22e)",
                boxShadow: "0 4px 20px rgba(77,140,30,0.3)",
              }}
            >
              Discover more
              <span className="transition-transform duration-300">&#8594;</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 pr-4 border-r border-zinc-100 min-w-[140px]">
              <WeatherIcon code={weather.code} className="w-8 h-8 text-amber-500" />
              <div>
                <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                  Field Conditions
                </div>
                <div className="text-base md:text-lg font-bold text-zinc-900">
                  {weather.condition}, {weather.temp}°C
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">Humidity</div>
                <div className="font-semibold text-zinc-900">{weather.humidity}%</div>
              </div>
              <p className="text-[14px] font-semibold text-[#1a1f14] mb-1.5">
                Organic Farming Expertise
              </p>
              <p className="text-[12px] text-[#8a9185] leading-relaxed">
                Dictumst feugiat mauris conubia et enim pellentesque porttitor.
              </p>
            </div>
            <div className="flex items-center gap-3 px-2 border-l border-zinc-100 pl-4">
              <Wind className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">Wind</div>
                <div className="font-semibold text-zinc-900">{weather.wind}km/h</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                  <kpi.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {kpi.trend}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-zinc-500 font-medium">{kpi.label}</div>
                <div className="text-2xl font-bold text-zinc-900">{kpi.value}</div>
              </div>

              <div className="mt-4 h-2 w-full bg-emerald-50 rounded-full overflow-hidden">
                <div className={`h-full w-[70%] rounded-full ${kpi.chart}`} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}