"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { MainNavbar } from "../components/MainNavbar";
import { MainFooter } from "../components/MainFooter";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "@/features/auth/authSlice";

export function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
// ...App
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const isAuthRoute =
    pathname.startsWith("/login") ||

    pathname.startsWith("/forgot-password");

  const isAdminRoute = pathname.startsWith("/admin");
  const isInvestorRoute = pathname.startsWith("/investor");
  const isProtectedRoute = isAdminRoute || isInvestorRoute;

  const { isFetching } = useMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (storedToken && !token) {
      dispatch(setCredentials({ token: storedToken, user: user ?? null }));
    }
  }, [dispatch, storedToken, token, user]);

  useEffect(() => {
    if (!isProtectedRoute) return;

    const effectiveToken = token || storedToken;
    if (!effectiveToken) {
      toast.error("Please log in to continue.");
      router.replace("/login");
      return;
    }

    if (isFetching) return;

    const role = user?.role;
    if (!role) return;

    if (isAdminRoute && !["admin", "partner"].includes(role)) {
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
    storedToken,
    user,
    isFetching,
    router,
  ]);

  const isBareLayoutRoute = isProtectedRoute;

  if (isBareLayoutRoute) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <MainNavbar />
      <main className="flex-1 pb-[calc(env(safe-area-inset-bottom)+62px)] md:pb-0">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
