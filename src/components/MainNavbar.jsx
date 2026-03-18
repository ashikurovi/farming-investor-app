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
  LogOut,
} from "lucide-react";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import { toast } from "sonner";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/landing/project", label: "Project", icon: FolderGit2 },
  { href: "/landing/gallery", label: "Gallery", icon: Images },
  { href: "/landing/contact", label: "Contact", icon: User },
  { href: "/landing/about", label: "About", icon: LayoutDashboard },
];

function NavLink({ href, label, scrolled }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`relative text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200 group ${
        isActive
          ? "text-emerald-400"
          : scrolled
          ? "text-zinc-500 hover:text-zinc-900"
          : "text-white/60 hover:text-white"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-1 left-0 h-px w-full scale-x-0 origin-left transition-transform duration-300 ${
          isActive ? "scale-x-100 bg-emerald-400" : "bg-current group-hover:scale-x-100"
        }`}
      />
    </Link>
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
    } catch {}
    finally {
      toast.success("Logged out");
      router.push("/");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <header
        className={`hidden md:flex fixed top-0 inset-x-0 z-50 h-16 items-center transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-8 flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
          </Link>

          <nav className="flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} scrolled={scrolled} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href={dashboardHref}
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full border transition-all duration-200 ${
                    scrolled
                      ? "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                      : "border-white/40 text-white hover:bg-white/10"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-50"
                  title="Logout"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-md border transition-all duration-200 ${
                  scrolled
                    ? "border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        <div className="flex items-end justify-around px-1 h-[62px]">

          {/* Home — logo avatar */}
          {(() => {
            const isActive = pathname === "/";
            return (
              <Link href="/" className="flex flex-col items-center gap-0.5 pt-2 pb-1 min-w-[56px] group">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isActive ? "ring-2 ring-red-400 ring-offset-1" : ""}`}>
                  <img src="/iashd.png" alt="Home" className="w-8 h-8 object-contain rounded-full" />
                </div>
                <span className={`text-[10px] font-semibold leading-none ${isActive ? "text-zinc-800" : "text-zinc-400"}`}>Home</span>
              </Link>
            );
          })()}

          {/* Project */}
          {(() => {
            const isActive = pathname.startsWith("/landing/project");
            return (
              <Link href="/landing/project" className="flex flex-col items-center gap-0.5 pt-2 pb-1 min-w-[56px] group">
                <div className="w-10 h-10 flex items-center justify-center">
                  <FolderGit2 className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[10px] font-semibold leading-none ${isActive ? "text-emerald-600" : "text-zinc-400"}`}>Project</span>
              </Link>
            );
          })()}

          {/* Contact — raised center button */}
          {(() => {
            const isActive = pathname.startsWith("/landing/contact");
            return (
              <Link href="/landing/contact" className="flex flex-col items-center gap-0.5 pb-1 -mt-4 min-w-[56px] group">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full border-[3px] border-white shadow-md transition-all ${isActive ? "bg-emerald-500" : "bg-emerald-400 group-hover:bg-emerald-500"}`}>
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className={`text-[10px] font-semibold leading-none ${isActive ? "text-emerald-600" : "text-zinc-400"}`}>Contact</span>
              </Link>
            );
          })()}

          {/* Gallery */}
          {(() => {
            const isActive = pathname.startsWith("/landing/gallery");
            return (
              <Link href="/landing/gallery" className="flex flex-col items-center gap-0.5 pt-2 pb-1 min-w-[56px] group">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Images className={`h-5 w-5 transition-colors ${isActive ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                </div>
                <span className={`text-[10px] font-semibold leading-none ${isActive ? "text-emerald-600" : "text-zinc-400"}`}>Gallery</span>
              </Link>
            );
          })()}

          {/* More */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center gap-0.5 pt-2 pb-1 min-w-[56px] group"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <Menu className={`h-5 w-5 transition-colors ${mobileOpen ? "text-emerald-500" : "text-zinc-400 group-hover:text-zinc-600"}`} />
            </div>
            <span className={`text-[10px] font-semibold leading-none ${mobileOpen ? "text-emerald-600" : "text-zinc-400"}`}>More</span>
          </button>

        </div>
      </nav>

      {/* ── Mobile More Popup (bottom-right) ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
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
                <span className="text-xs font-bold uppercase tracking-[0.15em]">About</span>
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
                  <span className="text-xs font-bold uppercase tracking-[0.15em]">Login</span>
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