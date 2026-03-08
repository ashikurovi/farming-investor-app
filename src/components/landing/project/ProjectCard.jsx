"use client";

import {
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Sprout,
  Tractor,
  Layers,
  Leaf,
  Beef,
  Bird,
  Wheat,
} from "lucide-react";
import Link from "next/link";

const CategoryIcon = ({ type }) => {
  switch (type) {
    case "CF":
      return <Beef className="w-3.5 h-3.5" />;
    case "PF":
      return <Bird className="w-3.5 h-3.5" />;
    case "CV":
      return <Wheat className="w-3.5 h-3.5" />;
    case "OH":
      return <Leaf className="w-3.5 h-3.5" />;
    default:
      return <Layers className="w-3.5 h-3.5" />;
  }
};

const getCategoryLabel = (type) => {
  const map = {
    CF: "Livestock",
    PF: "Poultry",
    CV: "Crops",
    OH: "Vegetables",
    Others: "Specialty",
  };
  return map[type] || type;
};

const getCategoryAccent = (type) => {
  const map = {
    CF: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200/60",
      dot: "bg-amber-500",
    },
    PF: {
      bg: "bg-sky-50",
      text: "text-sky-700",
      border: "border-sky-200/60",
      dot: "bg-sky-500",
    },
    CV: {
      bg: "bg-lime-50",
      text: "text-lime-700",
      border: "border-lime-200/60",
      dot: "bg-lime-500",
    },
    OH: {
      bg: "bg-violet-50",
      text: "text-violet-700",
      border: "border-violet-200/60",
      dot: "bg-violet-500",
    },
    Others: {
      bg: "bg-zinc-50",
      text: "text-zinc-700",
      border: "border-zinc-200/60",
      dot: "bg-zinc-500",
    },
  };
  return map[type] || map["Others"];
};

export function ProjectCard({ project }) {
  const totalCost = Number(project.totalCost || 0);
  const totalInvestment = Number(project.totalInvestment || 0);
  const fundingPercent =
    totalCost > 0
      ? Math.min(100, Math.round((totalInvestment / totalCost) * 100))
      : 0;

  const accent = getCategoryAccent(project.category);

  return (
    <Link
      href={`/landing/project/${project.projectId}`}
      className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
    >
      {/* ── Image ── */}
      <div className="relative h-52 overflow-hidden">
        {project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-zinc-100 flex items-center justify-center">
            <Sprout className="w-10 h-10 text-emerald-300" />
          </div>
        )}

        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Category Badge */}
        <div
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${accent.bg} ${accent.border} backdrop-blur-md`}
        >
          <span className={accent.text}>
            <CategoryIcon type={project.category} />
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-widest ${accent.text}`}
          >
            {getCategoryLabel(project.category)}
          </span>
        </div>

        {/* Live Status */}
        <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/50 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-700">
            Open
          </span>
        </div>

        {/* ROI — floating on image bottom */}
        <div className="absolute bottom-3 right-3 flex flex-col items-end">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-600/30">
            <TrendingUp className="w-3 h-3 text-white/80" />
            <span className="text-xs font-bold text-white tracking-tight">
              {project.roi}% ROI
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title + Location */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors duration-300 line-clamp-1 leading-snug">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-zinc-400 mt-1">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="text-[11px] font-medium uppercase tracking-wider truncate">
              {project.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {project.project_details}
        </p>

        {/* Funding Progress */}
        <div className="mb-4 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
              Funding Progress
            </span>
            <span className="text-[11px] font-bold text-emerald-600">
              {fundingPercent}%
            </span>
          </div>
          <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${fundingPercent}%`,
                background: "linear-gradient(90deg, #10b981, #34d399)",
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-zinc-100 mb-4" />

        {/* CTA Button */}
        <button className="w-full py-2.5 px-4 rounded-xl border border-zinc-900 bg-zinc-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300 shadow-md shadow-zinc-900/10 group-hover:shadow-emerald-500/20">
          View Details
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </Link>
  );
}
