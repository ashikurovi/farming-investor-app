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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-100 shadow-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              Simple Process
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight font-display">
            Cultivate wealth in <br className="hidden md:block" />
            <span className="relative inline-block text-emerald-600">
              four simple steps
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
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
