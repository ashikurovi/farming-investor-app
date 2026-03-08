import Link from "next/link";
import Image from "next/image";
import { Shield, FileText, ChevronRight } from "lucide-react";

export function LegalPageHero({ title, subtitle, badge, backgroundImage, lastUpdated }) {
  return (
    <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-zinc-950">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage || "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1920"}
          alt="Legal Hero Background"
          fill
          priority
          className="object-cover opacity-40 scale-105"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950/40 to-zinc-950/80" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fade-in-up opacity-0 [animation-delay:200ms] items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm font-medium text-emerald-300 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="tracking-wide">{badge || "Legal Information"}</span>
          </div>

          {/* Title */}
          <h1 className="mb-4 animate-fade-in-up opacity-0 [animation-delay:400ms] text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
            {title}
          </h1>

          {/* Subtitle / Last Updated */}
          <div className="mx-auto mb-8 max-w-2xl animate-fade-in-up opacity-0 [animation-delay:600ms] flex flex-col items-center gap-4">
             <p className="text-lg leading-relaxed text-zinc-300/90 sm:text-xl font-light">
              {subtitle}
            </p>
            {lastUpdated && (
                <p className="text-sm text-zinc-500 font-mono bg-zinc-900/50 px-3 py-1 rounded border border-zinc-800">
                    Last updated: {lastUpdated}
                </p>
            )}
          </div>

            {/* Breadcrumb-ish */}
           <div className="flex items-center justify-center gap-2 text-sm text-zinc-400 animate-fade-in-up opacity-0 [animation-delay:800ms]">
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-emerald-500 font-medium">{badge}</span>
           </div>

        </div>
      </div>
    </div>
  );
}
