"use client";

import React, { useState, useEffect } from "react";
import { LegalPageHero } from "@/components/shared/LegalPageHero";
import {
  FileText,
  Scale,
  UserCheck,
  Copyright,
  AlertTriangle,
  Mail,
  ChevronRight,
  Gavel,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TermsOfService() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const [activeSection, setActiveSection] = useState("agreement");

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "agreement",
        "rules",
        "representations",
        "ip-rights",
        "liability",
        "contact",
      ];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "agreement", label: "Agreement to Terms", icon: FileText },
    { id: "rules", label: "Rules & Regulations", icon: Gavel },
    { id: "representations", label: "User Representations", icon: UserCheck },
    { id: "ip-rights", label: "Intellectual Property", icon: Copyright },
    { id: "liability", label: "Limitation of Liability", icon: AlertTriangle },
    { id: "contact", label: "Contact Us", icon: Mail },
  ];

  return (
    <>
      <LegalPageHero
        title={
          <>
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Service
            </span>
          </>
        }
        subtitle="Please read these terms carefully before using our services. They govern your relationship with Farming Investor."
        badge="Terms of Service"
        lastUpdated={lastUpdated}
        backgroundImage="https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="bg-zinc-50 min-h-screen py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Sidebar Navigation - Sticky */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">
                    Table of Contents
                  </h3>
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-left group",
                          activeSection === item.id
                            ? "bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4 transition-colors",
                            activeSection === item.id
                              ? "text-emerald-500"
                              : "text-zinc-400 group-hover:text-zinc-600"
                          )}
                        />
                        {item.label}
                        {activeSection === item.id && (
                          <ChevronRight className="w-4 h-4 ml-auto text-emerald-500 animate-in fade-in slide-in-from-left-2" />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Contact Card */}
                <div className="bg-emerald-900 rounded-2xl p-6 text-white relative overflow-hidden hidden lg:block">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <h4 className="font-bold text-lg mb-2">Have Questions?</h4>
                  <p className="text-emerald-200/80 text-sm mb-4">
                    Our legal team is available to clarify any terms or conditions.
                  </p>
                  <a
                    href="mailto:legal@farming-investor.com"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
                  >
                    Contact Legal Team <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 space-y-12">
              {/* Agreement to Terms */}
              <section id="agreement" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      1. Agreement to Terms
                    </h2>
                  </div>
                  <div className="prose prose-zinc max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-emerald-600 hover:prose-a:text-emerald-700">
                    <p className="text-zinc-600 text-lg leading-relaxed">
                      These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and <span className="font-semibold text-zinc-900">Farming Investor</span> ("we," "us," or "our"), concerning your access to and use of our website and services.
                    </p>
                  </div>
                </div>
              </section>

              {/* Investment Rules & Regulations */}
              <section id="rules" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <Gavel className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      2. Investment Rules & Regulations
                    </h2>
                  </div>
                  <p className="text-zinc-600 mb-8">
                    By investing through our platform, you acknowledge and agree to the following rules and regulations:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Eligibility",
                        desc: "You must be at least 18 years of age to register and invest.",
                        color: "bg-orange-50 border-orange-100",
                      },
                      {
                        title: "Risk Disclosure",
                        desc: "Agricultural investments carry inherent risks including weather conditions and market fluctuations.",
                        color: "bg-rose-50 border-rose-100",
                      },
                      {
                        title: "Lock-in Period",
                        desc: "Investments are typically locked for the duration of the crop cycle (usually 3-12 months).",
                        color: "bg-purple-50 border-purple-100",
                      },
                      {
                        title: "Compliance",
                        desc: "All funds must be from legitimate sources in compliance with AML laws.",
                        color: "bg-emerald-50 border-emerald-100",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border ${item.color} transition-transform hover:scale-[1.02] duration-300`}
                      >
                        <h4 className="font-bold text-zinc-900 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-zinc-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* User Representations */}
              <section id="representations" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      3. User Representations
                    </h2>
                  </div>
                  <p className="text-zinc-600 mb-6">
                    By using the Site, you represent and warrant that:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "All registration information you submit will be true, accurate, current, and complete.",
                      "You have the legal capacity and you agree to comply with these Terms of Service.",
                      "You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.",
                      "You will not use the Site for any illegal or unauthorized purpose.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 border border-zinc-100"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                        <span className="text-zinc-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Intellectual Property Rights */}
              <section id="ip-rights" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Copyright className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      4. Intellectual Property Rights
                    </h2>
                  </div>
                  <p className="text-zinc-600 leading-relaxed">
                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      5. Limitation of Liability
                    </h2>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <p className="text-zinc-600 mb-4 leading-relaxed">
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                      </p>
                    </div>
                    <div className="w-full md:w-1/3 bg-zinc-50 rounded-2xl p-6 border border-zinc-100 text-center">
                      <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                      <h4 className="font-bold text-zinc-900 mb-1">
                        Protected
                      </h4>
                      <p className="text-xs text-zinc-500">
                        We prioritize the security and integrity of our platform.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-32">
                <div className="bg-emerald-50 rounded-3xl p-8 md:p-10 border border-emerald-100 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-emerald-600">
                      <Mail className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-950 mb-4">
                      6. Contact Us
                    </h2>
                    <p className="text-emerald-800/80 mb-8 max-w-lg mx-auto">
                      In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us.
                    </p>

                    <div className="bg-white p-6 rounded-2xl border border-emerald-100/50 shadow-sm inline-block min-w-[300px]">
                      <p className="text-emerald-950 font-bold mb-1">
                        Legal Support
                      </p>
                      <a
                        href="mailto:legal@farming-investor.com"
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-lg"
                      >
                        legal@farming-investor.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
