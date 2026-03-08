import { Card } from "@/components/ui/card";
import { useMemo } from "react";
  import {
  Banknote,
  TrendingUp,
  Wallet,
  Receipt,
  Users,
  MapPin,
  Calendar,
  Tag,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { formatCurrencyBDT, formatDateUTC } from "@/lib/utils";

export function AdminProjectInfoTab({ project, isBusy, isError }) {
  const cleanUrl = (u) => (typeof u === "string" ? u.replace(/`/g, "").trim() : u);
  const projectImageUrl = useMemo(() => cleanUrl(project?.photoUrl ?? project?.image), [project]);
  const name = project?.name || project?.title || "Untitled project";
  const location = project?.location;
  const description = project?.description || "No description provided.";

  

  if (isBusy) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-zinc-100" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 text-red-600">
        Failed to load project information.
      </div>
    );
  }

  if (!project) return null;

  // Calculate ROI for display
  const investment = Number(project.totalInvestment || 0);
  const profit = Number(project.totalProfit || 0);
  const cost = Number(project.totalCost || 0);
  const sell = Number(project.totalSell || 0);

  const roi = investment > 0 ? ((profit / investment) * 100).toFixed(1) : "0.0";
  const costPercentage = investment > 0 ? ((cost / investment) * 100).toFixed(1) : "0.0";
  const sellPercentage = investment > 0 ? ((sell / investment) * 100).toFixed(1) : "0.0";
  
  const isProfitPositive = profit >= 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Investment */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Investment</p>
              <p className="mt-2 text-2xl font-bold text-zinc-900">{formatCurrencyBDT(investment, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
              <div className="h-full bg-zinc-900 w-full rounded-full" />
            </div>
             <span className="text-[10px] font-medium text-zinc-500">100% Funded</span>
          </div>
        </div>

        {/* Total Cost */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Cost</p>
              <p className="mt-2 text-2xl font-bold text-zinc-900">{formatCurrencyBDT(cost, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <Receipt className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
             <span className="text-[10px] text-zinc-500">Operating expenses</span>
             <span className="text-[10px] font-medium text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md">{costPercentage}%</span>
          </div>
        </div>

        {/* Total Sell */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-zinc-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Total Sell</p>
              <p className="mt-2 text-2xl font-bold text-zinc-900">{formatCurrencyBDT(sell, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
           <div className="mt-4 flex items-center gap-2">
             <span className="text-[10px] text-zinc-500">Revenue generated</span>
             <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">{sellPercentage}%</span>
          </div>
        </div>

        {/* Total Profit */}
        <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 shadow-sm transition-all hover:shadow-md hover:border-emerald-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-600">Net Profit</p>
              <p className={`mt-2 text-2xl font-bold ${isProfitPositive ? "text-emerald-700" : "text-rose-600"}`}>
                {isProfitPositive ? "+" : ""}{formatCurrencyBDT(project.totalProfit, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isProfitPositive ? "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" : "bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"}`}>
              <Banknote className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5">
            {isProfitPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-rose-600" />
            )}
            <span className={`text-xs font-semibold ${isProfitPositive ? "text-emerald-600" : "text-rose-600"}`}>
              {roi}% ROI
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Image & Description */}
        <div className="lg:col-span-2 space-y-8">
          {projectImageUrl && (
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src={projectImageUrl} 
                  alt={name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-2xl font-bold drop-shadow-sm">{name}</h2>
                {location && (
                  <div className="mt-2 flex items-center gap-2 text-zinc-100">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {!projectImageUrl && (
             <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-zinc-100 rounded-lg">
                        <Tag className="h-5 w-5 text-zinc-500"/>
                    </div>
                    <h2 className="text-xl font-bold text-zinc-900">{name}</h2>
                </div>
                {location && (
                  <div className="flex items-center gap-2 text-zinc-500 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{location}</span>
                  </div>
                )}
             </div>
          )}

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-900">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Project Description
            </h3>
            <div className="mt-6 prose prose-zinc max-w-none text-sm leading-relaxed text-zinc-600">
              {description.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Additional Stats & Info */}
        <div className="space-y-6">
          {/* Distributed Profit Card - Highlighted */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6">
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-emerald-900">Distributed Profit</h3>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-emerald-700 tracking-tight">{formatCurrencyBDT(project.distributedProfit, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                <p className="mt-1 text-xs font-medium text-emerald-600/80">Total distributed to investors</p>
              </div>
            </div>
            {/* Decorative bg pattern */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl" />
          </div>

          {/* Project Details List */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-zinc-900 mb-6">Details</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Location</span>
                </div>
                <span className="text-sm font-semibold text-zinc-900">{location || "N/A"}</span>
              </div>
              <div className="h-px bg-zinc-100" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Start Date</span>
                </div>
                <span className="text-sm font-semibold text-zinc-900">
                  {project.startDate ? formatDateUTC(project.startDate) : "N/A"}
                </span>
              </div>
              <div className="h-px bg-zinc-100" />
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3 text-zinc-500">
                  <Tag className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Status</span>
                </div>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    project.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 
                    project.status === 'closed' ? 'bg-zinc-100 text-zinc-700' : 
                    'bg-amber-50 text-amber-700'
                }`}>
                  {project.status || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
