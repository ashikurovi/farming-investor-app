import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export function AboutHero() {
  return (
    <div className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 animate-fade-in-up opacity-0 [animation-delay:200ms]">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-zinc-400" />
            <span className="text-emerald-600">About</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 animate-fade-in-up opacity-0 [animation-delay:400ms] text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl font-display">
            About <span className="text-emerald-600">Us</span>
          </h1>

          {/* Description */}
          <p className="mb-8 animate-fade-in-up opacity-0 [animation-delay:600ms] text-lg leading-relaxed text-zinc-600 sm:text-xl font-light">
            We are building the operating system for modern farm investing. 
            Connecting long-term capital with resilient, real-world farm projects 
            in a transparent ecosystem.
          </p>

          {/* CTA */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:800ms]">
            <Link
              href="#mission"
              className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-900/20"
            >
              Our Mission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
