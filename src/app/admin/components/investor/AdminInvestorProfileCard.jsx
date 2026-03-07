import Image from "next/image";
import { Mail, Phone, Briefcase, ShieldCheck } from "lucide-react";

export function AdminInvestorProfileCard({ user }) {
  const photo =
    user?.photoUrl && typeof user.photoUrl === "string"
      ? user.photoUrl.replace(/`/g, "").trim()
      : "";

  return (
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
                  alt={user?.name || user?.email}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-3xl font-bold text-zinc-400 sm:text-4xl">
                  {(user?.name || user?.email || "?").substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-lg bg-white p-1.5 shadow-md ring-1 ring-zinc-100">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
            </div>
          </div>

          <div className="flex-1 space-y-2 pb-2">
            <h2 className="text-3xl font-bold text-zinc-900">
              {user?.name || "Unnamed Investor"}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-emerald-500" />
                {user?.email}
              </div>
              {user?.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  {user.phone}
                </div>
              )}
              {user?.role && (
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
  );
}
