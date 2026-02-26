"use client";

import { usePathname } from "next/navigation";
import { MainNavbar } from "../components/MainNavbar";
import { MainFooter } from "../components/MainFooter";

export function AppShell({ children }) {
  const pathname = usePathname();
  const isDashboardRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/investor");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <MainNavbar />
      <main className="flex-1">{children}</main>
      <MainFooter />
    </div>
  );
}

