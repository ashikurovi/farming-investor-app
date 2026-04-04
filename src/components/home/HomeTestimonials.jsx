"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

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

export default function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % total), 4500);
    return () => clearInterval(id);
  }, [total]);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  const visible = [0, 1, 2].map((offset) => (active + offset) % total);

  return (
    <section className="relative home-section overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#7cc22e]/8 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#4d8c1e]/6 blur-[80px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="home-tag w-fit">
              <span className="home-tag-dot" />
              Testimonials
            </div>
            <h2 className="mt-4 home-title leading-tight">
              What our{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#4d8c1e,#7cc22e)",
                }}
              >
                users
              </span>{" "}
              are saying
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4e4c0] bg-white text-[#4d8c1e] shadow-sm transition-all hover:border-[#7cc22e] hover:shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4e4c0] bg-white text-[#4d8c1e] shadow-sm transition-all hover:border-[#7cc22e] hover:shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {visible.map((idx, pos) => {
            const t = testimonials[idx];
            const isFirst = pos === 0;

            return (
              <div
                key={`${idx}-${active}`}
                className={[
                  "relative flex flex-col gap-5 rounded-3xl p-7 transition-all duration-300",
                  isFirst
                    ? "text-white shadow-2xl"
                    : "bg-white border border-[#edf0e8] shadow-md hover:-translate-y-1 hover:shadow-xl hover:border-[#c8dea8]",
                  pos > 0 ? "hidden md:flex" : "flex",
                ].join(" ")}
                style={
                  isFirst
                    ? {
                        background:
                          "linear-gradient(135deg, #3d7018, #5fa820, #7cc22e)",
                        boxShadow: "0 20px 60px -15px rgba(77,140,30,0.45)",
                      }
                    : {}
                }
              >
                {/* Large decorative quote icon */}
                <Quote
                  className={`absolute top-5 right-6 h-10 w-10 opacity-10 ${
                    isFirst ? "text-white" : "text-[#4d8c1e]"
                  }`}
                />

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < t.rating
                          ? isFirst
                            ? "fill-white text-white"
                            : "fill-amber-400 text-amber-400"
                          : isFirst
                            ? "fill-white/30 text-white/30"
                            : "fill-zinc-200 text-zinc-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={`text-sm leading-relaxed flex-1 ${
                    isFirst ? "text-white/90" : "text-zinc-600"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div
                  className={`flex items-center gap-3 pt-4 border-t ${
                    isFirst ? "border-white/20" : "border-[#edf0e8]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isFirst
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
                      className={`text-sm font-bold ${
                        isFirst ? "text-white" : "text-[#1a1f14]"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        isFirst ? "text-white/70" : "text-[#8a9185]"
                      }`}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Dots ── */}
        <div className="mt-8 flex justify-center gap-2">
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
      </div>
    </section>
  );
}
