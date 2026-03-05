"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShieldBan, ShieldCheck } from "lucide-react";
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
    };
  }, [user]);

  const investments = user?.investments ?? [];
  const photo = user?.photoUrl
    ? (typeof user.photoUrl === "string"
        ? user.photoUrl.replace(/`/g, "").trim()
        : "")
    : "";

  const totalInvestedAmount = useMemo(() => {
    if (!investments.length) return 0;
    return investments.reduce(
      (sum, inv) => sum + Number(inv.amount ?? 0),
      0,
    );
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

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.push("/admin/investor")}
            className="h-9 w-9 rounded-full border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
              Investor details
            </h1>
            <p className="text-sm text-zinc-500">
              View profile, contact information and status.
            </p>
          </div>
        </div>

        {statusConfig && (
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${statusConfig.className}`}
            >
              <statusConfig.Icon className="h-3 w-3" />
              {statusConfig.label}
            </span>
          </div>
        )}
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1.2fr)]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            {isBusy && (
              <div className="flex h-32 items-center justify-center text-sm text-zinc-500">
                Loading investor...
              </div>
            )}

            {!isBusy && isError && (
              <div className="flex h-32 items-center justify-center text-sm text-red-600">
                Failed to load investor. Please try again.
              </div>
            )}

            {!isBusy && !isError && user && (
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50 text-lg font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  {photo ? (
                    <Image
                      width={64}
                      height={64}
                      src={photo}
                      alt={user.name || user.email}
                      className="h-16 w-16 rounded-2xl object-cover"
                      unoptimized
                    />
                  ) : (
                    <span>
                      {(user.name || user.email || "?")
                        .substring(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-zinc-900">
                    {user.name || "Unnamed investor"}
                  </h2>
                  <p className="text-sm text-zinc-500">{user.email}</p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500">
                    {user.role && (
                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 font-medium">
                        Role: {user.role}
                      </span>
                    )}
                    {typeof user.isBanned === "boolean" && (
                      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 font-medium">
                        Status: {user.isBanned ? "Banned" : "Active"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isBusy && !isError && user && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Profile information
              </h3>

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Name
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {user.name || "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Email
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {user.email || "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Phone
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {user.phone || "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Role
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {user.role || "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Location
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {user.location || "-"}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Total investments
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {investments.length}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Total amount invested (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {totalInvestedAmount}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Investment (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {Number(user.totalInvestment ?? 0).toFixed(2)}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Profit (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {Number(user.totalProfit ?? 0).toFixed(2)}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Balance (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {Number(user.balance ?? 0).toFixed(2)}
                  </dd>
                </div>

                <div className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Total Cost (BDT)
                  </dt>
                  <dd className="text-sm text-zinc-900">
                    {Number(user.totalCost ?? 0).toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>

 
      </section>
    </div>
  );
}
