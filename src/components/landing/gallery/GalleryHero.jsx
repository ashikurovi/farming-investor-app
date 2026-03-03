import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, MoveRight } from "lucide-react";

export function GalleryHero() {
  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-zinc-950">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Gallery Hero - Sustainable Farming"
          fill
          priority
          className="object-cover opacity-50 scale-105 animate-slow-zoom"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950/40 to-zinc-950/80" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          
          {/* Badge */}
          <div className="mb-8 inline-flex animate-fade-in-up opacity-0 [animation-delay:200ms] items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm font-medium text-emerald-300 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)] hover:bg-emerald-500/10 transition-colors">
            <Camera className="h-4 w-4 text-emerald-400" />
            <span className="tracking-wide">Visual Stories from the Field</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 animate-fade-in-up opacity-0 [animation-delay:400ms] text-5xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl font-display">
            Life on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Farm</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl animate-fade-in-up opacity-0 [animation-delay:600ms] text-lg leading-relaxed text-zinc-300/90 sm:text-md font-light">
            Explore the vibrant moments from our sustainable farming projects. 
            From golden harvests to community gatherings, witness the <span className="text-emerald-200 font-medium">real impact</span> of your investments.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 [animation-delay:800ms]">
            <Link
              href="#gallery-feed"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            >
              <span className="relative z-10">Explore Gallery</span>
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            </Link>
            
            <Link 
              href="/"
              className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-zinc-300 transition-colors hover:text-white hover:bg-white/5"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500/50">
        <div className="h-10 w-6 rounded-full border-2 border-current flex justify-center p-1">
          <div className="h-1.5 w-1 rounded-full bg-current animate-scroll-down" />
        </div>
      </div>
    </div>
  );
}
