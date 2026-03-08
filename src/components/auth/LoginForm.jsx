"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/features/auth/authApiSlice";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const user = useSelector((state) => state.auth?.user);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login({ email, password }).unwrap();

      const roleFromResult =
        result?.data?.user?.role || result?.user?.role || user?.role || null;

      toast.success("Login successful", {
        description:
          roleFromResult === "admin"
            ? "Welcome back, admin!"
            : "Welcome back to your dashboard.",
      });

      if (roleFromResult === "admin") {
        router.push("/admin");
      } else if (roleFromResult === "investor") {
        router.push("/investor");
      } else {
        router.push("/");
      }
    } catch (err) {
      const message =
        err?.data?.message ||
        (Array.isArray(err?.data?.message) ? err.data.message[0] : null) ||
        "Login failed. Please check your credentials and try again.";
      setError(message);

      toast.error("Login failed", {
        description: message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700"
          >
            Email
          </label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="pl-10 h-11 bg-white border-zinc-200 focus:border-emerald-600 focus:ring-emerald-600/20 rounded-lg shadow-sm transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-600 transition-colors pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="pl-10 pr-10 h-11 bg-white border-zinc-200 focus:border-emerald-600 focus:ring-emerald-600/20 rounded-lg shadow-sm transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-emerald-700 focus:outline-none transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      ) : null}

      <Button
        disabled={isLoading}
        className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all text-base font-semibold rounded-xl group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "Sign In"}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
