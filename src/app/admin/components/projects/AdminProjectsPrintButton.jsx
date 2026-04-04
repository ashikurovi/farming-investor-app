import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Loader2, Download } from "lucide-react";
import { projectsApiSlice } from "@/features/admin/projects/projectsApiSlice";
import { toast } from "sonner";

export function AdminProjectsPrintButton({ stats }) {
  const [fetchProjects, { isFetching }] = projectsApiSlice.useLazyGetProjectsQuery();

  const totalProjects = stats?.totalProjects ?? 0;
  const totalAllocated = stats?.totalInvestment ?? 0;
  const totalCost = stats?.totalCost ?? 0;
  const totalSell = stats?.totalSell ?? 0;
  const totalProfit = stats?.totalProfit ?? 0;

  const handlePrint = async () => {
    try {
      const result = await fetchProjects({ page: 1, limit: 1000 });
      if (result.isError) {
          toast.error("Failed to load projects for printing");
          return;
      }
      
      const data = result.data;
      const projects = Array.isArray(data) ? data : (data?.items ?? []);
      
      const printWindow = window.open('', '', 'height=700,width=900');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Projects Invoice</title>');
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: system-ui, -apple-system, sans-serif; padding: 32px; color: #18181b; }');
        printWindow.document.write('.container { max-width: 800px; margin: auto; }');
        printWindow.document.write('.header { text-align: center; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid #e5e7eb; }');
        printWindow.document.write('.header h2 { margin: 0; font-size: 28px; }');
        printWindow.document.write('.header p { margin: 8px 0 0; color: #71717a; }');
        printWindow.document.write('.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px; }');
        printWindow.document.write('.stat-card { padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; }');
        printWindow.document.write('.stat-label { font-size: 14px; color: #71717a; margin: 0 0 4px 0; }');
        printWindow.document.write('.stat-value { font-size: 24px; font-weight: 700; margin: 0; }');
        printWindow.document.write('.projects-section { margin-top: 32px; }');
        printWindow.document.write('.projects-section h3 { font-size: 20px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }');
        printWindow.document.write('.projects-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 14px; }');
        printWindow.document.write('.projects-table th, .projects-table td { padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb; }');
        printWindow.document.write('.projects-table th:first-child, .projects-table td:first-child { text-align: left; }');
        printWindow.document.write('.projects-table th { background: #f9fafb; font-weight: 600; color: #52525b; border-top: 1px solid #e5e7eb; }');
        printWindow.document.write('@media print { body { padding: 0; } .container { width: 100%; max-width: none; } }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body><div class="container">');
        
        // Render Content
        printWindow.document.write('<div class="header"><h2>Artman</h2><p>Projects Summary Invoice</p></div>');
        printWindow.document.write('<div class="stats-grid">');
        printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Projects</p><p class="stat-value">${totalProjects}</p></div>`);
        printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Allocated Amount</p><p class="stat-value">Tk ${totalAllocated.toLocaleString()}</p></div>`);
        printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Cost</p><p class="stat-value">Tk ${totalCost.toLocaleString()}</p></div>`);
        printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Sell</p><p class="stat-value">Tk ${totalSell.toLocaleString()}</p></div>`);
        printWindow.document.write(`<div class="stat-card"><p class="stat-label">Total Profit</p><p class="stat-value">Tk ${totalProfit.toLocaleString()}</p></div>`);
        printWindow.document.write('</div>');
        
        printWindow.document.write('<div class="projects-section"><h3>Project Details</h3>');
        printWindow.document.write('<table class="projects-table"><thead><tr><th>Project Name</th><th>Investment</th><th>Cost</th><th>Sell</th><th>Profit</th></tr></thead><tbody>');
        projects.forEach(p => {
           printWindow.document.write(`<tr>
              <td>${p.name || p.title}</td>
              <td>Tk ${Number(p.totalInvestment || 0).toLocaleString()}</td>
              <td>Tk ${Number(p.totalCost || 0).toLocaleString()}</td>
              <td>Tk ${Number(p.totalSell || 0).toLocaleString()}</td>
              <td>Tk ${Number(p.totalProfit || 0).toLocaleString()}</td>
           </tr>`);
        });
        printWindow.document.write('</tbody></table></div></div>');

        printWindow.document.write('</div></body></html>');
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      } else {
        toast.error("Please allow popups to print.");
      }
    } catch (e) {
      toast.error("An error occurred while printing");
    }
  };

  const handleExportCSV = async () => {
    try {
      const result = await fetchProjects({ page: 1, limit: 1000 });
      if (result.isError) {
          toast.error("Failed to load projects for exporting");
          return;
      }
      
      const data = result.data;
      const projects = Array.isArray(data) ? data : (data?.items ?? []);
      
      let csvContent = "";
      csvContent += "Artman - Projects Summary\n\n";
      csvContent += "Total Projects," + totalProjects + "\n";
      csvContent += "Total Allocated Amount," + totalAllocated + "\n";
      csvContent += "Total Cost," + totalCost + "\n";
      csvContent += "Total Sell," + totalSell + "\n";
      csvContent += "Total Profit," + totalProfit + "\n\n";
      
      csvContent += "Project Name,Investment,Cost,Sell,Profit\n";
      projects.forEach(p => {
         const nm = `"${(p.name || p.title || "").replace(/"/g, '""')}"`;
         const inv = p.totalInvestment || 0;
         const cst = p.totalCost || 0;
         const sl = p.totalSell || 0;
         const pr = p.totalProfit || 0;
         csvContent += `${nm},${inv},${cst},${sl},${pr}\n`;
      });
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `Artman_Projects_Summary.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      toast.error("An error occurred while exporting");
    }
  };

  return (
    <>
        <Button
          type="button"
          onClick={handleExportCSV}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white border border-zinc-200 px-5 text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:bg-zinc-50 active:scale-95 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span>Export Excel</span>
        </Button>
        <Button
          type="button"
          onClick={handlePrint}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] px-5 text-sm font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-95 disabled:opacity-50"
        >
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Printer className="h-4 w-4" />
          )}
          <span>{isFetching ? "Loading..." : "Print Invoice"}</span>
        </Button>
    </>
  );
}
