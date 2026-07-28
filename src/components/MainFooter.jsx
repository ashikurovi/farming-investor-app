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
} from "lucide-react";
import Image from "next/image";

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
    <footer className="relative bg-white text-zinc-800 border-t border-zinc-200 overflow-hidden">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-[calc(env(safe-area-inset-bottom)+70px)] sm:pb-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand Section - Full width on mobile, 4 cols on lg */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <div className="flex flex-col items-start gap-2">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="h-12 w-32 transition-transform group-hover:scale-105">
                  <Image
                    src="/logo6.png"
                    alt="Farming Investor"
                    width={128}
                    height={128}
                    priority
                  />
                </div>
              </Link>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Agricultural Investment Platform
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 max-w-[300px]">
              Democratizing agricultural investment — connecting capital with
              sustainable farming projects for a greener, wealthier future.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-9 w-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-zinc-100 border border-zinc-200 hover:bg-[#4d8c1e]/10 hover:border-[#4d8c1e]"
                >
                  <Icon className="w-4 h-4 text-zinc-600 hover:text-[#4d8c1e]" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 pb-2 text-[#4d8c1e] border-b border-zinc-200">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center justify-between text-sm text-zinc-600 hover:text-[#4d8c1e] group"
                  >
                    <span className="group-hover:translate-x-1 transition-all duration-200">
                      {label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#4d8c1e]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 pb-2 text-[#4d8c1e] border-b border-zinc-200">
              Portals
            </h3>
            <ul className="space-y-3">
              {portalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="flex items-center justify-between text-sm text-zinc-600 hover:text-[#4d8c1e] group"
                  >
                    <span className="group-hover:translate-x-1 transition-all duration-200">
                      {label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#4d8c1e]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us - Full width on mobile */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 pb-2 text-[#4d8c1e] border-b border-zinc-200">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  content: (
                    <span>
                      Rowmari, Kurigram,
                      <br />
                      Bangladesh
                    </span>
                  ),
                },
                { icon: Phone, content: <span>01750977875</span> },
                {
                  icon: Mail,
                  content: (
                    <span className="break-all">iamimtiaz132@gmail.com</span>
                  ),
                },
              ].map(({ icon: Icon, content }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-zinc-100 border border-zinc-200">
                    <Icon className="w-3.5 h-3.5 text-[#4d8c1e]" />
                  </div>
                  <div className="pt-1 leading-relaxed">{content}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-center text-zinc-500">
              <p>
                © <YearText /> Farming Investor. All rights reserved.
              </p>
              <div className="hidden sm:block h-3 w-px bg-zinc-300" />
              <div className="flex gap-4">
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#4d8c1e] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-[#4d8c1e] transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs px-4 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600">
              Developed by
              <a
                href="https://www.nexoviasoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-semibold transition-colors ml-1 text-[#4d8c1e]"
              >
                NexoviaSoft
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
