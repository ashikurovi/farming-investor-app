"use client";
import { ShieldCheck, Sprout, BarChart3, Clock, CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "Institutional-Grade Security",
    description: "Your investments are backed by audited legal frameworks and secured by regulated custodians.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Farm Management",
    description: "Partner with seasoned agronomists who leverage decades of experience to maximize crop yields.",
    icon: Sprout,
  },
  {
    title: "Transparent Performance",
    description: "Access real-time dashboards showing detailed operational metrics, costs, and projected returns.",
    icon: BarChart3,
  },
  {
    title: "24/7 Investor Support",
    description: "Our dedicated concierge team is available around the clock to assist with your portfolio needs.",
    icon: Clock,
  },
];

export default function HomeWhyChooseUs() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 w-fit">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  Why Choose Us
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-light text-zinc-900 leading-tight tracking-tight">
                Built for <span className="font-serif italic text-emerald-700">trust</span>, designed for <span className="font-serif italic text-emerald-700">growth</span>.
              </h2>
              
              <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl">
                We combine traditional agricultural expertise with modern financial technology to offer a secure, transparent, and high-yield investment platform.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Direct ownership of tangible assets",
                "Quarterly dividend distributions",
                "Fully audited financial reports",
                "Sustainable farming practices"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 transition-colors">{item}</span>
                </div>
              ))}
            </div>
            
             <button className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-emerald-700 transition-colors border-b border-zinc-200 pb-1 hover:border-emerald-700">
                Explore Our Track Record
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
             </button>
          </div>

          {/* Right Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group p-8 rounded-3xl border border-zinc-100 bg-white hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 ${index === 1 || index === 3 ? 'sm:translate-y-12' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-500">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-3 group-hover:text-emerald-700 transition-colors">
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
