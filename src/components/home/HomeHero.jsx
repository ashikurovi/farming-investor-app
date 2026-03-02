"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Link from 'next/link';

const slides = [
  {
    image: "https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Cultivating Wealth Through Nature",
    subtitle: "Join a community of forward-thinking investors. Access premium farmland and track real-time yields.",
    highlight: "Premium Agricultural Assets"
  },
  {
    image: "https://images.pexels.com/photos/4207906/pexels-photo-4207906.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Sustainable Smart Farming",
    subtitle: "Invest in high-tech greenhouses and automated irrigation systems for maximum efficiency and growth.",
    highlight: "Technology Driven"
  },
  {
    image: "https://images.pexels.com/photos/2132229/pexels-photo-2132229.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Global Food Security",
    subtitle: "Directly contribute to the global food supply chain while earning stable, long-term returns.",
    highlight: "Impact Investing"
  }
];

export default function HomeHero() {
  return (
    <section className="w-full pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
       <div className="max-w-7xl mx-auto h-[600px] rounded-md overflow-hidden shadow-2xl relative">
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            loop={true}
            onClick={(swiper) => swiper.slideNext()}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            effect={'fade'}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination, EffectFade]}
            className="h-full w-full"
          >
            {slides.map((slide, index) => (
               <SwiperSlide key={index}>
                  <div className="relative h-full w-full">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] hover:scale-105"
                      style={{ backgroundImage: `url('${slide.image}')` }}
                    />
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/20" />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-16 lg:px-24 max-w-5xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/20 w-fit mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
                              {slide.highlight}
                            </span>
                        </div>
                        
                         <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                            {slide.title}
                         </h1>
                         
                         <p className="text-base leading-relaxed text-zinc-100 sm:text-lg lg:text-xl drop-shadow-md mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            {slide.subtitle}
                         </p>
                         
                         <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                            <Link
                              href="/investor"
                              className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-400 hover:scale-105 active:scale-95"
                            >
                              Start Investing
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </Link>
                            <Link
                              href="#discover"
                              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
                            >
                              View Projects
                            </Link>
                         </div>
                    </div>
                  </div>
               </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Styles for Swiper Pagination */}
          <style jsx global>{`
            .swiper-pagination-bullet {
              background: white;
              opacity: 0.5;
            }
            .swiper-pagination-bullet-active {
              background: #f59e0b; /* amber-500 */
              opacity: 1;
            }
          `}</style>
       </div>
       
       {/* Stats Section moved outside/below slider for clean look */}
       <div className="max-w-7xl mx-auto mt-8 px-4">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-8 sm:gap-16">
            <div>
              <p className="text-3xl font-bold text-zinc-900">12%</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Avg. Annual Return</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-zinc-900">$45M+</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Assets Managed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-zinc-900">2.5k+</p>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">Active Investors</p>
            </div>
          </div>
       </div>
    </section>
  )
}