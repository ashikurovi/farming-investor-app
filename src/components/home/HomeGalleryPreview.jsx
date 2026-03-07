"use client";

import Link from "next/link";
import { ArrowRight, Instagram, Camera, MapPin } from "lucide-react";
import { useGetGlarryQuery } from "@/features/admin/glarry/glarryApiSlice";

export default function HomeGalleryPreview() {
  const { data: galleryData, isLoading } = useGetGlarryQuery({ limit: 9 });
  const items = galleryData?.items ?? galleryData ?? [];

  console.log(galleryData);

  const cleanUrl = (u) =>
    typeof u === "string" ? u.replace(/[`]/g, "").trim() : u;

  const displayImages = items.map((item) => ({
    id: item.id,
    src: cleanUrl(item.photoUrl || item.photo),
    alt: item.project?.title || "Gallery Image",
    category: item.project?.category || "General",
    location: item.project?.location || "Bangladesh",
  }));

  // Show loading skeleton or empty state if needed
  if (isLoading) {
    return (
      <section className="">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-zinc-100 rounded-xl w-full max-w-2xl"></div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-zinc-100 rounded-3xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Field Gallery
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
              Life on the <span className="font-serif italic">farm</span> in our{" "}
              <span className="font-serif italic text-emerald-700">
                gallery
              </span>
              .
            </h2>

            <p className="text-zinc-500 text-xs md:text-lg leading-relaxed">
              Transparent visual reporting from our active project sites across
              the country.
            </p>
          </div>

          {/* Desktop Side Button */}
          <div className="hidden lg:block">
            <Link
              href="/landing/gallery"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-zinc-900/20 hover:shadow-emerald-600/20"
            >
              <span className="text-xs font-bold uppercase tracking-widest">
                View Full Gallery
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {displayImages.map((image) => (
            <div
              key={image.id}
              className="group relative h-80 w-full overflow-hidden rounded-3xl bg-zinc-100 cursor-pointer"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

              {/* Hover Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-100 transition-opacity duration-300">
                <div className="flex justify-end translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 hover:bg-white hover:text-zinc-900 transition-colors">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>

                <div className="translate-y-[10px] group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {image.category}
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-medium leading-tight mb-2">
                    {image.alt}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                    <MapPin className="w-3 h-3" />
                    {image.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Bottom Button */}
        <div className="mt-12 text-center lg:hidden">
          <Link
            href="/landing/gallery"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors shadow-lg"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
