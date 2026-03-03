import React from "react";
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { ContactInfo } from "@/components/landing/contact/ContactInfo";

export const metadata = {
  title: "Contact Us | Framing Investor App",
  description:
    "Get in touch with our team. We're here to answer your questions about sustainable farm investing.",
};

const Contactpage = () => {
  return (
    <main className="min-h-screen  pt-5 pb-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 w-fit mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-display mb-6">
            Let&apos;s start a conversation about{" "}
            <span className="text-emerald-600">sustainable investing.</span>
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed">
            Have questions about our projects or want to discuss investment
            opportunities? Our team is ready to help you grow your portfolio
            with purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Form - Client Component */}
          <ContactForm />

          {/* Contact Info - Static Component */}
          <ContactInfo />
        </div>
      </div>
    </main>
  );
};

export default Contactpage;
