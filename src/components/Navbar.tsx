"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Leaf, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionMap = [
        { name: "Home", id: "hero" },
        { name: "Why SYLVA", id: "why-sylva" },
        { name: "How It Works", id: "how-it-works" },
        { name: "Living Earth Engine", id: "living-earth" },
        { name: "Impact", id: "impact" },
        { name: "Community", id: "community" },
        { name: "FAQ", id: "faq" },
      ];

      const scrollPosition = window.scrollY + 220;

      for (let i = sectionMap.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionMap[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionMap[i].name);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Why SYLVA", href: "#why-sylva" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Living Earth Engine", href: "#living-earth" },
    { name: "Impact", href: "#impact" },
    { name: "Community", href: "#community" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={cn(
              "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-300",
              scrolled
                ? "bg-white/85 backdrop-blur-xl shadow-lg shadow-[#063b2d]/5 border border-[#063b2d]/10"
                : "bg-white/70 backdrop-blur-lg border border-white/80 shadow-md shadow-[#063b2d]/5"
            )}
          >
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#063b2d] text-[#00b87a] group-hover:bg-[#00b87a] group-hover:text-[#063b2d] transition-all duration-300 shadow-sm shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-[#09251e]">
                SYL<span className="text-[#00b87a]">VA</span>
              </span>
            </Link>

            {/* Desktop Navigation Links with Individual Chips */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-[#063b2d]/5 p-1 rounded-full border border-[#063b2d]/5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setActiveSection(link.name)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-white text-[#063b2d] shadow-xs border border-[#063b2d]/10"
                        : "text-[#4a635b] hover:text-[#09251e] hover:bg-[#00b87a]/15 hover:shadow-xs"
                    )}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Right CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-xs font-bold text-[#09251e] hover:text-[#00b87a] transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-full bg-[#00b87a] hover:bg-[#00c98a] text-white font-bold text-xs transition-all duration-300 shadow-md shadow-[#00b87a]/25 hover:shadow-lg hover:shadow-[#00b87a]/35 transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-1.5"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#09251e] hover:bg-[#00b87a]/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden p-6 rounded-3xl bg-[#f7fcfa]/95 backdrop-blur-xl border border-[#063b2d]/10 shadow-2xl space-y-6"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-bold text-[#09251e] hover:text-[#00b87a] hover:bg-[#00b87a]/10 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-[#063b2d]/10 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-bold text-[#09251e] bg-white border border-[#063b2d]/10 rounded-full hover:bg-slate-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-bold text-white bg-[#00b87a] hover:bg-[#00c98a] rounded-full shadow-lg shadow-[#00b87a]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


