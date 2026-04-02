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
    <section id="live-kpis" className="relative overflow-hidden py-12 sm:py-16">
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-white to-white" />
        <div className="absolute inset-0 [background:radial-gradient(70%_55%_at_50%_-10%,rgba(16,185,129,0.14),transparent)]" />
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
      </div> */}

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="space-y-4 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-700 shadow-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live KPIs
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
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

          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/75 p-5 shadow-xl shadow-zinc-200/35 backdrop-blur transition-all hover:shadow-2xl hover:shadow-emerald-200/25">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-400 to-teal-400" />
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-200/25 blur-3xl" />

              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Field Conditions
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                      <WeatherIcon code={weather.code} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-bold text-zinc-900">
                        {weather.condition}
                      </p>
                      <p className="text-sm font-semibold text-zinc-500">
                        {weather.temp}°C
                      </p>
                    </div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm">
                  <span
                    className={`h-2 w-2 rounded-full ${weather.isLoaded ? "bg-emerald-500" : "bg-zinc-300"}`}
                  />
                  {weather.isLoaded ? "Live" : "Loading"}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-sky-600" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Humidity
                    </p>
                  </div>
                  <p className="mt-2 text-lg font-bold text-zinc-900">
                    {weather.humidity}%
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-zinc-600" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Wind
                    </p>
                  </div>
                  <p className="mt-2 text-lg font-bold text-zinc-900">
                    {weather.wind} km/h
                  </p>
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-zinc-300/60"
            >
              <div
                className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${kpi.theme.bar}`}
              />
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-zinc-100/70 blur-3xl transition-colors group-hover:bg-emerald-100/60" />

              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl ${kpi.theme.iconBg} shadow-sm ring-1 ${kpi.theme.iconRing}`}
                >
                  <kpi.icon className={`h-5 w-5 ${kpi.theme.iconColor}`} />
                </div>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${kpi.theme.pillBg} ${kpi.theme.pillText} ${kpi.theme.pillBorder}`}
                >
                  {kpi.trend}
                </span>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium text-zinc-500">{kpi.label}</p>
                <p className="text-2xl font-bold tracking-tight text-zinc-900">
                  {kpi.value}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Trend
                  </p>
                  <span className="text-xs font-semibold text-zinc-600">
                    Last 12 mo
                  </span>
                </div>
                <div className="mt-3 flex h-9 items-end gap-1.5">
                  {kpi.sparkHeights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-full bg-zinc-100"
                      style={{ height: `${h}px` }}
                    >
                      <div
                        className={`h-full w-full rounded-full ${kpi.theme.spark}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}