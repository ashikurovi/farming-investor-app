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
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-zinc-200 bg-white/95 text-zinc-900 shadow-sm"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center bg-amber-400 shadow-lg sm:h-12 sm:w-12">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-900">
              AGRO
            </span>
          </div>
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex">
            <MainNavLinks isScrolled={scrolled} />
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/admin"
              className="rounded-full bg-amber-400 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300"
            >
              Admin
            </Link>
            <Link
              href="/investor"
              className="rounded-full bg-amber-400 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300"
            >
              Investor
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-zinc-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100 shadow-md transition hover:bg-zinc-800"
            >
              Login
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 p-2 text-white shadow-sm backdrop-blur transition hover:bg-white/20 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span
              className={`block h-0.5 w-5 transform rounded-full bg-current transition ${
                mobileOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-current transition ${
                mobileOpen ? "opacity-0" : "mt-1.5"
              }`}
            />
            <span
              className={`block h-0.5 w-5 transform rounded-full bg-current transition ${
                mobileOpen ? "-translate-y-1.5 -rotate-45" : "mt-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 text-zinc-900 border-t border-zinc-200 shadow-sm">
          <div className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6 lg:px-8">
            <nav className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]">
              <MainNavItem
                href="/"
                label="Home"
                isScrolled={true}
                className="py-2"
              />
              <MainNavItem
                href="/landing/project"
                label="Project"
                isScrolled={true}
                className="py-2"
              />
              <MainNavItem
                href="/landing/gallery"
                label="Gallery"
                isScrolled={true}
                className="py-2"
              />
              <MainNavItem
                href="/landing/about"
                label="About"
                isScrolled={true}
                className="py-2"
              />
            </nav>

            <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
              <Link
                href="/admin"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-400 px-4 py-2 font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300"
              >
                Admin
              </Link>
              <Link
                href="/investor"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-400 px-4 py-2 font-semibold uppercase tracking-[0.24em] text-zinc-900 shadow-md transition hover:bg-amber-300"
              >
                Investor
              </Link>
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center rounded-full bg-zinc-900 px-4 py-2 font-semibold uppercase tracking-[0.24em] text-amber-100 shadow-md transition hover:bg-zinc-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

