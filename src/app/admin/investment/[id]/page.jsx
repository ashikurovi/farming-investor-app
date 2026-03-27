"use client";

import { useMemo } from "react";
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
  Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetInvestmentAdminQuery, useDeleteInvestmentAdminMutation } from "@/features/investor/investments/investmentsApiSlice";
import { useGetUserQuery } from "@/features/admin/users/usersApiSlice";
import { toast } from "sonner";

export default function AdminInvestmentDetailPage() {
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

  const isBusy = isLoading || isFetching;

  const [deleteInvestment, { isLoading: isDeleting }] =
    useDeleteInvestmentAdminMutation();

  const formatNumber = (value) =>
    Number(value || 0).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

  const investorId = investment?.investorId;
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(investorId, { skip: !investorId });

  const handleDelete = async () => {
    if (!investment) return;
    const confirmed = window.confirm(
      `Delete ${formatNumber(investment.amount)} BDT investment for investor #${investment.investorId}? This action cannot be undone.`,
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
              Investment Details
            </h1>
            <p className="text-sm text-zinc-500">
              View comprehensive information about this investment record.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/investment/${id}/edit`)}
            className="h-10 gap-2 rounded-xl border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>

          <Button
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
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investor Info Card */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <User className="h-4 w-4" />
                </div>
                Investor Information
              </h2>
            </div>

            <div className="rounded-2xl bg-zinc-50/50 p-4 border border-zinc-100">
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
                    <h3 className="font-semibold text-zinc-900">{user.name || "Unknown Name"}</h3>
                    <p className="text-sm text-zinc-500">{user.email}</p>
                    <p className="text-xs text-zinc-400">ID: #{user.id} • {user.phone || "No phone"}</p>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-zinc-500">Investor information unavailable</div>
              )}
            </div>
          </section>

          {/* Investment Details Card */}
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Wallet2 className="h-4 w-4" />
                </div>
                Transaction Details
              </h2>
              <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                Verified
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                  <Wallet2 className="h-3.5 w-3.5" />
                  Amount
                </label>
                <div className="text-2xl font-bold text-zinc-900">
                  ৳{formatNumber(investment.amount)}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  Reference
                </label>
                <div className="text-base font-medium text-zinc-900">
                  {investment.reference || "N/A"}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Date
                </label>
                <div className="text-base font-medium text-zinc-900">
                  {investment.date || "-"}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Time
                </label>
                <div className="text-base font-medium text-zinc-900">
                  {investment.time || "-"}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Proof/Photo */}
        <div className="space-y-6">
          <section className="h-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-zinc-900">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <ImageIcon className="h-4 w-4" />
              </div>
              Payment Proof
            </h2>

            <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
              {investment.photo ? (
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src={investment.photo}
                    alt="Payment Proof"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                    <a
                      href={investment.photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-zinc-900 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View Full Size
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-zinc-500">No payment proof uploaded</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
