"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Wallet2,
  Calendar,
  Clock,
  FileText,
  User,
  ImageIcon,
  Trash2,
  Pencil,
  Plus,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetInvestmentsAdminQuery,
  useDeleteInvestmentAdminMutation,
} from "@/features/investor/investments/investmentsApiSlice";
import { useGetUserQuery } from "@/features/admin/users/usersApiSlice";
import {
  useGetDeedsQuery,
  useCreateDeedMutation,
} from "@/features/admin/deed/deedApiSlice";
import { toast } from "sonner";

export default function AdminInvestorInvestmentsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id; // This is the investorId

  const {
    data: allInvestmentsData,
    isLoading: isInvestmentsLoading,
    isFetching,
    isError,
  } = useGetInvestmentsAdminQuery(undefined, {
    skip: !id,
  });

  const allInvestments = Array.isArray(allInvestmentsData) ? allInvestmentsData : [];
  const investments = allInvestments.filter((inv) => String(inv.investorId) === String(id));

  const isBusy = isInvestmentsLoading || isFetching;

  const [deleteInvestment, { isLoading: isDeleting }] = useDeleteInvestmentAdminMutation();

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

  const { data: user, isLoading: isUserLoading } = useGetUserQuery(id, {
    skip: !id,
  });

  const { data: deedsData, isLoading: isDeedsLoading } = useGetDeedsQuery({
    limit: 1000,
  });

  // unified deed logic: find if any of the investments has a deed
  const deed = useMemo(() => {
    if (!deedsData || investments.length === 0) return null;
    const items = deedsData?.data ?? deedsData?.items ?? deedsData ?? [];
    return items.find((d) => investments.some(inv => String(d.investmentId) === String(inv.id)));
  }, [deedsData, investments]);

  const [createDeed, { isLoading: isCreatingDeed }] = useCreateDeedMutation();

  const [deedForm, setDeedForm] = useState({
    title: `Unified Deed for Investor #${id}`,
    issueDate: new Date().toISOString().split("T")[0],
    file: null,
    uploadPdf: null,
    signature: null,
  });

  const handleDeedFormChange = (field, value) => {
    setDeedForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeedSubmit = async (e) => {
    e.preventDefault();

    if (investments.length === 0) {
      toast.error("No investments found to attach the deed to.");
      return;
    }

    if (!deedForm.title.trim()) {
      toast.error("Deed title is required");
      return;
    }
    if (!deedForm.issueDate) {
      toast.error("Issue date is required");
      return;
    }

    // Attach deed to their oldest/first investment
    const primaryInvestmentId = investments[0].id;

    try {
      const formData = new FormData();
      formData.append("title", deedForm.title.trim());
      formData.append("investmentId", primaryInvestmentId); // attaching to the first one safely
      if (deedForm.issueDate) formData.append("issueDate", deedForm.issueDate);
      if (deedForm.file) formData.append("file", deedForm.file);
      if (deedForm.uploadPdf) formData.append("uploadPdf", deedForm.uploadPdf);
      if (deedForm.signature) formData.append("signature", deedForm.signature);

      await createDeed(formData).unwrap();
      toast.success("Unified Deed created successfully");
    } catch (error) {
      toast.error("Failed to create deed", {
        description: error?.data?.message || "Please try again.",
      });
    }
  };

  const handleDelete = async (investment) => {
    const confirmed = window.confirm(
      `Delete ${formatNumber(investment.amount)} BDT investment? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteInvestment(investment.id).unwrap();
      toast.success("Investment deleted successfully");
      if (investments.length <= 1) {
        router.push("/admin/investment");
      }
    } catch (error) {
      const message =
        error?.data?.message ||
        (Array.isArray(error?.data?.message) ? error.data.message[0] : null) ||
        "Failed to delete investment.";
      toast.error("Delete failed", { description: message });
    }
  };

  if (isBusy) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent dark:border-emerald-400"></div>
      </div>
    );
  }

  if (isError || investments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">
          <Trash2 className="h-6 w-6" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            No Investments Found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            There are no investments for this investor or they have been deleted.
          </p>
        </div>
        <Button onClick={() => router.push("/admin/investment")}>Go Back</Button>
      </div>
    );
  }

  const totalAmount = investments.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
  
  let unifiedStartDate = null;
  let unifiedEndDate = null;
  investments.forEach(inv => {
    if (!unifiedStartDate || new Date(inv.startDate) < new Date(unifiedStartDate)) {
       unifiedStartDate = inv.startDate;
    }
    if (!unifiedEndDate || new Date(inv.endDate) > new Date(unifiedEndDate)) {
       unifiedEndDate = inv.endDate;
    }
  });

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
            className="mt-1 h-10 w-10 shrink-0 rounded-xl border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              Investor Investments
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              View comprehensive information about all investments for this investor.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investor Info Card */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <User className="h-4 w-4" />
                </div>
                Investor Information
              </h2>
            </div>

            <div className="rounded-2xl bg-zinc-50/50 p-4 border border-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/30">
              {isUserLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 w-1/3 rounded bg-zinc-200"></div>
                  <div className="h-3 w-1/2 rounded bg-zinc-200"></div>
                </div>
              ) : user ? (
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-lg">
                    {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {user.name || "Unknown Name"}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      ID: #{user.id} • {user.phone || "No phone"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Investor information unavailable
                </div>
              )}
            </div>
            
            <div className="mt-6 flex flex-wrap gap-4">
               <div className="rounded-2xl bg-emerald-50/50 p-4 border border-emerald-100 dark:border-emerald-900/30 dark:bg-emerald-900/10 flex-1">
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Total Amount</span>
                  <span className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">৳{formatNumber(totalAmount)}</span>
               </div>
               <div className="rounded-2xl bg-purple-50/50 p-4 border border-purple-100 dark:border-purple-900/30 dark:bg-purple-900/10 flex-1">
                  <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 uppercase tracking-wider block">Investments Count</span>
                  <span className="text-2xl font-bold text-purple-800 dark:text-purple-300">{investments.length} Deals</span>
               </div>
            </div>
          </section>

          {/* Investment List Cards */}
          <section className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Wallet2 className="h-4 w-4" />
              </div>
              Transaction Details
            </h2>
            
            {investments.map((investment, idx) => (
               <div key={investment.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
                     <span className="font-bold text-zinc-700 dark:text-zinc-200">Investment #{idx + 1}</span>
                     
                     <div className="flex items-center gap-2">
                        {(() => {
                           const end = investment?.endDate ? new Date(investment.endDate) : null;
                           const now = new Date();
                           const isExpired = end && !isNaN(end) && end < now;
                           const effectiveActive = investment.isActive && !isExpired;
                           return (
                             <div className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ring-inset ${
                               isExpired
                                 ? "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20"
                                 : effectiveActive
                                   ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20"
                                   : "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700"
                             }`}>
                               {isExpired ? "Expired" : effectiveActive ? "Active" : "Inactive"}
                             </div>
                           );
                        })()}
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={(e) => {
                             e.stopPropagation();
                             router.push(`/admin/investment/${investment.id}/edit`);
                           }}
                           className="h-7 w-7 rounded-full text-zinc-400 hover:bg-zinc-50 hover:text-blue-600"
                        >
                           <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(investment);
                           }}
                           className="h-7 w-7 rounded-full text-zinc-400 hover:bg-red-50 hover:text-red-600"
                        >
                           <Trash2 className="h-3 w-3" />
                        </Button>
                     </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                           <Wallet2 className="h-3.5 w-3.5" />
                           Amount
                        </label>
                        <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                           ৳{formatNumber(investment.amount)}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                           <FileText className="h-3.5 w-3.5" />
                           Reference
                        </label>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                           {investment.reference || "N/A"}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                           <Calendar className="h-3.5 w-3.5" />
                           Date & Time
                        </label>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                           {investment.date || "-"} {investment.time && `• ${investment.time}`}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                           <Calendar className="h-3.5 w-3.5" />
                           Start Date
                        </label>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                           {investment.startDate || "-"}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                           <Calendar className="h-3.5 w-3.5" />
                           End Date
                        </label>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                           {investment.endDate || "-"}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
          </section>

          {/* Unified Deed Section */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <FileText className="h-4 w-4" />
                </div>
                Unified Investment Deed
              </h2>
              {deed && (
                <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20">
                  Issued
                </div>
              )}
            </div>

            {isDeedsLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 w-full rounded bg-zinc-100"></div>
                <div className="h-4 w-2/3 rounded bg-zinc-100"></div>
              </div>
            ) : deed ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
                   <p className="text-xs text-indigo-800 font-medium tracking-wide">Deed exists for this investor. It applies to all their investments.</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                      Title
                    </label>
                    <div className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {deed.title}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                      Issue Date
                    </label>
                    <div className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      {deed.issueDate || "-"}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {deed.file && (
                    <a
                      href={deed.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/40 dark:hover:bg-zinc-800"
                    >
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Photo
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    </a>
                  )}
                  {deed.uploadPdf && (
                    <a
                      href={deed.uploadPdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/40 dark:hover:bg-zinc-800"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          PDF
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    </a>
                  )}
                  {deed.signature && (
                    <a
                      href={deed.signature}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/40 dark:hover:bg-zinc-800"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                          Signature
                        </span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-amber-800 ring-1 ring-inset ring-amber-600/10 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">
                    No deed has been issued for this investor yet. We will issue one that spans all their investments.
                  </p>
                </div>

                <form
                  onSubmit={handleDeedSubmit}
                  className="space-y-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-800/30"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    Issue Unified Deed
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Deed Title
                      </label>
                      <Input
                        value={deedForm.title}
                        onChange={(e) => handleDeedFormChange("title", e.target.value)}
                        placeholder="e.g. Agreement Deed"
                        required
                        className="bg-white dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Issue Date
                      </label>
                      <Input
                        type="date"
                        value={deedForm.issueDate}
                        onChange={(e) => handleDeedFormChange("issueDate", e.target.value)}
                        required
                        className="bg-white dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Deed Photo
                      </label>
                      <Input
                        type="file"
                        onChange={(e) => handleDeedFormChange("file", e.target.files?.[0])}
                        className="bg-white text-xs file:text-xs dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Deed PDF
                      </label>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleDeedFormChange("uploadPdf", e.target.files?.[0])}
                        className="bg-white text-xs file:text-xs dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Signature
                      </label>
                      <Input
                        type="file"
                        onChange={(e) => handleDeedFormChange("signature", e.target.files?.[0])}
                        className="bg-white text-xs file:text-xs dark:bg-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isCreatingDeed}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                    >
                      {isCreatingDeed ? "Issuing Deed..." : "Issue Unified Deed Now"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Payment Proofs */}
        <div className="space-y-6">
          <section className="h-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300">
                <ImageIcon className="h-4 w-4" />
              </div>
              Payment Proofs
            </h2>

            <div className="space-y-6">
              {investments.map((investment, idx) => (
                <div key={`proof-${investment.id}`} className="space-y-2">
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Investment #{idx + 1} • ৳{formatNumber(investment.amount)}</div>
                  <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30">
                    {investment.photo ? (
                      <div className="relative aspect-[4/3] w-full bg-black/5">
                        <img
                          src={investment.photo}
                          alt={`Proof for investment #${idx + 1}`}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                          <a
                            href={investment.photo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity dark:bg-zinc-900 dark:text-zinc-100"
                          >
                            View Full Size
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                          No proof uploaded
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
