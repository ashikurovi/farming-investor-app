"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Home,
  FolderGit2,
  Images,
  Menu,
  User,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
} from "lucide-react";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { toast } from "sonner";

function MainNavItem({ href, label, icon: Icon, isScrolled, className = "" }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-md px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] transition-all ${
        isActive
          ? "bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20"
          : isScrolled
            ? "text-zinc-800 hover:text-zinc-950 hover:bg-zinc-950/5"
            : "text-white/90 hover:text-white hover:bg-white/10"
      } ${className}`}
    >
      {Icon && (
        <Icon
          className={`h-3.5 w-3.5 transition-colors ${
            isActive
              ? "text-emerald-500"
              : isScrolled
                ? "text-zinc-400 group-hover:text-zinc-600"
                : "text-white/60 group-hover:text-white/90"
          }`}
        />
      )}
      <span>{label}</span>
    </Link>
  );
}

function MainNavLinks({ isScrolled }) {
  return (
    <nav className="flex items-center gap-4 text-[10px] sm:text-[11px] lg:text-xs">
      <MainNavItem href="/" label="Home" icon={Home} isScrolled={isScrolled} />
      <MainNavItem
        href="/landing/project"
        label="Project"
        icon={FolderGit2}
        isScrolled={isScrolled}
      />
      <MainNavItem
        href="/landing/gallery"
        label="Gallery"
        icon={Images}
        isScrolled={isScrolled}
      />
      <MainNavItem
        href="/landing/contact"
        label="Contact"
        icon={User}
        isScrolled={isScrolled}
      />
      <MainNavItem
        href="/landing/about"
        label="About"
        icon={LayoutGrid}
        isScrolled={isScrolled}
      />
    </nav>
  );
}

export function MainNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      // ignore API/logout errors, state is cleared in slice
    } finally {
      toast.success("Logged out");
      router.push("/");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop/Laptop Navbar - Premium Floating Design */}
      <header
        className={`hidden md:block fixed top-6 inset-x-0 z-50 transition-all duration-500 px-6`}
      >
        <div
          className={`mx-auto max-w-7xl rounded-lg transition-all duration-500 ${
            scrolled
              ? "bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/40 py-1"
              : "bg-transparent py-0"
          }`}
        >
          <div className="flex h-16 items-center justify-between px-6 lg:px-8">
            <Link href="/" className="flex items-center group">
              <img src="/iashd.png" className="w-[120px] h-auto object-contain"></img>
            </Link>

            <div className="flex items-center gap-8">
              <div className="hidden md:flex">
                <MainNavLinks isScrolled={scrolled} />
              </div>

              <div className="hidden items-center gap-4 sm:flex">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={dashboardHref}
                      className="inline-flex items-center rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_14px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                      {role === "admin" ? "Admin Dashboard" : "Investor Dashboard"}
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="inline-flex items-center justify-center rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all bg-red-500 hover:bg-red-600 text-white shadow-[0_6px_16px_rgba(239,68,68,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                      aria-label={isLoggingOut ? "Logging out" : "Logout"}
                      title={isLoggingOut ? "Logging out" : "Logout"}
                    >
                      <LogOut className="h-4 w-4 text-white" />
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_14px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation - Fixed Bottom - Hidden on Desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Bottom Bar */}
        <div className="bg-white border-t border-zinc-200 pb-safe pt-2 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-600 transition group"
            >
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>

            <Link
              href="/landing/project"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-600 transition group"
            >
              <FolderGit2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">Project</span>
            </Link>

            {/* Applications Icon (Center) */}
            <Link
              href="/landing/contact"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-600 transition group"
            >
              <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center -mt-5 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="text-[10px] font-medium text-emerald-600">
                Contact
              </span>
            </Link>

            <Link
              href="/landing/gallery"
              className="flex flex-col items-center gap-1 text-zinc-400 hover:text-emerald-600 transition group"
            >
              <Images className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">Gallery</span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex flex-col items-center gap-1 transition group ${mobileOpen ? "text-emerald-600" : "text-zinc-400 hover:text-emerald-600"}`}
            >
              <Menu className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile More Menu Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute bottom-20 right-4 w-64 bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 zoom-in-95 duration-300 ease-out origin-bottom-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-3 gap-2">
              {/* Gallery Section - Moved from Bottom Nav */}
              <Link
                href="/landing/gallery"
                className="flex items-center gap-4 px-4 py-4 text-zinc-600 hover:bg-zinc-50 hover:text-emerald-600 rounded-2xl transition group"
              >
                <Images className="h-5 w-5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-[0.15em]">
                  Gallery
                </span>
              </Link>

              <div className="h-px bg-zinc-100 mx-4"></div>

              <div className="h-px bg-zinc-100 mx-4 mb-1"></div>

              {/* Auth actions */}
              {isAuthenticated ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-4 px-4 py-4 text-zinc-600 hover:bg-zinc-50 hover:text-emerald-600 rounded-2xl transition group"
                  >
                    <LayoutDashboard className="h-5 w-5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-[0.15em]">
                      {role === "admin" ? "Admin Dashboard" : "Investor Dashboard"}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center gap-2 mx-1 px-4 py-4 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl transition shadow-lg shadow-zinc-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 mx-1 px-4 py-4 bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl transition shadow-lg shadow-zinc-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">
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
