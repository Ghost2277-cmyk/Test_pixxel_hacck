"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="final-cta" className="py-36 relative z-10 bg-[#f7fcfa] overflow-hidden">
      {/* Background Atmosphere & Environmental Contour Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,184,122,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-b from-[#063b2d] via-[#042e23] to-[#03241b] text-white p-10 sm:p-16 lg:p-20 overflow-hidden shadow-2xl shadow-[#063b2d]/40 text-center space-y-9 border border-[#00b87a]/30"
        >
          {/* Environmental Glow & Atmospheric Lighting */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00b87a]/20 rounded-full blur-[140px] -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c8f1e2]/10 rounded-full blur-[140px] -ml-40 -mb-40 pointer-events-none" />

          {/* Faint Background Orbital Data Circles */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none text-[#00b87a]" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50%" cy="50%" r="280" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50%" cy="50%" r="460" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          </svg>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00b87a]/20 border border-[#00b87a]/30 text-[#00c98a] text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            <Leaf className="w-4 h-4 text-[#00c98a]" />
            <span>JOIN THE MOVEMENT TODAY</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            YOUR NEXT SMALL ACTION CAN MAKE A DIFFERENCE.
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-[#c8f1e2]/80 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Start building better habits today with personalized AI guidance and real-world ecological impact.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10"
          >
            <Link
              href="/signup"
              className="w-full sm:w-auto px-9 py-4.5 rounded-full bg-[#00b87a] hover:bg-[#00c98a] text-white font-bold text-base transition-all duration-300 shadow-xl shadow-[#00b87a]/30 hover:shadow-2xl hover:shadow-[#00b87a]/50 transform hover:-translate-y-1 active:translate-y-0 inline-flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#hero"
              className="w-full sm:w-auto px-9 py-4.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-base transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center cursor-pointer backdrop-blur-md"
            >
              EXPLORE SYLVA
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-xs text-[#c8f1e2]/60 font-semibold pt-4 font-mono"
          >
            Free account • No credit card required • Instant access
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

