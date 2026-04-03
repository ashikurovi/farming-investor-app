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

export default function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % total), 4000);
    return () => clearInterval(id);
  }, [total]);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  // Show 3 cards on desktop, 1 on mobile
  const visible = [0, 1, 2].map((offset) => (active + offset) % total);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold text-emerald-600 uppercase tracking-widest">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl leading-tight">
              What our users are saying
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((idx, pos) => {
            const t = testimonials[idx];
            const isFirst = pos === 0;
            return (
              <div
                key={`${idx}-${active}`}
                className={[
                  "rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300",
                  isFirst
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-50 border border-zinc-100",
                  pos > 0 ? "hidden md:flex" : "flex",
                ].join(" ")}
              >
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
                            ? "fill-emerald-400 text-emerald-400"
                            : "fill-zinc-200 text-zinc-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={`text-sm leading-relaxed flex-1 ${
                    isFirst ? "text-emerald-50" : "text-zinc-600"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div
                  className={`flex items-center gap-3 pt-4 border-t ${
                    isFirst ? "border-emerald-500" : "border-zinc-100"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isFirst
                        ? "bg-white text-emerald-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        isFirst ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {t.name}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        isFirst ? "text-emerald-200" : "text-zinc-400"
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

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-emerald-600" : "w-2 bg-zinc-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
