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
    <main className="min-h-screen">
      <ContactHero />
      <div id="contact-form" className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
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
