"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Bell,
  Search,
  Settings,
  ChevronDown,
  Moon,
  Sun,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { sidebarNavigation } from "./sidebarNavigation";
import { useSelector } from "react-redux";
import { useMeQuery } from "@/features/auth/authApiSlice";

export default function TopNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
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

  const notifications = [
    {
      id: 1,
      title: "Portfolio synced",
      desc: "Your positions are up to date",
      time: "2m ago",
      unread: true,
      color: "bg-emerald-500",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "New project listed",
      desc: "A fresh investment opportunity is live",
      time: "1h ago",
      unread: true,
      color: "bg-blue-500",
      icon: TrendingUp,
    },
  ];
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-200/60 bg-white/80 px-4 backdrop-blur-xl transition-all duration-300 lg:px-8">
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
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-[11px] font-extrabold text-white shadow-lg shadow-emerald-300/30">
              FI
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-emerald-600">
                Farming Intel
              </div>
              <div className="text-[12px] font-semibold tracking-tight text-zinc-900">
                Investor
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search farms, investments, reports…"
                className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-50/50 py-2 pl-10 pr-12 text-sm text-zinc-700 placeholder-zinc-400 outline-none focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                <kbd className="hidden sm:inline-flex items-center justify-center rounded-[6px] border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-700 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live System
          </div>

          <div className="h-6 w-px bg-zinc-200/60 mx-2 hidden sm:block" />

          <div className="hidden xl:flex flex-col items-end mr-2">
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
              {formattedDate || "—"}
            </span>
            <span className="text-xs font-semibold text-zinc-900 tabular-nums">
              {formattedTime || "—"}
            </span>
          </div>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="md:hidden text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 rounded-full h-9 w-9"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 rounded-full h-9 w-9 transition-transform hover:scale-105"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          <div className="relative">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="relative text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 rounded-full h-9 w-9 transition-transform hover:scale-105"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                </span>
              )}
            </Button>

            {notifOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-zinc-100 bg-white/95 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-zinc-900/5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-semibold text-zinc-900">
                    Notifications
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600">
                    {unreadCount} New
                  </span>
                </div>
                <div className="max-h-[320px] overflow-y-auto space-y-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`group flex gap-4 px-4 py-3 hover:bg-zinc-50/80 rounded-xl cursor-pointer transition-all ${n.unread ? "bg-blue-50/30" : ""}`}
                    >
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full shadow-sm ring-1 ring-inset ring-black/5 ${n.color} text-white`}
                      >
                        <n.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-xs font-semibold text-zinc-900 truncate">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-zinc-400 whitespace-nowrap">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2">
                          {n.desc}
                        </p>
                      </div>
                      {n.unread && (
                        <div className="self-center h-1.5 w-1.5 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative pl-1">
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white pl-1 pr-3 py-1 hover:border-emerald-200 hover:ring-2 hover:ring-emerald-500/10 hover:bg-zinc-50 transition-all duration-300"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
            >
              <div className="relative">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={displayName || "Investor"}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                    {initials}
                  </span>
                )}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"></span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-semibold text-zinc-900 leading-tight group-hover:text-emerald-700 transition-colors">
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
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-zinc-100 bg-white/95 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-zinc-900/5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 px-3 py-3 mb-1 bg-zinc-50/50 rounded-xl border border-zinc-100/50">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={displayName || "Investor"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-semibold text-zinc-900">
                      {displayName}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-medium">
                      {user?.email || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {[{ label: "Profile Settings", icon: Settings }].map(
                    (item) => (
                      <button
                        key={item.label}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
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

      {searchOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white/95 backdrop-blur-xl px-4 py-3 z-30 sticky top-16 animate-in slide-in-from-top-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search investments…"
              className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-sm text-zinc-700 placeholder-zinc-400 outline-none focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300"
            />
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 z-40 flex transform transition-opacity duration-300 lg:hidden ${mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          className={`flex h-full w-52 flex-col border-r border-zinc-200 bg-white px-4 py-6 shadow-xl transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-xs font-semibold text-white">
                FI
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                  Farming
                </div>
                <div className="text-sm font-semibold tracking-tight text-zinc-900">
                  Investor
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
