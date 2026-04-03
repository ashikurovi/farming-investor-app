"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronsLeft, ChevronsRight, LogOut, CircleHelp } from "lucide-react";
import { toast } from "sonner";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { sidebarNavigation } from "./sidebarNavigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeContext";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [yearText, setYearText] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { dark } = useTheme();

  const sidebarWidth = collapsed ? "w-16" : "w-56";

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
        className={`hidden ${sidebarWidth} flex-shrink-0 flex-col border-r border-zinc-100 bg-white px-2 py-5 transition-all duration-300 ease-in-out lg:flex sticky top-0 h-screen overflow-hidden dark:border-zinc-800 dark:bg-zinc-900`}
        style={{
          background: dark
            ? "linear-gradient(180deg, #09090b 0%, #18181b 100%)"
            : "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-secondary/80 to-transparent dark:from-zinc-950/40" />
        <div className="relative z-10 mb-6 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div
              className={`relative ${collapsed ? "h-8 w-8" : "h-10 w-10"} overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10`}
            >
              <Image
                src="/logo6.png"
                alt="Logo"
                fill
                sizes={collapsed ? "32px" : "40px"}
                className={
                  collapsed ? "object-contain p-1" : "object-contain p-1.5"
                }
                priority
              />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-primary">
                  Artman
                </div>
                <div className="text-[14px] font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
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
                  "group relative flex items-center gap-2.5 rounded-xl px-2 py-1.5 font-medium transition-all duration-200",
                  collapsed ? "justify-center" : "",
                  isActive
                    ? "bg-gradient-to-r from-[color:var(--brand-from)] via-[color:var(--brand-to)] to-[color:var(--brand-to)] text-primary-foreground shadow-[0_16px_40px_-28px_rgba(77,140,30,0.55)]"
                    : "text-zinc-500 hover:bg-secondary hover:text-primary dark:text-zinc-300",
                  "text-[12px]",
                ].join(" ")}
              >
                {isActive && !collapsed && (
                  <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[color:var(--brand-to)]" />
                )}
                {item.icon && (
                  <span
                    className={[
                      "relative flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-200 shrink-0",
                      isActive
                        ? "bg-white/20 text-primary-foreground"
                        : "bg-zinc-100 text-zinc-500 group-hover:bg-secondary group-hover:text-primary dark:bg-zinc-800 dark:text-zinc-300",
                    ].join(" ")}
                  >
                    <item.icon className="h-4 w-4" />
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
              className={`group flex w-full items-center gap-2.5 rounded-xl px-2 py-1.5 font-medium text-zinc-700 transition-all duration-200 hover:bg-secondary hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100 ${collapsed ? "justify-center" : ""}`}
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors shrink-0 group-hover:bg-secondary group-hover:text-primary dark:bg-zinc-800 dark:text-zinc-300">
                {collapsed ? (
                  <ChevronsRight className="h-4 w-4" />
                ) : (
                  <ChevronsLeft className="h-4 w-4" />
                )}
              </span>
              {!collapsed && (
                <span className="text-[12px] font-semibold text-zinc-500 group-hover:text-primary">
                  Collapse
                </span>
              )}
            </button>
          </div>
        </nav>

        <div className="mt-4 space-y-3">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" />
          {!collapsed && (
            <div
              className="rounded-2xl p-3"
              style={{
                background: dark
                  ? "linear-gradient(135deg, var(--secondary) 0%, #09090b 100%)"
                  : "linear-gradient(135deg, var(--secondary) 0%, #ffffff 100%)",
                border: "1px solid rgba(77,140,30,0.18)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-[color:rgba(77,140,30,0.14)] dark:bg-zinc-900">
                  <CircleHelp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-zinc-800 leading-tight dark:text-zinc-100">
                    Need help?
                  </div>
                  <div className="text-[11px] text-zinc-500 leading-tight dark:text-zinc-400">
                    Support center
                  </div>
                </div>
              </div>
              <Link
                href="/landing/contact"
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary ring-1 ring-[color:rgba(77,140,30,0.20)] transition-all hover:bg-primary hover:text-primary-foreground hover:ring-primary shadow-sm dark:bg-zinc-900"
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
            <div className="text-center pb-2">
              <p className="text-[10px] text-zinc-500 tracking-wide mb-1 dark:text-zinc-400">
                © {yearText || "—"} Artman
              </p>
              <p className="text-[9px] text-zinc-500 dark:text-zinc-400">
                Developed by{" "}
                <a
                  href="https://www.nexoviasoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline font-medium text-primary transition-colors"
                >
                  NexoviaSoft
                </a>
              </p>
            </div>
          )}
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 lg:hidden border-t border-zinc-200/70 bg-white/85 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-900/85">
        <div className="mx-auto grid max-w-xl grid-cols-6 px-1.5 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
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
                className="flex flex-col items-center justify-center gap-1 py-1.5"
              >
                <span
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_16px_40px_-26px_rgba(77,140,30,0.65)] ring-1 ring-[color:rgba(77,140,30,0.25)]"
                      : "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700",
                  ].join(" ")}
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                </span>
                <span
                  className={[
                    "max-w-[54px] truncate text-[9px] font-semibold leading-none",
                    isActive
                      ? "text-primary"
                      : "text-zinc-500 dark:text-zinc-400",
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
            className="flex flex-col items-center justify-center gap-1 py-1.5 disabled:opacity-60"
            aria-label="Logout"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-200 transition-all active:scale-[0.98] dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-500/20">
              <LogOut className="h-4 w-4" />
            </span>
            <span className="max-w-[54px] truncate text-[9px] font-semibold leading-none text-rose-600 dark:text-rose-300">
              Logout
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
