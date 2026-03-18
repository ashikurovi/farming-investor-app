"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowDown, CloudSun, Droplets, Wind, ShieldCheck } from "lucide-react";
import { useGetBannersQuery } from "@/features/admin/banner/bannerApiSlice";
import { Loader } from "@/components/ui/loader";

export default function HomeHero() {
  const { data: bannerData, isLoading } = useGetBannersQuery();
  const banners = bannerData?.items ?? bannerData ?? [];

  const slides = banners.map((b) => ({
    image: b.photo || b.photoUrl,
    title: b.title,
    subtitle: b.title,
    description: b.shortDescription,
    highlight: b.highlight || (b.title ? String(b.title).toUpperCase() : ""),
  }));

  const scrollToContent = () => {
    const element = document.getElementById("live-kpis");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="w-full bg-white h-[500px] md:h-[800px] flex items-center justify-center">
        <Loader size="lg" />
      </section>
    );
  }

  if (slides.length === 0) {
    return <section className="w-full h-[300px] md:h-[440px] bg-zinc-950" />;
  }

  return (
    <section className="w-full">
      <div className="relative w-full h-[420px] md:h-[580px] lg:h-[680px] overflow-hidden bg-zinc-950">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full flex items-center justify-center">
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-900/15" />
                  <div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(800px_260px_at_50%_110%,rgba(16,185,129,0.12),transparent)]" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
                  <div className="max-w-3xl">
                    {slide.title ? (
                      <h2 className="hidden md:block text-[96px] lg:text-[140px] font-black leading-none text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap">
                        {slide.title}
                      </h2>
                    ) : null}

                    <div className="relative">
                      {slide.highlight ? (
                        <p className="text-emerald-300 font-semibold tracking-[0.28em] uppercase mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 text-[10px] md:text-xs">
                          {slide.highlight}
                        </p>
                      ) : null}
                      <h1 className="text-[26px] leading-tight md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-5 drop-shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        {slide.subtitle || slide.title || ""}
                      </h1>
                      {slide.description ? (
                        <p className="text-zinc-100 text-xs md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                          {slide.description}
                        </p>
                      ) : null}

                      <button
                        onClick={scrollToContent}
                        className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-2.5 md:px-8 md:py-3.5 font-semibold text-[11px] md:text-sm rounded-full uppercase tracking-[0.18em] text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-[0_10px_30px_-6px_rgba(16,185,129,0.5)] transition-all duration-300 animate-in fade-in zoom-in delay-500 hover:-translate-y-0.5"
                      >
                        <span className="md:hidden">Discover</span>
                        <span className="hidden md:inline">
                          Discover Opportunities
                        </span>
                        <ArrowDown className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 w-[94%] md:w-auto">
                  <div className="mx-auto flex flex-col md:flex-row items-center gap-2.5 md:gap-3.5 rounded-xl md:rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                    <a href="#why-choose-us" className="inline-flex items-center gap-2 rounded-full bg-white/85 text-zinc-900 px-2.5 py-1.5 text-[11px] font-semibold hover:bg-white transition">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Why choose us
                    </a>
                    <div className="hidden md:block w-px h-5 bg-white/20" />
                    <div className="flex items-center gap-1.5 text-white/90 text-[11px]">
                      <CloudSun className="w-4 h-4 text-emerald-300" />
                      <span>Clear, 28°C</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 text-[11px]">
                      <Droplets className="w-4 h-4 text-emerald-300" />
                      <span>Humidity 48%</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/90 text-[11px]">
                      <Wind className="w-4 h-4 text-emerald-300" />
                      <span>Wind 5km/h</span>
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
          background: #fff;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #10b981;
          opacity: 1;
          border-radius: 4px;
          width: 40px;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
