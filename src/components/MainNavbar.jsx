"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, FolderGit2, Images, Menu, User, LayoutDashboard, LayoutGrid } from "lucide-react";

function MainNavItem({ href, label, isScrolled, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] transition ${
        isScrolled
          ? "text-zinc-800 hover:text-amber-600"
          : "text-white/80 hover:text-amber-300"
      } ${className}`}
    >
      <span>{label}</span>
    </Link>
  );
}

function MainNavLinks({ isScrolled }) {
  return (
    <nav className="flex items-center gap-6 text-[10px] sm:text-[11px] lg:text-xs">
      <MainNavItem href="/" label="Home" isScrolled={isScrolled} />
      <MainNavItem
        href="/landing/project"
        label="Project"
        isScrolled={isScrolled}
      />
      <MainNavItem
        href="/landing/gallery"
        label="Gallery"
        isScrolled={isScrolled}
      />
      <MainNavItem
        href="/landing/about"
        label="About"
        isScrolled={isScrolled}
      />
    </nav>
  );
}

export function MainNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      {/* Desktop/Laptop Navbar - Glassy Effect - Hidden on Mobile */}
      <header
        className={`hidden md:block fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-lg text-zinc-900"
            : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center group">
            <div className="flex h-10 w-10 items-center justify-center bg-amber-400 shadow-lg sm:h-12 sm:w-12 transition-transform group-hover:scale-105">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-900">
                AGRO
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex">
              <MainNavLinks isScrolled={scrolled} />
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/admin"
                className="rounded-full bg-amber-400 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300 hover:scale-105"
              >
                Admin
              </Link>
              <Link
                href="/investor"
                className="rounded-full bg-amber-400 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300 hover:scale-105"
              >
                Investor
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100 shadow-md transition hover:bg-zinc-800 hover:scale-105"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation - Fixed Bottom - Hidden on Desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Bottom Bar */}
        <div className="bg-zinc-900 border-t border-zinc-800 pb-2 pt-2 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition group">
              <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>
            
            <Link href="/landing/project" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition group">
              <FolderGit2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">Project</span>
            </Link>

            {/* Applications Icon (Center) */}
            <Link href="/applications" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition group">
              <div className="h-10 w-10 bg-zinc-800 rounded-full flex items-center justify-center -mt-5 border-4 border-zinc-900 shadow-lg group-hover:scale-110 transition-transform">
                 <LayoutGrid className="h-5 w-5 text-amber-400" />
              </div>
              <span className="text-[10px] font-medium">Apps</span>
            </Link>

            <Link href="/landing/gallery" className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition group">
              <Images className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">Gallery</span>
            </Link>

            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex flex-col items-center gap-1 transition group ${mobileOpen ? 'text-amber-400' : 'text-zinc-400 hover:text-white'}`}
            >
              <Menu className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile More Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)}>
          <div 
            className="absolute bottom-20 right-4 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-2">
              <Link href="/landing/about" className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl transition">
                <User className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">About</span>
              </Link>
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl transition">
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Admin</span>
              </Link>
              <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-amber-400 hover:bg-zinc-800 hover:text-amber-300 rounded-xl transition">
                <User className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
