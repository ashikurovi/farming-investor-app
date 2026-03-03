"use client";

import { HelpCircle, ChevronDown, MessageCircle, Phone, Mail } from "lucide-react";

const faqs = [
  {
    question: "What is Framing?",
    answer: "Framing is a demo investor experience for farm investing—showing how projects, allocations, and reporting could be presented in a clean, transparent way."
  },
  {
    question: "Is this real data?",
    answer: "Not yet. The numbers and projects are placeholders meant to illustrate the layout. You can later connect these sections to your database or analytics pipeline."
  },
  {
    question: "How do investments work?",
    answer: "In a production platform, you would review a project’s terms, allocate capital, then track milestones and cash flows over time in the Investor dashboard."
  },
  {
    question: "When are profits paid?",
    answer: "Payout timing depends on the project structure (e.g., seasonal harvest cycles, revenue share, or fixed-term notes). The dashboard would show expected schedules and actual distributions."
  }
];

export default function HomeFaq() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 w-fit">
              <HelpCircle className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                Support & FAQ
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-light text-zinc-900 leading-tight tracking-tight">
              Questions, <span className="font-serif italic text-emerald-700">answered</span>.
            </h2>
            
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl">
              Quick clarity on how investing, payouts, and onboarding work in this experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* FAQ Accordion */}
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index} 
                className="group border border-zinc-200 bg-zinc-50/50 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 hover:bg-white hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-zinc-900 font-medium transition-colors group-hover:text-emerald-900">
                  <span className="text-base md:text-lg">{faq.question}</span>
                  <span className="relative flex-shrink-0 ml-4 h-8 w-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 transition-all duration-300 group-hover:border-emerald-200 group-hover:text-emerald-600 group-open:rotate-180 group-open:bg-emerald-50 group-open:border-emerald-200">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </summary>
                
                <div className="px-6 pb-6 pt-0">
                  <div className="h-px w-full bg-zinc-100 mb-4" />
                  <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Support Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Need personal help?</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                  Our team is available 24/7 to guide you through your investment journey.
                </p>

                <div className="space-y-4">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    <div className="text-left">
                      <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Live Chat</div>
                      <div className="text-sm font-bold">Start a conversation</div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <div className="text-left">
                      <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Email Us</div>
                      <div className="text-sm font-bold">support@farming.com</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 text-emerald-900">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Call for inquiries</h4>
                  <p className="text-xs text-emerald-700/80 mb-2">
                    Mon-Fri from 8am to 5pm
                  </p>
                  <a href="tel:+1234567890" className="text-lg font-bold tracking-tight hover:underline decoration-emerald-500 underline-offset-4">
                    +880 1234 567 890
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
