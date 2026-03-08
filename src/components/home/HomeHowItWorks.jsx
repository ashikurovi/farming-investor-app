"use client";
import { UserPlus, Search, Sprout, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

function StepCard({ id, title, description, Icon }) {
  return (
    <div className="group relative bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500 overflow-hidden">
      {/* Background Decorative Number */}
      <div className="absolute -right-4 -top-4 text-[120px] font-bold text-zinc-50 group-hover:text-emerald-50/80 transition-colors duration-500 select-none leading-none z-0">
        {id}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8 inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 w-fit shadow-sm group-hover:shadow-emerald-200">
          <Icon className="w-8 h-8" strokeWidth={1.5} />
        </div>

        <h3 className="text-xl font-bold text-zinc-900 mb-4 group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>

        <p className="text-zinc-500 leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        <div className="flex items-center text-sm font-semibold text-emerald-600 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Learn more <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}

const steps = [
  {
    id: "01",
    title: "Create Profile",
    description:
      "Join our exclusive network of accredited agricultural investors. Complete your verification securely in minutes.",
    icon: UserPlus,
  },
  {
    id: "02",
    title: "Select Assets",
    description:
      "Browse vetted high-yield farmland opportunities. Filter by crop type, region, and risk profile to match your strategy.",
    icon: Search,
  },
  {
    id: "03",
    title: "Invest & Grow",
    description:
      "Allocate capital directly to operational farms. Your funds facilitate modern equipment, seeds, and sustainable practices.",
    icon: Sprout,
  },
  {
    id: "04",
    title: "Harvest Returns",
    description:
      "Track real-time crop performance and receive seasonal dividend payouts directly to your secure wallet.",
    icon: Landmark,
  },
];

export default function HomeHowItWorks() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Simple Process
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
              Cultivate <span className="font-serif italic">wealth</span> in
              four simple{" "}
              <span className="font-serif italic text-emerald-700">steps</span>.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              id={step.id}
              title={step.title}
              description={step.description}
              Icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
