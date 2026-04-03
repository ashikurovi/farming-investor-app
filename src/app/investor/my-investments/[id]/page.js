"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Hash,
  BadgeDollarSign,
  Landmark,
  Eye,
  Wallet,
  TrendingUp,
  FileText,
} from "lucide-react";
import { useGetInvestmentQuery } from "@/features/investor/investments/investmentsApiSlice";

const fmtBDT = (n) =>
  Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function InvestmentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: response, isLoading, isError } = useGetInvestmentQuery(id);
  const investment = response?.data ?? response;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError || !investment) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-zinc-500 dark:text-zinc-400">
        <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
          Investment not found
        </p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold shadow-sm ring-1 ring-black/5 hover:bg-zinc-50 dark:bg-zinc-900 dark:ring-white/10 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen space-y-6 bg-background text-foreground p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-zinc-500 shadow-sm ring-1 ring-black/5 transition hover:bg-zinc-50 hover:text-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-white/10 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-100">
          Investment Details
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className=" gap-6 ">
        {/* Main Details Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-2 w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
            <div className="p-6 sm:p-8">
              <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary ring-1 ring-[color:rgba(77,140,30,0.14)]">
                    <Wallet className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                      Amount Invested
                    </p>
                    <h2 className="text-3xl font-black tabular-nums text-zinc-900 dark:text-zinc-100">
                      <span className="text-primary mr-1">৳</span>
                      {fmtBDT(investment.amount)}
                    </h2>
                  </div>
                </div>
                {(() => {
                  const isExpired =
                    investment.endDate &&
                    new Date(investment.endDate) < new Date();
                  const effectiveActive = investment.isActive && !isExpired;
                  return (
                    <div className="inline-flex items-center gap-2 rounded-2xl bg-zinc-50 px-4 py-2 ring-1 ring-zinc-200 dark:bg-zinc-800/40 dark:ring-zinc-700">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${isExpired ? "bg-red-500" : effectiveActive ? "bg-primary" : "bg-zinc-300"}`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${isExpired ? "text-red-700" : effectiveActive ? "text-primary" : "text-zinc-500 dark:text-zinc-400"}`}
                      >
                        {isExpired
                          ? "Expired"
                          : effectiveActive
                            ? "Active"
                            : "Inactive"}
                      </span>
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    Icon: Hash,
                    label: "Reference",
                    value: investment.reference,
                  },
                  { Icon: CalendarDays, label: "Date", value: investment.date },
                  { Icon: Clock3, label: "Time", value: investment.time },
                  {
                    Icon: CalendarDays,
                    label: "Start Date",
                    value: investment.startDate,
                  },
                  {
                    Icon: CalendarDays,
                    label: "End Date",
                    value: investment.endDate,
                  },
                ].map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition hover:bg-white hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        {label}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
                      {value || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Associated Deeds Section */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
              <FileText className="h-4 w-4" />
              Associated Deeds
            </h3>
            {investment.deeds && investment.deeds.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {investment.deeds.map((deed) => (
                  <div
                    key={deed.id}
                    className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-[color:rgba(77,140,30,0.22)] dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {deed.title || "Investment Deed"}
                        </p>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                          Issued: {deed.issueDate || "—"}
                        </p>
                      </div>
                    </div>
                    {(deed.uploadPdf || deed.file) && (
                      <a
                        href={deed.uploadPdf || deed.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 text-xs font-bold text-white transition hover:bg-zinc-800"
                      >
                        <Eye className="h-4 w-4" /> View PDF
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white py-12 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
                <FileText className="mb-2 h-8 w-8 text-zinc-200 dark:text-zinc-600" />
                <p className="text-xs font-medium">
                  No deeds associated with this investment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
