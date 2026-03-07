import { User, Phone, Mail, MapPin } from "lucide-react";

export function AdminInvestorPersonalDetails({ user }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/50 px-6 py-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900">
          <User className="h-4 w-4 text-emerald-500" />
          Personal Details
        </h3>
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500">
          Private
        </span>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
            <User className="h-5 w-5 text-zinc-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Full Name
            </p>
            <p className="text-sm font-semibold text-zinc-900">
              {user?.name || "-"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
              <Phone className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Phone Number
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {user?.phone || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
              <Mail className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                Email Address
              </p>
              <p className="truncate text-sm font-semibold text-zinc-900">
                {user?.email || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-zinc-100 bg-zinc-50/30 p-4 transition-colors hover:bg-zinc-50">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-zinc-200/50">
            <MapPin className="h-5 w-5 text-zinc-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Address
            </p>
            <p className="text-sm font-semibold text-zinc-900">
              {user?.address || "No address provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
