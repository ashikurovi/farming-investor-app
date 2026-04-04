import Link from "next/link";
import { ArrowLeft, Sprout } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { MobileLoginBackground } from "@/components/auth/MobileLoginBackground";

export const metadata = {
  title: "Forgot Password | Framing Investor App",
  description: "Reset your Framing Investor App account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
      <MobileLoginBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-[460px] rounded-3xl border border-zinc-200 bg-white/95 p-7 shadow-none backdrop-blur-md sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="mb-8 flex flex-col items-center space-y-2 text-center sm:items-start sm:text-left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white ring-1 ring-white/20">
              <Sprout className="h-7 w-7" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 font-display sm:text-3xl dark:text-zinc-100">
              Forgot your password?
            </h1>
            <p className="text-sm leading-relaxed text-zinc-500 sm:text-[15px] dark:text-zinc-400">
              Enter your email address and we&apos;ll send you a secure link to
              reset your password.
            </p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-7 flex justify-center sm:justify-start">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
