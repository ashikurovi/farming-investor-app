"use client";

import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateContactMutation } from "@/features/contact/contactApiSlice";

export function ContactForm() {
  const [createContact, { isLoading: isSubmitting }] =
    useCreateContactMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      firstName: formData.get("firstName")?.toString().trim() || "",
      lastName: formData.get("lastName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phone: formData.get("phone")?.toString().trim() || "",
      country: formData.get("country")?.toString().trim() || "",
      investorType: formData.get("investorType")?.toString().trim() || "",
      investmentRange:
        formData.get("investmentRange")?.toString().trim() || "",
      subject: formData.get("subject")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
    };

    try {
      await createContact(payload).unwrap();

      toast.success("Message sent successfully!", {
        description:
          "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: "We couldn't send your message. Please try again later.",
      });
    }
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-zinc-200/40 ring-1 ring-zinc-200/50 overflow-hidden group/form">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[60px] -z-10 pointer-events-none transition-transform duration-700 group-hover/form:scale-110" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-[60px] -z-10 pointer-events-none transition-transform duration-700 group-hover/form:scale-110" />
      
      <div className="mb-10 relative">
        <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">
          Send us a message
        </h3>
        <p className="text-zinc-500 text-base mt-3 leading-relaxed">
          We&apos;ll get back to you within 24 hours. Fill out the form below to start the conversation.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
            >
              First name
            </label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              required
              className="h-14 bg-zinc-50/50 border-zinc-200/80 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 rounded-2xl text-base px-4"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
            >
              Last name
            </label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              required
              className="h-14 bg-zinc-50/50 border-zinc-200/80 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 rounded-2xl text-base px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
            >
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="h-14 bg-zinc-50/50 border-zinc-200/80 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 rounded-2xl text-base px-4"
            />
          </div>

          {/* Phone Number - New Field */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="h-14 bg-zinc-50/50 border-zinc-200/80 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 rounded-2xl text-base px-4"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Country - New Field */}
            <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
            >
              Country
            </label>
            <Input
              id="country"
              name="country"
              placeholder="United States"
              className="h-12 bg-zinc-50/50 border-zinc-200 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500/10 transition-all rounded-xl"
            />
          </div>

          {/* Investor Type - New Field */}
           <div className="space-y-2">
            <label
              htmlFor="investorType"
              className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
            >
              Investor Type
            </label>
            <select
              id="investorType"
              name="investorType"
              className="flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer"
            >
              <option value="">Select Type...</option>
              <option>Investor</option>
              <option>Trustee</option>
              <option>Other</option>
            </select>
          </div>
        </div>

         {/* Investment Range - New Field */}
         <div className="space-y-2">
            <label
              htmlFor="investmentRange"
              className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
            >
              Investment Range (USD)
            </label>
            <select
              id="investmentRange"
              name="investmentRange"
              className="flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer"
            >
              <option value="">Select Range...</option>
              <option>Less than $10,000</option>
              <option>$10,000 - $50,000</option>
              <option>$50,000 - $100,000</option>
              <option>$100,000 - $500,000</option>
              <option>$500,000+</option>
            </select>
          </div>

        {/* Subject Select */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="flex h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3 py-2 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 appearance-none cursor-pointer"
          >
            <option>General Inquiry</option>
            <option>Investment Opportunities</option>
            <option>Partnership Proposal</option>
            <option>Technical Support</option>
          </select>
        </div>

        {/* Manual Textarea */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-[13px] font-bold uppercase tracking-wider text-zinc-500 ml-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us how we can help..."
            rows={5}
            required
            className="flex w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm ring-offset-white placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <Button 
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-14 rounded-2xl transition-all duration-300 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)] group disabled:opacity-70 disabled:cursor-not-allowed mt-4 overflow-hidden relative"
        >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            {isSubmitting ? (
                <div className="flex items-center justify-center gap-2 relative z-10">
                    <span>Submitting...</span>
                    <Loader2 className="w-5 h-5 animate-spin" />
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2 relative z-10">
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
            )}
        </Button>
      </form>
    </div>
  );
}
