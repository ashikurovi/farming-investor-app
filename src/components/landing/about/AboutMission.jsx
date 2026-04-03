import { Sprout, Users, Map, Wallet, ArrowRight, Activity, TrendingUp } from "lucide-react";

export function AboutMission() {
  return (
    <section id="mission" className="relative mt-10 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Mission Text */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  Our Mission
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
                Building the <span className="font-serif italic">operating system</span> for{" "}
                <span className="font-serif italic text-primary">modern farm investing</span>.
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed font-light">
              <p>
                Framing is an agri-finance platform focused on connecting long-term
                capital with resilient, real-world farm projects. We bring together
                investors, operators, and buyers in one transparent system so that
                everyone sees the same picture of risk, cash flows, and impact.
              </p>
              <p>
                Our investor app is the front door into that system: clear portfolios
                for LPs, structured workflows for fund managers, and data that farm
                operators can trust.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center text-xs font-medium text-zinc-500">
                    <Users className="h-4 w-4" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-zinc-500">
                Joined by <span className="text-zinc-900 font-semibold">5,000+</span> farmers & investors
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {/* Stat 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-zinc-50 p-8 border border-zinc-200 hover:border-[color:rgba(77,140,30,0.24)] transition-all hover:bg-white hover:shadow-xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:rgba(77,140,30,0.12)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-zinc-100">
                  <Users className="h-6 w-6" />
                </div>
                <p className="text-4xl font-bold text-zinc-900 mb-2 font-display">5K+</p>
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Farmers</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors">
                  Farmers in our pipeline and active projects across multiple regions.
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-zinc-50 p-8 border border-zinc-200 hover:border-[color:rgba(77,140,30,0.24)] transition-all hover:bg-white hover:shadow-xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.25)] sm:translate-y-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:rgba(77,140,30,0.12)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-zinc-100">
                  <Users className="h-6 w-6" />
                </div>
                <p className="text-4xl font-bold text-zinc-900 mb-2 font-display">10+</p>
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Partners</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors">
                  Agri businesses, co-ops, and lenders we work closely with.
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-zinc-50 p-8 border border-zinc-200 hover:border-[color:rgba(77,140,30,0.24)] transition-all hover:bg-white hover:shadow-xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:rgba(77,140,30,0.12)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-zinc-100">
                  <Map className="h-6 w-6" />
                </div>
                <p className="text-4xl font-bold text-zinc-900 mb-2 font-display">5+</p>
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Regions</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors">
                  Growing footprints across key farming regions globally.
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="group relative overflow-hidden rounded-2xl bg-zinc-50 p-8 border border-zinc-200 hover:border-[color:rgba(77,140,30,0.24)] transition-all hover:bg-white hover:shadow-xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.25)] sm:translate-y-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:rgba(77,140,30,0.12)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex p-3 rounded-xl bg-white text-primary shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors border border-zinc-100">
                  <Wallet className="h-6 w-6" />
                </div>
                <p className="text-4xl font-bold text-zinc-900 mb-2 font-display">$24M</p>
                <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">Assets</h3>
                <p className="text-sm text-zinc-500 group-hover:text-zinc-600 transition-colors">
                  Capital deployed into sustainable farming infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
