import { ArrowLeft, ShieldBan, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export function AdminInvestorHeader({ user, onBack }) {
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

  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 rounded-xl bg-zinc-50 text-zinc-500 shadow-sm ring-1 ring-zinc-100 transition-all hover:bg-zinc-100 hover:text-zinc-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
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
            <span className="text-sm font-semibold">{statusConfig.label}</span>
          </div>
        )}
      </div>
    </header>
  );
}
