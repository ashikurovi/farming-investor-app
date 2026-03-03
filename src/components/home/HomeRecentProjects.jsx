"use client";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  MapPin,
  Calendar,
  Banknote,
  TrendingUp,
  ArrowRight,
  Sprout,
  ShieldCheck,
} from "lucide-react";

export default function HomeRecentProjects({ projects = [] }) {
  // Fallback if projects is undefined or null
  const safeProjects = projects || [];

  // Fallback images for realism
  const fallbackImages = [
    "https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1000&auto=format&fit=crop",
  ];

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Opportunities
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-zinc-900 leading-tight tracking-tight">
              Latest{" "}
              <span className="font-serif italic text-emerald-700">
                investment
              </span>{" "}
              opportunities.
            </h2>

            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl">
              Curated agricultural assets offering stable yields and long-term
              capital appreciation.
            </p>
          </div>

          <Link
            href="/landing/project"
            className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-900 bg-white border border-zinc-200 rounded-full hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {safeProjects.slice(0, 4).map((project, index) => {
            // Calculate pseudo-random funding percentage for demo realism if not provided
            const fundingPercent =
              project.fundingPercent ||
              Math.floor(Math.random() * (95 - 40 + 1) + 40);

            return (
              <div
                key={project.projectId || index}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/20 text-zinc-800 shadow-sm">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {project.location}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-zinc-900 hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  {/* Image Placeholder using Next/Image or img tag */}
                  <img
                    src={
                      project.image ||
                      fallbackImages[index % fallbackImages.length]
                    }
                    alt={project.title}
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
                        {project.code}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-medium text-zinc-400">
                        <ShieldCheck className="w-3 h-3" /> Vetted
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {project.title}
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

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-zinc-200">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        Est. ROI
                      </p>
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-lg font-bold">
                          {project.roi}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        Duration
                      </p>
                      <div className="flex items-center justify-end gap-1.5 text-zinc-900">
                        <Calendar className="w-4 h-4 text-zinc-400" />
                        <span className="text-lg font-bold">
                          {project.duration}
                        </span>
                        <span className="text-xs font-medium text-zinc-400">
                          mo
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed border-zinc-200">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                          Target
                        </p>
                        <p className="text-sm font-bold text-zinc-900">
                          BDT {Number(project.amount || 0).toLocaleString()}
                        </p>
                      </div>
                      <Link
                        href={`/landing/project/${project.projectId}`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-white hover:bg-emerald-600 transition-colors shadow-lg shadow-zinc-900/10"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/landing/project"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
