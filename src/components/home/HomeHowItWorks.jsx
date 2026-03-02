"use client";
import { UserPlus, Search, Sprout, Landmark } from "lucide-react";
import Link from "next/link";

function StepCard({ id, title, description, Icon }) {
  return (
    <div className="group relative bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border border-zinc-100 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-amber-200 transition-all duration-300 z-10">
        <span className="text-xs font-bold text-zinc-400 group-hover:text-amber-600">
          {id}
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <div className="mb-6 p-4 rounded-full bg-zinc-50 text-zinc-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors duration-300">
          <Icon className="w-8 h-8" strokeWidth={1.5} />
        </div>

        <h3 className="text-lg font-semibold text-zinc-900 mb-3 group-hover:text-amber-700 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
      </div>
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
    <section className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-6">
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-zinc-900 mb-6 tracking-tight">
            Cultivate wealth in{" "}
            <span className="font-serif italic text-amber-600">
              four simple steps
            </span>
            .
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            We've streamlined agricultural investing to be as accessible as
            stocks, but with the tangible security of productive land.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent -z-10" />

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

        <div className="mt-16 text-center"></div>
      </div>
    </section>
  );
}
