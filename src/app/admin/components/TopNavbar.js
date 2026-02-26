"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sidebarNavigation } from "./sidebarNavigation";

export default function TopNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-4 backdrop-blur lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 lg:hidden"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div>
            <h1 className="text-base font-semibold tracking-tight text-zinc-900 lg:text-lg">
              Dashboard
            </h1>
            <p className="text-xs text-zinc-500 lg:text-sm">
              High-level metrics for your investors and farms.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-500 sm:flex">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live portfolio
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm hover:border-emerald-400 hover:text-emerald-700"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-[10px] font-semibold text-emerald-700">
              FI
            </span>
            <span className="hidden sm:inline">Admin</span>
          </Button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex transform transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className={`flex h-full w-72 flex-col border-r border-zinc-200 bg-white px-4 py-6 shadow-xl transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-xs font-semibold text-white">
                FI
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                  Framing
                </div>
                <div className="text-sm font-semibold tracking-tight text-zinc-900">
                  Admin
                </div>
              </div>
            </div>

            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label="Close navigation"
              className="border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

            <nav className="flex-1 space-y-1 text-sm">
              {sidebarNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-2 py-2 font-medium text-zinc-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                      <item.icon className="h-4 w-4" />
                    </span>
                  )}
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>

          <button
            type="button"
            className="flex-1 bg-black/30 transition-opacity duration-300"
            aria-label="Close navigation overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      </>
  );
}

