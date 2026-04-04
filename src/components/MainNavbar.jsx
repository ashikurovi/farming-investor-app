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
  Phone,
  ShieldCheck,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { toast } from "sonner";
import InstallPWAButton from "@/components/InstallPWAButton";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/landing/project", label: "Projects", icon: FolderGit2 },
  { href: "/landing/gallery", label: "Gallery", icon: Images },
  { href: "/landing/contact", label: "Contact", icon: User },
  { href: "/landing/about", label: "About", icon: LayoutDashboard },
];

/* ── Desktop Nav Link — NO background, only underline indicator ── */
function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative group flex items-center gap-1.5 text-sm font-semibold tracking-wider py-1.5 px-5 transition-all duration-300 rounded-xl ${
        isActive ? "text-white" : "text-white/80 hover:text-white"
      }`}
    >
      {label}
      {/* Green underline indicator only — no background */}
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-gradient-to-r from-[#7cc22e] to-[#4d8c1e] transition-all duration-300 ${
          isActive ? "w-6" : "w-0 group-hover:w-6"
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
                {role === "admin"
                  ? "Admin Dashboard"
                  : role === "partner"
                    ? "Partner Dashboard"
                    : "Investor Dashboard"}
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

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const isAuthenticated = Boolean(token);
  const role = user?.role;
  const dashboardHref =
    role === "admin" || role === "partner"
      ? "/admin"
      : role === "investor"
        ? "/investor"
        : "/";
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

  // Gradient background style
  const navbarGradient = {
    background: "linear-gradient(135deg, #4d8c1e, #7cc22e)",
  };

  return (
    <>
      {/* ==================== DESKTOP NAVBAR ==================== */}
      <div className="hidden md:block fixed top-0 inset-x-0 z-50">
        <header style={navbarGradient} className="shadow-xl shadow-black/20">
          <div className="mx-auto max-w-7xl px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-50 h-70 transition-transform group-hover:scale-105">
                <Image
                  src="/logo6.png"
                  alt="ARTMAN"
                  width={128}
                  height={128}
                  className=""
                  priority
                />
              </div>
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
                  {/* Dashboard button — no background, text only with underline on hover */}
                  <Link
                    href={dashboardHref}
                    className="relative group flex items-center gap-2 px-4 py-2.5 text-white text-sm font-semibold tracking-wider transition-all duration-300"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] w-0 group-hover:w-6 rounded-full bg-gradient-to-r from-[#7cc22e] to-[#4d8c1e] transition-all duration-300" />
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
                /* Log in button — light bg + border */
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-2.5 text-white font-semibold tracking-wider text-sm transition-all duration-300 border border-white/35 bg-white/10 hover:bg-white/15 hover:border-white/50 backdrop-blur-sm"
                >
                  Log in
                </Link>
              )}
              <InstallPWAButton variant="landing" />
            </div>
          </div>
        </header>
      </div>

      {/* Desktop Spacer */}
      <div className="hidden md:block h-20" />

      {/* ==================== MOBILE BOTTOM NAV (unchanged) ==================== */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        <div className="flex items-center justify-between px-1.5 h-[62px]">
          {/* Home */}
          {(() => {
            const isActive = pathname === "/";
            return (
              <Link
                href="/"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group"
              >
                <div className="w-9 h-9 flex items-center justify-center">
                  <Home
                    className={`h-[18px] w-[18px] transition-colors ${
                      isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-semibold leading-none ${
                    isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                  }`}
                >
                  Home
                </span>
              </Link>
            );
          })()}

          {/* About */}
          {(() => {
            const isActive = pathname.startsWith("/landing/about");
            return (
              <Link
                href="/landing/about"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group"
              >
                <div className="w-9 h-9 flex items-center justify-center">
                  <LayoutDashboard
                    className={`h-[18px] w-[18px] transition-colors ${
                      isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-semibold leading-none ${
                    isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                  }`}
                >
                  About
                </span>
              </Link>
            );
          })()}

          {/* Contact */}
          {(() => {
            const isActive = pathname.startsWith("/landing/contact");
            return (
              <Link
                href="/landing/contact"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group"
              >
                <div className="w-9 h-9 flex items-center justify-center">
                  <Phone
                    className={`h-[18px] w-[18px] transition-colors ${
                      isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-semibold leading-none ${
                    isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                  }`}
                >
                  Contact
                </span>
              </Link>
            );
          })()}

          {/* Project — raised center */}
          {(() => {
            const isActive = pathname.startsWith("/landing/project");
            return (
              <Link
                href="/landing/project"
                className="flex flex-col items-center gap-0.5 pb-1 -mt-3 min-w-[50px] group"
              >
                <div
                  className={`w-[46px] h-[46px] flex items-center justify-center rounded-full border-[3px] border-white shadow-md transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-[#4d8c1e] to-[#7cc22e]"
                      : "bg-gradient-to-br from-[#7cc22e] to-[#4d8c1e] group-hover:from-[#4d8c1e] group-hover:to-[#7cc22e]"
                  }`}
                >
                  <FolderGit2 className="h-[18px] w-[18px] text-white" />
                </div>
                <span
                  className={`text-[9px] font-semibold leading-none ${
                    isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                  }`}
                >
                  Project
                </span>
              </Link>
            );
          })()}

          {/* Privacy */}
          {(() => {
            const isActive = pathname.startsWith("/privacy-policy");
            return (
              <Link
                href="/privacy-policy"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group"
              >
                <div className="w-9 h-9 flex items-center justify-center">
                  <ShieldCheck
                    className={`h-[18px] w-[18px] transition-colors ${
                      isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-semibold leading-none ${
                    isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                  }`}
                >
                  Privacy
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
                className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group"
              >
                <div className="w-9 h-9 flex items-center justify-center">
                  <Images
                    className={`h-[18px] w-[18px] transition-colors ${
                      isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-semibold leading-none ${
                    isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                  }`}
                >
                  Gallery
                </span>
              </Link>
            );
          })()}

          {/* Login / Dashboard */}
          {(() => {
            const href = isAuthenticated ? dashboardHref : "/login";
            const isActive = isAuthenticated
              ? pathname.startsWith(dashboardHref)
              : pathname.startsWith("/login");
            const Label = isAuthenticated ? "Dashboard" : "Login";
            const Icon = isAuthenticated ? LayoutDashboard : User;
            return (
              <Link
                href={href}
                className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group"
              >
                <div className="w-9 h-9 flex items-center justify-center">
                  <Icon
                    className={`h-[18px] w-[18px] transition-colors ${
                      isActive
                        ? "text-[#4d8c1e]"
                        : "text-zinc-400 group-hover:text-zinc-600"
                    }`}
                  />
                </div>
                <span
                  className={`text-[9px] font-semibold leading-none ${
                    isActive ? "text-[#4d8c1e]" : "text-zinc-400"
                  }`}
                >
                  {Label}
                </span>
              </Link>
            );
          })()}
        </div>
      </nav>
    </>
  );
}
