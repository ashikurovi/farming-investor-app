"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ShieldBan,
  Wallet,
  TrendingUp,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { useGetUserQuery, useGetUserInvestmentsQuery } from "@/features/admin/users/usersApiSlice";
import { Button } from "@/components/ui/button";
import { AdminInvestorHeader } from "@/app/admin/components/investor/AdminInvestorHeader";
import { AdminInvestorProfileCard } from "@/app/admin/components/investor/AdminInvestorProfileCard";
import { AdminInvestorStats } from "@/app/admin/components/investor/AdminInvestorStats";
import { AdminInvestorPersonalDetails } from "@/app/admin/components/investor/AdminInvestorPersonalDetails";
import { AdminInvestorAccountInfo } from "@/app/admin/components/investor/AdminInvestorAccountInfo";
import { AdminInvestorRecentInvestments } from "@/app/admin/components/investor/AdminInvestorRecentInvestments";

export default function AdminInvestorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

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
    { skip: !id }
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
      value: `৳${Number(totalInvestedAmount).toLocaleString("en-US")}`,
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Total Profit",
      value: `৳${Number(user?.totalProfit ?? 0).toLocaleString("en-US")}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      label: "Current Balance",
      value: `৳${Number(user?.balance ?? 0).toLocaleString("en-US")}`,
      icon: DollarSign,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      label: "Total Cost",
      value: `৳${Number(user?.totalCost ?? 0).toLocaleString("en-US")}`,
      icon: CreditCard,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  if (isBusy) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="animate-pulse text-sm font-medium text-emerald-600">
            Loading investor profile...
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
      <AdminInvestorHeader user={user} onBack={() => router.push("/admin/investor")} />
      <AdminInvestorProfileCard user={user} />
      <AdminInvestorStats stats={stats} />
      <div className="grid gap-6 lg:grid-cols-2">
        <AdminInvestorPersonalDetails user={user} />
        <AdminInvestorAccountInfo user={user} />
      </div>
      <AdminInvestorRecentInvestments investments={investments} />
    </div>
  );
}
