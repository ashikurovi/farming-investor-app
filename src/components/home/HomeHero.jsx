"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import {
  ArrowDown,
  ShieldCheck,
  TrendingUp,
  Users,
  Sprout,
} from "lucide-react";
import { useGetBannersQuery } from "@/features/admin/banner/bannerApiSlice";
import { Loader } from "@/components/ui/loader";

/* ─── tiny trust-pill ──────────────────────────── */
const TrustPill = ({ Icon, label }) => (
  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md">
    <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
    <span className="text-[11px] font-semibold text-white/90 whitespace-nowrap">
      {label}
    </span>
  </div>
);

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
    return <section className="h-[320px] w-full bg-zinc-950 md:h-[480px]" />;
  }

  return (
    <section className="w-full">
      <div className="relative h-[480px] w-full overflow-hidden bg-zinc-950 sm:h-[560px] md:h-[640px] lg:h-[720px]">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex h-full w-full items-center justify-center">
                {/* ── Background image ── */}
                <div
                  className="absolute inset-0 h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />

                {/* ── Gradient overlays ── */}
                {/* Main dark fade bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-900/20" />
                {/* Side vignettes */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60" />
                {/* Subtle emerald glow from bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse 900px 280px at 50% 115%, rgba(16,185,129,0.14), transparent)",
                  }}
                />

                {/* ── Content ── */}
                <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-8 md:px-12">
                  {/* Ghost watermark title — desktop only */}
                  {slide.title && (
                    <p className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[110px] font-black leading-none text-white/[0.04] lg:block xl:text-[150px]">
                      {slide.title}
                    </p>
                  )}

                  {/* Highlight tag */}
                  {slide.highlight && (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 backdrop-blur-sm sm:mb-4 sm:px-4">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300 sm:text-[11px]">
                        {slide.highlight}
                      </span>
                    </div>
                  )}

                  {/* Headline */}
                  <h1 className="mb-3 text-[28px] font-extrabold leading-[1.15] tracking-tight text-white drop-shadow-lg sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.subtitle || slide.title || ""}
                  </h1>

                  {/* Description */}
                  {slide.description && (
                    <p className="mx-auto mb-6 max-w-xl text-[13px] font-medium leading-relaxed text-zinc-300 sm:mb-8 sm:text-sm md:text-base lg:max-w-2xl">
                      {slide.description}
                    </p>
                  )}

                  {/* CTA */}
                  <button
                    onClick={scrollToContent}
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_32px_-6px_rgba(16,185,129,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-400 hover:shadow-[0_16px_40px_-6px_rgba(16,185,129,0.65)] active:scale-[0.97] sm:px-8 sm:py-3.5 sm:text-xs md:text-sm"
                  >
                    <span className="sm:hidden">Discover</span>
                    <span className="hidden sm:inline">
                      Discover Opportunities
                    </span>
                    <ArrowDown className="h-3.5 w-3.5 animate-bounce md:h-4 md:w-4" />
                  </button>

                  {/* ── Trust pills row ── */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8 sm:gap-3">
                    <TrustPill Icon={ShieldCheck} label="Trusted Platform" />
                    <TrustPill Icon={TrendingUp} label="High Returns" />
                    <TrustPill Icon={Users} label="500+ Investors" />
                    <TrustPill Icon={Sprout} label="Agri-Focused" />
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
