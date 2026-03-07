"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowDown } from "lucide-react";
import { useGetBannersQuery } from "@/features/admin/banner/bannerApiSlice";
import { Loader } from "@/components/ui/loader";

const defaultSlides = [
  {
    image:
      "https://images.pexels.com/photos/2132257/pexels-photo-2132257.jpeg?auto=compress&cs=tinysrgb&w=1920", // Wheat field/Farming
    title: "SMART FARMING",
    subtitle: "Invest in Sustainable Agriculture",
    description:
      "Join the future of farming with our transparent investment platform. Secure returns, real impact, and advanced monitoring.",
    highlight: "FUTURE OF AGRO",
  },
  {
    image:
      "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1920", // Farmer with tablet/App
    title: "REAL-TIME DATA",
    subtitle: "Track Your Portfolio Live",
    description:
      "Monitor your investments with our advanced dashboard. Get detailed insights, live KPIs, and transparent reporting.",
    highlight: "DIGITAL FARMING",
  },
];

export default function HomeHero() {
  const { data: bannerData, isLoading } = useGetBannersQuery();
  const banners = bannerData?.items ?? bannerData ?? [];

  const slides =
    banners.length > 0
      ? banners.map((b) => ({
          image: b.photo || b.photoUrl,
          title: b.title,
          subtitle: b.title,
          description: b.shortDescription,
          highlight: "AGRICULTURE",
        }))
      : defaultSlides;

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
              <div className="relative h-full w-full flex items-center justify-center">
                {/* 1. Full Width Background Image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  {/* Overlay for better text readability - Darker for centered white text */}
                  <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
                </div>

                {/* 2. Text Content (Centered) */}
                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
                  <div className="max-w-4xl">
                    {/* Floating Background Text - Centered */}
                    <h2 className="hidden md:block text-[120px] lg:text-[180px] font-black leading-none text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap">
                      {slide.title}
                    </h2>

                    <div className="relative">
                      <p className="text-emerald-400 font-bold tracking-[0.3em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        {slide.highlight}
                      </p>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                        {slide.subtitle}
                      </h1>
                      <p className="text-zinc-100 text-sm md:text-xl mb-10 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        {slide.description}
                      </p>

                      <button
                        onClick={scrollToContent}
                        className="group relative inline-flex items-center gap-2 md:gap-3 bg-emerald-600 text-white px-6 py-3 md:px-10 md:py-4 font-bold text-xs md:text-sm hover:bg-emerald-500 transition-all uppercase tracking-widest shadow-lg hover:shadow-emerald-600/30 rounded-full animate-in fade-in zoom-in duration-700 delay-500 hover:-translate-y-1"
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
          background: #10b981; /* emerald-500 */
          opacity: 1;
          border-radius: 4px;
          width: 40px;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
