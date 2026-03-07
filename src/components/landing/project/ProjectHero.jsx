"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveRight, Sprout } from "lucide-react";
import { useGetProjectsQuery } from "@/features/admin/projects/projectsApiSlice";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectHero() {
  const { data: projectsData } = useGetProjectsQuery({ limit: 100 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Process projects to extract images
  const projects = Array.isArray(projectsData)
    ? projectsData
    : projectsData?.items || projectsData?.data || [];

  const images = projects
    .map((p) => {
      const url = p.photoUrl;
      if (!url) return null;
      const clean =
        typeof url === "string" ? url.replace(/[`]/g, "").trim() : url;
      // Check if it's a full URL or needs prefix
      if (clean.startsWith("http") || clean.startsWith("/")) return clean;
      return `/images/${clean}`;
    })
    .filter(Boolean);

  const displayImages = images.length > 0 ? images : " ";

  useEffect(() => {
    if (displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-zinc-950">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={displayImages[currentImageIndex]}
              alt="Project Hero - Cultivate Wealth"
              fill
              priority
              className="object-cover opacity-50"
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950/40 to-zinc-950/80 z-10" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Badge */}
          <div className="mb-8 inline-flex animate-fade-in-up opacity-0 [animation-delay:200ms] items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm font-medium text-emerald-300 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)] hover:bg-emerald-500/10 transition-colors">
            <Sprout className="h-4 w-4 text-emerald-400" />
            <span className="tracking-wide">Investment Opportunities</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 animate-fade-in-up opacity-0 [animation-delay:400ms] text-5xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl font-display">
            Cultivate{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Wealth
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl animate-fade-in-up opacity-0 [animation-delay:600ms] text-lg leading-relaxed text-zinc-300/90 sm:text-md font-light">
            Discover high-yield agricultural projects vetted for sustainability
            and profitability. From seasonal crops to livestock, diversify your
            portfolio with{" "}
            <span className="text-emerald-200 font-medium">
              tangible assets
            </span>
            .
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 [animation-delay:800ms]">
            <Link
              href="#project-feed"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]"
            >
              <span className="relative z-10">View Active Projects</span>
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            </Link>

            <button className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-zinc-300 transition-colors hover:text-white hover:bg-white/5">
              How it works
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500/50 z-20">
        <div className="h-10 w-6 rounded-full border-2 border-current flex justify-center p-1">
          <div className="h-1.5 w-1 rounded-full bg-current animate-scroll-down" />
        </div>
      </div>
    </div>
  );
}
