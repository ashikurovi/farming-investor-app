"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Sprout,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const YearText = dynamic(() => import("./YearText"), { ssr: false });

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const exploreLinks = [
  { label: "Projects", href: "/landing/project" },
  { label: "Gallery", href: "/landing/gallery" },
  { label: "About Us", href: "/landing/about" },
  { label: "Contact", href: "/landing/contact" },
];

const portalLinks = [
  { label: "Investor Login", href: "/investor" },
  { label: "Admin Console", href: "/admin" },
  { label: "Partner Portal", href: "/partner" },
];

export function MainFooter() {
  return (
    <footer
      className="relative text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #3a6b14 0%, #4d8c1e 40%, #6ab82a 75%, #7cc22e 100%)",
      }}
    >
      {/* Mesh overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 10% 50%, rgba(255,255,255,0.07) 0%, transparent 60%),
            radial-gradient(ellipse at 90% 10%, rgba(255,255,255,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.15) 0%, transparent 60%)
          `,
        }}
      />
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />

      {/* ── Newsletter Bar ── */}
      <div
        className="relative border-b"
        style={{ borderColor: "rgba(255,255,255,0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <Send className="w-4 h-4 text-white" />
            </div>
            <div>
              <p
                className="text-sm font-semibold tracking-wide"
                style={{ color: "#e8facc" }}
              >
                Stay ahead of the harvest
              </p>
              <p
                className="text-xs"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Weekly insights on agri-investment opportunities
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-52 text-sm px-4 py-2 rounded-full outline-none placeholder-white/50"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
              }}
            />
            <button
              className="px-5 py-2 rounded-full text-sm font-bold shrink-0 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "white", color: "#3a6b14" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div
                className="h-11 w-11 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.35)",
                }}
              >
                <Sprout className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight leading-none">
                  Farming
                  <span style={{ color: "#d4f5a0" }}>Investor</span>
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.18em] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Agricultural Investment Platform
                </p>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.78)", maxWidth: "300px" }}
            >
              Democratizing agricultural investment — connecting capital with
              sustainable farming projects for a greener, wealthier future.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "৳48Cr+", label: "Invested" },
                { value: "120+", label: "Projects" },
                { value: "4,200+", label: "Investors" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <p
                    className="text-base font-black"
                    style={{ color: "#d4f5a0" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-[10px] mt-0.5"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.28)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 pb-2"
              style={{
                color: "#d4f5a0",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center justify-between text-sm group"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    <span className="group-hover:text-white group-hover:translate-x-1 transition-all duration-200 inline-block">
                      {label}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      style={{ color: "#d4f5a0" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div className="lg:col-span-2">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 pb-2"
              style={{
                color: "#d4f5a0",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Portals
            </h3>
            <ul className="space-y-3">
              {portalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center justify-between text-sm group"
                    style={{ color: "rgba(255,255,255,0.8)" }}
                  >
                    <span className="group-hover:text-white group-hover:translate-x-1 transition-all duration-200 inline-block">
                      {label}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      style={{ color: "#d4f5a0" }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 pb-2"
              style={{
                color: "#d4f5a0",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  content: (
                    <span>
                      Level 4, AgriTech Tower,
                      <br />
                      Dhaka 1212, Bangladesh
                    </span>
                  ),
                },
                { icon: Phone, content: <span>+880 1234 567 890</span> },
                {
                  icon: Mail,
                  content: (
                    <span className="break-all">
                      hello@farming-investor.com
                    </span>
                  ),
                },
              ].map(({ icon: Icon, content }, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="pt-1 leading-relaxed">{content}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div
              className="flex flex-col sm:flex-row items-center gap-3 text-xs text-center"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <p>
                © <YearText /> Farming Investor. All rights reserved.
              </p>
              <div
                className="hidden sm:block h-3 w-px"
                style={{ background: "rgba(255,255,255,0.25)" }}
              />
              <div className="flex gap-4">
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <div
              className="flex items-center gap-2 text-xs px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#d4f5a0",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse inline-block"
                style={{ background: "#d4f5a0" }}
              />
              Platform Status: Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}