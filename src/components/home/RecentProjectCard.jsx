"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  ArrowRight,
  Sprout,
} from "lucide-react";

const fallbackImages = [
  "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2132257/pexels-photo-2132257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export default function RecentProjectCard({ project, index }) {
  const cleanUrl = (u) => (typeof u === "string" ? u.replace(/[`]/g, "").trim() : u);
  const totalCost = Number(project.totalCost || 0);
  const totalInvestment = Number(project.totalInvestment || 0);
  
  // Calculate funding percent based on API data
  const fundingPercent = totalCost > 0 
    ? Math.min(100, Math.round((totalInvestment / totalCost) * 100)) 
    : 0;
    
  const title = project.name || "Untitled Project";
  const location = project.location || "Bangladesh";
  const amount = totalCost; // Target amount is usually total cost
  
  const image =
    cleanUrl(project.photoUrl) || fallbackImages[index % fallbackImages.length];

  return (
    <div
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-zinc-800 shadow-sm">
          <MapPin className="w-3 h-3 text-emerald-600" />
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {location}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-zinc-900 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        {/* Image Placeholder using Next/Image or img tag */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

        {/* Category Tag on bottom left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
            <Sprout className="w-3 h-3" />
            Agricultural
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              INV-{project.id}
            </span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>
        </div>

        {/* Funding Progress */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-[11px] font-medium">
            <span className="text-zinc-500">
              Funded{" "}
              <span className="text-zinc-900">{fundingPercent}%</span>
            </span>
            <span className="text-emerald-600">
              {100 - fundingPercent}% Available
            </span>
          </div>
          <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out group-hover:bg-emerald-400"
              style={{ width: `${fundingPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-dashed border-zinc-200">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                Target
              </p>
              <p className="text-sm font-bold text-zinc-900">
                BDT {amount.toLocaleString()}
              </p>
            </div>
            <Link
              href={`/landing/project/${project.id}`}
              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-zinc-900/10"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
