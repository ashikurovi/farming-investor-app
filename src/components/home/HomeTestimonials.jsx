"use client";

import { Star, Quote, CheckCircle } from "lucide-react";

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

export default function HomeTestimonials() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className=" max-w-2xl  text-left mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              Testimonials
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
            Trusted by <span className="font-serif italic">investors</span> and{" "}
            <span className="font-serif italic text-emerald-700">operators</span>
            .
          </h2>

          <p className="text-zinc-500  text-xs md:text-lg leading-relaxed">
            What stakeholders say about clarity, reporting, and day-to-day
            experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <figure
              key={index}
              className="relative flex flex-col p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon Background */}
              <div className="absolute top-6 right-8 text-zinc-100">
                <Quote className="w-12 h-12 opacity-20 transform rotate-180" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 text-emerald-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "fill-emerald-500" : "fill-zinc-200 text-zinc-200"}`}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-grow mb-8">
                <p className="text-zinc-600 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-zinc-50 mt-auto">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  {testimonial.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 fill-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-zinc-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-zinc-400 font-medium uppercase tracking-wide">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
