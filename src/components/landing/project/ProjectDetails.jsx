"use client";

import { ArrowLeft, MapPin, CheckCircle, Info, Share2, Heart, ShieldCheck, Sprout } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
export function ProjectDetails({ project, similarProjects = [] }) {
  const [isLiked, setIsLiked] = useState(false);

  const formatCurrency = (val) =>
    `BDT ${Number(val || 0).toLocaleString("en-US")}`;

  const descriptionParagraphs = (typeof project?.project_details === "string"
    ? project.project_details
    : "")
    .split(/\r?\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const fundingPercent = useMemo(() => {
    const total = Number(project?.totalCost || 0);
    const invested = Number(project?.totalInvestment || 0);
    if (total > 0) {
      const pct = Math.round((invested / total) * 100);
      return Math.max(0, Math.min(100, pct));
    }
    const idStr = String(project?.projectId ?? "");
    const hash = idStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 55) + 40;
  }, [project.totalCost, project.totalInvestment, project.projectId]);

  const resolveImageSrc = (img) => {
    if (!img) return null;
    const s = String(img).trim();
    if (s.startsWith("http") || s.startsWith("/")) return s;
    return `/images/${s}`;
  };

  const heroSrc =
    resolveImageSrc(project?.images?.[0]) ||
    "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920";

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      <div className="relative h-[50vh] min-h-[400px] w-full bg-zinc-900">
        <div className="absolute inset-0">
          <img 
            src={heroSrc} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.target.src = "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>
        
        <div className="absolute top-6 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Link 
              href="/landing/project" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-900/20">
                  <Sprout className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold uppercase tracking-widest">{project.category} Project</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  {project.title}
                </h1>
                <div className="flex items-center gap-6 text-zinc-300 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Code: {project.code}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-md border transition-all ${isLiked ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Investment Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.investment_highlight?.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700 leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
              <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-emerald-600" />
                Project Details
              </h3>
              <div className="prose prose-zinc max-w-none">
                {descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-zinc-600 leading-relaxed mb-4 text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
              <h3 className="text-lg font-bold text-zinc-900 mb-6">Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                 {project.images && project.images.length > 0 ? (
                   project.images.map((img, idx) => (
                     <div key={idx} className="aspect-video rounded-xl bg-zinc-100 relative overflow-hidden group cursor-pointer">
                       <img 
                          src={resolveImageSrc(img) || "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920"} 
                          alt={`${project.title} ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.src = "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920";
                          }}
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                     </div>
                   ))
                 ) : (
                    <div className="col-span-2 aspect-video rounded-xl bg-zinc-100 relative overflow-hidden flex items-center justify-center text-zinc-400">
                        <span className="text-sm">No additional images available</span>
                    </div>
                 )}
              </div>
            </div>

            {similarProjects.length > 0 && (
              <div className="pt-8 border-t border-zinc-200">
                <h3 className="text-2xl font-bold text-zinc-900 mb-6">Similar Projects</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {similarProjects.map((p) => (
                    <Link key={p.projectId} href={`/landing/project/${p.projectId}`} className="group block bg-white rounded-2xl p-4 border border-zinc-200 hover:border-emerald-500/50 transition-all hover:shadow-lg">
                      <div className="aspect-video rounded-xl bg-zinc-100 mb-4 overflow-hidden relative">
                         <img 
                            src={resolveImageSrc(p.images?.[0]) || "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920"}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.target.src = "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920";
                            }}
                         />
                      </div>
                      <h4 className="font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{p.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                        <span className="text-emerald-600 font-semibold">{p.roi}% ROI</span>
                        <span>{p.duration} Months</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-500">Projected ROI</span>
                    <span className="text-2xl font-bold text-emerald-600">{project.roi}%</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="text-sm font-medium text-zinc-500">Duration</span>
                    <span className="text-lg font-semibold text-zinc-900">{project.duration} Months</span>
                  </div>

                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-zinc-600">
                        <span className="font-bold text-zinc-900">{fundingPercent}%</span> Funded
                      </span>
                      <span className="text-zinc-400">Target: {formatCurrency(project.totalCost)}</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${fundingPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium text-zinc-500">
                      <span>Raised: {formatCurrency(project.totalInvestment)}</span>
                      <span>Min: {formatCurrency(project.amount)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {project.riskLevel != null && (
                      <div className="flex justify-between items-center py-3 border-b border-zinc-100">
                        <span className="text-sm text-zinc-500">Risk Level</span>
                        <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-bold uppercase">
                          {String(project.riskLevel)}
                        </span>
                      </div>
                    )}
                    {project.payout != null && (
                      <div className="flex justify-between items-center py-3 border-b border-zinc-100">
                        <span className="text-sm text-zinc-500">Payout</span>
                        <span className="text-sm font-medium text-zinc-900">{String(project.payout)}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-8 py-4 rounded-xl bg-zinc-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-lg shadow-zinc-900/10 hover:shadow-emerald-600/20 transform active:scale-[0.98]">
                    Invest Now
                  </button>
                  
                  <p className="text-center text-xs text-zinc-400 mt-4 leading-relaxed">
                    By investing, you agree to our Terms of Service. Your capital is at risk.
                  </p>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-emerald-900 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -mb-10 -mr-10"></div>
                <h4 className="font-bold text-lg mb-2 relative z-10">Need help deciding?</h4>
                <p className="text-emerald-200/80 text-sm mb-6 relative z-10">
                  Our investment advisors are available to answer your questions.
                </p>
                <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium text-sm transition-all relative z-10 backdrop-blur-sm">
                  Contact Advisor
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
