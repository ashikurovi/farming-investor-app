"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShieldBan,
  ShieldCheck,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Wallet,
  TrendingUp,
  DollarSign,
  Briefcase,
  CreditCard,
  Building2,
} from "lucide-react";
import { useGetUserQuery } from "@/features/admin/users/usersApiSlice";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  const isBusy = isLoading || isFetching;

  const statusConfig = useMemo(() => {
    if (!user) return null;

    const isBanned = user.isBanned;

    return {
      label: isBanned ? "Banned" : "Active",
      className: isBanned
        ? "bg-red-50 text-red-700 ring-red-100"
        : "bg-emerald-50 text-emerald-700 ring-emerald-100",
      Icon: isBanned ? ShieldBan : ShieldCheck,
      containerClass: isBanned ? "bg-red-50/50" : "bg-emerald-50/50",
    };
  }, [user]);

  const investments = user?.investments ?? [];
  const photo = user?.photoUrl
    ? typeof user.photoUrl === "string"
      ? user.photoUrl.replace(/`/g, "").trim()
      : ""
    : "";

  const totalInvestedAmount = useMemo(() => {
    if (!investments.length) return 0;
    return investments.reduce((sum, inv) => sum + Number(inv.amount ?? 0), 0);
  }, [investments]);

  const uniqueProjects = useMemo(() => {
    const map = new Map();
    for (const inv of investments) {
      const key = inv.projectId;
      if (!map.has(key)) {
        map.set(key, {
          id: inv.projectId,
          title: inv.project?.title ?? `Project #${inv.projectId}`,
        });
      }
    }
    return Array.from(map.values());
  }, [investments]);

  const stats = [
    {
      label: "Total Investment",
      value: `৳${Number(totalInvestedAmount).toLocaleString()}`,
      icon: Wallet,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      label: "Total Profit",
      value: `৳${Number(user?.totalProfit ?? 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      label: "Current Balance",
      value: `৳${Number(user?.balance ?? 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
    },
    {
      label: "Total Cost",
      value: `৳${Number(user?.totalCost ?? 0).toLocaleString()}`,
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
      {/* Header Navigation */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/investor")}
            className="h-10 w-10 rounded-xl bg-white text-zinc-500 shadow-sm transition-all hover:bg-zinc-50 hover:text-zinc-900 hover:shadow-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Investor Profile
            </h1>
            <p className="text-sm font-medium text-zinc-500">
              Manage investor information and portfolio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {statusConfig && (
            <div
              className={`flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ring-inset ${statusConfig.className} ${statusConfig.containerClass}`}
            >
              <statusConfig.Icon className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {statusConfig.label}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Profile Card */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="absolute inset-0 h-32 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent"></div>
        <div className="relative px-6 pt-12 pb-6 sm:px-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
            <div className="relative -mt-6">
              <div className="h-24 w-24 overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white sm:h-32 sm:w-32">
                {photo ? (
                  <Image
                    width={128}
                    height={128}
                    src={photo}
                    alt={user.name || user.email}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-3xl font-bold text-zinc-400 sm:text-4xl">
                    {(user.name || user.email || "?")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-lg bg-white p-1.5 shadow-md ring-1 ring-zinc-100">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </div>
            </div>

            <div className="flex-1 space-y-2 pb-2">
              <h2 className="text-3xl font-bold text-zinc-900">
                {user.name || "Unnamed Investor"}
              </h2>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-emerald-500" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4 text-emerald-500" />
                    {user.phone}
                  </div>
                )}
                {user.role && (
                  <div className="flex items-center gap-1.5 capitalize">
                    <Briefcase className="h-4 w-4 text-emerald-500" />
                    {user.role}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${stat.border}`}
          >
            <div
              className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-5 transition-transform group-hover:scale-110 ${stat.bg.replace(
                "bg-",
                "bg-",
              )}`}
            ></div>
            <div className="relative">
              <div className="mb-4 inline-flex rounded-xl bg-gray-50 p-2.5 ring-1 ring-gray-100">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="flex items-center justify-between">
                <dt className="truncate text-sm font-medium text-gray-500">
                  {stat.label}
                </dt>
                <dd className="text-2xl font-bold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Info Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-6 py-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900">
              <User className="h-4 w-4 text-emerald-500" />
              Personal Details
            </h3>
          </div>
          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Full Name
              </label>
              <p className="text-sm font-medium text-zinc-900">
                {user.name || "-"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Phone Number
              </label>
              <p className="text-sm font-medium text-zinc-900">
                {user.phone || "-"}
              </p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Email Address
              </label>
              <p className="text-sm font-medium text-zinc-900">
                {user.email || "-"}
              </p>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Address
              </label>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-zinc-400" />
                <p className="text-sm font-medium text-zinc-900">
                  {user.address || "No address provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="border-b border-zinc-100 px-6 py-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900">
              <Building2 className="h-4 w-4 text-emerald-500" />
              Account Information
            </h3>
          </div>
          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Account Status
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-2.5 w-2.5 rounded-full ${
                    user.isBanned ? "bg-red-500" : "bg-emerald-500"
                  }`}
                ></span>
                <p className="text-sm font-medium text-zinc-900">
                  {user.isBanned ? "Banned" : "Active"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Member Role
              </label>
              <p className="text-sm font-medium capitalize text-zinc-900">
                {user.role || "Investor"}
              </p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Joined Date
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <p className="text-sm font-medium text-zinc-900">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Investor Type
              </label>
              <p className="text-sm font-medium text-zinc-900">
                {user.investorType?.type || "Standard"}
                {user.investorType?.percentage && (
                  <span className="ml-1 text-xs text-zinc-500">
                    ({user.investorType.percentage}%)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
