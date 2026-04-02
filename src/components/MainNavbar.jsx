"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Home,
  FolderGit2,
  Images,
  Menu,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { toast } from "sonner";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/landing/project", label: "Projects", icon: FolderGit2 },
  { href: "/landing/gallery", label: "Gallery", icon: Images },
  { href: "/landing/contact", label: "Contact", icon: User },
  { href: "/landing/about", label: "About", icon: LayoutDashboard },
];

/* ── Desktop Nav Link with premium gradient underline ── */
function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative group flex items-center gap-1.5 text-sm font-semibold tracking-wider py-1.5 px-5 transition-all duration-300 rounded-xl ${isActive
          ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
          : "text-white/80 hover:text-white hover:bg-white/5"
        }`}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-gradient-to-r from-[#7cc22e] to-[#4d8c1e] transition-all duration-300 ${isActive ? "w-6" : "w-0 group-hover:w-6"
          }`}
      />
    </Link>
  );
}

/* ── Premium User Dropdown ── */
function UserDropdown({ user, dashboardHref, role, onLogout, isLoggingOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-[#7cc22e]/40 transition-all duration-300 backdrop-blur-md"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7cc22e] to-[#4d8c1e] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[#7cc22e]/30 ring-1 ring-white/20">
          {user?.name?.[0] ?? "U"}
        </div>
        <div className="text-left">
          <span className="text-sm font-semibold text-white block leading-none">
            {user?.name ?? "Account"}
          </span>
          <span className="text-[10px] text-white/60 truncate max-w-[140px]">
            {user?.email ?? ""}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] w-64 bg-[#0a1610]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/70 overflow-hidden z-50">
          <div className="px-6 py-5 border-b border-white/10">
            <p className="text-white font-semibold">{user?.name}</p>
            <p className="text-white/60 text-sm mt-0.5">{user?.email}</p>
          </div>

          <div className="p-3">
            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              <LayoutDashboard className="h-4 w-4 text-[#7cc22e]" />
              <span className="text-sm font-medium">
                {role === "admin" ? "Admin Dashboard" : "Investor Dashboard"}
              </span>
              <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-60" />
            </Link>

            <div className="h-px bg-white/10 my-2 mx-2" />

            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              disabled={isLoggingOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm font-medium">
                {isLoggingOut ? "Logging out..." : "Sign Out"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Navbar Component ── */
export function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const isAuthenticated = Boolean(token);
  const role = user?.role;
  const dashboardHref =
    role === "admin" ? "/admin" : role === "investor" ? "/investor" : "/";
  const isLoginRoute = pathname.startsWith("/login");

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const id = window.setTimeout(() => setMobileOpen(false), 0);
    return () => window.clearTimeout(id);
  }, [pathname, mobileOpen]);

  // Gradient background style
  const navbarGradient = {
    background: "linear-gradient(135deg, #4d8c1e, #7cc22e)",
  };

  return (
    <>
      {/* ==================== DESKTOP NAVBAR (Premium with Green Gradient) ==================== */}
      <div className="hidden md:block fixed top-0 inset-x-0 z-50">
        <header style={navbarGradient} className="shadow-xl shadow-black/20">
          <div className="mx-auto max-w-7xl px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Image
                  src="/favicon.ico"
                  alt="ARTMAN"
                  width={38}
                  height={38}
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white drop-shadow-md">
                ARTMAN
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} />
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white text-sm font-semibold tracking-wider transition-all duration-300 shadow-md"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <UserDropdown
                    user={user}
                    dashboardHref={dashboardHref}
                    role={role}
                    onLogout={handleLogout}
                    isLoggingOut={isLoggingOut}
                  />
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-8 py-3 rounded-2xl bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:border-white/50 text-white font-semibold tracking-wider text-sm transition-all duration-300 shadow-md"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Desktop Spacer */}
      <div className="hidden md:block h-20" />

      {/* ==================== MOBILE BOTTOM NAV (Premium Updated) ==================== */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        <div className="flex items-center justify-around px-1 h-[62px]">
          {/* Home */}
          {(() => {
            const isActive = pathname === "/";
            return (
              <Link
                href="/"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[56px] group"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isActive
                      ? "bg-[#7cc22e]/10 ring-2 ring-[#7cc22e] ring-offset-1"
                      : ""
                    }`}
                >
                  <Home
                    className={`h-5 w-5 transition-colors ${isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                      }`}
                  />
                </div>
                <span className="sr-only">Home</span>
              </Link>
            );
          })()}

          {/* Project */}
          {(() => {
            const isActive = pathname.startsWith("/landing/project");
            return (
              <Link
                href="/landing/project"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[56px] group"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <FolderGit2
                    className={`h-5 w-5 transition-colors ${isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                      }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                    }`}
                >
                  Project
                </span>
              </Link>
            );
          })()}

          {/* Contact — raised center */}
          {(() => {
            const isActive = pathname.startsWith("/landing/contact");
            return (
              <Link
                href="/landing/contact"
                className="flex flex-col items-center gap-0.5 pb-1 -mt-3 min-w-[56px] group"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-[3px] border-white shadow-md transition-all ${isActive
                      ? "bg-gradient-to-br from-[#4d8c1e] to-[#7cc22e]"
                      : "bg-gradient-to-br from-[#7cc22e] to-[#4d8c1e] group-hover:from-[#4d8c1e] group-hover:to-[#7cc22e]"
                    }`}
                >
                  <User className="h-5 w-5 text-white" />
                </div>
                <span
                  className={`text-[10px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                    }`}
                >
                  Contact
                </span>
              </Link>
            );
          })()}

          {/* Gallery */}
          {(() => {
            const isActive = pathname.startsWith("/landing/gallery");
            return (
              <Link
                href="/landing/gallery"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[56px] group"
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <Images
                    className={`h-5 w-5 transition-colors ${isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                      }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                    }`}
                >
                  Gallery
                </span>
              </Link>
            );
          })()}

          {/* More */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center gap-0.5 py-1 min-w-[56px] group"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Menu
                className={`h-5 w-5 transition-colors ${mobileOpen
                    ? "text-[#4d8c1e]"
                    : "text-zinc-400 group-hover:text-zinc-600"
                  }`}
              />
            </div>
            <span
              className={`text-[10px] font-semibold leading-none ${mobileOpen ? "text-[#4d8c1e]" : "text-zinc-400"
                }`}
            >
              More
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile More Popup */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute bottom-[70px] right-4 w-60 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-2">
              <Link
                href="/landing/about"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition"
              >
                <LayoutDashboard className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  About
                </span>
              </Link>
              <div className="h-px bg-zinc-100 mx-2 my-1" />

              {isAuthenticated ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition"
                  >
                    <LayoutDashboard className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-bold uppercase tracking-[0.15em]">
                      {role === "admin" ? "Admin" : "Investor"} Dashboard
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-[0.15em]">
                      {isLoggingOut ? "Logging out…" : "Logout"}
                    </span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-800 hover:bg-zinc-50 transition"
                >
                  <User className="h-4 w-4 text-zinc-400" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">
                    Login
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
