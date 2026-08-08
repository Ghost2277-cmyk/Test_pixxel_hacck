"use client";

import { Leaf, Mail, Globe, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#063b2d]/10 bg-[#063b2d] text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & Info (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#00b87a] text-[#063b2d]">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                SYL<span className="text-[#00b87a]">VA</span>
              </span>
            </Link>

            <p className="text-sm text-[#c8f1e2]/70 max-w-md leading-relaxed font-normal">
              Heal the planet, one habit at a time. SYLVA uses artificial intelligence and gamification to turn everyday choices into measurable environmental impact.
            </p>




            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Globe, label: "Website" },
                { icon: Mail, label: "Email" },
                { icon: MessageSquare, label: "Community" },
                { icon: Share2, label: "Social" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href="#"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-[#00b87a] hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav Column 1: Product (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase font-heading">PRODUCT</h4>
            <ul className="space-y-2.5 text-sm text-[#c8f1e2]/70 font-medium">
              <li><a href="#why-sylva" className="hover:text-[#00c98a] transition-colors">Why SYLVA</a></li>
              <li><a href="#how-it-works" className="hover:text-[#00c98a] transition-colors">How It Works</a></li>
              <li><a href="#living-earth" className="hover:text-[#00c98a] transition-colors">Living Earth Engine</a></li>
              <li><a href="#ecosystem" className="hover:text-[#00c98a] transition-colors">Ecosystem</a></li>
            </ul>
          </div>




          {/* Nav Column 2: Community (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase font-heading">COMMUNITY</h4>
            <ul className="space-y-2.5 text-sm text-[#c8f1e2]/70 font-medium">
              <li><a href="#impact" className="hover:text-[#00c98a] transition-colors">Our Impact</a></li>
              <li><a href="#community" className="hover:text-[#00c98a] transition-colors">Stories of Impact</a></li>
              <li><a href="#faq" className="hover:text-[#00c98a] transition-colors">FAQ</a></li>
              <li><Link href="/login" className="hover:text-[#00c98a] transition-colors">Log In</Link></li>
              <li><Link href="/signup" className="hover:text-[#00c98a] transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-extrabold text-white text-sm tracking-wider uppercase font-heading">STAY UPDATED</h4>
            <p className="text-xs text-[#c8f1e2]/70 leading-relaxed">
              Get weekly climate insights and platform updates directly in your inbox.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#00b87a]"
              />
              <button className="w-full bg-[#00b87a] hover:bg-[#00c98a] text-white font-bold text-xs py-2.5 rounded-full transition-colors shadow-md">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#c8f1e2]/60 font-medium">
          <p>© 2026 SYLVA Inc. All rights reserved.</p>



          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

