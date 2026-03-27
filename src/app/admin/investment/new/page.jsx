"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet2, Calendar, Clock, FileText, User, Image as ImageIcon, Upload, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useCreateInvestmentAdminMutation,
} from "@/features/investor/investments/investmentsApiSlice";
import { useCreateDeedMutation } from "@/features/admin/deed/deedApiSlice";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";

export default function AdminInvestmentCreatePage() {
  const router = useRouter();

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate(),
  )}`;
  const defaultTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  const [formValues, setFormValues] = useState({
    investorId: "",
    amount: "",
    date: defaultDate,
    time: defaultTime,
    startDate: defaultDate,
    endDate: "",
    reference: "",
    // Deed fields
    deedTitle: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [deedFile, setDeedFile] = useState(null);
  const [deedPdf, setDeedPdf] = useState(null);
  const [deedSignature, setDeedSignature] = useState(null);

  const [createInvestment, { isLoading: isCreating }] = useCreateInvestmentAdminMutation();
  const [createDeed, { isLoading: isCreatingDeed }] = useCreateDeedMutation();

  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    page: 1,
    limit: 100,
    search: "",
  });

  const investors =
    usersData?.items?.filter(
      (user) => user.role === "investor" && !user.isBanned,
    ) ?? [];

  const previewUrl = useMemo(() => {
    if (photoFile) {
      return URL.createObjectURL(photoFile);
    }
    return null;
  }, [photoFile]);

  useEffect(() => {
    if (!photoFile || !previewUrl) return;
    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [photoFile, previewUrl]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    setPhotoFile(file ?? null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.investorId) {
      toast.error("Investor is required");
      return;
    }
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
      const investmentResponse = await createInvestment({
        investorId: Number(formValues.investorId),
        amount: amountNumber,
        date: formValues.date,
        time: formValues.time,
        startDate: formValues.startDate || undefined,
        endDate: formValues.endDate || undefined,
        reference: formValues.reference || undefined,
        photoFile: photoFile || undefined,
      }).unwrap();

      const investmentId = investmentResponse?.id;

      if (investmentId && formValues.deedTitle) {
        const deedFormData = new FormData();
        deedFormData.append("title", formValues.deedTitle);
        deedFormData.append("investmentId", String(investmentId));
        if (formValues.date) deedFormData.append("issueDate", formValues.date);
        if (deedFile) deedFormData.append("file", deedFile);
        if (deedPdf) deedFormData.append("uploadPdf", deedPdf);
        if (deedSignature) deedFormData.append("signature", deedSignature);

        await createDeed(deedFormData).unwrap();
        toast.success("Investment and Deed created successfully");
      } else {
        toast.success("Investment created successfully");
      }

      router.push("/admin/investment");
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Something went wrong. Please try again.";
      toast.error("Process failed", { description: message });
    }
  };

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
              New Investment
            </h1>
            <p className="text-sm text-zinc-500">
              Record a new investment transaction from an investor.
            </p>
          </div>
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
                  htmlFor="investorId"
                  className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                >
                  <User className="h-3.5 w-3.5" />
                  Select Investor
                </label>
                <div className="relative">
                  <select
                    id="investorId"
                    value={formValues.investorId}
                    onChange={(e) => handleChange("investorId", e.target.value)}
                    className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 text-sm font-medium text-zinc-900 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none"
                    disabled={isUsersLoading || isCreating}
                    required
                  >
                    <option value="">
                      {isUsersLoading ? "Loading investors..." : "Select an investor..."}
                    </option>
                    {investors.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name || user.email} {user.email ? `(${user.email})` : ""}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
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

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="startDate"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Start Date
                  </label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formValues.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="endDate"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    End Date
                  </label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formValues.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
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

          {/* Deed Section */}
          <div className="space-y-6 border-t border-zinc-100 pt-8">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-zinc-900">Deed Details (Optional)</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="deedTitle"
                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5"
                  >
                    Deed Title
                  </label>
                  <Input
                    id="deedTitle"
                    value={formValues.deedTitle}
                    onChange={(e) => handleChange("deedTitle", e.target.value)}
                    placeholder="e.g. Land Property Deed"
                    className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 pl-4 text-sm font-medium focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:font-normal"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                      Deed File
                    </label>
                    <div className="relative h-11">
                      <input
                        type="file"
                        onChange={(e) => setDeedFile(e.target.files?.[0] ?? null)}
                        className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
                      />
                      <div className="flex h-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 transition-colors group-hover:bg-white">
                        <span className="truncate text-xs text-zinc-500">
                          {deedFile ? deedFile.name : "Choose file..."}
                        </span>
                        <Upload className="h-4 w-4 text-zinc-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                      Upload PDF
                    </label>
                    <div className="relative h-11">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setDeedPdf(e.target.files?.[0] ?? null)}
                        className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
                      />
                      <div className="flex h-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 transition-colors group-hover:bg-white">
                        <span className="truncate text-xs text-zinc-500">
                          {deedPdf ? deedPdf.name : "Choose PDF..."}
                        </span>
                        <FileText className="h-4 w-4 text-zinc-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Signature Image
                </label>
                <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 transition-colors hover:border-emerald-500/50 hover:bg-emerald-50/30 h-[100px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setDeedSignature(e.target.files?.[0] ?? null)}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center p-2">
                    {deedSignature ? (
                      <span className="text-xs font-medium text-emerald-600 truncate max-w-full px-2">
                        {deedSignature.name}
                      </span>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-zinc-400" />
                        <span className="text-[10px] font-medium text-zinc-500">Upload signature</span>
                      </>
                    )}
                  </div>
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
              disabled={isCreating || isCreatingDeed}
              className="h-11 rounded-xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-md shadow-emerald-200 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-200/50 disabled:opacity-70 disabled:shadow-none transition-all"
            >
              {isCreating || isCreatingDeed ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Investment</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
