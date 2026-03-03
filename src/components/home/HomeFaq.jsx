"use client";

import { useState } from "react";
import {
  ChevronDown,
  MessageCircle,
  Phone,
  Mail,
  Plus,
  Minus,
} from "lucide-react";

const faqs = [
  {
    question: "How does the farming investment model work?",
    answer:
      "Our platform connects investors with sustainable agricultural projects. You browse vetted farms, choose a project that aligns with your goals, and invest. We handle the operations, and you receive updates and returns based on the harvest cycles.",
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "To make agricultural investment accessible, our minimum investment starts from as low as BDT 10,000. This allows you to diversify your portfolio across multiple projects and crop types.",
  },
  {
    question: "How are the returns calculated and distributed?",
    answer:
      "Returns are calculated based on the actual yield and market price of the produce. We provide projected ROI for each project based on historical data. Profits are distributed to your wallet after the harvest is sold, typically every 3-6 months depending on the crop.",
  },
  {
    question: "Is my investment secured against risks?",
    answer:
      "We employ modern farming techniques and insurance coverage for eligible projects to mitigate risks. While all investments carry some risk, our expert team manages the farms to maximize yield and minimize potential losses from weather or pests.",
  },
  {
    question: "Can I visit the farm I invested in?",
    answer:
      "Yes! We encourage transparency. You can schedule a guided farm visit through our platform to see the operations firsthand and meet the farmers managing your investment.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="">
      <div className="max-w-7xl mb-6 mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                Support & FAQ
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 leading-tight">
              Common questions,{" "}
              <span className="font-serif italic text-emerald-700">clarified</span>.
            </h2>

            <p className="text-zinc-500 text-xs md:text-lg leading-relaxed max-w-xl">
              Everything you need to know about investing in sustainable
              agriculture and growing your wealth with us.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className={`group border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                    isOpen
                      ? "bg-emerald-50/30 border-emerald-200 shadow-sm"
                      : "bg-white border-zinc-200 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 p-6">
                    <h3
                      className={`text-base md:text-lg font-medium transition-colors ${
                        isOpen
                          ? "text-emerald-900"
                          : "text-zinc-900 group-hover:text-emerald-800"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className={`relative flex-shrink-0 ml-4 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-emerald-500 text-white rotate-180"
                          : "bg-zinc-100 text-zinc-400 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0">
                        <div
                          className={`h-px w-full bg-emerald-100/50 mb-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
                        />
                        <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Need personal help?</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                  Our expert support team is available 24/7 to guide you through
                  your investment journey.
                </p>

                <div className="space-y-4">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group hover:scale-[1.02] active:scale-[0.98]">
                    <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        Live Chat
                      </div>
                      <div className="text-sm font-bold text-white">
                        Start a conversation
                      </div>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group hover:scale-[1.02] active:scale-[0.98]">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        Email Us
                      </div>
                      <div className="text-sm font-bold text-white">
                        support@farming.com
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100 text-emerald-900 hover:bg-emerald-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-emerald-100/50">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">Call for inquiries</h4>
                  <p className="text-xs text-emerald-700/80 mb-2">
                    Mon-Fri from 9am to 6pm
                  </p>
                  <a
                    href="tel:+8801234567890"
                    className="text-lg font-bold tracking-tight hover:underline decoration-emerald-500 underline-offset-4 decoration-2"
                  >
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
