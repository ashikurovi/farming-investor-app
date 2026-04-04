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

/* ── Desktop Nav Link ── */
function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative group flex items-center gap-1.5 text-sm font-semibold tracking-wider py-1.5 px-4 transition-all duration-300 rounded-xl ${
        isActive ? "text-white" : "text-white/80 hover:text-white"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full bg-white transition-all duration-300 ${
          isActive ? "w-5" : "w-0 group-hover:w-5"
        }`}
      />
    </Link>
  );
}

/* ── Premium Compact User Dropdown ── */
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

  const dashboardLabel =
    role === "admin"
      ? "Admin Dashboard"
      : role === "partner"
        ? "Partner Dashboard"
        : "Investor Dashboard";

  return (
    <div ref={ref} className="relative">
      {/* Trigger — Avatar + Name + Chevron only */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
      >
        {/* Avatar */}
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#4d8c1e] text-xs font-extrabold shadow-sm select-none">
          {user?.name?.[0]?.toUpperCase() ?? "U"}
        </div>
        {/* Name */}
        <span className="text-white text-sm font-semibold tracking-wide leading-none">
          {user?.name ?? "Account"}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel — compact & premium */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] w-56 bg-white rounded-2xl shadow-2xl shadow-black/20 border border-zinc-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User info header */}
          <div className="px-4 py-3 bg-gradient-to-br from-[#4d8c1e] to-[#7cc22e]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-none">
                  {user?.name ?? "Account"}
                </p>
                <p className="text-white/70 text-[10px] mt-0.5 truncate max-w-[140px]">
                  {user?.email ?? ""}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-1.5">
            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-700 hover:bg-zinc-50 hover:text-[#4d8c1e] transition-all group"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-[#7cc22e] flex-shrink-0" />
              <span className="text-xs font-semibold">{dashboardLabel}</span>
              <ExternalLink className="h-3 w-3 ml-auto text-zinc-300 group-hover:text-[#7cc22e] transition-colors" />
            </Link>

            <div className="h-px bg-zinc-100 my-1" />

            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              disabled={isLoggingOut}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-xs font-semibold">
                {isLoggingOut ? "Signing out..." : "Sign Out"}
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

  return (
    <>
      {/* ==================== DESKTOP NAVBAR ==================== */}
      <div className="hidden md:block fixed top-0 inset-x-0 z-50">
        <header
          className="shadow-lg shadow-black/20"
          style={{ background: "linear-gradient(135deg, #4d8c1e 0%, #6ab82a 50%, #7cc22e 100%)" }}
        >
          {/* Subtle top shimmer line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="mx-auto max-w-7xl px-8 h-[68px] flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/logo6.png"
                  alt="ARTMAN"
                  width={120}
                  height={120}
                  priority
                />
              </div>
            </Link>

            {/* Navigation Links — centered */}
            <nav className="flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} />
              ))}
            </nav>

            {/* Right Side — Auth Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {isAuthenticated ? (
                /* ── Authenticated: only UserDropdown, NO dashboard button ── */
                <UserDropdown
                  user={user}
                  dashboardHref={dashboardHref}
                  role={role}
                  onLogout={handleLogout}
                  isLoggingOut={isLoggingOut}
                />
              ) : (
                /* ── Guest: Log in button ── */
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white font-semibold tracking-wide text-sm transition-all duration-200 border border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
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
      <div className="hidden md:block h-[68px]" />

      {/* ==================== MOBILE BOTTOM NAV (unchanged) ==================== */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        <div className="flex items-center justify-between px-1.5 h-[62px]">
          {/* Home */}
          {(() => {
            const isActive = pathname === "/";
            return (
              <Link href="/" className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group">
                <div className="w-9 h-9 flex items-center justify-center">
                  <Home className={`h-[18px] w-[18px] transition-colors ${isActive ? "text-[#4d8c1e]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"}`}>Home</span>
              </Link>
            );
          })()}

          {/* About */}
          {(() => {
            const isActive = pathname.startsWith("/landing/about");
            return (
              <Link href="/landing/about" className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group">
                <div className="w-9 h-9 flex items-center justify-center">
                  <LayoutDashboard className={`h-[18px] w-[18px] transition-colors ${isActive ? "text-[#4d8c1e]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"}`}>About</span>
              </Link>
            );
          })()}

          {/* Contact */}
          {(() => {
            const isActive = pathname.startsWith("/landing/contact");
            return (
              <Link href="/landing/contact" className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group">
                <div className="w-9 h-9 flex items-center justify-center">
                  <Phone className={`h-[18px] w-[18px] transition-colors ${isActive ? "text-[#4d8c1e]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"}`}>Contact</span>
              </Link>
            );
          })()}

          {/* Project — raised center */}
          {(() => {
            const isActive = pathname.startsWith("/landing/project");
            return (
              <Link href="/landing/project" className="flex flex-col items-center gap-0.5 pb-1 -mt-3 min-w-[50px] group">
                <div className={`w-[46px] h-[46px] flex items-center justify-center rounded-full border-[3px] border-white shadow-md transition-all ${isActive ? "bg-gradient-to-br from-[#4d8c1e] to-[#7cc22e]" : "bg-gradient-to-br from-[#7cc22e] to-[#4d8c1e] group-hover:from-[#4d8c1e] group-hover:to-[#7cc22e]"}`}>
                  <FolderGit2 className="h-[18px] w-[18px] text-white" />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"}`}>Project</span>
              </Link>
            );
          })()}

          {/* Privacy */}
          {(() => {
            const isActive = pathname.startsWith("/privacy-policy");
            return (
              <Link href="/privacy-policy" className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group">
                <div className="w-9 h-9 flex items-center justify-center">
                  <ShieldCheck className={`h-[18px] w-[18px] transition-colors ${isActive ? "text-[#4d8c1e]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"}`}>Privacy</span>
              </Link>
            );
          })()}

          {/* Gallery */}
          {(() => {
            const isActive = pathname.startsWith("/landing/gallery");
            return (
              <Link href="/landing/gallery" className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group">
                <div className="w-9 h-9 flex items-center justify-center">
                  <Images className={`h-[18px] w-[18px] transition-colors ${isActive ? "text-[#4d8c1e]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"}`}>Gallery</span>
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
              <Link href={href} className="flex flex-col items-center gap-0.5 py-1 min-w-[46px] group">
                <div className="w-9 h-9 flex items-center justify-center">
                  <Icon className={`h-[18px] w-[18px] transition-colors ${isActive ? "text-[#4d8c1e]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[9px] font-semibold leading-none ${isActive ? "text-[#4d8c1e]" : "text-zinc-400"}`}>{Label}</span>
              </Link>
            );
          })()}
        </div>
      </nav>
    </>
  );
}