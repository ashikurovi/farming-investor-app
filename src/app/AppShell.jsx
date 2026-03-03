"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { MainNavbar } from "../components/MainNavbar";
import { MainFooter } from "../components/MainFooter";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { toast } from "sonner";

export function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);

  const isAuthRoute =
    pathname.startsWith("/login") ||

    pathname.startsWith("/forgot-password");

  const isAdminRoute = pathname.startsWith("/admin");
  const isInvestorRoute = pathname.startsWith("/investor");
  const isProtectedRoute = isAdminRoute || isInvestorRoute;

  const { isFetching } = useMeQuery(undefined, {
    skip: !isProtectedRoute || !token,
  });

  useEffect(() => {
    if (!isProtectedRoute) return;

    if (!token) {
      toast.error("Please log in to continue.");
      router.replace("/login");
      return;
    }

    if (isFetching) return;

    const role = user?.role;
    if (!role) return;

    if (isAdminRoute && role !== "admin") {
      toast.error("Access denied", {
        description: "You do not have permission to access the admin dashboard.",
      });
      router.replace("/investor");
      return;
    }

    if (isInvestorRoute && role !== "investor") {
      toast.error("Access denied", {
        description: "You do not have permission to access the investor dashboard.",
      });
      router.replace("/admin");
    }
  }, [
    isProtectedRoute,
    isAdminRoute,
    isInvestorRoute,
    token,
    user,
    isFetching,
    router,
  ]);

  const isBareLayoutRoute = isProtectedRoute || isAuthRoute;

  if (isBareLayoutRoute) {
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

