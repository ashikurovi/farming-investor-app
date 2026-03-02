"use client";

import { Star, Quote, UserCheck, CheckCircle } from "lucide-react";

const testimonials = [
  {
    initials: "AM",
    name: "Amina M.",
    role: "Individual Investor",
    rating: 5,
    quote: "The dashboard makes it easy to understand where my capital is, what changed this month, and what to expect next. Everything feels structured.",
    verified: true
  },
  {
    initials: "JC",
    name: "James C.",
    role: "Portfolio Manager",
    rating: 5,
    quote: "Reporting is finally consistent. The structure helps us compare projects, spot risks earlier, and communicate updates to LPs without spreadsheets.",
    verified: true
  },
  {
    initials: "SK",
    name: "Sofia K.",
    role: "Farm Operator",
    rating: 4,
    quote: "The process is straightforward—milestones, updates, and documents are all in one place. It saves time and keeps everyone aligned.",
    verified: true
  }
];

export default function HomeTestimonials() {
  return (
    <section className="py-24 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 shadow-sm mx-auto">
            <UserCheck className="w-3 h-3 text-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">
              Testimonials
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-light text-zinc-900 leading-tight tracking-tight">
            Trusted by <span className="font-serif italic text-emerald-700">investors</span> and operators.
          </h2>
          
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed">
            What stakeholders say about clarity, reporting, and day-to-day experience.
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

        {/* Social Proof Strip */}
        <div className="mt-20 pt-10 border-t border-zinc-200/60">
           <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Fake Logos for "Trusted By" effect - using text for now or simple svgs */}
              <div className="text-lg font-serif font-bold text-zinc-400">Agri<span className="text-zinc-600">Bank</span></div>
              <div className="text-lg font-sans font-black tracking-tighter text-zinc-400">FARM<span className="font-light">FUND</span></div>
              <div className="text-lg font-mono font-semibold text-zinc-400">Green<span className="italic">Yield</span></div>
              <div className="text-lg font-serif italic font-bold text-zinc-400">Harvest<span className="text-zinc-600">Capital</span></div>
           </div>
        </div>

      </div>
    </section>
  );
}
