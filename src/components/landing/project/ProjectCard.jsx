"use client";

import { MapPin, Clock, TrendingUp, ArrowRight, Sprout, Tractor, Layers } from "lucide-react";
import Link from "next/link";

const CategoryIcon = ({ type }) => {
  switch (type) {
    case "CF": // Cattle
    case "PF": // Poultry
      return <Tractor className="w-4 h-4" />;
    case "CV": // Crops
    case "OH": // Onion
      return <Sprout className="w-4 h-4" />;
    default:
      return <Layers className="w-4 h-4" />;
  }
};

const getCategoryLabel = (type) => {
  const map = {
    "CF": "Livestock",
    "PF": "Poultry",
    "CV": "Crops",
    "OH": "Vegetables",
    "Others": "Specialty"
  };
  return map[type] || type;
};

const stablePercentFromSeed = (seed, min = 40, max = 95) => {
  const str = String(seed ?? "");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  const range = Math.max(1, max - min + 1);
  return min + (hash % range);
};

export function ProjectCard({ project }) {
  const fundingPercent = stablePercentFromSeed(project?.projectId, 40, 95);
  
  return (
    <Link href={`/landing/project/${project.projectId}`} className="group relative bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full block">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {project.images?.[0] ? (
          <img 
            src={`/images/${project.images[0]}`} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "https://images.pexels.com/photos/2132257/pexels-photo-2132257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Fallback image
            }}
          />
        ) : (
          <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400">
            <Sprout className="w-12 h-12" />
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-100 shadow-sm">
          <span className="text-emerald-600">
            <CategoryIcon type={project.category} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-800">
            {getCategoryLabel(project.category)}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4 inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-100 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Open</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 text-zinc-500 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs font-medium uppercase tracking-wide truncate max-w-[200px]">{project.location}</span>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Target ROI</div>
             <div className="text-lg font-bold text-emerald-600">{project.roi}%</div>
          </div>
        </div>

        <p className="text-sm text-zinc-600 line-clamp-2 mb-6 leading-relaxed flex-grow">
          {project.project_details}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-zinc-100 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Duration</span>
            </div>
            <div className="text-sm font-semibold text-zinc-800">{project.duration} Months</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Min. Invest</span>
            </div>
            <div className="text-sm font-semibold text-zinc-800">BDT {Number(project.amount).toLocaleString()}</div>
          </div>
        </div>

        {/* Funding Progress */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-zinc-500">Funded</span>
            <span className="text-emerald-700">{fundingPercent}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${fundingPercent}%` }}
            />
          </div>
        </div>

        <button className="w-full py-3.5 rounded-xl bg-zinc-900 text-white font-medium flex items-center justify-center gap-2 group-hover:bg-emerald-600 transition-all shadow-lg shadow-zinc-900/10 group-hover:shadow-emerald-600/20">
          View Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </Link>
  );
}
