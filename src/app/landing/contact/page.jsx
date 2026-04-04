import React from "react";
import { ContactHero } from "@/components/landing/contact/ContactHero";
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { ContactInfo } from "@/components/landing/contact/ContactInfo";

export const metadata = {
  title: "Contact Us | Framing Investor App",
  description:
    "Get in touch with our team. We're here to answer your questions about sustainable farm investing.",
};

const Contactpage = () => {
  return (
    <main className="min-h-screen bg-zinc-50/50 pb-[calc(env(safe-area-inset-bottom)+6rem)] md:pb-0">
      <ContactHero />
      <div
        id="contact-form"
        className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-40 left-0 w-72 h-72 bg-[color:rgba(77,140,30,0.14)] rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-[color:rgba(124,194,46,0.12)] rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Info - Static Component */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <ContactInfo />
          </div>

          {/* Contact Form - Client Component */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contactpage;
