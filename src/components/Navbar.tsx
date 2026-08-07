"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500",
            scrolled ? "glass-card scale-95" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight">
              Eco<span className="text-emerald-400">Life</span>
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Features", "How It Works", "Games", "AI", "Community", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <button className="magnetic-glow px-6 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
