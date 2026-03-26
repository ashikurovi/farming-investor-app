"use client";

import {
  TrendingUp,
  ArrowUpRight,
  Activity,
  Sprout,
  Droplets,
  Sun,
  Wind,
  Cloud,
  CloudRain,
  Snowflake,
} from "lucide-react";
import { useState, useEffect } from "react";

function WeatherIcon({ code, className }) {
  if (code === undefined) return <Sun className={className} />;
  if (code === 0) return <Sun className={className} />;
  if (code >= 1 && code <= 3) return <Cloud className={className} />;
  if (code >= 51) return <CloudRain className={className} />;
  if (code >= 71) return <Snowflake className={className} />;
  return <Sun className={className} />;
}

export default function HomeLiveKpis() {
  const [weather, setWeather] = useState({
    temp: 24,
    condition: "Sunny",
    humidity: 42,
    wind: 12,
    isLoaded: false,
  });

  function getWeatherCondition(code) {
    if (code === 0) return "Clear";
    if (code === 1 || code === 2 || code === 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 95) return "Thunderstorm";
    return "Sunny";
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetching weather for a farming region (e.g., Fresno, CA)
        // Using Open-Meteo API (No key required)
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=36.7378&longitude=-119.7871&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto",
        );
        const data = await response.json();

        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            condition: getWeatherCondition(data.current.weather_code),
            humidity: data.current.relative_humidity_2m,
            wind: Math.round(data.current.wind_speed_10m),
            code: data.current.weather_code,
            isLoaded: true,
          });
        }
      } catch (error) {
        console.error("Failed to fetch weather data", error);
        // Fallback is already set in initial state
      }
    };

    fetchWeather();

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    {
      label: "Average Annual Yield",
      value: "12.4%",
      trend: "+2.1% vs last year",
      icon: TrendingUp,
      theme: {
        bar: "from-emerald-400 to-teal-400",
        iconBg: "bg-emerald-50",
        iconRing: "ring-emerald-100",
        iconColor: "text-emerald-600",
        pillBg: "bg-emerald-50",
        pillText: "text-emerald-700",
        pillBorder: "border-emerald-100",
        spark: "bg-emerald-500",
      },
      sparkHeights: [10, 14, 12, 18, 15, 22, 20, 24, 18, 21, 23, 26],
    },
    {
      label: "Total Assets Managed",
      value: "$45.2M",
      trend: "+$5.2M this quarter",
      icon: Activity,
      theme: {
        bar: "from-indigo-400 to-sky-400",
        iconBg: "bg-indigo-50",
        iconRing: "ring-indigo-100",
        iconColor: "text-indigo-600",
        pillBg: "bg-indigo-50",
        pillText: "text-indigo-700",
        pillBorder: "border-indigo-100",
        spark: "bg-indigo-500",
      },
      sparkHeights: [14, 16, 15, 19, 18, 20, 22, 21, 24, 23, 25, 26],
    },
    {
      label: "Active Hectares",
      value: "8,450",
      trend: "1,200 ha added 2024",
      icon: Sprout,
      theme: {
        bar: "from-amber-400 to-orange-400",
        iconBg: "bg-amber-50",
        iconRing: "ring-amber-100",
        iconColor: "text-amber-700",
        pillBg: "bg-amber-50",
        pillText: "text-amber-800",
        pillBorder: "border-amber-100",
        spark: "bg-amber-500",
      },
      sparkHeights: [9, 11, 10, 12, 14, 16, 15, 17, 18, 19, 20, 21],
    },
    {
      label: "Sustainability Score",
      value: "94/100",
      trend: "Top 5% Global Index",
      icon: ArrowUpRight,
      theme: {
        bar: "from-violet-400 to-fuchsia-400",
        iconBg: "bg-violet-50",
        iconRing: "ring-violet-100",
        iconColor: "text-violet-600",
        pillBg: "bg-violet-50",
        pillText: "text-violet-700",
        pillBorder: "border-violet-100",
        spark: "bg-violet-500",
      },
      sparkHeights: [12, 13, 14, 16, 15, 17, 18, 19, 18, 20, 21, 22],
    },
  ];

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

            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
              A modern investor-grade snapshot of performance, growth, and
              sustainability, updated alongside live environment signals.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
                Updated periodically
              </span>
              <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 font-medium text-zinc-600">
                Illustrative metrics
              </span>
            </div>
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
