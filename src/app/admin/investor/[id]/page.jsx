"use client";

import { useMemo, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldBan,
  Wallet,
  TrendingUp,
  DollarSign,
  CreditCard,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  ShieldCheck,
  Briefcase,
  Calendar,
  Banknote,
} from "lucide-react";
import {
  useGetUserQuery,
  useGetUserInvestmentsQuery,
} from "@/features/admin/users/usersApiSlice";
import { Button } from "@/components/ui/button";
import { AdminInvestorHeader } from "@/app/admin/components/investor/AdminInvestorHeader";
import { AdminInvestorProfileCard } from "@/app/admin/components/investor/AdminInvestorProfileCard";
import { AdminInvestorStats } from "@/app/admin/components/investor/AdminInvestorStats";
import { AdminInvestorPersonalDetails } from "@/app/admin/components/investor/AdminInvestorPersonalDetails";
import { AdminInvestorAccountInfo } from "@/app/admin/components/investor/AdminInvestorAccountInfo";
import { AdminInvestorRecentInvestments } from "@/app/admin/components/investor/AdminInvestorRecentInvestments";
import { formatCurrencyBDT } from "@/lib/utils";

export default function AdminInvestorDetailPage() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useGetUserQuery(id, {
    skip: !id,
  });

  const { data: invData } = useGetUserInvestmentsQuery(
    { id, page: 1, limit: 100 },
    { skip: !id },
  );

  const isBusy = isLoading || isFetching;

  const investments = invData?.items ?? [];

  const totalInvestedAmount = useMemo(() => {
    if (!investments.length) return 0;
    return investments.reduce((sum, inv) => sum + Number(inv.amount ?? 0), 0);
  }, [investments]);

  const stats = [
    {
      label: "Total Investment",
      value: formatCurrencyBDT(totalInvestedAmount),
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Total Profit",
      value: formatCurrencyBDT(user?.totalProfit ?? 0),
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      label: "Current Balance",
      value: formatCurrencyBDT(user?.balance ?? 0),
      icon: DollarSign,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    // ggg
    {
      label: "Total Cost",
      value: formatCurrencyBDT(user?.totalCost ?? 0),
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  if (!mounted || isBusy) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="animate-pulse text-sm font-medium text-emerald-600">
            Loading…
          </p>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-red-50 p-4 ring-1 ring-red-100">
          <ShieldBan className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Investor Not Found
        </h3>
        <p className="max-w-xs text-sm text-gray-500">
          We couldn't retrieve the investor details. They might have been
          deleted or don't exist.
        </p>
        <Button onClick={() => router.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 pb-10">
      <AdminInvestorHeader
        user={user}
        onBack={() => router.push("/admin/investor")}
      />
      <AdminInvestorProfileCard user={user} />
      <AdminInvestorStats stats={stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/40">
            <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              <User className="h-4 w-4 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
              Personal Details
            </h3>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
              Private
            </span>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                <User className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Full Name
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {user.name || "-"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                  <Phone className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Phone Number
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {user.phone || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                  <Mail className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Email Address
                  </p>
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {user.email || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                <MapPin className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Address
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {user.address || "No address provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-800/40">
            <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
              <Building2 className="h-4 w-4 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
              Account Information
            </h3>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
              System
            </span>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                  <ShieldCheck className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Account Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex h-2 w-2 rounded-full ${
                        user.isBanned ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    ></span>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {user.isBanned ? "Banned" : "Active"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                  <Briefcase className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Member Role
                  </p>
                  <p className="text-sm font-semibold capitalize text-zinc-900 dark:text-zinc-100">
                    {user.role || "Investor"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                  <Calendar className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Joined Date
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-900 dark:ring-zinc-800">
                  <TrendingUp className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Investor Type
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {user.investorType?.type || "Standard"}
                    {user.investorType?.percentage && (
                      <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                        ({user.investorType.percentage}%)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminInvestorRecentInvestments investments={investments} />
    </div>
  );
}
