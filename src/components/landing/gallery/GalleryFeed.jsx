"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { galleryItems } from "../../../data/gallery";
import { Search, Filter, Calendar, MapPin, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const categories = ["All", "Harvest", "Community", "Technology", "Produce", "Livestock"];

export function GalleryFeed() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Lightbox Navigation
  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setSelectedImageIndex((prev) => (prev + 1) % filteredItems.length);
      if (e.key === "ArrowLeft") setSelectedImageIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <div id="gallery-feed" className="bg-zinc-50 min-h-screen py-16 px-6 lg:px-8 relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Controls Header */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 scale-105"
                    : "bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 border border-zinc-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search moments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-zinc-200 bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm group-hover:shadow-md"
            />
          </div>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group break-inside-avoid relative overflow-hidden rounded-2xl bg-white shadow-sm border border-zinc-100 cursor-zoom-in hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-auto">
                 {/* Use next/image for optimization */}
                 <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Hover Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm shadow-sm">
                      {item.category}
                    </span>
                    <span className="text-xs text-white/80 font-medium bg-black/20 px-2 py-1 rounded-full backdrop-blur-md">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-200 line-clamp-2 drop-shadow-sm">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                <div className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-emerald-600 transition-colors shadow-lg">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
            <div className="mb-6 rounded-full bg-zinc-100 p-6 ring-1 ring-zinc-200">
              <Filter className="h-10 w-10 text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900">No moments found</h3>
            <p className="mt-2 text-zinc-500 max-w-xs mx-auto">
              We couldn't find any photos matching your current filters.
            </p>
            <button 
              onClick={() => {setActiveCategory("All"); setSearchQuery("");}}
              className="mt-8 px-6 py-2.5 rounded-full text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20"
            >
              Clear filters
            </button>
          </div>
        )}
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
                 src={filteredItems[selectedImageIndex].image}
                 alt={filteredItems[selectedImageIndex].title}
                 fill
                 className="object-contain"
                 quality={100}
                 priority
               />
            </div>
            
            {/* Caption */}
            <div className="mt-6 text-center max-w-2xl animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-white mb-2">
                {filteredItems[selectedImageIndex].title}
              </h3>
              <p className="text-zinc-400">
                {filteredItems[selectedImageIndex].description}
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
                   <Calendar className="h-3.5 w-3.5" /> {filteredItems[selectedImageIndex].date}
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-emerald-400">
                   {filteredItems[selectedImageIndex].category}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
