import Link from "next/link";
import { Sprout, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export function MainFooter() {
  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-10 border-t border-emerald-900/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-900/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Sprout className="h-5 w-5 text-zinc-900 fill-zinc-900" />
              </div>
              <span className="text-xl font-bold tracking-tight">Farming<span className="text-emerald-500">Investor</span></span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Democratizing agricultural investment. Connecting capital with sustainable farming projects for a greener, wealthier future.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-900 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-900 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-900 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-emerald-500 hover:text-zinc-900 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Explore</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/landing/project" className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/landing/gallery" className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/landing/about" className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/landing/contact" className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Workspaces */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Portals</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/investor" className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Investor Login
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Admin Console
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-zinc-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Partner Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-zinc-300">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Level 4, AgriTech Tower,<br/>Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-300">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>hello@farming-investor.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Newsletter / Bottom Strip */}
        <div className="border-t border-zinc-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>© {new Date().getFullYear()} Farming Investor. All rights reserved.</p>
            <div className="hidden md:block h-3 w-px bg-zinc-800" />
            <div className="flex gap-4">
               <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            </div>
          </div>
          
         
        </div>
      </div>
    </footer>
  );
}
