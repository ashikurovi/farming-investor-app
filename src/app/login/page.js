import Link from "next/link";
import Image from "next/image";
import { Sprout } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | Framing Investor App",
  description: "Sign in to your Framing account to manage your farm investments.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-white lg:grid lg:grid-cols-2">
      {/* Left Column: Image & Branding */}
      <div className="relative hidden h-full flex-col bg-zinc-900 p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Farm Landscape"
            fill
            className="object-cover opacity-40 mix-blend-overlay"
            priority
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-zinc-900/10" />
        </div>
        
        <div className="relative z-10 flex items-center gap-2 text-lg font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <Sprout className="h-5 w-5" />
          </div>
          <span className="font-display font-bold tracking-tight">Framing</span>
        </div>
        
        <div className="relative z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;This platform has completely transformed how we manage our agricultural portfolio. 
              The transparency and real-time data are unmatched in the industry.&rdquo;
            </p>
            <footer className="text-sm text-zinc-400">
              Sofia Davis, Sustainable Fund Manager
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex flex-col items-center justify-center p-6 lg:p-10">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px]">
          {/* Mobile Logo (visible only on small screens) */}
          <div className="flex flex-col space-y-2 text-center lg:text-left">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white lg:hidden">
              <Sprout className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 font-display">
              Welcome back
            </h1>
            <p className="text-sm text-zinc-500">
              Enter your email to sign in to your account
            </p>
          </div>

          <LoginForm />

          
        </div>
      </div>
    </div>
  );
}
