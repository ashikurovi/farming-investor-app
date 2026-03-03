"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Sprout } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    image: "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "This platform has completely transformed how we manage our agricultural portfolio. The transparency and real-time data are unmatched.",
    author: "Sofia Davis",
    role: "Sustainable Fund Manager",
    initials: "SD",
    color: "emerald"
  },
  {
    image: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Investing in tangible assets like farmland provides stability in volatile markets. Framing makes it accessible and secure.",
    author: "Michael Chen",
    role: "Institutional Investor",
    initials: "MC",
    color: "blue"
  },
  {
    image: "https://images.pexels.com/photos/4207906/pexels-photo-4207906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Connecting capital directly to farmers helps scale sustainable practices faster than ever before.",
    author: "Elena Rodriguez",
    role: "Agritech Consultant",
    initials: "ER",
    color: "amber"
  }
];

export function LoginImageSlider() {
  return (
    <div className="relative h-full w-full bg-zinc-900 text-white overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' bg-white opacity-50 hover:opacity-100 transition-opacity"></span>';
          },
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt="Farm Landscape"
                fill
                className="object-cover opacity-50 mix-blend-overlay"
                priority={index === 0}
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/10" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex h-full flex-col justify-between p-12">
              {/* Logo (Top) */}
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-lg font-medium hover:opacity-80 transition-opacity">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${slide.color}-500/10 border border-${slide.color}-500/20 text-${slide.color}-500 backdrop-blur-md`}>
                    <Sprout className="h-6 w-6" />
                  </div>
                  <span className="font-display font-bold tracking-tight text-xl">Framing</span>
                </Link>
              </div>

              {/* Quote (Bottom) */}
              <div className="max-w-lg">
                <blockquote className="space-y-6">
                  <div className="relative">
                    <p className="text-2xl font-light leading-relaxed tracking-wide text-zinc-100">
                      "{slide.quote}"
                    </p>
                  </div>
                  <footer className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full bg-${slide.color}-900/50 border border-${slide.color}-500/30 flex items-center justify-center text-${slide.color}-400 font-bold text-xs`}>
                      {slide.initials}
                    </div>
                    <div>
                      <div className="text-base font-semibold text-white">{slide.author}</div>
                      <div className="text-sm text-zinc-400">{slide.role}</div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5) !important;
          opacity: 1 !important;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #10b981 !important; /* emerald-500 */
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
