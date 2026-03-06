import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | Framing Investor App",
  description: "Reset your Framing Investor App account password.",
};

export default function ForgotPasswordPage() {
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

        <ForgotPasswordForm />

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
