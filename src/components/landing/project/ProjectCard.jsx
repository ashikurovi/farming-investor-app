"use client";

import { MapPin, TrendingUp, ArrowUpRight, Sprout } from "lucide-react";
import Link from "next/link";

export function ProjectCard({ project }) {
  const totalCost = Number(project.totalCost || 0);
  const totalInvestment = Number(project.totalInvestment || 0);
  const totalProfit = Number(project.totalProfit || 0);
  const distributedProfit = Number(project.distributedProfit || 0);
  const totalSell = Number(project.totalSell || 0);

  const fundedRatio =
    totalCost > 0 ? Math.min(1, Math.max(0, totalInvestment / totalCost)) : 0;
  const fundedPct = Math.round(fundedRatio * 100);
  const roi = totalCost > 0 ? Math.round((totalProfit / totalCost) * 100) : 0;
  const remaining = Math.max(0, totalCost - totalInvestment);

  return (
    <Link
      href={`/landing/project/${project.projectId}`}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-zinc-200/80 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10"
    >
      {/* ── LIVE Badge ── */}
      {project.isLive && (
        <div className="absolute top-0 right-0 z-10">
          <span className="block bg-green-500 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-bl-xl rounded-tr-[20px]">
            LIVE
          </span>
        </div>
      )}

      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-100 to-emerald-200">
        {project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.pexels.com/photos/2132257/pexels-photo-2132257.jpeg?auto=compress&cs=tinysrgb&w=800";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Sprout className="h-14 w-14 text-emerald-400" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {project.category && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center bg-emerald-900/85 text-emerald-100 text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 bg-amber-100/90 text-amber-800 text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            <TrendingUp className="w-3 h-3" />
            ROI {roi}%
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-grow p-5">
        {/* Title + Location */}
        <div className="mb-4">
          <h3 className="text-[16px] font-semibold text-zinc-900 leading-snug mb-1 group-hover:text-emerald-700 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>

        <div className="border-t border-zinc-100 mb-4" />

        {/* Stats grid — only real API fields */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
          <div>
            <p className="text-[11px] text-zinc-400 mb-0.5">Total cost</p>
            <p className="text-[13px] font-semibold text-zinc-800">
              ৳{totalCost.toLocaleString("en-US")}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-zinc-400 mb-0.5">Total sell</p>
            <p className="text-[13px] font-semibold text-zinc-800">
              ৳{totalSell.toLocaleString("en-US")}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-zinc-400 mb-0.5">Total profit</p>
            <p className="text-[13px] font-semibold text-green-600">
              ৳{totalProfit.toLocaleString("en-US")}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-zinc-400 mb-0.5">Distributed profit</p>
            <p className="text-[13px] font-semibold text-emerald-700">
              ৳{distributedProfit.toLocaleString("en-US")}
            </p>
          </div>
        </div>

        {/* Investment progress */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-[12px]">
              <span className="text-zinc-400">Raised</span>
              <span className="font-semibold text-zinc-800">
                ৳{totalInvestment.toLocaleString("en-US")}
              </span>
            </div>
            <span className="text-[12px] font-semibold text-green-600">{fundedPct}%</span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${fundedPct}%` }}
            />
          </div>

          <p className="text-[11px] text-zinc-400 mt-1.5">
            Remaining: ৳{remaining.toLocaleString("en-US")}
          </p>
        </div>

        {/* Status + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="inline-block bg-green-50 text-green-700 text-[11px] font-medium px-3 py-1.5 rounded-full border border-green-200">
            {project.status ?? "Active"}
          </span>

          <div className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-[12px] font-medium px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer group-hover:shadow-md group-hover:shadow-emerald-700/20">
            View Details
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

      </div>
    </Link>
  );
}
