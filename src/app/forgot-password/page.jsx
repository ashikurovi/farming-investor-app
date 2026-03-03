"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/features/auth/authApiSlice";
import { useToast } from "@/components/ui/toast";

export const metadata = {
  title: "Forgot Password | Framing Investor App",
  description: "Reset your Framing Investor App account password.",
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await forgotPassword({ email }).unwrap();

      const message =
        data?.message ||
        "If an account exists for this email, password reset instructions have been sent.";

      setSuccess(message);

      addToast({
        title: "Reset link sent",
        description: message,
        variant: "success",
      });
    } catch (err) {
      const message =
        err?.data?.message ||
        (Array.isArray(err?.data?.message) ? err.data.message[0] : null) ||
        "Failed to send reset instructions. Please try again.";
      setError(message);

      addToast({
        title: "Unable to send reset link",
        description: message,
        variant: "error",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 font-display">
            Forgot your password?
          </h1>
          <p className="text-sm text-zinc-500">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400 pointer-events-none" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                className="pl-9 h-11 bg-zinc-50 border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
              {success}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all hover:shadow-emerald-900/20 text-base font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send reset instructions"}
          </Button>
        </form>

        <div className="flex justify-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

