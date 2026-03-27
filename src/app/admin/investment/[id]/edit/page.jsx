"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Wallet2,
  Calendar,
  Clock,
  FileText,
  User,
  ImageIcon,
  Upload,
  Save,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useGetInvestmentAdminQuery,
  useUpdateInvestmentAdminMutation,
  useDeleteInvestmentAdminMutation,
} from "@/features/investor/investments/investmentsApiSlice";
import { useGetUserQuery } from "@/features/admin/users/usersApiSlice";

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

  const [updateInvestment, { isLoading: isUpdating }] = useUpdateInvestmentAdminMutation();
  const [deleteInvestment, { isLoading: isDeleting }] = useDeleteInvestmentAdminMutation();

  const [formValues, setFormValues] = useState({
    amount: "",
    date: "",
    time: "",
    reference: "",
  });
  const [photoFile, setPhotoFile] = useState(null);

  // Fetch investor details if we have an investorId
  const investorId = investment?.investorId;
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(investorId, { skip: !investorId });

  useEffect(() => {
    if (investment) {
      setFormValues({
        amount: investment.amount != null ? String(investment.amount) : "",
        date: investment.date || "",
        time: investment.time || "",
        reference: investment.reference || "",
      });
    }
  }, [investment]);

  const previewUrl = useMemo(() => {
    if (photoFile) {
      return URL.createObjectURL(photoFile);
    }
    return investment?.photo || null;
  }, [photoFile, investment]);

  useEffect(() => {
    if (!photoFile || !previewUrl || previewUrl === investment?.photo) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [photoFile, previewUrl, investment]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    setPhotoFile(file ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountNumber = Number(formValues.amount);
    if (!amountNumber || amountNumber <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    if (!formValues.date) {
      toast.error("Date is required");
      return;
    }
    if (!formValues.time) {
      toast.error("Time is required");
      return;
    }

    try {
      await updateInvestment({
        id,
        amount: amountNumber,
        date: formValues.date,
        time: formValues.time,
        reference: formValues.reference || undefined,
        photoFile: photoFile || undefined,
      }).unwrap();

      toast.success("Investment updated successfully");
      router.push("/admin/investment");
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Update failed. Please try again.";
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

  const isBusy = isLoading || isFetching;

  if (isBusy) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError || !investment) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <Trash2 className="h-6 w-6" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-900">Investment Not Found</h3>
          <p className="text-sm text-zinc-500">The investment you are looking for does not exist or has been deleted.</p>
        </div>
        <Button onClick={() => router.push("/admin/investment")}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/investment")}
            className="mt-1 h-10 w-10 shrink-0 rounded-xl border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Edit Investment
            </h1>
            <p className="text-sm text-zinc-500">
              Update details for investment #{id}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-10 gap-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
          >
            {isDeleting ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Delete Investment</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column: Investment Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                >
                  <User className="h-3.5 w-3.5" />
                  Investor (Read-only)
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">{user?.name || "Unknown"}</div>
                    <div className="text-xs text-zinc-500">{user?.email || `ID: ${investorId}`}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="amount"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <Wallet2 className="h-3.5 w-3.5" />
                    Amount (BDT)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formValues.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    placeholder="e.g. 50000"
                    required
                    className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="reference"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Reference (Optional)
                  </label>
                  <Input
                    id="reference"
                    value={formValues.reference}
                    onChange={(e) => handleChange("reference", e.target.value)}
                    placeholder="Check No, Transaction ID, etc."
                    className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="date"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    value={formValues.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                    className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="time"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    Time
                  </label>
                  <Input
                    id="time"
                    type="time"
                    value={formValues.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    required
                    className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Proof/Photo */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="photo"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  Payment Proof / Photo
                </label>

                <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 transition-colors hover:border-emerald-500/50 hover:bg-emerald-50/30">
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />

                  {previewUrl ? (
                    <div className="relative aspect-[4/3] w-full">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 shadow-lg backdrop-blur-sm">
                          Change Image
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-zinc-200">
                        <Upload className="h-5 w-5 text-zinc-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-zinc-700">Click to upload</p>
                        <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 border-t border-zinc-100 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/investment")}
              className="h-11 rounded-xl border-zinc-200 px-6 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-11 rounded-xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-md shadow-emerald-200 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-200/50 disabled:opacity-70 disabled:shadow-none transition-all"
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
