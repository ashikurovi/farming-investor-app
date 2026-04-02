"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, Quote, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    initials: "AM",
    name: "Amina M.",
    role: "Individual Investor",
    rating: 5,
    quote:
      "The dashboard makes it easy to understand where my capital is, what changed this month, and what to expect next. Everything feels structured.",
    verified: true,
  },
  {
    initials: "JC",
    name: "James C.",
    role: "Portfolio Manager",
    rating: 5,
    quote:
      "Reporting is finally consistent. The structure helps us compare projects, spot risks earlier, and communicate updates to LPs without spreadsheets.",
    verified: true,
  },
  {
    initials: "SK",
    name: "Sofia K.",
    role: "Farm Operator",
    rating: 4,
    quote:
      "The process is straightforward—milestones, updates, and documents are all in one place. It saves time and keeps everyone aligned.",
    verified: true,
  },
];

function TestimonialCard({ testimonial, muted }) {
  return (
    <figure
      className={[
        "relative flex h-full flex-col rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300",
        muted
          ? "border-zinc-200/70 opacity-85"
          : "border-zinc-200/70 shadow-[0_22px_70px_-55px_rgba(0,0,0,0.45)] ring-1 ring-black/5",
      ].join(" ")}
    >
      <div className="absolute right-6 top-6 text-zinc-100">
        <Quote className="h-12 w-12 rotate-180 opacity-35" />
      </div>

      <div className="flex gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-zinc-200 text-zinc-200"
            }`}
          />
        ))}
      </div>

      <blockquote className="mt-5 flex-grow">
        <p className="text-[13px] leading-relaxed text-zinc-600">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      <div className="mt-6 flex items-center gap-4 border-t border-zinc-100 pt-5">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-sm font-bold text-emerald-700">
            {testimonial.initials}
          </div>
          {testimonial.verified && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm">
              <CheckCircle className="h-4 w-4 fill-white text-emerald-500" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold text-zinc-900">
            {testimonial.name}
          </div>
          <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {testimonial.role}
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function HomeTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    if (total <= 1) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => window.clearInterval(id);
  }, [total]);

  const visibleIndexes = useMemo(() => {
    if (total === 0) return [];
    return [activeIndex, (activeIndex + 1) % total];
  }, [activeIndex, total]);

  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                Testimonials
              </span>
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
              Trusted by Forward‑Thinking{" "}
              <span className="text-zinc-900">Investors</span>{" "}
              <span className="text-zinc-400">&amp;</span>{" "}
              <span className="text-zinc-900">Operators</span>
            </h2>

            <p className="mt-5 max-w-md text-[13px] leading-relaxed text-zinc-600 md:text-base">
              Real feedback on visibility, reporting, and day‑to‑day operations
              from stakeholders across the ecosystem.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {visibleIndexes.map((idx, pos) => {
                const t = testimonials[idx];
                return (
                  <div
                    key={`${idx}-${activeIndex}`}
                    className={[
                      "animate-fade-in-up opacity-0 [animation-delay:50ms]",
                      pos === 1 ? "hidden md:block" : "",
                    ].join(" ")}
                  >
                    <TestimonialCard testimonial={t} muted={pos === 1} />
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition hover:text-zinc-900"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition hover:text-zinc-900"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={[
                      "h-2 rounded-full transition-all",
                      i === activeIndex ? "w-8 bg-zinc-900" : "w-2 bg-zinc-300",
                    ].join(" ")}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
