"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Camera, MapPin } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=1000&auto=format&fit=crop",
    alt: "Golden wheat harvest",
    category: "Harvest",
    location: "Rajshahi, BD",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=1000&auto=format&fit=crop",
    alt: "Agricultural drone technology",
    category: "Tech",
    location: "Dhaka, BD",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
    alt: "Modern greenhouse interior",
    category: "Infrastructure",
    location: "Gazipur, BD",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    alt: "Lush green fields",
    category: "Landscape",
    location: "Sylhet, BD",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1595814433582-e29fd8054a75?q=80&w=1000&auto=format&fit=crop",
    alt: "Farmer inspecting crops",
    category: "Community",
    location: "Bogura, BD",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1530267981375-f0de93cdf5b8?q=80&w=1000&auto=format&fit=crop",
    alt: "Tractor in field",
    category: "Machinery",
    location: "Jessore, BD",
  },
];

export default function HomeGalleryPreview() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 w-fit">
              <Camera className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                Field Gallery
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-light text-zinc-900 leading-tight tracking-tight">
              Life on the{" "}
              <span className="font-serif italic text-emerald-700">farm</span>.
            </h2>

            <p className="text-zinc-500 text-base md:text-lg leading-relaxed">
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
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative h-80 w-full overflow-hidden rounded-3xl bg-zinc-100 cursor-pointer"
            >
              {/* Image */}
              <image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
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
