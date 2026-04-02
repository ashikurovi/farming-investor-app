"use client";

import {
  ArrowLeft,
  MapPin,
  Info,
  Share2,
  Heart,
  Facebook,
  MessageCircle,
  TrendingUp,
  CircleDollarSign,
  ShoppingCart,
  Wallet,
  BadgeDollarSign,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export function ProjectDetails({ project, similarProjects = [] }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target)
      ) {
        setIsShareMenuOpen(false);
      }
    };
    if (isShareMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShareMenuOpen]);

  const handleShare = (platform) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Check out this project: ${project.name}`;
    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (platform === "messenger") {
      window.location.href = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
      setTimeout(() => {
        window.open(
          `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(url)}`,
          "_blank",
        );
      }, 500);
    } else if (platform === "native" && navigator.share) {
      navigator.share({ title: project.name, text, url }).catch(console.error);
    }
    setIsShareMenuOpen(false);
  };

  const descriptionParagraphs = (
    typeof project?.description === "string" ? project.description : ""
  )
    .split(/\r?\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const totalInvestment = Number(project.totalInvestment || 0);
  const totalCost = Number(project.totalCost || 0);
  const totalSell = Number(project.totalSell || 0);
  const totalProfit = Number(project.totalProfit || 0);
  const distributed = Number(project.distributedProfit || 0);

  const fundedPct =
    totalCost > 0
      ? Math.min(100, Math.round((totalInvestment / totalCost) * 100))
      : 0;
  const roi = totalCost > 0 ? Math.round((totalProfit / totalCost) * 100) : 0;
  const remaining = Math.max(0, totalCost - totalInvestment);

  const fmt = (n) => `৳${Number(n).toLocaleString("en-US")}`;

  const statCards = [
    {
      label: "Total Cost",
      value: fmt(totalCost),
      Icon: BadgeDollarSign,
      color: "text-zinc-700",
      bg: "bg-zinc-100",
    },
    {
      label: "Total Sell",
      value: fmt(totalSell),
      Icon: ShoppingCart,
      color: "text-sky-700",
      bg: "bg-sky-50",
    },
    {
      label: "Total Profit",
      value: fmt(totalProfit),
      Icon: TrendingUp,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      label: "Distributed Profit",
      value: fmt(distributed),
      Icon: Wallet,
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      {/* ── Hero ── */}
      <div className="relative h-[50vh] min-h-[350px] w-full bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src={
              project.photoUrl ||
              "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920"
            }
            alt={project.name}
            className="w-full h-full object-cover opacity-60"
            onError={(e) => {
              e.target.src =
                "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <div className="absolute top-6 left-0 right-0 z-40">
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

        {/* Title + actions */}
        <div className="absolute bottom-0 left-0 right-0 z-40 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  {project.name}
                </h1>
                <div className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  {project.location}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                    isLiked
                      ? "bg-red-500/20 border-red-500/50 text-red-400"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </button>

                <div className="relative" ref={shareMenuRef}>
                  <button
                    onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                    className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>

                  {isShareMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-zinc-100 py-2 z-[100] animate-in fade-in zoom-in duration-200 origin-top-right">
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                          <Facebook className="w-4 h-4" />
                        </div>
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare("messenger")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          <MessageCircle className="w-4 h-4" />
                        </div>
                        Messenger
                      </button>
                      {typeof navigator !== "undefined" && navigator.share && (
                        <button
                          onClick={() => handleShare("native")}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 border-t border-zinc-100 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600">
                            <Share2 className="w-4 h-4" />
                          </div>
                          More Options
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-8 relative z-30">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Investment Received banner */}
          <div className="bg-emerald-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-900/10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-110" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-emerald-100 text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <CircleDollarSign className="w-4 h-4" />
                  Investment Received
                </span>
                <div className="text-2xl md:text-3xl font-black tracking-tight">
                  BDT {totalInvestment.toLocaleString("en-US")}
                </div>
                <p className="text-emerald-100/80 text-xs sm:text-sm font-medium">
                  Total funding committed by investors to this project
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 w-full md:w-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">Growth</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80 flex items-center justify-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Steady Returns
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statCards.map(({ label, value, Icon, color, bg }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-zinc-100 p-4 flex flex-col gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${bg}`}
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-0.5">
                    {label}
                  </p>
                  <p className={`text-[14px] font-bold ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Funding progress */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-[15px] font-bold text-zinc-900">
                Funding Progress
              </h3>
            </div>
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-[11px] text-zinc-400 mb-0.5 uppercase tracking-widest font-semibold">
                  Raised
                </p>
                <p className="text-xl font-bold text-zinc-900">
                  {fmt(totalInvestment)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-emerald-600">
                  {fundedPct}%
                </p>
                <p className="text-[11px] text-zinc-400">of {fmt(totalCost)}</p>
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-zinc-100 overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                style={{ width: `${fundedPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-zinc-400">
                ROI:{" "}
                <span className="text-emerald-600 font-semibold">{roi}%</span>
              </span>
              <span className="text-zinc-400">
                Remaining:{" "}
                <span className="font-semibold text-zinc-700">
                  {fmt(remaining)}
                </span>
              </span>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-600" />
              Project Details
            </h3>
            <div className="prose prose-zinc max-w-none">
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-zinc-600 leading-relaxed mb-4 text-base"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-zinc-400 text-sm">
                  No description available.
                </p>
              )}
            </div>
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.glarry && project.glarry.length > 0 ? (
                project.glarry.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-video rounded-xl bg-zinc-100 relative overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={img?.photoUrl || img}
                      alt={`${project.name} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))
              ) : (
                <div className="col-span-2 aspect-video rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <span className="text-sm">
                    No additional images available
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Similar Projects */}
          {similarProjects.length > 0 && (
            <div className="pt-8 border-t border-zinc-200">
              <h3 className="text-2xl font-bold text-zinc-900 mb-6">
                Similar Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {similarProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/landing/project/${p.id}`}
                    className="group block bg-white rounded-2xl p-4 border border-zinc-200 hover:border-emerald-500/50 transition-all hover:shadow-lg"
                  >
                    <div className="aspect-video rounded-xl bg-zinc-100 mb-4 overflow-hidden relative">
                      <img
                        src={p.photoUrl || ""}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920";
                        }}
                      />
                    </div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                      {p.name}
                    </h4>
                    <div className="mt-2">
                      <span className="text-emerald-600 font-semibold text-sm">
                        View Details
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
