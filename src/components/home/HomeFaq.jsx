"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState(-1); // ← Changed to -1 (all closed by default)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index); // Close if clicked again, otherwise open this one
  };

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              FAQ
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900">
            Common questions,{" "}
            <span className="font-serif italic text-emerald-700">
              clarified
            </span>
            .
          </h2>

          <p className="mt-3 text-base text-zinc-600">
            Everything you need to know about investing in sustainable
            agriculture and growing your wealth with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* FAQ Accordion */}
          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className={`group border rounded-2xl overflow-hidden bg-white cursor-pointer transition-all duration-300 ${
                    isOpen
                      ? "border-emerald-300 shadow-xl shadow-emerald-100/70"
                      : "border-zinc-200 hover:border-emerald-200 hover:shadow-md"
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between px-6 py-5">
                    <h3
                      className={`text-[15px] font-medium transition-colors ${
                        isOpen ? "text-emerald-900" : "text-zinc-900"
                      }`}
                    >
                      {faq.question}
                    </h3>

                    <div
                      className={`h-7 w-7 flex items-center justify-center rounded-xl transition-all duration-300 ${
                        isOpen
                          ? "bg-emerald-600 text-white rotate-180"
                          : "bg-zinc-100 text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-600"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 pb-6" : "max-h-0"
                    }`}
                  >
                    <div className="px-6">
                      <div className="h-px bg-emerald-100 mb-4" />
                      <p className="text-zinc-600 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support Sidebar - Matching the screenshot style */}
          <div className="lg:col-span-4 space-y-6">
            {/* Need Personal Help Card */}
            <div className="bg-zinc-900 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-semibold mb-1.5">
                Need personal help?
              </h3>
              <p className="text-zinc-400 mb-6 text-sm">
                Our investment specialists are ready to assist you anytime.
              </p>

              <div className="space-y-3">
                <button className="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-4 flex items-center gap-3 transition-all active:scale-[0.98]">
                  <div className="bg-emerald-500/20 p-2.5 rounded-xl">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-widest text-emerald-400">
                      LIVE CHAT
                    </div>
                    <div className="font-medium text-sm">
                      Start conversation now
                    </div>
                  </div>
                </button>

                <button className="w-full bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-4 flex items-center gap-3 transition-all active:scale-[0.98]">
                  <div className="bg-blue-500/20 p-2.5 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-widest text-blue-400">
                      EMAIL SUPPORT
                    </div>
                    <div className="font-medium text-sm">
                      support@xinzofarms.com
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Call Us Card */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-base">
                    Call us directly
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">
                    Monday to Friday, 9:00 AM – 6:00 PM
                  </div>
                  <a
                    href="tel:+8801234567890"
                    className="mt-2.5 block text-xl font-bold text-emerald-600 tracking-tight hover:text-emerald-700 transition-colors"
                  >
                    +880 1234-567890
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
