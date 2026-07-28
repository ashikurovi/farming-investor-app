"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { ArrowRight, ShieldCheck, Sprout, TrendingUp, Sparkles } from "lucide-react";
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
    <section className="w-full py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-950 shadow-2xl">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="h-[400px] w-full sm:h-[480px] lg:h-[520px] rounded-2xl sm:rounded-3xl"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full">
                  <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-10000 scale-105"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Multi-layered cinematic gradients */}
                  <div className="absolute inset-0 bg-zinc-950/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/85 via-zinc-950/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/30" />

                <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-5 pb-10 pt-10 sm:px-8 sm:pb-12 lg:px-8 lg:pb-14">
                  <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 backdrop-blur-md mb-4 shadow-lg">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-white">
                        Sustainable Agri Investment
                      </span>
                    </div>

                    <h1 className="font-serif text-[30px] font-bold leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
                      {slide.subtitle || slide.title || ""}
                    </h1>

                    {slide.description && (
                      <p className="mt-3 max-w-xl text-sm font-normal leading-relaxed text-zinc-200 sm:text-base drop-shadow line-clamp-2">
                        {slide.description}
                      </p>
                    )}

                    {/* CTA Actions */}
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <button
                        onClick={scrollToContent}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4d8c1e] to-[#7cc22e] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xl shadow-[#4d8c1e]/25 hover:shadow-[#4d8c1e]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                      >
                        Explore Opportunities
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-6 text-white/90 sm:mt-12 sm:flex sm:flex-wrap sm:items-end sm:gap-10"></div>

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
          background: #4d8c1e;
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
