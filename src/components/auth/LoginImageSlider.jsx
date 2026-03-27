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
    image:
      "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote:
      "This platform has completely transformed how we manage our agricultural portfolio. The transparency and real-time data are unmatched.",
    author: "Sofia Davis",
    role: "Sustainable Fund Manager",
    initials: "SD",
    accent: "#a8c5a0", // muted sage green
  },
  {
    image:
      "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote:
      "Investing in tangible assets like farmland provides stability in volatile markets. Framing makes it accessible and secure.",
    author: "Michael Chen",
    role: "Institutional Investor",
    initials: "MC",
    accent: "#a0b8c5",
  },
  {
    image:
      "https://images.pexels.com/photos/4207906/pexels-photo-4207906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote:
      "Connecting capital directly to farmers helps scale sustainable practices faster than ever before.",
    author: "Elena Rodriguez",
    role: "Agritech Consultant",
    initials: "ER",
    accent: "#c5bfa0",
  },
];

export function LoginImageSlider() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1400}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "bullet",
          bulletActiveClass: "bullet-active",
          renderBullet: (_index, className) =>
            `<span class="${className}"></span>`,
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt="Farm Landscape"
                fill
                className="object-cover"
                style={{ filter: "brightness(0.72) saturate(0.75)" }}
                priority={index === 0}
                quality={95}
              />
              {/* Soft gradient overlays — no black base */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(15,25,15,0.35) 0%, rgba(15,25,15,0.05) 45%, rgba(15,25,15,0.55) 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,18,10,0.75) 0%, transparent 55%)",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between px-12 py-11">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <Sprout
                    className="h-4 w-4"
                    style={{ color: slide.accent }}
                  />
                </div>
                <Link
                  href="/"
                  className="transition-opacity hover:opacity-70"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "#f5f0eb",
                  }}
                >
                  Framing
                </Link>
              </div>

              {/* Bottom content */}
              <div className="space-y-8">
                {/* Thin decorative rule */}
                <div
                  className="h-px w-10"
                  style={{ background: slide.accent, opacity: 0.6 }}
                />

                {/* Quote */}
                <blockquote className="max-w-sm space-y-7">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.3rem",
                      fontWeight: 400,
                      lineHeight: 1.65,
                      letterSpacing: "0.01em",
                      color: "rgba(245, 240, 235, 0.88)",
                      fontStyle: "italic",
                    }}
                  >
                    "{slide.quote}"
                  </p>

                  {/* Author */}
                  <footer className="flex items-center gap-4">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-wider"
                      style={{
                        background: `${slide.accent}18`,
                        border: `1px solid ${slide.accent}40`,
                        color: slide.accent,
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {slide.initials}
                    </div>
                    <div className="space-y-0.5">
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "rgba(245,240,235,0.9)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {slide.author}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.65rem",
                          letterSpacing: "0.08em",
                          color: "rgba(245,240,235,0.38)",
                          textTransform: "uppercase",
                        }}
                      >
                        {slide.role}
                      </div>
                    </div>
                  </footer>
                </blockquote>

                {/* Pagination */}
                <div className="custom-pagination flex items-center gap-2" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap');

        .custom-pagination {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .bullet {
          display: inline-block;
          width: 20px;
          height: 1.5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .bullet:hover {
          background: rgba(255, 255, 255, 0.45);
        }

        .bullet-active {
          width: 36px;
          background: rgba(245, 240, 235, 0.75) !important;
        }

        /* Fade transition polish */
        .swiper-slide {
          transition: opacity 0.7s ease !important;
        }
      `}</style>
    </div >
  );
}
