"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetUserPayoutsQuery, useGetUserQuery } from "@/features/admin/users/usersApiSlice";
import { Copy, Download, ArrowLeft, Printer, BadgeCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";

export default function PayoutInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const investorId = Number(params.id);
  const payoutId = Number(params.payoutId);

  const { data: user, isLoading: isUserLoading } = useGetUserQuery(investorId, { skip: !investorId });
  const { data: payouts, isLoading: isPayoutsLoading } = useGetUserPayoutsQuery(investorId, { skip: !investorId });

  const payout = payouts?.find(p => p.id === payoutId);
  const printRef = useRef(null);

  const handleDownload = async () => {
    const element = printRef.current;
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
      pdf.save(`Payout_Invoice_${payout?.reference || "Unknown"}.pdf`);
      toast.success("Invoice downloaded successfully!");
    } catch (e) {
      toast.error("Failed to generate PDF");
    }
  };

  const copyReference = () => {
    if (payout?.reference) {
      navigator.clipboard.writeText(payout.reference);
      toast.success("Reference copied successfully!");
    }
  };

  const isBusy = isUserLoading || isPayoutsLoading;

  if (isBusy) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900 dark:border-zinc-800 dark:border-t-zinc-100" />
      </div>
    );
  }

  if (!payout || !user) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <FileText className="h-12 w-12 text-zinc-400" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Invoice Not Found</h3>
        <p className="text-zinc-500">The payout invoice you are looking for does not exist.</p>
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between hide-on-print">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Payout Invoice
            </h1>
            <p className="text-sm text-zinc-500">
              {payout.reference}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={copyReference} variant="outline" className="gap-2">
            <Copy className="h-4 w-4" /> Copy Ref
          </Button>
          <Button onClick={handleDownload} className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div
        ref={printRef}
        className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 p-10 print-safe"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Artman
                </h2>
                <p className="text-sm text-zinc-500">Payout Invoice</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              INVOICE
            </h3>
            <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              PAID OUT
            </p>
          </div>
        </div>

        <hr className="my-8 border-zinc-200 dark:border-zinc-800" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                Invoice To
              </p>
              <h4 className="mt-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {user.name}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{user.phone}</p>
              {user.investorType && (
                <span className="mt-2 inline-block rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  Investor Type: {user.investorType.type}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-4 sm:text-right">
            <div>
              <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                Reference No.
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {payout.reference}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                Investment Period
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {format(new Date(user.createdAt), "MMM dd, yyyy")} - {format(new Date(payout.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                Payout Date
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {format(new Date(payout.createdAt), "MMM dd, yyyy - hh:mm a")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Cleared Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-950">
              <tr>
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                  Total Investment
                </td>
                <td className="px-6 py-4 text-right text-zinc-700 dark:text-zinc-300">
                  ৳{Number(payout.totalInvestment).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                  Total Cost
                </td>
                <td className="px-6 py-4 text-right text-zinc-700 dark:text-zinc-300">
                  ৳{Number(payout.totalCost).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                  Current Profit
                </td>
                <td className="px-6 py-4 text-right text-zinc-700 dark:text-zinc-300">
                  ৳{Number(payout.totalProfit).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-zinc-50 dark:bg-zinc-900/50">
              <tr>
                <td className="px-6 py-4 text-right font-bold text-zinc-900 dark:text-zinc-100">
                  Total Amount Transferred
                </td>
                <td className="px-6 py-4 text-right text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  ৳{Number(payout.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>
            By receiving this payout, all tracked active investments, active costs, and accumulated profits have been successfully reset to zero. This is a computer-system generated invoice and does not require a physical signature.
          </p>
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
            background: white !important;
            color: black !important;
          }
          .print-safe, .print-safe * {
            visibility: visible;
          }
          .print-safe {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
          }
          .hide-on-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
