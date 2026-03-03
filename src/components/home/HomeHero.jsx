"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "https://i.ibb.co.com/mF4dRNQj/image.png",
    title: "50% OFF",
    subtitle: "Premium Drop Shoulder Tees",
    description: "Discover the latest fashion must-haves at unbeatable prices. From chic dresses to trendy tops, our sale offers a wide range of fashionable pieces.",
    highlight: "TRENDY APPAREL",
  },
  {
    image: "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "NEW ARRIVAL",
    subtitle: "Streetwear Essentials",
    description: "Elevate your daily style with our new oversized collection. Premium cotton, perfect fit.",
    highlight: "SEASON 2024",
  },
];

export default function HomeHero() {
  return (
    <section className="w-full bg-white">
      <div className="relative w-full h-[500px] md:h-[800px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full flex items-center">
                
                {/* 1. Full Width Background Image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ 
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20 md:bg-transparent md:bg-gradient-to-r md:from-white/60 md:to-transparent" />
                </div>

                {/* 2. Text Content (Positioned over the image) */}
                <div className="container mx-auto px-6 md:px-12 relative z-10">
                  <div className="max-w-xl">
                    {/* Floating Background Text */}
                    <h2 className="hidden md:block text-[150px] font-black leading-none text-black/5 absolute -top-20 -left-10 pointer-events-none select-none">
                      {slide.title}
                    </h2>

                    <div className="relative">
                      <p className="text-black font-bold tracking-widest mb-2">
                        {slide.highlight}
                      </p>
                      <h1 className="text-4xl md:text-7xl font-extrabold text-black mb-6 drop-shadow-sm">
                        {slide.subtitle}
                      </h1>
                      <p className="text-zinc-800 text-sm md:text-lg mb-8 max-w-md font-medium leading-relaxed">
                        {slide.description}
                      </p>
                      <Link
                        href="/shop"
                        className="inline-block bg-black text-white px-10 py-4 font-bold text-sm hover:bg-zinc-800 transition-all uppercase tracking-widest shadow-lg"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #000;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          background: #000;
          opacity: 1;
          border-radius: 4px;
          width: 40px;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}   