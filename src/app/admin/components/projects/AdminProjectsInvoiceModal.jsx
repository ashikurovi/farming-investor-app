import React, { useRef } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";

export function AdminProjectsInvoiceModal({ isOpen, onClose, stats }) {
  const { data } = useGetProjectsQuery({ page: 1, limit: 1000 }, { skip: !isOpen });

  const projects = Array.isArray(data) ? data : (data?.items ?? []);

  const totalProjects = stats?.totalProjects ?? 0;
  const totalAllocated = stats?.totalInvestment ?? 0;
  const totalCost = stats?.totalCost ?? 0;
  const totalSell = stats?.totalSell ?? 0;
  const totalProfit = stats?.totalProfit ?? 0;

  const handlePrint = () => {
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
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      description=""
      hideHeader
      size="lg" // "lg" max-w-2xl
      bodyClassName="p-0"
    >
        <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="space-y-6">
                <div className="text-center mb-6 flex flex-col items-center border-b border-zinc-100 dark:border-zinc-800 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)] mb-4">
                        <Printer className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Artman</h2>
                    <p className="text-sm text-zinc-500 mt-1">Projects Summary Invoice</p>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                     <div className="p-4 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                         <p className="text-sm font-medium text-zinc-500 mb-1">Total Projects</p>
                         <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalProjects}</p>
                     </div>
                     <div className="p-4 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                         <p className="text-sm font-medium text-zinc-500 mb-1">Total Allocated Amount</p>
                         <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tk {totalAllocated.toLocaleString()}</p>
                     </div>
                     <div className="p-4 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                         <p className="text-sm font-medium text-zinc-500 mb-1">Total Cost</p>
                         <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tk {totalCost.toLocaleString()}</p>
                     </div>
                     <div className="p-4 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                         <p className="text-sm font-medium text-zinc-500 mb-1">Total Sell</p>
                         <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Tk {totalSell.toLocaleString()}</p>
                     </div>
                     <div className="p-4 border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl">
                         <p className="text-sm font-medium text-zinc-500 mb-1">Total Profit</p>
                         <p className="text-2xl font-bold text-[color:rgb(77,140,30)]">Tk {totalProfit.toLocaleString()}</p>
                     </div>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Project Details</h3>
                    {projects.length === 0 ? (
                        <p className="text-sm text-zinc-500">Loading projects...</p>
                    ) : (
                        <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                            <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                                        <tr>
                                            <th className="p-3 font-medium">Project Name</th>
                                            <th className="p-3 font-medium text-right">Investment</th>
                                            <th className="p-3 font-medium text-right">Cost</th>
                                            <th className="p-3 font-medium text-right">Sell</th>
                                            <th className="p-3 font-medium text-right">Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        {projects.map((p, i) => (
                                            <tr key={i} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                                                <td className="p-3 font-medium text-zinc-900 dark:text-zinc-100 max-w-[200px] truncate" title={p.name || p.title}>{p.name || p.title}</td>
                                                <td className="p-3 text-right text-zinc-600 dark:text-zinc-300">Tk {Number(p.totalInvestment || 0).toLocaleString()}</td>
                                                <td className="p-3 text-right text-rose-600 dark:text-rose-400">Tk {Number(p.totalCost || 0).toLocaleString()}</td>
                                                <td className="p-3 text-right text-blue-600 dark:text-blue-400">Tk {Number(p.totalSell || 0).toLocaleString()}</td>
                                                <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">Tk {Number(p.totalProfit || 0).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Button variant="outline" onClick={onClose} className="rounded-xl">Close</Button>
                <Button onClick={handlePrint} className="gap-2 rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-[0_10px_30px_-15px_rgba(77,140,30,0.5)] transition-all hover:brightness-[1.05]">
                    <Printer className="h-4 w-4"/>
                    Print Invoice
                </Button>
            </div>
        </div>
    </Modal>
  );
}
