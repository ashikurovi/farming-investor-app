"use client";

import { useGetAllPayoutsQuery } from "@/features/admin/users/usersApiSlice";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { Calendar, ReceiptIndianRupee, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function AdminInvestorPayoutHistoryTable() {
  const router = useRouter();
  const { data: payouts, isLoading } = useGetAllPayoutsQuery();

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
      key: "investor",
      header: "Investor",
      tdClassName: "whitespace-nowrap px-6 py-4",
      cell: (p) => (
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            {p.investor?.name || "Unknown Investor"}
          </span>
          <span className="text-xs text-zinc-500">{p.investor?.phone}</span>
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
      key: "totalProfit",
      header: "Cleared Profit",
      tdClassName: "whitespace-nowrap px-6 py-4",
      cell: (p) => (
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
          ৳{Number(p.totalProfit).toLocaleString("en-US")}
        </span>
      ),
    },
    {
      key: "amount",
      header: "Total Payout",
      tdClassName: "whitespace-nowrap px-6 py-4 text-right",
      cell: (p) => (
        <span className="text-base font-bold text-zinc-900 dark:text-zinc-100 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md">
          ৳{Number(p.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Global Payout History
          </h2>
          <p className="text-sm text-zinc-500">
            View all processed payouts across all investors.
          </p>
        </div>
      </div>

      <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        <DataTable
          columns={columns}
          data={payouts || []}
          isLoading={isLoading}
          emptyMessage={
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-800">
                <ReceiptIndianRupee className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                No payouts found
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                No investors have received payouts yet.
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
                onClick={() => router.push(`/admin/investor/${p.investorId}/payout/${p.id}`)}
                className="gap-2"
              >
                <Printer className="h-4 w-4" />
                <span>Invoice</span>
              </Button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
