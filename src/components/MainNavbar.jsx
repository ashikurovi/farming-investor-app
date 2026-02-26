 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function MainNavItem({ href, label, isScrolled, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] transition ${
        isScrolled
          ? "text-zinc-900/80 hover:text-amber-700"
          : "text-white/70 hover:text-amber-300"
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
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-zinc-200 bg-white/95 text-zinc-900 shadow-sm"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <div className="flex h-14 w-14 items-center justify-center bg-amber-400 shadow-lg sm:h-16 sm:w-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-900">
              AGRO
            </span>
          </div>
        </a>

        <div className="flex items-center gap-6">
          <MainNavLinks isScrolled={scrolled} /> |
          <Link
            href="/admin"
            className="hidden rounded-full bg-amber-400 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300 sm:inline-flex"
          >
          Dashboard
          </Link>

          <Link
            href="/investor"
            className="hidden rounded-full bg-amber-400 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300 sm:inline-flex"
          >
          Dashboard
          </Link>

          <Link href="/login" className="hidden rounded-full bg-amber-400 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300 sm:inline-flex">Login</Link>
        </div>
      </div>
    </header>
  );
}

