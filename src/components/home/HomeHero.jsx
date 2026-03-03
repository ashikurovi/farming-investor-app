"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/7622416/pexels-photo-7622416.jpeg?auto=compress&cs=tinysrgb&w=1920", // Replace with your T-shirt model image
    title: "50% OFF",
    subtitle: "Premium Drop Shoulder Tees",
    description:
      "Discover the latest fashion must-haves at unbeatable prices. From chic dresses to trendy tops, our sale offers a wide range of fashionable pieces.",
    highlight: "TRENDY APPAREL",
  },
  {
    image:
      "https://images.pexels.com/photos/1018911/pexels-photo-1018911.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "NEW ARRIVAL",
    subtitle: "Streetwear Essentials",
    description:
      "Elevate your daily style with our new oversized collection. Premium cotton, perfect fit.",
    highlight: "SEASON 2024",
  },
];

export default function HomeHero() {
  // Simple Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    hours: 21,
    minutes: 44,
    seconds: 5,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-white">
      {/* 2. Main Slider */}
      <div className="relative max-w-7xl mx-auto h-[400px] md:h-[650px] overflow-hidden">
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
              <div className="relative h-full w-full flex items-center bg-[#f3f3f3]">
                {/* Text Content */}
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center z-10">
                  <div className="max-w-xl">
                    <h2 className="text-6xl md:text-[120px] font-black leading-none text-zinc-200 absolute -top-10 md:top-20 left-10 opacity-50 pointer-events-none">
                      {slide.title}
                    </h2>

                    <div className="relative">
                      <p className="text-zinc-500 font-bold tracking-widest mb-2">
                        {slide.highlight}
                      </p>
                      <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
                        {slide.subtitle}
                      </h1>
                      <p className="text-zinc-600 text-sm md:text-base mb-8 max-w-md leading-relaxed">
                        {slide.description}
                      </p>
                      <Link
                        href="/shop"
                        className="inline-block bg-black text-white px-10 py-3 font-bold text-sm hover:bg-zinc-800 transition-colors uppercase tracking-widest"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Background/Image Section */}
                <div
                  className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-cover bg-center md:bg-right-top mix-blend-multiply opacity-80 md:opacity-100"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #000;
          opacity: 0.2;
        }
        .swiper-pagination-bullet-active {
          background: #000;
          opacity: 1;
          border-radius: 4px;
          width: 30px;
          transition: all 0.3s;
        }
      `}</style>
    </section>
  );
}
