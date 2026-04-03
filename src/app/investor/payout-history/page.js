"use client";

import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useGetUserPayoutsQuery } from "@/features/admin/users/usersApiSlice";
import { ReceiptIndianRupee, Download, Printer, Banknote, Calendar, BadgeCheck } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

function InvoicePrintView({ payout, user, innerRef }) {
  if (!payout || !user) return <div ref={innerRef} className="absolute -left-[9999px]" />;
  
  return (
    <div ref={innerRef} className="absolute -left-[9999px] top-0 p-10 bg-white w-[794px]">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-zinc-900">Artman</h2>
              <p className="text-sm text-zinc-500">Payout Invoice</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-3xl font-bold tracking-tight text-zinc-900">INVOICE</h3>
          <p className="mt-1 text-sm font-medium text-primary">PAID OUT</p>
        </div>
      </div>

      <hr className="my-8 border-zinc-200" />

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">Invoice To</p>
            <h4 className="mt-2 text-lg font-bold text-zinc-900">{user.name}</h4>
            <p className="text-sm text-zinc-600">{user.email}</p>
            <p className="text-sm text-zinc-600">{user.phone}</p>
          </div>
        </div>
        <div className="space-y-4 text-right">
          <div>
            <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">Reference No.</p>
            <p className="mt-1 text-sm font-medium text-zinc-900">{payout.reference}</p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">Investment Period</p>
            <p className="mt-1 text-sm font-medium text-zinc-900">
              {format(new Date(user.createdAt), "MMM dd, yyyy")} - {format(new Date(payout.createdAt), "MMM dd, yyyy")}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">Payout Date</p>
            <p className="mt-1 text-sm font-medium text-zinc-900">
              {format(new Date(payout.createdAt), "MMM dd, yyyy - hh:mm a")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-wider text-zinc-500">
            <tr>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Cleared Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white">
            <tr>
              <td className="px-6 py-4 font-medium text-zinc-900">Total Investment</td>
              <td className="px-6 py-4 text-right text-zinc-700">
                ৳{Number(payout.totalInvestment || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-zinc-900">Total Cost</td>
              <td className="px-6 py-4 text-right text-zinc-700">
                ৳{Number(payout.totalCost || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-zinc-900">Current Profit</td>
              <td className="px-6 py-4 text-right text-zinc-700">
                ৳{Number(payout.totalProfit || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tbody>
          <tfoot className="bg-zinc-50">
            <tr>
              <td className="px-6 py-4 text-right font-bold text-zinc-900">Total Amount Transferred</td>
              <td className="px-6 py-4 text-right text-lg font-bold text-zinc-900">
                ৳{Number(payout.amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-12 text-center text-sm text-zinc-500">
        <p>By receiving this payout, all tracked active investments, active costs, and accumulated profits have been successfully reset to zero.</p>
        <p className="mt-2 text-xs">This is a computer-system generated invoice and does not require a physical signature.</p>
      </div>
    </div>
  );
}

export default function InvestorPayoutHistoryPage() {
  const user = useSelector((state) => state.auth?.user);
  const investorId = user?.id;

  const { data: payouts, isLoading } = useGetUserPayoutsQuery(investorId, {
    skip: !investorId,
  });

  const [printingPayout, setPrintingPayout] = useState(null);
  const printContentRef = useRef(null);

  const handleDownload = (payout) => {
    setPrintingPayout(payout);
    toast.loading("Generating PDF...", { id: "pdf-gen" });
    setTimeout(async () => {
      const element = printContentRef.current;
      if (!element) return;
      try {
        const canvas = await html2canvas(element, { 
          scale: 2,
          useCORS: true,
          logging: false 
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Payout_Invoice_${payout.reference}.pdf`);
        toast.success("Invoice downloaded successfully!", { id: "pdf-gen" });
      } catch (error) {
        toast.error("Failed to generate PDF.", { id: "pdf-gen" });
      } finally {
        setPrintingPayout(null);
      }
    }, 500); 
  };

  const columns = [
    {
      key: "date",
      header: "Date",
      tdClassName: "whitespace-nowrap px-6 py-4 text-sm text-zinc-500",
      cell: (p) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-zinc-400" />
          <span>{format(new Date(p.createdAt), "MMM dd, yyyy")}</span>
        </div>
      ),
    },
    {
      key: "reference",
      header: "Reference",
      tdClassName: "whitespace-nowrap px-6 py-4",
      cell: (p) => (
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          {p.reference}
        </span>
      ),
    },
    {
      key: "totalInvestment",
      header: "Cleared Investment",
      tdClassName: "whitespace-nowrap px-6 py-4",
      cell: (p) => (
        <span className="text-zinc-600 dark:text-zinc-400">
          ৳{Number(p.totalInvestment).toLocaleString("en-US")}
        </span>
      ),
    },
    {
      key: "totalProfit",
      header: "Cleared Profit",
      tdClassName: "whitespace-nowrap px-6 py-4",
      cell: (p) => (
        <span className="text-primary font-medium">
          ৳{Number(p.totalProfit).toLocaleString("en-US")}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Total Transferred",
      tdClassName: "whitespace-nowrap px-6 py-4 text-right",
      cell: (p) => (
        <span className="text-base font-bold text-zinc-900 bg-secondary text-primary px-2.5 py-1 rounded-md">
          ৳{Number(p.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 p-2">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-[color:rgba(77,140,30,0.18)]">
            <ReceiptIndianRupee className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Payout History
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              View your past payouts and download invoices
            </p>
          </div>
        </div>
      </header>

      <section className="w-full rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        <DataTable
          columns={columns}
          data={payouts || []}
          isLoading={isLoading}
          emptyMessage={
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
                <Banknote className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                No payouts found
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                You haven&apos;t received any payouts yet.
              </p>
            </div>
          }
          loadingLabel="Loading payout history..."
          getRowKey={(p) => p.id}
          renderActions={(p) => (
            <div className="flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(p)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          )}
        />
      </section>

      {/* Hidden printable invoice container */}
      <InvoicePrintView payout={printingPayout} user={user} innerRef={printContentRef} />
    </div>
  );
}
