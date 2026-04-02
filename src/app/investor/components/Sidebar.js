"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronsLeft, ChevronsRight, LogOut, CircleHelp } from "lucide-react";
import { toast } from "sonner";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { sidebarNavigation } from "./sidebarNavigation";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [yearText, setYearText] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // ignore API/logout errors, state is cleared in slice
    } finally {
      toast.success("Logged out");
      router.push("/");
    }
  };

  useEffect(() => {
    setYearText(String(new Date().getFullYear()));
  }, []);

  return (
    <>
      <aside
        className={`hidden ${sidebarWidth} flex-shrink-0 flex-col border-r border-zinc-100 bg-white px-3 py-6 transition-all duration-300 ease-in-out lg:flex sticky top-0 h-screen overflow-hidden`}
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-50/60 to-transparent" />
        <div className="mb-6 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-xs font-semibold text-white shadow-lg shadow-emerald-300/30">
              FI
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-emerald-500">
                  Farming Intel
                </div>
                <div className="text-[13px] font-semibold tracking-tight text-zinc-800">
                  Investor
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 space-y-1 text-sm">
          {sidebarNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/investor" &&
                typeof pathname === "string" &&
                pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={[
                  "group relative flex items-center gap-3 rounded-xl px-2.5 py-2 font-medium transition-all duration-200",
                  collapsed ? "justify-center" : "",
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200/60"
                    : "text-zinc-500 hover:bg-emerald-50/80 hover:text-emerald-700",
                  "text-[13px]",
                ].join(" ")}
              >
                {isActive && !collapsed && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-emerald-400" />
                )}
                {item.icon && (
                  <span
                    className={[
                      "relative flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 shrink-0",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-100 text-zinc-500 group-hover:bg-emerald-100 group-hover:text-emerald-600",
                    ].join(" ")}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>
                )}
                {!collapsed && (
                  <span className="tracking-[-0.01em]">{item.name}</span>
                )}
              </Link>
            );
          })}

          <div className="pt-1">
            <button
              type="button"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 font-medium text-zinc-700 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-900 ${collapsed ? "justify-center" : ""}`}
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors shrink-0 group-hover:bg-emerald-100 group-hover:text-emerald-600">
                {collapsed ? (
                  <ChevronsRight className="h-5 w-5" />
                ) : (
                  <ChevronsLeft className="h-5 w-5" />
                )}
              </span>
              {!collapsed && (
                <span className="text-[13px] font-semibold text-zinc-500 group-hover:text-emerald-700">
                  Collapse
                </span>
              )}
            </button>
          </div>
        </nav>

        <div className="mt-4 space-y-3">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
          {!collapsed && (
            <div
              className="rounded-2xl p-3.5"
              style={{
                background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                border: "1px solid #d1fae5",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
                  <CircleHelp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-800 leading-tight">
                    Need help?
                  </div>
                  <div className="text-[11px] text-zinc-500 leading-tight">
                    Support center
                  </div>
                </div>
              </div>
              <Link
                href="/landing/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700 ring-1 ring-emerald-200 transition-all hover:bg-emerald-600 hover:text-white hover:ring-emerald-600 shadow-sm"
              >
                Open support
              </Link>
            </div>
          )}
          <button
            type="button"
            disabled={isLoggingOut}
            className={`
              group flex items-center justify-center gap-2 rounded-xl border transition-all duration-200
              text-xs font-semibold
              border-rose-100 bg-rose-50 text-rose-500
              hover:border-rose-200 hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-200/50
              disabled:opacity-50 disabled:cursor-not-allowed
              ${collapsed ? "w-10 h-10 mx-auto px-0" : "w-full py-2.5 px-3"}
            `}
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {!collapsed && (
              <span>{isLoggingOut ? "Logging out…" : "Logout"}</span>
            )}
          </button>
          {!collapsed && (
            <div className="text-center text-[11px] text-zinc-500">
              © {yearText || "—"} Farming Intel
            </div>
          )}
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 lg:hidden border-t border-zinc-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-lg grid-cols-5 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
          {sidebarNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/investor" &&
                typeof pathname === "string" &&
                pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1.5 py-1.5"
              >
                <span
                  className={[
                    "flex h-11 w-11 items-center justify-center rounded-2xl transition-all",
                    isActive
                      ? "bg-emerald-600 text-white shadow-[0_16px_40px_-26px_rgba(16,185,129,0.7)] ring-1 ring-emerald-500/30"
                      : "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200",
                  ].join(" ")}
                >
                  {Icon ? <Icon className="h-5 w-5" /> : null}
                </span>
                <span
                  className={[
                    "text-[10px] font-semibold leading-none",
                    isActive ? "text-emerald-700" : "text-zinc-500",
                  ].join(" ")}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1.5 py-1.5 disabled:opacity-60"
            aria-label="Logout"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-200 transition-all active:scale-[0.98]">
              <LogOut className="h-5 w-5" />
            </span>
            <span className="text-[10px] font-semibold leading-none text-rose-600">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
