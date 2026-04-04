"use client";

import { useGetProjectsStatsQuery } from "@/features/admin/projects/projectsApiSlice";
import { useGetRecentInvestmentsQuery } from "@/features/investor/investments/investmentsApiSlice";
import { useState, useRef, useCallback } from "react";
import {
  Wallet,
  Users,
  Sprout,
  TrendingUp,
  Activity,
  ArrowRight,
  FileText,
  Bell,
  Monitor,
  Camera,
  MessageSquare,
  CreditCard,
  Shield,
  Coins,
  LayoutDashboard,
  CircleDollarSign,
  Banknote,
  PiggyBank,
  Briefcase,
} from "lucide-react";
import { formatNumber, formatCurrencyBDT } from "@/lib/utils";

const MODULE_THEMES = {
  blue: {
    bar: "from-blue-500 via-indigo-500 to-blue-600",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    iconRing: "ring-[color:rgba(59,130,246,0.28)]",
    blobA: "rgba(59,130,246,0.18)",
    blobB: "rgba(99,102,241,0.12)",
    value: "text-blue-600 dark:text-blue-400",
  },
  emerald: {
    bar: "from-emerald-500 via-teal-500 to-emerald-600",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    iconRing: "ring-[color:rgba(16,185,129,0.28)]",
    blobA: "rgba(16,185,129,0.18)",
    blobB: "rgba(20,184,166,0.12)",
    value: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    bar: "from-amber-500 via-orange-500 to-amber-600",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    iconRing: "ring-[color:rgba(245,158,11,0.28)]",
    blobA: "rgba(245,158,11,0.18)",
    blobB: "rgba(249,115,22,0.12)",
    value: "text-amber-600 dark:text-amber-400",
  },
  violet: {
    bar: "from-violet-500 via-purple-500 to-violet-600",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    iconRing: "ring-[color:rgba(139,92,246,0.28)]",
    blobA: "rgba(139,92,246,0.18)",
    blobB: "rgba(168,85,247,0.12)",
    value: "text-violet-600 dark:text-violet-400",
  },
  rose: {
    bar: "from-rose-500 via-pink-500 to-rose-600",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-600",
    iconRing: "ring-[color:rgba(244,63,94,0.28)]",
    blobA: "rgba(244,63,94,0.18)",
    blobB: "rgba(236,72,153,0.12)",
    value: "text-rose-600 dark:text-rose-400",
  },
  red: {
    bar: "from-red-500 via-rose-500 to-red-600",
    iconBg: "bg-gradient-to-br from-red-500 to-rose-600",
    iconRing: "ring-[color:rgba(239,68,68,0.28)]",
    blobA: "rgba(239,68,68,0.18)",
    blobB: "rgba(244,63,94,0.12)",
    value: "text-red-600 dark:text-red-400",
  },
  purple: {
    bar: "from-purple-500 via-fuchsia-500 to-purple-600",
    iconBg: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    iconRing: "ring-[color:rgba(168,85,247,0.28)]",
    blobA: "rgba(168,85,247,0.18)",
    blobB: "rgba(217,70,239,0.12)",
    value: "text-purple-600 dark:text-purple-400",
  },
  pink: {
    bar: "from-pink-500 via-rose-500 to-pink-600",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    iconRing: "ring-[color:rgba(236,72,153,0.28)]",
    blobA: "rgba(236,72,153,0.18)",
    blobB: "rgba(244,63,94,0.12)",
    value: "text-pink-600 dark:text-pink-400",
  },
  indigo: {
    bar: "from-indigo-500 via-blue-500 to-indigo-600",
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
    iconRing: "ring-[color:rgba(99,102,241,0.28)]",
    blobA: "rgba(99,102,241,0.18)",
    blobB: "rgba(59,130,246,0.12)",
    value: "text-indigo-600 dark:text-indigo-400",
  },
  orange: {
    bar: "from-orange-500 via-amber-500 to-orange-600",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-600",
    iconRing: "ring-[color:rgba(249,115,22,0.28)]",
    blobA: "rgba(249,115,22,0.18)",
    blobB: "rgba(245,158,11,0.12)",
    value: "text-orange-600 dark:text-orange-400",
  },
};

/* ── Premium SVG Chart with Tooltip ── */
function InvestmentChart({ items, loading }) {
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const W = 600;
  const H = 200;
  const P = { top: 20, right: 20, bottom: 28, left: 20 };
  const innerW = W - P.left - P.right;
  const innerH = H - P.top - P.bottom;

  const values = items.map((i) => Number(i.amount || 0));
  const max = Math.max(1, ...values);
  const min = Math.min(...values);
  const len = values.length;

  const getX = (idx) =>
    len === 1 ? P.left + innerW / 2 : P.left + (idx / (len - 1)) * innerW;
  const getY = (v) =>
    P.top + innerH - ((v - min) / (max - min || 1)) * innerH * 0.85 - innerH * 0.075;

  const points = values.map((v, idx) => [getX(idx), getY(v)]);

  // Smooth bezier curve
  const buildPath = (pts) => {
    if (pts.length < 2) return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x0, y0] = pts[i];
      const [x1, y1] = pts[i + 1];
      const cpx = (x0 + x1) / 2;
      d += ` C${cpx},${y0} ${cpx},${y1} ${x1},${y1}`;
    }
    return d;
  };

  const linePath = buildPath(points);
  const areaPath =
    `M${P.left},${P.top + innerH} ` +
    linePath.replace(/^M[\d.]+,[\d.]+/, `L${points[0]?.[0]},${points[0]?.[1]}`) +
    ` L${points[points.length - 1]?.[0]},${P.top + innerH} Z`;

  const handleMouseMove = useCallback(
    (e) => {
      if (!svgRef.current || !items.length) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = W / rect.width;
      const mx = (e.clientX - rect.left) * scaleX;

      // Find closest point
      let closest = 0;
      let minDist = Infinity;
      points.forEach(([x], i) => {
        const d = Math.abs(x - mx);
        if (d < minDist) { minDist = d; closest = i; }
      });

      const item = items[closest];
      const [cx, cy] = points[closest];
      // tooltip position in % of SVG
      const tx = (cx / W) * 100;
      const ty = (cy / H) * 100;

      setTooltip({
        index: closest,
        x: tx,
        y: ty,
        svgX: cx,
        svgY: cy,
        amount: values[closest],
        name: item.investorName ?? `Investor #${item.investorId ?? closest + 1}`,
        date: item.date ?? "",
        time: item.time ?? "",
      });
    },
    [points, items, values]
  );

  const handleMouseLeave = () => setTooltip(null);

  if (loading || !items.length) {
    return (
      <div className="flex h-52 items-center justify-center text-xs text-zinc-400 dark:text-zinc-500">
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4d8c1e] border-t-transparent" />
            <span>Loading activity…</span>
          </div>
        ) : (
          "No data available"
        )}
      </div>
    );
  }

  // Y-axis grid labels
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((g) => ({
    y: P.top + innerH - g * innerH * 0.85 - innerH * 0.075,
    value: min + (max - min) * g,
  }));

  return (
    <div className="relative w-full select-none" style={{ touchAction: "none" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-52 w-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7cc22e" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#4d8c1e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#4d8c1e" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4d8c1e" />
            <stop offset="50%" stopColor="#7cc22e" />
            <stop offset="100%" stopColor="#4d8c1e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {gridLines.map(({ y, value }, i) => (
          <g key={i}>
            <line
              x1={P.left}
              x2={P.left + innerW}
              y1={y}
              y2={y}
              stroke={i === 0 ? "rgba(77,140,30,0.15)" : "rgba(0,0,0,0.055)"}
              strokeDasharray={i === 0 ? "0" : "3 5"}
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Vertical hover line */}
        {tooltip && (
          <line
            x1={tooltip.svgX}
            x2={tooltip.svgX}
            y1={P.top}
            y2={P.top + innerH}
            stroke="#4d8c1e"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.5"
          />
        )}

        {/* Area fill */}
        <path d={areaPath} fill="url(#chartGrad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Data points */}
        {points.map(([x, y], i) => {
          const isHovered = tooltip?.index === i;
          return (
            <g key={i}>
              {isHovered && (
                <circle cx={x} cy={y} r="10" fill="#7cc22e" opacity="0.15" />
              )}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 5 : 3.5}
                fill={isHovered ? "#fff" : "#7cc22e"}
                stroke={isHovered ? "#4d8c1e" : "#fff"}
                strokeWidth={isHovered ? 2 : 1.5}
                filter={isHovered ? "url(#dotGlow)" : undefined}
                style={{ transition: "r 0.15s ease" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip — positioned absolutely over SVG */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-30"
          style={{
            left: `${tooltip.x}%`,
            top: `${tooltip.y}%`,
            transform:
              tooltip.x > 75
                ? "translate(-110%, -115%)"
                : tooltip.x < 20
                ? "translate(8%, -115%)"
                : "translate(-50%, -115%)",
          }}
        >
          <div className="min-w-[148px] rounded-2xl border border-[#7cc22e]/20 bg-white/95 px-3.5 py-2.5 shadow-[0_8px_32px_-6px_rgba(77,140,30,0.25),0_2px_8px_-2px_rgba(0,0,0,0.08)] backdrop-blur-md dark:bg-zinc-900/95 dark:border-[#7cc22e]/30 dark:shadow-[0_8px_32px_-6px_rgba(124,194,46,0.2)]">
            {/* Arrow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-[7px] h-3 w-3 rotate-45 rounded-br-sm border-b border-r border-[#7cc22e]/20 bg-white dark:bg-zinc-900 dark:border-[#7cc22e]/30"
              style={
                tooltip.x > 75
                  ? { left: "auto", right: "16px", transform: "none" }
                  : tooltip.x < 20
                  ? { left: "16px", transform: "none" }
                  : {}
              }
            />
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#7cc22e] to-[#4d8c1e] shadow-sm" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Investment
              </span>
            </div>
            <div className="text-base font-black text-[#4d8c1e] dark:text-[#7cc22e] leading-none tabular-nums">
              {formatCurrencyBDT(tooltip.amount)}
            </div>
            {tooltip.name && (
              <div className="mt-1.5 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 truncate max-w-[140px]">
                {tooltip.name}
              </div>
            )}
            {(tooltip.date || tooltip.time) && (
              <div className="mt-0.5 text-[10px] text-zinc-400 dark:text-zinc-500">
                {[tooltip.date, tooltip.time].filter(Boolean).join(" · ")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data: stats, isLoading: statsLoading } = useGetProjectsStatsQuery();
  const { data: recent, isLoading: recentLoading } =
    useGetRecentInvestmentsQuery({ limit: 5 });

  const statCards = [
    {
      label: "Investor capital",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.investorTotalInvestment),
      change: "",
      icon: PiggyBank,
      tone: "emerald",
    },
    {
      label: "Partner capital",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.partnerTotalInvestment),
      change: "",
      icon: Briefcase,
      tone: "violet",
    },
    {
      label: "Total projects",
      value: statsLoading ? "—" : formatNumber(stats?.totalProjects),
      change: "",
      icon: Sprout,
      tone: "indigo",
    },
    {
      label: "Active investors",
      value: statsLoading ? "—" : formatNumber(stats?.activeInvestors),
      change: "",
      icon: Users,
      tone: "blue",
    },
    {
      label: "Project Collect Investment",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalInvestment),
      change: "",
      icon: Wallet,
      tone: "emerald",
    },
    {
      label: "Total sell",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalSell),
      change: "",
      icon: Banknote,
      tone: "blue",
    },
    {
      label: "Total cost",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalCost),
      change: "",
      icon: CircleDollarSign,
      tone: "amber",
    },
    {
      label: "Total profit",
      value: statsLoading ? "—" : formatCurrencyBDT(stats?.totalProfit),
      change: "",
      icon: Activity,
      tone: "orange",
    },
  ];

  const moduleCounters = [
    { label: "Accounts", count: stats?.moduleCounts?.users ?? 0, icon: Users, tone: "blue" },
    { label: "Investments", count: stats?.moduleCounts?.investments ?? 0, icon: TrendingUp, tone: "emerald" },
    { label: "Agreements", count: stats?.moduleCounts?.deeds ?? 0, icon: FileText, tone: "amber" },
    { label: "Partner Payouts", count: stats?.moduleCounts?.partnerPayouts ?? 0, icon: CreditCard, tone: "violet" },
    { label: "Inquiries", count: stats?.moduleCounts?.contacts ?? 0, icon: MessageSquare, tone: "rose" },
    { label: "Notices", count: stats?.moduleCounts?.notices ?? 0, icon: Bell, tone: "red" },
    { label: "Banners", count: stats?.moduleCounts?.banners ?? 0, icon: Monitor, tone: "purple" },
    { label: "Gallery", count: stats?.moduleCounts?.glarry ?? 0, icon: Camera, tone: "pink" },
    { label: "Investor Types", count: stats?.moduleCounts?.investorTypes ?? 0, icon: Shield, tone: "indigo" },
    { label: "Tier Packages", count: stats?.moduleCounts?.investAmounts ?? 0, icon: Coins, tone: "orange" },
  ];

  const chartItems = (recent ?? []).slice(0, 12).reverse();
  const weeklyTotal = chartItems.reduce((s, r) => s + Number(r.amount || 0), 0);

  return (
    <div className="space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <CircleDollarSign className="w-5 h-5 text-emerald-500" /> Financial &
          Sales Overview
        </h2>
      </div>

      {/* Stat Cards */}
      <section className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {statCards.map((card, index) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {(() => {
              const t = MODULE_THEMES[card.tone] ?? MODULE_THEMES.emerald;
              return (
                <>
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${t.bar}`} />
                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" style={{ background: t.blobA }} />
                  <div className="absolute -left-10 -bottom-10 h-28 w-28 rounded-full blur-3xl transition-all duration-700 group-hover:scale-150" style={{ background: t.blobB }} />
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`relative flex h-11 w-11 items-center justify-center rounded-2xl text-white ring-1 ${t.iconRing} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg ${t.iconBg}`}>
                        <card.icon className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-12" />
                      </div>
                      {card.change ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-zinc-600 bg-zinc-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-zinc-100 shadow-sm dark:text-zinc-300 dark:bg-zinc-800/40 dark:border-zinc-700">
                          <TrendingUp className="h-3 w-3" />
                          {card.change}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-col lg:items-end lg:text-right space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">{card.label}</p>
                      <h3 className={`text-2xl font-black tracking-tight transition-transform duration-300 origin-left group-hover:scale-105 lg:text-3xl lg:origin-right ${t.value}`}>
                        {card.value}
                      </h3>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        ))}
      </section>

      {/* Module Counts */}
      <section className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-zinc-50 p-2.5 text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">System Overview</h2>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Total counts across all platform modules</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {moduleCounters.map((item, i) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              style={{ animationDelay: `${50 * i}ms` }}
            >
              {(() => {
                const t = MODULE_THEMES[item.tone] ?? MODULE_THEMES.blue;
                return (
                  <>
                    <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: `linear-gradient(180deg, ${t.blobA}, ${t.blobB})` }} />
                    <div className="relative z-10 flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${t.iconRing}`} style={{ background: t.blobA }}>
                        <item.icon className={`h-5 w-5 ${t.value}`} />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-lg font-black leading-none ${t.value}`}>{statsLoading ? "—" : formatNumber(item.count)}</div>
                        <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate">{item.label}</div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Panels */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">

        {/* ── Premium Investment Activity Chart ── */}
        <div className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-emerald-100/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800/50">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[color:rgba(124,194,46,0.18)] p-2.5 text-[color:rgb(77,140,30)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-[color:rgba(124,194,46,0.18)] dark:text-[color:rgb(124,194,46)]">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Investment Activity</h2>
                <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">Real-time updates</p>
              </div>
            </div>
            <span className="rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
              Weekly
            </span>
          </div>

          {/* Chart container */}
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-[color:rgba(77,140,30,0.22)] bg-gradient-to-br from-[color:rgba(124,194,46,0.07)] via-white to-[color:rgba(77,140,30,0.04)] transition-colors duration-300 group-hover:border-[color:rgba(77,140,30,0.35)] dark:border-[color:rgba(124,194,46,0.18)] dark:from-[color:rgba(124,194,46,0.07)] dark:via-zinc-900 dark:to-[color:rgba(77,140,30,0.03)]">

            {/* Chart header row */}
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#7cc22e] shadow-[0_0_6px_rgba(124,194,46,0.6)]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Weekly Investments
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)] tabular-nums">
                  {recentLoading ? "—" : formatCurrencyBDT(weeklyTotal)}
                </span>
                {!recentLoading && chartItems.length >= 2 && (() => {
                  const last = Number(chartItems[chartItems.length - 1]?.amount || 0);
                  const prev = Number(chartItems[chartItems.length - 2]?.amount || 0);
                  const pct = prev > 0 ? (((last - prev) / prev) * 100).toFixed(1) : null;
                  if (!pct) return null;
                  const up = last >= prev;
                  return (
                    <span className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9px] font-bold ${up ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400"}`}>
                      {up ? "▲" : "▼"} {Math.abs(pct)}%
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* SVG Chart */}
            <div className="px-2 pb-3">
              <InvestmentChart items={chartItems} loading={recentLoading} />
            </div>

            {/* X-axis labels */}
            {!recentLoading && chartItems.length > 0 && (
              <div className="flex justify-between px-4 pb-2.5 -mt-1">
                {chartItems.map((item, i) => (
                  (i === 0 || i === Math.floor(chartItems.length / 2) || i === chartItems.length - 1) ? (
                    <span key={i} className="text-[9px] font-semibold text-zinc-300 dark:text-zinc-600 tabular-nums">
                      {item.date ?? `#${i + 1}`}
                    </span>
                  ) : <span key={i} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Investments Panel */}
        <div className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-100/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800/50">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-2.5 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:bg-blue-900/30 dark:text-blue-400">
                <Wallet className="h-5 w-5" />
              </div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Recent Investments</h2>
            </div>
            <button className="group/btn flex items-center gap-1.5 text-xs font-bold text-zinc-400 transition-colors hover:text-blue-600 dark:text-zinc-500 dark:hover:text-blue-400">
              View All
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>

          <div className="space-y-3">
            {recentLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between rounded-2xl border border-zinc-50 p-3 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                      <div className="space-y-2">
                        <div className="h-3 w-24 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                        <div className="h-2 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                      </div>
                    </div>
                    <div className="h-4 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                  </div>
                ))}
              </>
            ) : (recent ?? []).length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-zinc-50 p-4 text-zinc-300 mb-3 dark:bg-zinc-800 dark:text-zinc-600">
                  <Wallet className="h-8 w-8" />
                </div>
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">No recent investments found</p>
              </div>
            ) : (
              recent.map((item) => {
                const name = item.investorName ?? `Investor #${item.investorId}`;
                const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
                return (
                  <div
                    key={item.id}
                    className="group/item flex cursor-pointer items-center justify-between rounded-2xl border border-transparent bg-zinc-50/50 p-3 transition-all duration-300 hover:border-zinc-100 hover:bg-white hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:scale-[1.02] dark:bg-zinc-800/50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white to-zinc-100 text-xs font-black text-zinc-700 shadow-sm ring-1 ring-zinc-100 transition-all duration-300 group-hover/item:from-blue-50 group-hover/item:to-blue-100 group-hover/item:text-blue-700 group-hover/item:ring-blue-200 group-hover/item:scale-110 dark:from-zinc-700 dark:to-zinc-800 dark:text-zinc-300 dark:ring-zinc-700">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-700 transition-colors group-hover/item:text-zinc-900 dark:text-zinc-300 dark:group-hover/item:text-zinc-100">{name}</p>
                        <p className="text-[10px] font-medium text-zinc-400 group-hover/item:text-zinc-500 dark:text-zinc-500 dark:group-hover/item:text-zinc-400">
                          {item.date ?? ""} • {item.time ?? ""}
                        </p>
                      </div>
                    </div>
                    <p className="font-mono text-sm font-bold text-zinc-700 transition-colors group-hover/item:text-emerald-600 dark:text-zinc-300 dark:group-hover/item:text-emerald-400">
                      {formatCurrencyBDT(item.amount)}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}