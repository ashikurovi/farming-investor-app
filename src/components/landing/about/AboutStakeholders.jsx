import { Handshake, Tractor, ShoppingCart, ShieldCheck, HeartHandshake } from "lucide-react";

export function AboutStakeholders() {
  const stakeholders = [
    {
      title: "Investors",
      subtitle: "Capital Allocators",
      description: "See pipeline, allocations, and realized returns across farms, all in one portfolio.",
      icon: Handshake,
    },
    {
      title: "Farm Operators",
      subtitle: "On-the-ground Execution",
      description: "Plan raises, track capital, and share performance updates without fighting spreadsheets.",
      icon: Tractor,
    },
    {
      title: "Buyers",
      subtitle: "Demand for Output",
      description: "Align contracts and offtake with production and financing timelines.",
      icon: ShoppingCart,
    },
    {
      title: "Partners",
      subtitle: "Lenders & Service Providers",
      description: "Plug in insurance, credit, and agronomy services at the right moments in the lifecycle.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="stakeholders" className="relative py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] items-start">
          
          {/* Stakeholders Grid */}
          <div>
            <div className="space-y-6 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                  Stakeholders
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
                Built for <span className="font-serif italic">everyone</span> in the{" "}
                <span className="font-serif italic text-primary">value chain</span>.
              </h2>
              <p className="text-zinc-500 text-xs md:text-lg leading-relaxed max-w-xl">
                Framing is built for everyone in the value chain, not just one side of the table.
                We create shared value through transparency.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {stakeholders.map((item, index) => (
                <div 
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-zinc-200 hover:border-[color:rgba(77,140,30,0.24)] transition-all hover:bg-white hover:shadow-xl hover:shadow-[0_24px_70px_-55px_rgba(77,140,30,0.25)] hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <item.icon className="h-24 w-24 text-primary rotate-12" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex p-2 rounded-lg bg-zinc-50 text-primary group-hover:text-primary-foreground group-hover:bg-primary transition-colors border border-zinc-100">
                      <item.icon className="h-5 w-5" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-zinc-900 mb-1 font-display group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3 group-hover:text-zinc-500">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why We Build This Sidebar */}
          <div className="relative lg:sticky lg:top-24">
            <div className="absolute -inset-4 bg-gradient-to-b from-[color:rgba(77,140,30,0.14)] via-zinc-200/50 to-transparent blur-xl opacity-50" />
            
            <div className="relative rounded-3xl bg-white/80 p-8 border border-zinc-200 shadow-xl shadow-zinc-200/50 backdrop-blur-xl ring-1 ring-black/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-full bg-secondary text-primary ring-1 ring-[color:rgba(77,140,30,0.18)]">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 font-display">
                  Why we&apos;re building this
                </h3>
              </div>
              
              <div className="space-y-6 text-zinc-600 leading-relaxed text-sm">
                <p className="text-zinc-900 font-medium text-lg">
                  Agriculture deserves tools as serious as the capital behind it.
                </p>
                <p>
                  Too often, farm investments live in PDFs, inboxes, and one-off
                  spreadsheets. Framing is our attempt to give both investors and
                  farmers a shared source of truth—so that good seasons and bad are
                  visible, explainable, and actionable.
                </p>
                <p>
                  This demo app focuses on the investor experience. Underneath, you
                  can imagine the workflows for origination, underwriting, and
                  reporting that a full platform would provide.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-400">EST. 2024</span>
                  <span className="text-xs font-mono text-zinc-400">FRAMING INC.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
