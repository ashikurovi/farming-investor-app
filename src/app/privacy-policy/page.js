"use client";

import React, { useState, useEffect } from "react";
import { LegalPageHero } from "@/components/shared/LegalPageHero";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Scale,
  Mail,
  ChevronRight,
  Database,
  Server,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PrivacyPolicy() {
  const [lastUpdated] = useState(() => {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  });
  const [activeSection, setActiveSection] = useState("introduction");

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "introduction",
        "data-collection",
        "data-usage",
        "data-security",
        "legal-rights",
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
    { id: "introduction", label: "Introduction", icon: Shield },
    { id: "data-collection", label: "Data We Collect", icon: Database },
    { id: "data-usage", label: "How We Use Your Data", icon: Eye },
    { id: "data-security", label: "Data Security", icon: Lock },
    { id: "legal-rights", label: "Your Legal Rights", icon: Scale },
    { id: "contact", label: "Contact Us", icon: Mail },
  ];

  return (
    <>
      <LegalPageHero
        title={
          <>
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Policy
            </span>
          </>
        }
        subtitle="We are committed to protecting your personal data and ensuring transparency in how we handle your information."
        badge="Privacy Policy"
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
                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4 transition-colors",
                            activeSection === item.id
                              ? "text-emerald-500"
                              : "text-zinc-400 group-hover:text-zinc-600",
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
                  <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                  <p className="text-emerald-200/80 text-sm mb-4">
                    If you have questions about your data privacy, our team is
                    here to assist.
                  </p>
                  <a
                    href="mailto:privacy@farming-investor.com"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-white transition-colors"
                  >
                    Contact Support <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 space-y-12">
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      1. Introduction
                    </h2>
                  </div>
                  <div className="prose prose-zinc max-w-none prose-headings:font-light prose-headings:tracking-tight prose-a:text-emerald-600 hover:prose-a:text-emerald-700">
                    <p className="text-zinc-600 text-lg leading-relaxed">
                      At{" "}
                      <span className="font-semibold text-zinc-900">
                        Farming Investor
                      </span>{" "}
                      (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we
                      respect your privacy and are committed to protecting your
                      personal data. This privacy policy will inform you as to
                      how we look after your personal data when you visit our
                      website (regardless of where you visit it from) and tell
                      you about your privacy rights and how the law protects
                      you.
                    </p>
                  </div>
                </div>
              </section>

              {/* Data We Collect */}
              <section id="data-collection" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <Database className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      2. Data We Collect
                    </h2>
                  </div>
                  <p className="text-zinc-600 mb-8">
                    We may collect, use, store and transfer different kinds of
                    personal data about you which we have grouped together as
                    follows:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Identity Data",
                        desc: "First name, last name, username or similar identifier.",
                        color: "bg-orange-50 border-orange-100",
                      },
                      {
                        title: "Contact Data",
                        desc: "Billing address, delivery address, email address and telephone numbers.",
                        color: "bg-purple-50 border-purple-100",
                      },
                      {
                        title: "Financial Data",
                        desc: "Bank account and payment card details (processed securely).",
                        color: "bg-emerald-50 border-emerald-100",
                      },
                      {
                        title: "Transaction Data",
                        desc: "Details about payments to and from you and other services.",
                        color: "bg-blue-50 border-blue-100",
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

              {/* How We Use Data */}
              <section id="data-usage" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      3. How We Use Your Data
                    </h2>
                  </div>
                  <p className="text-zinc-600 mb-6">
                    We will only use your personal data when the law allows us
                    to. Most commonly, we will use your personal data in the
                    following circumstances:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Where we need to perform the contract we are about to enter into or have entered into with you.",
                      "Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.",
                      "Where we need to comply with a legal or regulatory obligation.",
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

              {/* Data Security */}
              <section id="data-security" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      4. Data Security
                    </h2>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <p className="text-zinc-600 mb-4 leading-relaxed">
                        We have put in place appropriate security measures to
                        prevent your personal data from being accidentally lost,
                        used or accessed in an unauthorized way, altered or
                        disclosed. In addition, we limit access to your personal
                        data to those employees, agents, contractors and other
                        third parties who have a business need to know.
                      </p>
                      <p className="text-zinc-600 leading-relaxed">
                        They will only process your personal data on our
                        instructions and they are subject to a duty of
                        confidentiality.
                      </p>
                    </div>
                    <div className="w-full md:w-1/3 bg-zinc-50 rounded-2xl p-6 border border-zinc-100 text-center">
                      <Server className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                      <h4 className="font-bold text-zinc-900 mb-1">
                        Encrypted
                      </h4>
                      <p className="text-xs text-zinc-500">
                        All sensitive data is encrypted at rest and in transit.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Legal Rights */}
              <section id="legal-rights" className="scroll-mt-32">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900">
                      5. Your Legal Rights
                    </h2>
                  </div>
                  <p className="text-zinc-600 mb-6">
                    Under certain circumstances, you have rights under data
                    protection laws in relation to your personal data, including
                    the right to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Request access",
                      "Request correction",
                      "Request erasure",
                      "Object to processing",
                      "Request restriction",
                      "Request transfer",
                      "Withdraw consent",
                    ].map((right, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-700 text-sm font-medium flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {right}
                      </div>
                    ))}
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
                      If you have any questions about this privacy policy or our
                      privacy practices, please contact us.
                    </p>

                    <div className="bg-white p-6 rounded-2xl border border-emerald-100/50 shadow-sm inline-block min-w-[300px]">
                      <p className="text-emerald-950 font-bold mb-1">
                        Email Support
                      </p>
                      <a
                        href="mailto:privacy@farming-investor.com"
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-lg"
                      >
                        privacy@farming-investor.com
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
