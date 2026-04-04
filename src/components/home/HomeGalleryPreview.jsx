"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
} from "lucide-react";
import { useGetGlarryQuery } from "@/features/admin/glarry/glarryApiSlice";

export default function HomeGalleryPreview() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const { data: galleryData, isLoading } = useGetGlarryQuery({ limit: 9 });
  const items = galleryData?.items ?? galleryData ?? [];

  const cleanUrl = (u) =>
    typeof u === "string" ? u.replace(/[`]/g, "").trim() : u;

  const displayImages = items.map((item) => ({
    id: item.id,
    src: cleanUrl(item.photoUrl || item.photo),
    alt: item.projectName || item.project?.title || "Gallery Image",
    location: item.project?.location || "Bangladesh",
    title: item.projectName || item.project?.title || "Gallery Image",
    description: item.project?.shortDescription || "",
    date: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString("en-US", {
          timeZone: "UTC",
        })
      : "",
  }));

  // Handle Lightbox Navigation
  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedImageIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length,
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, displayImages.length]);

  // Show loading skeleton or empty state if needed
  if (isLoading) {
    return (
      <section className="home-section">
        <div className="home-container">
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
    <section className="home-section">
      <div className="home-container">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="space-y-4 max-w-2xl">
            <div className="home-tag w-fit">
              <span className="home-tag-dot" />
              Field Gallery
            </div>

            <h2 className="home-title leading-tight">
              Life on the <span className="italic">farm</span> in our{" "}
              <span className="italic text-primary">gallery</span>.
            </h2>

            <p className="home-subtitle">
              Transparent visual reporting from our active project sites across
              the country.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              className="group relative h-80 w-full overflow-hidden rounded-3xl bg-zinc-100 cursor-pointer"
            >
              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
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
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 group"
          >
            <X className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 hover:scale-110 hidden md:block"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 hover:scale-110 hidden md:block"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Main Image Container */}
          <div
            className="relative w-full max-w-6xl max-h-[90vh] p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh] rounded-xl overflow-hidden shadow-2xl bg-black">
              <Image
                src={displayImages[selectedImageIndex].src}
                alt={displayImages[selectedImageIndex].title}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-6 text-center max-w-2xl animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-white mb-2">
                {displayImages[selectedImageIndex].title}
              </h3>
              <p className="text-zinc-400">
                {displayImages[selectedImageIndex].description}
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-zinc-500">
                {displayImages[selectedImageIndex].date && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
                    <Calendar className="h-3.5 w-3.5" />{" "}
                    {displayImages[selectedImageIndex].date}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
