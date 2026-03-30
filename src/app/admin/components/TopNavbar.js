"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Bell,
  Search,
  Settings,
  ChevronDown,
  Moon,
  Sun,
  Calendar,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetContactsQuery } from "@/features/contact/contactApiSlice";
import { sidebarNavigation } from "./sidebarNavigation";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "@/lib/ThemeContext";

export default function TopNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [currentTime, setCurrentTime] = useState(null);

  const { dark, toggleTheme } = useTheme();

  const { data: contactsData } = useGetContactsQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const router = useRouter();

  const contactsCount = Array.isArray(contactsData) ? contactsData.length : 0;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // ignore
    } finally {
      toast.success("Logged out");
      router.push("/login");
      setMobileMenuOpen(false);
    }
  };

  const toggleGroup = (title) => {
    setExpandedGroups((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  useEffect(() => {
    setCurrentTime(new Date());
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
      title: "New contact submitted",
      desc: "John Doe filled the contact form",
      time: "2m ago",
      unread: true,
      color: "bg-blue-500",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Portfolio updated",
      desc: "Farm #4 metrics refreshed",
      time: "1h ago",
      unread: true,
      color: "bg-emerald-500",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Report ready",
      desc: "Q2 investor report is ready",
      time: "3h ago",
      unread: false,
      color: "bg-violet-500",
      icon: Calendar,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-zinc-200/60 bg-white/80 px-4 backdrop-blur-xl transition-all duration-300 lg:px-8 dark:border-zinc-800/60 dark:bg-zinc-900/80">
        {/* LEFT — Burger + Search */}
        <div className="flex flex-1 items-center gap-4">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="text-zinc-500 hover:bg-zinc-100/50 hover:text-zinc-900 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
            aria-label="Open navigation"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Search bar (desktop) */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search farms, investors, reports…"
                className="w-full rounded-2xl border border-zinc-200/80 bg-zinc-50/50 py-2 pl-10 pr-12 text-sm text-zinc-700 placeholder-zinc-400 outline-none focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus:bg-zinc-800 dark:focus:border-emerald-500/30"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                <kbd className="hidden sm:inline-flex items-center justify-center rounded-[6px] border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-medium text-zinc-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-500">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-2">
          {/* Live badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-medium text-emerald-700 backdrop-blur-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live System
          </div>

          <div className="h-6 w-px bg-zinc-200/60 mx-2 hidden sm:block dark:bg-zinc-700/60" />

          {/* Date/Time */}
          <div className="hidden xl:flex flex-col items-end mr-2">
            <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider dark:text-zinc-500">
              {formattedDate || "—"}
            </span>
            <span className="text-xs font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
              {formattedTime || "—"}
            </span>
          </div>

          {/* Mobile search trigger */}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="md:hidden text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 rounded-full h-9 w-9 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/80"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
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

          {/* Notifications */}
          <div className="relative">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="relative text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 rounded-full h-9 w-9 transition-transform hover:scale-105 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/80"
              onClick={() => {
                setNotifOpen(!notifOpen);
                setProfileOpen(false);
              }}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-zinc-900"></span>
                </span>
              )}
            </Button>

            {notifOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-zinc-100 bg-white/95 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-zinc-900/5 animate-in fade-in zoom-in-95 duration-200 dark:border-zinc-800 dark:bg-zinc-900/95 dark:ring-zinc-100/5">
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Notifications
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {unreadCount} New
                  </span>
                </div>

                <div className="max-h-[320px] overflow-y-auto space-y-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`group flex gap-4 px-4 py-3 hover:bg-zinc-50/80 rounded-xl cursor-pointer transition-all dark:hover:bg-zinc-800/80 ${n.unread ? "bg-blue-50/30 dark:bg-blue-500/5" : ""}`}
                    >
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full shadow-sm ring-1 ring-inset ring-black/5 ${n.color} text-white`}
                      >
                        <n.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-xs font-semibold text-zinc-900 truncate dark:text-zinc-100">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-zinc-400 whitespace-nowrap dark:text-zinc-500">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 leading-relaxed line-clamp-2 dark:text-zinc-400">
                          {n.desc}
                        </p>
                      </div>
                      {n.unread && (
                        <div className="self-center h-1.5 w-1.5 rounded-full bg-blue-500 ring-2 ring-blue-100 dark:ring-blue-500/20" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-2 border-t border-zinc-100 pt-2 dark:border-zinc-800">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
                    View all activity
                    <TrendingUp className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative pl-1">
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full border border-zinc-200/60 bg-white pl-1 pr-3 py-1 hover:border-emerald-200 hover:ring-2 hover:ring-emerald-500/10 hover:bg-zinc-50 transition-all duration-300 dark:border-zinc-700/60 dark:bg-zinc-800 dark:hover:border-emerald-700 dark:hover:bg-zinc-700"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotifOpen(false);
              }}
            >
              <div className="relative">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-zinc-800">
                  FI
                </span>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-800"></span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[11px] font-semibold text-zinc-900 leading-tight group-hover:text-emerald-700 transition-colors dark:text-zinc-100 dark:group-hover:text-emerald-400">
                  Admin User
                </p>
                <p className="text-[9px] font-medium text-zinc-400 leading-tight uppercase tracking-wider dark:text-zinc-500">
                  Super Admin
                </p>
              </div>
              <ChevronDown
                className={`hidden sm:block h-3 w-3 text-zinc-400 transition-transform duration-300 dark:text-zinc-500 ${profileOpen ? "rotate-180" : "group-hover:text-zinc-600"}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-zinc-100 bg-white/95 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl ring-1 ring-zinc-900/5 animate-in fade-in zoom-in-95 duration-200 dark:border-zinc-800 dark:bg-zinc-900/95 dark:ring-zinc-100/5">
                <div className="flex items-center gap-3 px-3 py-3 mb-1 bg-zinc-50/50 rounded-xl border border-zinc-100/50 dark:bg-zinc-800/50 dark:border-zinc-700/50">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    FI
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Farming Intel Admin
                    </p>
                    <p className="text-[10px] text-zinc-500 font-medium dark:text-zinc-400">
                      admin@farmingintel.com
                    </p>
                  </div>
                </div>

                <div className="space-y-0.5">
                  {[
                    { label: "Profile Settings", icon: Settings },
                    { label: "Preferences", icon: TrendingUp },
                    { label: "Team Members", icon: Moon },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      <item.icon className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-1.5 border-t border-zinc-100 pt-1.5 dark:border-zinc-800">
                  <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-red-500/10">
                    <X className="h-3.5 w-3.5" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white/95 backdrop-blur-xl px-4 py-3 z-30 sticky top-16 animate-in slide-in-from-top-2 dark:border-zinc-800 dark:bg-zinc-900/95">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search farms, investors…"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-700 placeholder-zinc-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus:border-emerald-500"
            />
          </div>
        </div>
      )}

      {/* Backdrop for dropdowns */}
      {(notifOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-30 bg-black/5 backdrop-blur-[1px] transition-opacity dark:bg-black/20"
          onClick={() => {
            setNotifOpen(false);
            setProfileOpen(false);
          }}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 flex transform transition-all duration-300 lg:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`relative flex h-full w-64 flex-col border-r border-zinc-200 bg-white px-3 py-6 shadow-2xl transform transition-transform duration-300 ease-out dark:border-zinc-800 dark:bg-zinc-900 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white shadow-sm ring-2 ring-emerald-50 dark:ring-emerald-900/50">
                FI
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Farming Intel
                </div>
                <div className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Admin
                </div>
              </div>
            </div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Close navigation"
              className="h-8 w-8 rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search…"
              className="w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-sm text-zinc-700 placeholder-zinc-400 outline-none focus:border-emerald-500/30 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus:bg-zinc-800"
            />
          </div>

          <nav className="flex-1 overflow-y-auto px-1 py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-200 hover:scrollbar-thumb-zinc-300">
            {sidebarNavigation.map((item, index) => {
              const renderLink = (linkItem, isNested = false) => {
                const isContactItem = linkItem.href === "/admin/contact";
                return (
                  <a
                    key={linkItem.name}
                    href={linkItem.href}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:active:bg-zinc-700 ${isNested ? "text-xs" : ""
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {linkItem.icon && !isNested && (
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50 text-zinc-500 group-hover:bg-white group-hover:text-emerald-600 group-hover:shadow-sm group-hover:ring-1 group-hover:ring-zinc-200 transition-all duration-300 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700 dark:group-hover:text-emerald-400">
                        <linkItem.icon className="h-5 w-5" />
                        {isContactItem && contactsCount > 0 && (
                          <span className="absolute -right-1 -top-1 inline-flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900 shadow-sm" />
                        )}
                      </span>
                    )}
                    {linkItem.icon && isNested && (
                      <linkItem.icon className="h-4 w-4 text-zinc-400 group-hover:text-emerald-600 transition-colors dark:text-zinc-500 dark:group-hover:text-emerald-400" />
                    )}
                    <span className="truncate">{linkItem.name}</span>
                    {isContactItem && contactsCount > 0 && (
                      <span className="ml-auto inline-flex min-w-[1.25rem] h-5 items-center justify-center rounded-md bg-zinc-100 px-1.5 text-[10px] font-semibold text-zinc-600 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-emerald-900/50 dark:group-hover:text-emerald-400">
                        {contactsCount}
                      </span>
                    )}
                  </a>
                );
              };

              if (item.items) {
                const isExpanded = expandedGroups.includes(item.title);
                return (
                  <div key={index} className="mb-2">
                    <button
                      onClick={() => toggleGroup(item.title)}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:text-zinc-900 active:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50 text-zinc-500 group-hover:bg-white group-hover:text-emerald-600 group-hover:shadow-sm group-hover:ring-1 group-hover:ring-zinc-200 transition-all duration-300 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700 dark:group-hover:text-emerald-400">
                            <item.icon className="h-5 w-5" />
                          </span>
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-zinc-400 transition-transform duration-200 dark:text-zinc-500 ${isExpanded ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded
                          ? "max-h-96 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                        }`}
                    >
                      <div className="relative ml-[26px] space-y-0.5 border-l-2 border-zinc-100 pl-3 dark:border-zinc-800">
                        {item.items.map((subItem) => renderLink(subItem, true))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="mb-2">
                  {renderLink(item)}
                </div>
              );
            })}
          </nav>

          <div className="mt-4 space-y-3">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" />

            {/* Logout */}
            <button
              type="button"
              disabled={isLoggingOut}
              onClick={handleLogout}
              className={`
                group flex w-full items-center justify-center gap-2 rounded-xl border transition-all duration-200
                text-xs font-semibold
                border-rose-100 bg-rose-50 text-rose-500
                hover:border-rose-200 hover:bg-rose-500 hover:text-white hover:shadow-md hover:shadow-rose-200/50
                disabled:opacity-50 disabled:cursor-not-allowed
                dark:border-rose-900/50 dark:bg-rose-500/10 dark:text-rose-400
                dark:hover:border-rose-500 dark:hover:bg-rose-500 dark:hover:text-white
                py-2.5 px-3
              `}
            >
              <LogOut className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>{isLoggingOut ? "Logging out…" : "Logout"}</span>
            </button>
          </div>

          {/* Mobile profile footer */}
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-zinc-50/50 p-3 hover:bg-zinc-50 hover:border-zinc-200 transition-colors cursor-pointer dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 dark:hover:border-zinc-700">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-zinc-800">
                FI
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-800"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 truncate dark:text-zinc-100">
                Admin User
              </p>
              <p className="text-[11px] font-medium text-zinc-500 truncate dark:text-zinc-400">
                admin@farmingintel.com
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
