"use client";

import { motion } from "framer-motion";
import { Globe, User, Users, Sparkles, ArrowRight } from "lucide-react";

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="py-36 relative z-10 overflow-hidden bg-[#04241b] text-white"
    >
      {/* Deep Forest Gradient & Soft Central Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(0,184,122,0.18),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#063b2d]/60 via-[#04241b] to-[#04261c] pointer-events-none" />

      {/* Subtle Environmental Topographic / Vein Contour SVG Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none text-[#00b87a]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="topo-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 0 100 Q 50 30 100 100 T 200 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 0 140 Q 50 70 100 140 T 200 140" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>

      {/* Background Subtle Connected Node Constellation (Metaphor: One -> Millions) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-2 h-2 rounded-full bg-[#00b87a] shadow-[0_0_12px_#00b87a]" />
        <div className="absolute top-[25%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#00b87a]/60" />
        <div className="absolute top-[18%] right-[18%] w-2 h-2 rounded-full bg-[#00b87a] shadow-[0_0_12px_#00b87a]" />
        <div className="absolute top-[32%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#00b87a]/50" />
        <div className="absolute bottom-[20%] left-[10%] w-2.5 h-2.5 rounded-full bg-[#00b87a] shadow-[0_0_16px_#00b87a]" />
        <div className="absolute bottom-[25%] right-[12%] w-2 h-2 rounded-full bg-[#00b87a] shadow-[0_0_12px_#00b87a]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 space-y-20">
        
        {/* Editorial Section Introduction & Centerpiece Statement */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Eyebrow Label with Decorative Accents */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#00b87a]/10 border border-[#00b87a]/25 text-[#00b87a] text-xs font-bold tracking-[0.25em] uppercase shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b87a] animate-pulse" />
            <span>A NEW SUSTAINABILITY PARADIGM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b87a] animate-pulse" />
          </motion.div>

          {/* Editorial Main Statement */}
          <div className="space-y-4 pt-2">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-white tracking-tight leading-[1.05]"
            >
              "THE PLANET DOESN'T NEED ONE PERFECT PERSON.
            </motion.h2>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-[#00b87a] tracking-tight leading-[1.05] drop-shadow-[0_0_35px_rgba(0,184,122,0.3)]"
            >
              IT NEEDS MILLIONS OF SMALL ACTIONS."
            </motion.h2>
          </div>

          {/* Visual Metaphor Indicator: One Action -> Connected Network -> Collective Impact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4 flex items-center justify-center gap-3 text-xs text-[#c8f1e2]/60 font-mono"
          >
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">ONE ACTION</span>
            <span className="text-[#00b87a]">→</span>
            <span className="px-2.5 py-1 rounded-md bg-[#00b87a]/15 border border-[#00b87a]/30 text-[#00b87a] font-bold">MANY HABITS</span>
            <span className="text-[#00b87a]">→</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">COLLECTIVE IMPACT</span>
          </motion.div>

        </div>

        {/* Interactive Concept Cards Container with Inter-card Connecting Line */}
        <div className="relative pt-4">
          
          {/* Subtle Connecting Arc Line between Cards on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t border-dashed border-[#00b87a]/25 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10">
            
            {/* Card 1: One Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-9 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#00b87a]/50 hover:bg-white/[0.07] hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/20"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#00b87a]/15 border border-[#00b87a]/30 flex items-center justify-center text-[#00b87a] group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <User className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#00b87a] bg-[#00b87a]/10 px-3 py-1 rounded-full border border-[#00b87a]/20 uppercase">
                  STEP 01
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-heading text-white tracking-tight">ONE ACTION</h3>
                <p className="text-sm text-[#c8f1e2]/75 leading-relaxed font-normal">
                  Swapping one disposable cup, taking public transit, or reducing food waste. Individually simple, seemingly small.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-[#00b87a]">
                <Sparkles className="w-4 h-4" />
                <span>Personal Habit Foundation</span>
              </div>
            </motion.div>

            {/* Card 2: Many Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white/[0.05] backdrop-blur-xl border border-[#00b87a]/30 rounded-3xl p-8 sm:p-9 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#00b87a]/60 hover:bg-white/[0.08] hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/20"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#00b87a]/25 border border-[#00b87a]/40 flex items-center justify-center text-[#00b87a] group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <Users className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#00b87a] bg-[#00b87a]/15 px-3 py-1 rounded-full border border-[#00b87a]/30 uppercase">
                  STEP 02
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-heading text-white tracking-tight">MANY ACTIONS</h3>
                <p className="text-sm text-[#c8f1e2]/75 leading-relaxed font-normal">
                  When thousands of people build consistent daily habits guided by AI, individual efforts multiply exponentially across communities.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-[#00b87a]">
                <Sparkles className="w-4 h-4" />
                <span>Network Effect Amplification</span>
              </div>
            </motion.div>

            {/* Card 3: Collective Impact (Highlight Feature Card) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="bg-gradient-to-br from-[#063b2d] to-[#094d3c] backdrop-blur-xl border border-[#00b87a]/60 rounded-3xl p-8 sm:p-9 flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[#00b87a] hover:-translate-y-1.5 transition-all duration-300 shadow-2xl shadow-[#00b87a]/15"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#00b87a] text-[#063b2d] flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#00b87a]/30">
                  <Globe className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold tracking-widest text-[#063b2d] bg-[#00b87a] px-3 py-1 rounded-full uppercase font-mono">
                  STEP 03
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-heading text-white tracking-tight">COLLECTIVE IMPACT</h3>
                <p className="text-sm text-[#c8f1e2]/85 leading-relaxed font-normal">
                  Tons of CO₂ prevented, millions of liters of water saved, and real-world reforestation. Measurable environmental healing.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center gap-2 text-xs font-bold text-[#00b87a]">
                <Sparkles className="w-4 h-4" />
                <span>Global Ecological Progress</span>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

