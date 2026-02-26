import Link from "next/link";
import { Home, Image, Info, Folder, TrendingUp, Shield } from "lucide-react";

function MainNavItem({ href, label, icon: Icon, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900 ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span>{label}</span>
    </Link>
  );
}

function MainNavLinks() {
  return (
    <nav className="flex items-center gap-3 text-xs font-medium sm:gap-4 sm:text-[13px]">
      <MainNavItem href="/" label="Home" icon={Home} />
      <MainNavItem href="/gallery" label="Gallery" icon={Image} />
      <MainNavItem href="/landing/about" label="About" icon={Info} />
      <MainNavItem href="/landing/project" label="Project" icon={Folder} />

      <span className="hidden h-4 w-px bg-zinc-200 sm:inline-block dark:bg-zinc-700" />

      <MainNavItem
        href="/investor"
        label="Investor"
        icon={TrendingUp}
        className="hidden sm:inline-flex"
      />
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 sm:text-[13px]"
      >
        <Shield className="h-3.5 w-3.5" />
        <span>Admin</span>
      </Link>
    </nav>
  );
}

export function MainNavbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary text-xs font-semibold text-primary-foreground shadow-sm">
            FI
          </div>
          <div className="hidden text-left text-xs sm:block">
            <div className="font-semibold uppercase tracking-[0.2em] text-primary">
              Framing
            </div>
            <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Investor Platform
            </div>
          </div>
        </a>

        <MainNavLinks />
      </div>
    </header>
  );
}

