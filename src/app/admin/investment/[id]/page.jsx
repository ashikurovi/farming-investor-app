"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Wallet2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useGetInvestmentAdminQuery, useDeleteInvestmentAdminMutation } from "@/features/investor/investments/investmentsApiSlice";
import { useGetUserQuery } from "@/features/admin/users/usersApiSlice";
import { toast } from "sonner";
import { formatNumber, formatCurrencyBDT } from "@/lib/utils";

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

  

  const investorId = investment?.investorId;
  const { data: user } = useGetUserQuery(investorId, { skip: !investorId });

  

  const investmentDate =
    investment?.date && investment?.time
      ? `${investment.date} ${investment.time}`
      : investment?.date ?? "-";

  const handleDelete = async () => {
    if (!investment) return;
    const confirmed = window.confirm(
      `Delete ${formatCurrencyBDT(investment.amount)} investment for investor #${investment.investorId}? This action cannot be undone.`,
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
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
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
              Investment details
            </h1>
            <p className="text-sm text-zinc-500">
              View key information about this investment record.
            </p>
          </div>
        </div>

        
      </header>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1.1fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Investment summary
                </CardTitle>
                <Wallet2 className="h-4 w-4 text-emerald-500" />
              </div>
              <CardDescription>
                High-level overview of this specific investment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isBusy && (
                <div className="flex h-24 items-center justify-center text-sm text-zinc-500">
                  Loading investment...
                </div>
              )}

              {!isBusy && isError && (
                <div className="flex h-24 items-center justify-center text-sm text-red-600">
                  Failed to load investment. Please try again.
                </div>
              )}

              {!isBusy && !isError && investment && (
                <dl className="space-y-4 text-sm text-zinc-900">
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Amount (BDT)
                    </dt>
                    <dd>{formatCurrencyBDT(investment.amount)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Date & time
                    </dt>
                    <dd>{investmentDate || "-"}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                      Investor ID
                    </dt>
                    <dd>#{investment.investorId}</dd>
                  </div>
                </dl>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Investor
                </CardTitle>
                <Users className="h-4 w-4 text-emerald-500" />
              </div>
              <CardDescription>
                Basic details about the user who made this investment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isBusy && !isError && user ? (
                <dl className="space-y-3 text-sm text-zinc-900">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Name
                    </dt>
                    <dd>{user.name || "Unknown"}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Email
                    </dt>
                    <dd>{user.email || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Phone
                    </dt>
                    <dd>{user.phone || "-"}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                      Location
                    </dt>
                    <dd>{user.location || "-"}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-xs text-zinc-500">
                  {isBusy
                    ? "Loading investor..."
                    : "No investor information available."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-600">
                Use this page to quickly verify who invested, how much they
                invested, and which project it belongs to before making edits
                or deleting the record.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting || isBusy || isError || !investment}
                  className="h-8 rounded-full border-red-200 text-xs text-red-600 hover:bg-red-50"
                >
                  {isDeleting ? "Deleting..." : "Delete investment"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
