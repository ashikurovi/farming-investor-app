"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { useGetContactsQuery } from "@/features/contact/contactApiSlice";
import { sidebarNavigation } from "./sidebarNavigation";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [yearText, setYearText] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const { data: contactsData } = useGetContactsQuery();

  const sidebarWidth = collapsed ? "w-[72px]" : "w-[240px]";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // ignore
    } finally {
      toast.success("Logged out");
      router.push("/");
    }
  };

  const contactsCount = Array.isArray(contactsData) ? contactsData.length : 0;

  const toggleGroup = (title) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  useEffect(() => {
    const y = new Date().getUTCFullYear();
    setYearText(String(y));
  }, []);

  const renderNavItem = (item, isNested = false) => {
    const isContactItem = item.href === "/admin/contact";
    const isActive =
      pathname === item.href ||
      (item.href !== "/admin" &&
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
          isNested && !collapsed ? "text-xs" : "text-[13px]",
        ].join(" ")}
      >
        {/* Active left accent bar */}
        {isActive && !collapsed && (
          <span className="absolute -left-4 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-emerald-400" />
        )}

        {/* Tree connector */}
        {isNested && !collapsed && (
          <span className="absolute -left-3 top-1/2 h-px w-2.5 bg-zinc-200" />
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
            {isContactItem && contactsCount > 0 && collapsed && (
              <span className="absolute -right-1 -top-1 inline-flex h-3.5 min-w-[0.875rem] items-center justify-center rounded-full bg-rose-500 px-0.5 text-[7px] font-bold text-white ring-2 ring-white">
                {contactsCount}
              </span>
            )}
          </span>
        )}

        {!collapsed && (
          <>
            <span className="tracking-[-0.01em]">{item.name}</span>
            {isContactItem && contactsCount > 0 && (
              <span className="ml-auto inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm shadow-rose-200">
                {contactsCount}
              </span>
            )}
          </>
        )}

        {/* Collapsed tooltip */}
        {collapsed && (
          <span className="pointer-events-none invisible absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100 z-50">
            {item.name}
            <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-zinc-900" />
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={`
        hidden min-h-screen ${sidebarWidth} flex-col
        border-r border-zinc-100
        bg-white
        px-3 py-5
        transition-all duration-300 ease-in-out
        lg:flex
        relative
      `}
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
      }}
    >
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-50/60 to-transparent" />

      {/* ── Logo ── */}
      <div
        className={`relative mb-6 flex items-center ${collapsed ? "justify-center" : "gap-3 px-1"}`}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-xs font-bold text-white shadow-lg shadow-emerald-300/40"
          style={{
            background:
              "linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)",
          }}
        >
          FI
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.28em] text-emerald-500">
              Farming Intel
            </div>
            <div className="text-[13px] font-semibold tracking-tight text-zinc-800">
              Admin Panel
            </div>
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="mb-4 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

      {/* ── Nav ── */}
      <nav className="flex-1 space-y-0.5 text-sm">
        {sidebarNavigation.map((item, idx) => {
          if (item.type === "group") {
            if (collapsed) {
              return (
                <div
                  key={`group-${idx}`}
                  className="space-y-0.5 border-t border-zinc-100 pt-1.5 mt-1.5 first:border-0 first:pt-0 first:mt-0"
                >
                  {item.items.map((subItem) => renderNavItem(subItem))}
                </div>
              );
            }

            const isExpanded = expandedGroups.includes(item.title);
            return (
              <div key={`group-${idx}`} className="space-y-0.5">
                <button
                  onClick={() => toggleGroup(item.title)}
                  className="group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 font-semibold text-zinc-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-900"
                >
                  {item.icon && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-600">
                      <item.icon className="h-5 w-5" />
                    </span>
                  )}
                  <span className="text-[12px] uppercase tracking-[0.12em] text-zinc-900 group-hover:text-emerald-700 font-bold">
                    {item.title}
                  </span>
                  <span className="ml-auto text-zinc-300 group-hover:text-zinc-500 transition-transform duration-200">
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </span>
                </button>
                {isExpanded && (
                  <div className="relative ml-[30px] space-y-0.5 border-l-2 border-zinc-100 pl-3">
                    {item.items.map((subItem) => renderNavItem(subItem, true))}
                  </div>
                )}
              </div>
            );
          }

          if (item.type === "link") {
            return renderNavItem(item);
          }

          return null;
        })}

        {/* ── Collapse toggle ── */}
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

      {/* ── Footer ── */}
      <div className="mt-4 space-y-3">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        {/* Help card */}
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
              href="/admin/contact"
              className="inline-flex w-full items-center justify-center rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700 ring-1 ring-emerald-200 transition-all hover:bg-emerald-600 hover:text-white hover:ring-emerald-600 shadow-sm"
            >
              Open support
            </Link>
          </div>
        )}

        {/* Logout */}
        <button
          type="button"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className={`
            group flex items-center justify-center gap-2 rounded-xl border transition-all duration-200
            text-xs font-semibold
            border-rose-100 bg-rose-50 text-rose-500
            hover:border-rose-200 hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-200/50
            disabled:opacity-50 disabled:cursor-not-allowed
            ${collapsed ? "w-10 h-10 mx-auto px-0" : "w-full py-2.5 px-3"}
          `}
        >
          <LogOut className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {!collapsed && (
            <span>{isLoggingOut ? "Logging out…" : "Logout"}</span>
          )}
        </button>

        {!collapsed && (
          <p className="text-center text-[10px] text-black tracking-wide">
            © {yearText || "—"} Farming Intel
          </p>
        )}
      </div>
    </aside>
  );
}
