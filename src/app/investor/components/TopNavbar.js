"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Settings,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { sidebarNavigation } from "./sidebarNavigation";
import { useSelector } from "react-redux";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { useTheme } from "@/lib/ThemeContext";

export default function TopNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const { dark, toggleTheme } = useTheme();
  const token = useSelector((s) => s.auth?.token);
  const user = useSelector((s) => s.auth?.user);
  useMeQuery(undefined, { skip: !!user || !token });

  const cleanUrl = (u) =>
    typeof u === "string" ? u.replace(/`/g, "").trim() : "";
  const displayName =
    user?.name ||
    user?.fullName ||
    (typeof user?.email === "string" ? user.email.split("@")[0] : "") ||
    "Investor";
  const initials = displayName
    ? displayName.substring(0, 2).toUpperCase()
    : "IN";
  const photoUrl = cleanUrl(user?.photoUrl);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime?.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const formattedTime = currentTime?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-200/60 bg-white/80 px-4 backdrop-blur-xl transition-all duration-300 lg:px-8 dark:border-zinc-800/60 dark:bg-zinc-900/80">
        <div className="flex flex-1 items-center gap-4">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="hidden"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 md:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-[11px] font-extrabold text-primary-foreground shadow-[0_16px_40px_-28px_rgba(77,140,30,0.55)]">
              FI
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-primary">
                Artman
              </div>
              <div className="text-[12px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Investor
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden xl:flex flex-col items-end mr-2">
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
              {formattedDate || "—"}
            </span>
            <span className="text-xs font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
              {formattedTime || "—"}
            </span>
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 rounded-full h-9 w-9 transition-transform hover:scale-105 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/80"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <div className="relative pl-1">
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white pl-1 pr-3 py-1 hover:border-[color:rgba(77,140,30,0.28)] hover:ring-2 hover:ring-[color:rgba(77,140,30,0.10)] hover:bg-zinc-50 transition-all duration-300 dark:border-zinc-700/60 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              onClick={() => {
                setProfileOpen(!profileOpen);
              }}
            >
              <div className="relative">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={displayName || "Investor"}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)] text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-white dark:ring-zinc-900">
                    {initials}
                  </span>
                )}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary dark:border-zinc-900"></span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-semibold text-zinc-900 leading-tight group-hover:text-primary transition-colors dark:text-zinc-100">
                  {displayName}
                </p>
                <p className="text-[9px] font-medium text-zinc-400 leading-tight uppercase tracking-wider">
                  Portal
                </p>
              </div>
              <ChevronDown
                className={`hidden sm:block h-3 w-3 text-zinc-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : "group-hover:text-zinc-600"}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-zinc-100 bg-white/95 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-zinc-900/5 animate-in fade-in zoom-in-95 duration-200 dark:border-zinc-800 dark:bg-zinc-900/95 dark:ring-white/10">
                <div className="flex items-center gap-3 px-3 py-3 mb-1 bg-zinc-50/50 rounded-xl border border-zinc-100/50 dark:bg-zinc-800/50 dark:border-zinc-800">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={displayName || "Investor"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)] flex items-center justify-center text-primary-foreground font-bold text-xs shadow-sm">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {displayName}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-medium dark:text-zinc-400">
                      {user?.email || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {[{ label: "Profile Settings", icon: Settings }].map(
                    (item) => (
                      <button
                        key={item.label}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                      >
                        <item.icon className="h-3.5 w-3.5 text-zinc-400" />
                        {item.label}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex transform transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          className={`flex h-full w-48 flex-col border-r border-zinc-200 bg-white px-4 py-6 shadow-xl transform transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-900 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-xs font-semibold text-primary-foreground">FI</div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Farming
                </div>
                <div className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Investor
                </div>
              </div>
            </div>

            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label="Close navigation"
              className="border-zinc-200 bg-white text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
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
                className="flex items-center gap-3 rounded-md px-2 py-2 font-medium text-zinc-600 transition hover:bg-secondary hover:text-primary dark:text-zinc-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon && (
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-primary">
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
