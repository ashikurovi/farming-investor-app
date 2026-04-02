import Link from "next/link";
import Image from "next/image";
import { Sprout, ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginImageSlider } from "@/components/auth/LoginImageSlider";
import { MobileLoginBackground } from "@/components/auth/MobileLoginBackground";

export const metadata = {
  title: "Login | Framing Investor App",
  description: "Sign in to your Framing account to manage your farm investments.",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex lg:grid lg:grid-cols-2">
      {/* Mobile Background Image */}
      <MobileLoginBackground />

      {/* Left Column: Login Form Container */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
        {/* Back to Home (Mobile) */}
         <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        {/* Desktop Branding (Logo only) */}
        <div className="absolute top-8 left-8 hidden lg:block">
           <Link href="/" className="flex items-center gap-2 text-lg font-medium hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)]">
              <Sprout className="h-6 w-6" />
            </div>
            <span className="font-display font-bold tracking-tight text-xl text-zinc-900">Framing</span>
          </Link>
        </div>

        {/* Back to Home (Desktop/Laptop) */}
        <div className="absolute top-8 right-8 hidden lg:block">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-emerald-200 hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Card */}
        <div className="w-full max-w-[420px] bg-white p-8 sm:p-10 rounded-3xl shadow-2xl lg:shadow-none lg:bg-transparent lg:p-0">
          <div className="flex flex-col space-y-2 text-center lg:text-left mb-8">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg lg:hidden">
              <Sprout className="h-7 w-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 font-display">
              Welcome back
            </h1>
            <p className="text-zinc-500 text-sm sm:text-base">
              Enter your credentials to access your portfolio
            </p>
          </div>

          <LoginForm />
          
           <p className="mt-8 text-center text-xs text-zinc-400 lg:text-left">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4 hover:text-zinc-900 transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-zinc-900 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Right Column: Image Slider */}
      <div className="relative hidden h-full w-full lg:block overflow-hidden">
        <LoginImageSlider />
      </div>
    </div>
  );
}
