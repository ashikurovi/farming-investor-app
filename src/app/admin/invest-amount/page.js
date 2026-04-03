"use client";

import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  ReceiptIndianRupee,
  Save,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Info,
} from "lucide-react";
import {
  useGetInvestAmountQuery,
  useUpdateInvestAmountMutation,
} from "@/features/admin/invest-amount/investAmountApiSlice";
import { toast } from "sonner";

export default function InvestAmountPage() {
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

  const { data: investData, isLoading, isError } = useGetInvestAmountQuery();
  const [updateInvestAmount, { isLoading: isUpdating }] = useUpdateInvestAmountMutation();

  const initialAmount = useMemo(() => {
    if (!investData) return "";
    const value = investData.amount ?? 0;
    return String(value);
  }, [investData]);

  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nextAmount =
        amount.trim() === "" ? Number(initialAmount || 0) : Number(amount);
      await updateInvestAmount({ amount: nextAmount }).unwrap();
      toast.success("Investment amount updated successfully", {
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
      });
    } catch (err) {
      toast.error("Failed to update investment amount");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[color:var(--brand-from)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-5 max-w-[1200px] mx-auto -mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
            <ReceiptIndianRupee className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Investment Settings
            </h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Manage the standard investment amount for the system.
            </p>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-1 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="amount" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                <TrendingUp className="h-3.5 w-3.5 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
                Standard Investment Amount (BDT)
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 transition-colors group-focus-within:text-[color:rgb(77,140,30)] dark:text-zinc-500 dark:group-focus-within:text-[color:rgb(124,194,46)]">
                  <span className="text-lg font-bold">৳</span>
                </div>
                <input
                  id="amount"
                  type="number"
                  step="any"
                  value={amount}
                  placeholder={initialAmount || "0.00"}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`block w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 py-4 pl-10 pr-4 text-lg font-black tabular-nums text-zinc-900 shadow-inner outline-none transition-all dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-100 ${isReadOnly ? "cursor-not-allowed opacity-70" : "focus:border-[color:rgba(124,194,46,0.6)] focus:bg-white focus:ring-4 focus:ring-[color:rgba(124,194,46,0.16)] dark:focus:bg-zinc-900"}`}
                  required
                  disabled={isReadOnly}
                />
              </div>
              <p className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                <Info className="h-3 w-3" />
                This value will be used as the default for new investment calculations.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-6 text-white shadow-xl shadow-zinc-200 dark:bg-zinc-950/40 dark:shadow-none dark:ring-1 dark:ring-white/10">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[color:rgb(124,194,46)]">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Important Notice</h4>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400 dark:text-zinc-300">
                    Changing this value will affect how the system handles investment entries.
                    Please ensure the amount is accurate according to your current project requirements.
                  </p>
                </div>
              </div>
            </div>

            {!isReadOnly && (
              <button
                type="submit"
                disabled={isUpdating}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-4 text-sm font-black uppercase tracking-widest text-white transition-all active:scale-[0.98] disabled:opacity-50 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] hover:brightness-[1.05]"
              >
                {isUpdating ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Save className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Save Changes
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {isError && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 border border-red-100 text-red-600 animate-in fade-in slide-in-from-top-2 duration-300 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-bold">Error loading investment settings. Please try again later.</p>
        </div>
      )}
    </div>
  );
}
