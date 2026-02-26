"use client";

import { useState } from "react";
import { ChevronsLeft, ChevronsRight, LogOut } from "lucide-react";
import { sidebarNavigation } from "./sidebarNavigation";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  return (
    <aside
      className={`hidden h-screen ${sidebarWidth} flex-col border-r border-zinc-200 bg-white/80 px-3 py-6 shadow-sm backdrop-blur transition-all duration-300 ease-in-out lg:flex`}
    >
      <div className="mb-6 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-xs font-semibold text-white">
            FI
          </div>
          {!collapsed && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                Framing
              </div>
              <div className="text-sm font-semibold tracking-tight text-zinc-900">
                Investor
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition hover:bg-zinc-50"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? (
            <ChevronsRight className="h-3 w-3" />
          ) : (
            <ChevronsLeft className="h-3 w-3" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 text-sm">
        {sidebarNavigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-2 py-2 font-medium text-zinc-600 transition hover:bg-emerald-50 hover:text-emerald-700 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {item.icon && (
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                <item.icon className="h-4 w-4" />
              </span>
            )}
            {!collapsed && <span>{item.name}</span>}
          </a>
        ))}
      </nav>

      <div className="mt-4 space-y-3 border-t border-zinc-200 pt-4">
        <button
          type="button"
          className={`flex items-center justify-center rounded-md border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-100 ${
            collapsed ? "w-8 px-0" : "w-full gap-2"
          }`}
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.href = "/logout";
            }
          }}
        >
          <LogOut className="h-3.5 w-3.5" />
          {!collapsed && <span>Logout</span>}
        </button>
        {!collapsed && (
          <div className="text-center text-[11px] text-zinc-500">
            © {new Date().getFullYear()} Framing
          </div>
        )}
      </div>
    </aside>
  );
}

