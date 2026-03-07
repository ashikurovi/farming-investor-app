import { Building2, ShieldCheck, Briefcase, Calendar, TrendingUp } from "lucide-react";

export function AdminInvestorAccountInfo({ user }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900">
          <Building2 className="h-4 w-4 text-emerald-500" />
          Account Information
        </h3>
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
          System
        </span>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
              <ShieldCheck className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Account Status
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-2 w-2 rounded-full ${
                    user?.isBanned ? "bg-red-500" : "bg-emerald-500"
                  }`}
                ></span>
                <p className="text-sm font-semibold text-zinc-900">
                  {user?.isBanned ? "Banned" : "Active"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
              <Briefcase className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Member Role
              </p>
              <p className="text-sm font-semibold capitalize text-zinc-900">
                {user?.role || "Investor"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
              <Calendar className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Joined Date
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", { timeZone: "UTC" })
                  : "-"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
              <TrendingUp className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Investor Type
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {user?.investorType?.type || "Standard"}
                {user?.investorType?.percentage && (
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
