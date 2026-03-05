"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useGetInvestmentAdminQuery,
  useUpdateInvestmentAdminMutation,
  useDeleteInvestmentAdminMutation,
} from "@/features/investor/investments/investmentsApiSlice";

export default function AdminInvestmentEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const {
    data: investment,
    isLoading,
    isFetching,
    isError,
  } = useGetInvestmentAdminQuery(id, {
    skip: !id,
  });

  const [formValues, setFormValues] = useState({
    amount: "",
    photoFile: null,
  });

  const [updateInvestment, { isLoading: isUpdating }] =
    useUpdateInvestmentAdminMutation();

  const [deleteInvestment, { isLoading: isDeleting }] =
    useDeleteInvestmentAdminMutation();

  const isBusy = isLoading || isFetching;

  useEffect(() => {
    if (investment) {
      setFormValues({
        amount: investment.amount != null ? String(investment.amount) : "",
        photoFile: null,
      });
    }
  }, [investment]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountNumber = Number(formValues.amount);
    if (!amountNumber || amountNumber <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    try {
      await updateInvestment({
        id,
        amount: amountNumber,
        photoFile: formValues.photoFile || undefined,
      }).unwrap();
      toast.success("Investment updated successfully");
      router.push("/admin/investment");
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Update failed", { description: message });
    }
  };

  const handleDelete = async () => {
    if (!investment) return;
    const confirmed = window.confirm(
      `Delete ${investment.amount} BDT investment for investor #${investment.investorId}? This action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await deleteInvestment(investment.id).unwrap();
      toast.success("Investment deleted successfully");
      router.push("/admin/investment");
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Failed to delete investment.";
      toast.error("Delete failed", { description: message });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => router.push("/admin/investment")}
          className="h-9 w-9 rounded-full border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
            Edit investment
          </h1>
          <p className="text-sm text-zinc-500">
            Adjust the investment amount on a dedicated page.
          </p>
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        {isBusy && (
          <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
            Loading investment...
          </div>
        )}

        {!isBusy && isError && (
          <div className="flex h-32 items-center justify-center text-sm text-red-600">
            Failed to load investment. Please try again.
          </div>
        )}

        {!isBusy && !isError && investment && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="project"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Project
                </label>
                <Input
                  id="project"
                  value={
                    investment.project?.title ?? `Project #${investment.projectId}`
                  }
                  readOnly
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 text-sm text-zinc-900"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="investor"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Investor
                </label>
                <Input
                  id="investor"
                  value={
                    investment.user?.name ||
                    investment.user?.email ||
                    `User #${investment.userId}`
                  }
                  readOnly
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 text-sm text-zinc-900"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Amount (BDT)
                </label>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={formValues.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  placeholder="e.g. 5000"
                  className="h-10 rounded-xl border-zinc-200 bg-zinc-50 focus:border-emerald-500 focus:bg-white focus:ring-emerald-500/20"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="photo"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500"
                >
                  Photo
                </label>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleChange("photoFile", e.target.files?.[0] ?? null)
                  }
                  className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 file:mr-4 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
                className="h-9 rounded-full border-red-200 text-xs text-red-600 hover:bg-red-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/investment")}
                className="h-9 rounded-full border-zinc-200 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="h-9 rounded-full bg-emerald-600 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-emerald-500 disabled:opacity-70"
              >
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
