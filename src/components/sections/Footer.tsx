"use client";

import { Leaf, Mail, Globe, MessageSquare, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Massive Final CTA */}
        <div className="text-center mb-32 space-y-8 bg-gradient-to-b from-emerald-900/20 to-transparent p-12 rounded-3xl border border-emerald-500/10">
          <h2 className="text-5xl md:text-7xl font-bold font-heading">
            Ready to Heal the <span className="text-emerald-400">Planet?</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Join thousands of others making a difference every single day.
          </p>
          <button className="magnetic-glow px-10 py-5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
            Start Your Journey
          </button>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="font-heading font-bold text-2xl tracking-tight">
                Eco<span className="text-emerald-400">Life</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Transforming sustainability into an AI-powered, gamified experience for everyone.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {[Globe, Mail, MessageSquare, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">How it Works</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Subscribe</h4>
            <p className="text-gray-400 mb-4 text-sm">Get weekly sustainability tips and platform updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-emerald-500 text-white"
              />
              <button className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-emerald-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>© 2026 EcoLife Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
