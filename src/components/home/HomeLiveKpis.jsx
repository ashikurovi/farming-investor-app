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
import Image from "next/image";

export default function HomeLiveKpis() {
  const [weather, setWeather] = useState({
    temp: 24,
    condition: "Sunny",
    humidity: 42,
    wind: 12,
    isLoaded: false,
  });

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

  const getWeatherCondition = (code) => {
    if (code === 0) return "Clear";
    if (code === 1 || code === 2 || code === 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 67) return "Rainy";
    if (code >= 71 && code <= 77) return "Snowy";
    if (code >= 80 && code <= 82) return "Rain Showers";
    if (code >= 95) return "Thunderstorm";
    return "Sunny";
  };

  const WeatherIcon = ({ code, className }) => {
    if (code === undefined) return <Sun className={className} />;
    if (code === 0) return <Sun className={className} />; // Clear
    if (code >= 1 && code <= 3) return <Cloud className={className} />; // Cloudy
    if (code >= 51) return <CloudRain className={className} />; // Rain
    if (code >= 71) return <Snowflake className={className} />; // Snow
    return <Sun className={className} />;
  };

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
    <section id="live-kpis" className="relative  ">
      <div className="max-w-7xl  mx-auto px-6 lg:px-8 relative z-10">
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
              Built for <span className="font-serif italic">trust</span>,
              designed for{" "}
              <span className="font-serif italic text-emerald-700">growth</span>
              .
            </h2>
          </div>

          {/* Live Weather Widget */}
          <div className="flex flex-wrap gap-4 p-4 rounded-2xl bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-3 pr-4 border-r border-zinc-100 min-w-[140px]">
              <WeatherIcon
                code={weather.code}
                className="w-8 h-8 text-amber-500"
              />
              <div>
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Field Conditions
                </div>
                <div className="text-lg font-bold text-zinc-900">
                  {weather.condition}, {weather.temp}°C
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Humidity
                </div>
                <div className="font-semibold text-zinc-900">
                  {weather.humidity}%
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 border-l border-zinc-100 pl-4">
              <Wind className="w-5 h-5 text-zinc-500" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                  Wind
                </div>
                <div className="font-semibold text-zinc-900">
                  {weather.wind}km/h
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-white border border-zinc-100 group-hover:border-emerald-100 group-hover:bg-emerald-50 transition-colors">
                  <kpi.icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full bg-white border border-zinc-100 ${kpi.trendColor}`}
                >
                  {kpi.trend}
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-zinc-500 font-medium">
                  {kpi.label}
                </div>
                <div className="text-2xl font-bold text-zinc-900">
                  {kpi.value}
                </div>
              </div>

              <div className="mt-4 h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full w-[70%] rounded-full ${kpi.chart} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
