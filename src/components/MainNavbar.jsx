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
  TrendingUp,
  Bell,
  Settings,
  ExternalLink,
  BadgeHelp,
  LifeBuoy,
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

/* ── Nav link with animated underline ── */
function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative group flex items-center gap-1.5 text-[13px] font-semibold tracking-[0.04em] py-1 transition-colors duration-200 whitespace-nowrap ${isActive ? "text-emerald-400" : "text-zinc-300 hover:text-white"
        }`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-emerald-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
      />
    </Link>
  );
}

/* ── User dropdown menu ── */
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
        className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all duration-200"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm">
          {user?.name?.[0] ?? "U"}
        </div>
        <span className="text-sm font-medium text-white/90 max-w-[90px] truncate leading-none">
          {user?.name ?? "Account"}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] w-56 bg-[#0f1a14] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/8">
            <p className="text-white text-sm font-semibold truncate">
              {user?.name ?? "User"}
            </p>
            <p className="text-zinc-400 text-xs truncate mt-0.5">
              {user?.email ?? ""}
            </p>
          </div>

          <div className="p-2 flex flex-col gap-0.5">
            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-300 hover:bg-white/8 hover:text-white transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                {role === "admin" ? "Admin" : "Investor"} Dashboard
              </span>
              <ExternalLink className="h-3 w-3 ml-auto text-zinc-600" />
            </Link>



            <div className="h-px bg-white/8 my-1" />

            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              disabled={isLoggingOut}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 w-full text-left"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="text-xs font-semibold tracking-wide uppercase">
                {isLoggingOut ? "Logging out…" : "Sign Out"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const isAuthenticated = Boolean(token);
  const role = user?.role;
  const dashboardHref =
    role === "admin" ? "/admin" : role === "investor" ? "/investor" : "/";

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
    } finally {
      toast.success("Logged out");
      router.push("/");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP NAVBAR — md and above ONLY
      ══════════════════════════════════════════ */}
      <div className="hidden md:block fixed top-0 inset-x-0 z-50">
        {/* ── Top utility bar ── */}


        {/* ── Main nav bar ── */}
        <header
          className={`transition-all duration-300 ${scrolled
            ? "bg-[#0d1f12]/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/5"
            : "bg-[#0d1f12] border-b border-white/4"
            }`}
        >
          <div className="mx-auto max-w-7xl px-8 h-[80px] flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src="/favicon.ico"
                alt="XINZO"
                width={40}
                height={40}
                priority
                className="h-40 w-40 object-contain"
              />
            </Link>

            {/* Divider */}
            <div className="h-5 w-px bg-white/6 shrink-0" />

            {/* Nav links */}
            <nav className="flex  items-center gap-7">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} />
              ))}
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Right actions */}
            <div className="flex items-center gap-3 shrink-0">
              {isAuthenticated ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/25 hover:border-emerald-400/40 hover:text-emerald-200 transition-all duration-200"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
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
                  className="text-[12px] font-bold tracking-[0.16em] uppercase px-5 py-2 rounded-lg border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/15 transition-all duration-200"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Desktop spacer: top bar 36px + main nav 60px = 96px */}
      <div className="hidden md:block h-[96px]" />

      {/* ══════════════════════════════════════════
          MOBILE — completely UNCHANGED
      ══════════════════════════════════════════ */}
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
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isActive ? "bg-emerald-50 ring-2 ring-emerald-400 ring-offset-1" : ""}`}
                >
                  <Home
                    className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-600" : "text-zinc-400 group-hover:text-zinc-600"}`}
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
                    className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-600"}`}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold leading-none ${isActive ? "text-emerald-600" : "text-zinc-400"}`}
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
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-[3px] border-white shadow-md transition-all ${isActive ? "bg-emerald-500" : "bg-emerald-400 group-hover:bg-emerald-500"}`}
                >
                  <User className="h-5 w-5 text-white" />
                </div>
                <span
                  className={`text-[10px] font-semibold leading-none ${isActive ? "text-emerald-600" : "text-zinc-400"}`}
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
                    className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-600"}`}
                  />
                </div>
                <span
                  className={`text-[10px] font-semibold leading-none ${isActive ? "text-emerald-600" : "text-zinc-400"}`}
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
                className={`h-5 w-5 transition-colors ${mobileOpen ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-600"}`}
              />
            </div>
            <span
              className={`text-[10px] font-semibold leading-none ${mobileOpen ? "text-emerald-600" : "text-zinc-400"}`}
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

      {/* Mobile bottom spacer */}
      <div className="h-[62px] md:hidden" />
    </>
  );
}
