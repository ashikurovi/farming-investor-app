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
  ArrowDownRight,
  Printer,
  Download
} from "lucide-react";
import { formatCurrencyBDT, formatDateUTC } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
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

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=700,width=900');
    if (printWindow) {
      printWindow.document.write(`<html><head><title>Artman_Invoice_${project?.name || "Project"}</title>`);
      printWindow.document.write('<style>');
      printWindow.document.write('body { font-family: system-ui, -apple-system, sans-serif; padding: 32px; color: #18181b; }');
      printWindow.document.write('.header { text-align: center; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb; }');
      printWindow.document.write('.header h2 { margin: 0; font-size: 24px; }');
      printWindow.document.write('.header p { margin: 4px 0 0; color: #71717a; font-size: 14px; }');
      printWindow.document.write('.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }');
      printWindow.document.write('.stat-card { padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; text-align: center; }');
      printWindow.document.write('.stat-label { font-size: 14px; color: #71717a; margin: 0 0 4px 0; }');
      printWindow.document.write('.stat-value { font-size: 24px; font-weight: 700; margin: 0; }');
      printWindow.document.write('.reports-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }');
      printWindow.document.write('.reports-table th, .reports-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }');
      printWindow.document.write('.reports-table th.right, .reports-table td.right { text-align: right; }');
      printWindow.document.write('.reports-table th { background: #f9fafb; font-weight: 600; color: #52525b; border-top: 1px solid #e5e7eb; }');
      printWindow.document.write('.total-row td { font-weight: 700; background: #f9fafb; border-top: 2px solid #e5e7eb; }');
      printWindow.document.write('@media print { body { padding: 0; } }');
      printWindow.document.write('</style>');
      printWindow.document.write('</head><body>');
      
      printWindow.document.write(`<div class="header"><h2>Artman</h2><div style="margin-top: 12px; margin-bottom: 8px;"><span style="font-size: 20px; font-weight: 700; color: #065f46; background: #ecfdf5; padding: 6px 16px; border-radius: 8px; border: 1px solid #a7f3d0; display: inline-block;">${project?.name || "Project"}</span></div><p>Detailed Invoice</p></div>`);
      
      printWindow.document.write('<div class="stats-grid">');
      printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Investment</p><p class="stat-value">Tk ${investment.toLocaleString()}</p></div>`);
      printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Cost</p><p class="stat-value">Tk ${cost.toLocaleString()}</p></div>`);
      printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Sell</p><p class="stat-value">Tk ${sell.toLocaleString()}</p></div>`);
      printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Profit</p><p class="stat-value">Tk ${profit.toLocaleString()}</p></div>`);
      printWindow.document.write('</div>');

      printWindow.document.write('<h3 style="font-size: 18px; margin-bottom: 8px;">Daily Reports Breakdown</h3>');
      if (!project?.dailyReports || project.dailyReports.length === 0) {
        printWindow.document.write('<p style="color: #71717a;">No daily reports found for this project.</p>');
      } else {
        printWindow.document.write('<table class="reports-table"><thead><tr><th>Date</th><th>Time</th><th>Reason</th><th class="right">Daily Cost</th><th class="right">Daily Sell</th></tr></thead><tbody>');
        let totalC = 0;
        let totalS = 0;
        project.dailyReports.forEach(r => {
           totalC += Number(r.dailyCost || 0);
           totalS += Number(r.dailySell || 0);
           printWindow.document.write(`<tr>
              <td>${r.date || "-"}</td>
              <td>${r.time || "-"}</td>
              <td>${r.reason || "-"}</td>
              <td class="right">Tk ${Number(r.dailyCost || 0).toLocaleString()}</td>
              <td class="right">Tk ${Number(r.dailySell || 0).toLocaleString()}</td>
           </tr>`);
        });
        printWindow.document.write(`<tr class="total-row"><td colspan="3" class="right">Totals:</td><td class="right" style="color: #e11d48;">Tk ${totalC.toLocaleString()}</td><td class="right" style="color: #2563eb;">Tk ${totalS.toLocaleString()}</td></tr>`);
        printWindow.document.write('</tbody></table>');
      }

      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleExportCSV = () => {
    let csvContent = "";
    csvContent += "Artman - Project Detailed Invoice\n\n";
    csvContent += "Project Name," + `"${(project?.name || "Untitled").replace(/"/g, '""')}"` + "\n";
    csvContent += "Total Investment," + investment + "\n";
    csvContent += "Total Cost," + cost + "\n";
    csvContent += "Total Sell," + sell + "\n";
    csvContent += "Total Profit," + profit + "\n\n";

    csvContent += "Date,Time,Reason,Daily Cost,Daily Sell\n";
    
    if (project?.dailyReports?.length) {
      project.dailyReports.forEach(r => {
         const sl = `"${r.date || ""}"`;
         const tm = `"${r.time || ""}"`;
         const re = `"${(r.reason || "").replace(/"/g, '""')}"`;
         const dc = r.dailyCost || 0;
         const ds = r.dailySell || 0;
         csvContent += `${sl},${tm},${re},${dc},${ds}\n`;
      });
    } else {
      csvContent += "No daily reports found\n";
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Artman_Project_${project?.name || "Invoice"}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-l-4 border-[color:rgb(77,140,30)] pl-3">Project Statistics</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 active:scale-95 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </Button>
            <Button
              type="button"
              onClick={handlePrint}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-5 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-95"
            >
              <Printer className="h-4 w-4" />
              <span>Print Invoice</span>
            </Button>
          </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Investment */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Investment</p>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrencyBDT(investment, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-200 dark:group-hover:bg-zinc-700 dark:group-hover:text-white">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className="h-full w-full rounded-full bg-zinc-900 dark:bg-zinc-200" />
            </div>
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">100% Funded</span>
          </div>
        </div>

        {/* Total Cost */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Cost</p>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrencyBDT(cost, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-500/10 dark:text-orange-300 dark:group-hover:bg-orange-500 dark:group-hover:text-white">
              <Receipt className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Operating expenses</span>
            <span className="rounded-md bg-orange-50 px-1.5 py-0.5 text-[10px] font-medium text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
              {costPercentage}%
            </span>
          </div>
        </div>

        {/* Total Sell */}
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-zinc-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Sell</p>
              <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrencyBDT(sell, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-300 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Revenue generated</span>
            <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
              {sellPercentage}%
            </span>
          </div>
        </div>

        {/* Total Profit */}
        <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-300">Net Profit</p>
              <p className={`mt-2 text-2xl font-bold ${isProfitPositive ? "text-emerald-700 dark:text-emerald-200" : "text-rose-600 dark:text-rose-300"}`}>
                {isProfitPositive ? "+" : ""}{formatCurrencyBDT(project.totalProfit, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isProfitPositive ? "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-500/10 dark:text-emerald-200 dark:group-hover:bg-emerald-500" : "bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white dark:bg-rose-500/10 dark:text-rose-200 dark:group-hover:bg-rose-500"}`}>
              <Banknote className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5">
            {isProfitPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-rose-600 dark:text-rose-300" />
            )}
            <span className={`text-xs font-semibold ${isProfitPositive ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}>
              {roi}% ROI
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Image & Description */}
        <div className="lg:col-span-2 space-y-8">
          {projectImageUrl && (
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                  <Tag className="h-5 w-5 text-zinc-500 dark:text-zinc-300" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{name}</h2>
              </div>
              {location && (
                <div className="mb-4 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">{location}</span>
                </div>
              )}
            </div>
          )}

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Project Description
            </h3>
            <div className="mt-6 max-w-none text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {description.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Additional Stats & Info */}
        <div className="space-y-6">
          {/* Distributed Profit Card - Highlighted */}
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <div className="relative z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-200">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Distributed Profit</h3>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold tracking-tight text-emerald-700 dark:text-emerald-200">
                  {formatCurrencyBDT(project.distributedProfit, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="mt-1 text-xs font-medium text-emerald-600/80 dark:text-emerald-200/70">
                  Total distributed to investors
                </p>
              </div>
            </div>
            {/* Decorative bg pattern */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl dark:bg-emerald-500/10" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-emerald-100/50 blur-2xl dark:bg-emerald-500/10" />
          </div>

          {/* Project Details List */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-6 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Details</h3>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Location</span>
                </div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{location || "N/A"}</span>
              </div>
              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Start Date</span>
                </div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {project.startDate ? formatDateUTC(project.startDate) : "N/A"}
                </span>
              </div>
              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                  <Tag className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-wide">Status</span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    project.status === "open"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : project.status === "closed"
                        ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-200"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"
                  }`}
                >
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
