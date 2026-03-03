"use client";
import {
  ShieldCheck,
  Sprout,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "Institutional-Grade Security",
    description:
      "Your investments are backed by audited legal frameworks and secured by regulated custodians.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Farm Management",
    description:
      "Partner with seasoned agronomists who leverage decades of experience to maximize crop yields.",
    icon: Sprout,
  },
  {
    title: "Transparent Performance",
    description:
      "Access real-time dashboards showing detailed operational metrics, costs, and projected returns.",
    icon: BarChart3,
  },
  {
    title: "24/7 Investor Support",
    description:
      "Our dedicated concierge team is available around the clock to assist with your portfolio needs.",
    icon: Clock,
  },
];

export default function HomeWhyChooseUs() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  Why Choose Us
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-[1.1]">
                Built for <span className="font-serif italic">trust</span>,
                <br />
                designed for{" "}
                <span className="font-serif italic text-emerald-700">growth</span>.
              </h2>

              <p className="text-zinc-500 text-lg leading-relaxed max-w-xl font-light">
                We combine traditional agricultural expertise with modern
                financial technology to offer a secure, transparent, and
                high-yield investment platform.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Direct ownership of tangible assets",
                "Quarterly dividend distributions",
                "Fully audited financial reports",
                "Sustainable farming practices",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 border w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-base font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-emerald-700 transition-colors pt-4">
              <span className="border-b border-zinc-200 pb-1 group-hover:border-emerald-700 transition-colors">
                Explore Our Track Record
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
             {/* Decorative background element */}
             <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-50/50 to-transparent rounded-[3rem] -z-10 opacity-0 lg:opacity-100"></div>
             
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-3xl border border-zinc-100 bg-white hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 ${
                  index === 1 || index === 3 ? "sm:translate-y-12" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-sm">
                  <feature.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-600 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
