"use client";
import { useEffect, useRef } from "react";

export default function AgricultureEvolvingSection() {
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && barRef.current) {
          barRef.current.style.width = "73%";
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current.parentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-8">

          {/* Top Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] max-w-full group">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80"
              alt="Farmers in greenhouse"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Live Badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/60 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-800 tracking-wide">
                Smart Farming Active
              </span>
            </div>
          </div>

          {/* Text + Stats */}
          <div className="flex flex-col gap-5">
            <p className="text-[15px] leading-relaxed text-zinc-500 font-light">
              Farmers today face{" "}
              <strong className="text-green-800 font-medium">
                rising costs, climate uncertainty
              </strong>
              , and limited visibility into their operations. Decisions are
              often reactive, not strategic — leading to wasted resources and
              unpredictable outcomes.
            </p>
            <p className="text-[15px] leading-relaxed text-zinc-500 font-light">
              We transform fragmented farm data into clear,{" "}
              <strong className="text-green-800 font-medium">
                actionable intelligence
              </strong>{" "}
              — enabling farmers and agribusinesses to operate with confidence,
              precision, and long-term sustainability.
            </p>

            {/* Stats Row */}
            <div className="flex gap-8 pt-2 border-t border-zinc-100">
              {[
                { num: "3.2×", label: "Yield Growth" },
                { num: "40%", label: "Cost Reduced" },
                { num: "12k+", label: "Farms Served" },
              ].map(({ num, label }) => (
                <div key={label} className="flex flex-col gap-1">
                  <span
                    className="font-serif italic text-3xl text-green-800 leading-none"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {num}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-10 lg:pt-2">

          {/* Heading */}
          <div className="flex flex-col gap-5">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-3 py-1 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                The Problem
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl text-zinc-900 leading-tight font-light tracking-tight">
              Agriculture Is Evolving.{" "}
              <span className="block">Traditional Systems</span>
              <span
                className="italic text-emerald-700"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                Can&rsquo;t Keep Up.
              </span>
            </h2>
          </div>

          {/* Main Image with floating card */}
          <div className="relative rounded-3xl overflow-hidden aspect-[3/2] group">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80"
              alt="Farmer walking in sunset field"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Floating Analytics Card */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-xl border border-white/70 min-w-[160px]">
              <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-semibold mb-2">
                Crop Efficiency
              </p>
              <div className="w-full h-1.5 bg-emerald-50 rounded-full overflow-hidden">
                <div
                  ref={barRef}
                  className="h-full bg-gradient-to-r from-emerald-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "0%" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[11px] font-semibold text-zinc-700">
                  Season Progress
                </span>
                <span className="text-[11px] font-bold text-emerald-500">
                  +73%
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}