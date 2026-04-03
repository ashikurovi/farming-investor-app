"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ReceiptIndianRupee,
  Save,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Info
} from "lucide-react";
import {
  useGetInvestAmountQuery,
  useUpdateInvestAmountMutation
} from "@/features/admin/invest-amount/investAmountApiSlice";
import { Toaster } from "sonner";


export default function InvestAmountPage() {
  const user = useSelector((state) => state.auth?.user);
  const isReadOnly = user?.role === "partner";

  const { data: investData, isLoading, isError } = useGetInvestAmountQuery();
  const [updateInvestAmount, { isLoading: isUpdating }] = useUpdateInvestAmountMutation();

  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (investData) {
      setAmount(investData.amount || 0);
    }
  }, [investData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInvestAmount({ amount: Number(amount) }).unwrap();
      Toaster.success("Investment amount updated successfully", {
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
        style: {
          borderRadius: '12px',
          background: '#fff',
          color: '#18181b',
          border: '1px border border-zinc-100 shadow-xl'
        },
      });
    } catch (err) {
      toast.error("Failed to update investment amount");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900">Investment Settings</h1>
          <p className="text-sm text-zinc-500">Manage the standard investment amount for the system.</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200">
          <ReceiptIndianRupee className="h-6 w-6" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-1 shadow-sm transition-all hover:shadow-md">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />

        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="amount" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                <TrendingUp className="h-3.5 w-3.5" />
                Standard Investment Amount (BDT)
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors">
                  <span className="text-lg font-bold">৳</span>
                </div>
                <input
                  id="amount"
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`block w-full rounded-2xl border border-zinc-100 bg-zinc-50/50 py-4 pl-10 pr-4 text-lg font-black tabular-nums text-zinc-900 shadow-inner outline-none transition-all ${isReadOnly ? "cursor-not-allowed opacity-70" : "focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"}`}
                  placeholder="0.00"
                  required
                  disabled={isReadOnly}
                />
              </div>
              <p className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400">
                <Info className="h-3 w-3" />
                This value will be used as the default for new investment calculations.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-900 p-6 text-white shadow-xl shadow-zinc-200">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold">Important Notice</h4>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">
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
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-500 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-emerald-100 transition-all hover:bg-emerald-600 hover:shadow-emerald-200 active:scale-[0.98] disabled:opacity-50"
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
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 border border-red-100 text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-xs font-bold">Error loading investment settings. Please try again later.</p>
        </div>
      )}
    </div>
  );
}
