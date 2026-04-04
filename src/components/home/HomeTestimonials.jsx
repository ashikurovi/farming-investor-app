"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    initials: "AM",
    name: "Amina M.",
    role: "Individual Investor",
    rating: 5,
    quote:
      "The dashboard makes it easy to understand where my capital is, what changed this month, and what to expect next. Everything feels structured.",
  },
  {
    initials: "JC",
    name: "James C.",
    role: "Portfolio Manager",
    rating: 5,
    quote:
      "Reporting is finally consistent. The structure helps us compare projects, spot risks earlier, and communicate updates to LPs without spreadsheets.",
  },
  {
    initials: "SK",
    name: "Sofia K.",
    role: "Farm Operator",
    rating: 4,
    quote:
      "The process is straightforward—milestones, updates, and documents are all in one place. It saves time and keeps everyone aligned.",
  },
  {
    initials: "RH",
    name: "Rahim H.",
    role: "Angel Investor",
    rating: 5,
    quote:
      "I finally feel confident about agricultural investments. The transparency and real-time updates make all the difference.",
  },
];

function StarRow({ rating, isActive }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating
              ? isActive
                ? "fill-white text-white"
                : "fill-[#f59e0b] text-[#f59e0b]"
              : isActive
                ? "fill-white/25 text-white/25"
                : "fill-zinc-200 text-zinc-200"
            }`}
        />
      ))}
    </div>
  );
}

export default function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  const visible = [0, 1, 2].map((offset) => (active + offset) % total);

  return (
    <section className="relative home-section overflow-hidden ">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#7cc22e]/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#4d8c1e]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-14 flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="home-tag w-fit">
              <span className="home-tag-dot" />
              Testimonials
            </div>
            <h2 className="mt-4 home-title leading-tight">
              Trusted by{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#4d8c1e,#7cc22e)",
                }}
              >
                investors
              </span>{" "}
              &amp; operators
            </h2>
            <p className="mt-2 text-sm text-[#8a9185] max-w-sm">
              Real feedback from the people building and backing sustainable
              agriculture.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2.5">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4e4c0] bg-white text-[#4d8c1e] shadow-sm transition-all hover:bg-[#4d8c1e] hover:text-white hover:border-[#4d8c1e] hover:shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4e4c0] bg-white text-[#4d8c1e] shadow-sm transition-all hover:bg-[#4d8c1e] hover:text-white hover:border-[#4d8c1e] hover:shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Desktop: 3 cards ── */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {visible.map((idx, pos) => {
            const t = testimonials[idx];
            const isFirst = pos === 0;

            return (
              <div
                key={`${idx}-${active}-${pos}`}
                className={[
                  "relative flex flex-col justify-between rounded-[1.75rem] p-7 transition-all duration-500",
                  isFirst
                    ? "text-white shadow-2xl scale-[1.02]"
                    : "bg-white border border-[#edf0e8] shadow-md hover:-translate-y-1 hover:shadow-xl hover:border-[#c8dea8]",
                ].join(" ")}
                style={
                  isFirst
                    ? {
                      background:
                        "linear-gradient(145deg, #2f5e10, #4d8c1e, #7cc22e)",
                      boxShadow: "0 24px 64px -12px rgba(77,140,30,0.5)",
                    }
                    : {}
                }
              >
                {/* Large decorative open-quote */}
                <span
                  className={`absolute top-5 right-6 text-[72px] font-serif leading-none select-none ${isFirst ? "text-white/10" : "text-[#4d8c1e]/8"
                    }`}
                >
                  "
                </span>

                <div className="flex flex-col gap-5">
                  <StarRow rating={t.rating} isActive={isFirst} />

                  <p
                    className={`text-[14px] leading-[1.8] ${isFirst ? "text-white/90" : "text-zinc-500"
                      }`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div
                  className={`mt-6 flex items-center gap-3 pt-5 border-t ${isFirst ? "border-white/15" : "border-[#f0f3ec]"
                    }`}
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold tracking-wide ${isFirst
                        ? "bg-white/20 text-white ring-1 ring-white/30"
                        : "text-white"
                      }`}
                    style={
                      !isFirst
                        ? {
                          background:
                            "linear-gradient(135deg,#4d8c1e,#7cc22e)",
                        }
                        : {}
                    }
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold leading-snug ${isFirst ? "text-white" : "text-[#1a1f14]"
                        }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${isFirst ? "text-white/65" : "text-[#8a9185]"
                        }`}
                    >
                      {t.role}
                    </p>
                  </div>

                  {/* Verified badge */}
                  <div
                    className={`ml-auto flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${isFirst
                        ? "bg-white/15 text-white"
                        : "bg-[#edf5e4] text-[#4d8c1e]"
                      }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Verified
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile: single card with swipe feel ── */}
        <div className="md:hidden">
          {(() => {
            const t = testimonials[active];
            return (
              <div
                className="relative flex flex-col gap-5 rounded-[1.75rem] p-7 text-white shadow-2xl"
                style={{
                  background:
                    "linear-gradient(145deg, #2f5e10, #4d8c1e, #7cc22e)",
                  boxShadow: "0 24px 64px -12px rgba(77,140,30,0.5)",
                }}
              >
                <span className="absolute top-4 right-5 text-[72px] font-serif leading-none select-none text-white/10">
                  "
                </span>

                <StarRow rating={t.rating} isActive={true} />

                <p className="text-[14px] leading-[1.85] text-white/90">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white ring-1 ring-white/30">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/65 mt-0.5">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Verified
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Mobile swipe arrows */}
          <div className="mt-5 flex items-center justify-between px-1">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4e4c0] bg-white text-[#4d8c1e] shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "8px",
                    background:
                      i === active
                        ? "linear-gradient(90deg,#4d8c1e,#7cc22e)"
                        : "#d4e0c8",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4e4c0] bg-white text-[#4d8c1e] shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Desktop dots ── */}
        <div className="mt-10 hidden md:flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === active ? "28px" : "8px",
                background:
                  i === active
                    ? "linear-gradient(90deg,#4d8c1e,#7cc22e)"
                    : "#d4e0c8",
              }}
            />
          ))}
        </div>

        {/* ── Summary stats strip ── */}
        <div className="mt-14 grid grid-cols-3 gap-4 rounded-[1.5rem] bg-white border border-[#edf0e8] shadow-sm px-6 py-6 sm:px-10">
          {[
            { value: "4.9", label: "Average Rating", suffix: "/5" },
            { value: "200+", label: "Verified Reviews", suffix: "" },
            { value: "98%", label: "Would Recommend", suffix: "" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center gap-1"
            >
              <p
                className="text-2xl sm:text-3xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg,#4d8c1e,#7cc22e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
                <span className="text-base font-semibold">{s.suffix}</span>
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-[#8a9185] leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
