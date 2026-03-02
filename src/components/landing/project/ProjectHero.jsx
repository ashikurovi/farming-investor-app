import { ArrowRight } from "lucide-react";

export function ProjectHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-zinc-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 transition-transform duration-1000 hover:scale-105"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/158827/farm-sunset-wheat-sky-158827.jpeg?auto=compress&cs=tinysrgb&w=1920')"
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Investment Opportunities
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Cultivate <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Wealth</span> <br />
            <span className="font-serif italic font-light">from the ground up.</span>
          </h1>
          
          <p className="text-lg text-zinc-300 max-w-xl leading-relaxed">
            Discover high-yield agricultural projects vetted for sustainability and profitability. 
            From seasonal crops to livestock, diversify your portfolio with tangible assets.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/30 flex items-center gap-2 group">
              View Active Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold backdrop-blur-sm transition-all">
              How it works
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-zinc-500 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-zinc-500" />
        </div>
      </div>
    </section>
  );
}
