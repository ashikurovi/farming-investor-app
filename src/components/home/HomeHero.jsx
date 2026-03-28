"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ArrowRight } from "lucide-react";
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
    const el = document.getElementById("live-kpis");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* ── loading ── */
  if (isLoading) {
    return (
      <section className="flex h-[480px] w-full items-center justify-center bg-zinc-950 md:h-[680px]">
        <Loader size="lg" />
      </section>
    );
  }

  /* ── no slides ── */
  if (slides.length === 0) {
    return <section className="h-[420px] w-full bg-zinc-950 md:h-[480px]" />;
  }

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden bg-zinc-950">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-[640px] w-full sm:h-[640px] lg:h-[660px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    backgroundPosition: "center",
                  }}
                />

                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent sm:from-black/60 sm:via-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-5 pb-20 pt-10 sm:px-8 sm:pb-14 lg:px-8 lg:pb-16">
                  <div className="max-w-xl">
                    <h1 className="font-serif text-[38px] font-semibold leading-[1.02] tracking-tight text-white drop-shadow-sm sm:text-6xl lg:text-7xl">
                      {slide.subtitle || slide.title || ""}
                    </h1>

                    {slide.description && (
                      <p className="mt-4 max-w-lg text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                        {slide.description}
                      </p>
                    )}

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        onClick={scrollToContent}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-[12px] font-semibold text-white shadow-[0_16px_40px_-18px_rgba(16,185,129,0.9)] transition hover:bg-emerald-400 active:scale-[0.98]"
                      >
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-6 text-white/90 sm:mt-12 sm:flex sm:flex-wrap sm:items-end sm:gap-10">

                  </div>

                  <div className="mt-6 w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md shadow-[0_18px_60px_-40px_rgba(0,0,0,0.8)] lg:hidden">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                      />
                      <div>
                        <div className="text-[13px] font-semibold text-white">
                          98% Quality Assurance Rate
                        </div>
                        <div className="mt-0.5 text-[11px] text-white/70">
                          Verified farms and transparent updates
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute bottom-10 right-6 hidden lg:block">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md shadow-[0_18px_60px_-40px_rgba(0,0,0,0.8)]">
                      <div
                        className="h-12 w-12 overflow-hidden rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                      />
                      <div>
                        <div className="text-[12px] font-semibold text-white">
                          98% Quality Assurance Rate
                        </div>
                        <div className="mt-0.5 text-[11px] text-white/70">
                          Verified farms and transparent updates
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Swiper pagination dot styles ── */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 18px !important;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.35s ease;
        }
        .swiper-pagination-bullet-active {
          background: #10b981;
          border-radius: 6px;
          width: 32px;
        }
        @media (min-width: 768px) {
          .swiper-pagination {
            bottom: 28px !important;
          }
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
          .swiper-pagination-bullet-active {
            width: 40px;
          }
        }
      `}</style>
    </section>
  );
}
