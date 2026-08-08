"use client";

import { motion } from "framer-motion";
import { Bot, Trophy, Globe2, Users2, Sparkles, Flame, Zap, CheckCircle2, Leaf } from "lucide-react";
import { useState } from "react";

export function WhyEcoLife() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="why-sylva" className="py-36 relative z-10 bg-[#f7fcfa] overflow-hidden">
      {/* Background Soft Mint Atmosphere & Environmental Contour Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,184,122,0.08),transparent_70%)] pointer-events-none" />
      
      {/* Delicate Background Contour Lines & Botanical Line Art */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none text-[#063b2d]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="320" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="480" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
      </svg>

      {/* Corner Botanical Framing */}
      <div className="absolute top-8 right-6 w-44 h-44 opacity-25 pointer-events-none text-[#00b87a] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 90 10 Q 60 40 40 90 M 70 30 Q 50 30 45 45 M 55 55 Q 35 60 30 75 M 80 20 Q 65 15 50 25" />
          <path d="M 45 45 C 35 35 55 25 45 45 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M 30 75 C 20 65 40 55 30 75 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M 50 25 C 40 15 60 10 50 25 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      <div className="absolute bottom-10 left-6 w-40 h-40 opacity-25 pointer-events-none text-[#063b2d] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 10 90 Q 40 60 90 40 M 30 70 Q 30 50 45 45 M 55 55 Q 60 35 75 30 M 20 80 Q 15 65 25 50" />
          <path d="M 45 45 C 35 35 25 55 45 45 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M 25 50 C 15 40 35 35 25 50 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      {/* Floating Leaves System */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[5%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-7 h-7 rotate-45" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-36 right-[6%] text-[#00b87a]/30 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-5 h-5 -rotate-25" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-28 left-[8%] text-[#063b2d]/25 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 rotate-12" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-20 right-[7%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 -rotate-12" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00b87a]/10 border border-[#00b87a]/20 text-[#063b2d] text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00b87a]" />
            <span>FOUR CORE PILLARS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#09251e] tracking-tight leading-tight"
          >
            WHY <span className="text-[#00b87a]">SYLVA?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#66827a] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Because sustainability should feel personal, achievable, and rewarding.
          </motion.p>
        </div>

        {/* Central Ecosystem Hub Visual Anchor Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex justify-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#00b87a]/30 shadow-md shadow-[#00b87a]/10 text-xs font-bold text-[#063b2d]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00b87a] animate-ping" />
            <Leaf className="w-4 h-4 text-[#00b87a]" />
            <span className="tracking-wide uppercase font-mono">CONNECTED SYLVA ECOSYSTEM</span>
          </div>
        </motion.div>

        {/* Interconnected 4 Pillars Grid with Staggered Scroll Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative"
        >
          
          {/* Pillar 1: AI GUIDANCE (7 cols) */}
          <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHoveredPillar(1)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-9 space-y-6 relative overflow-hidden group border border-[#063b2d]/10 hover:border-[#00b87a]/50 hover:bg-white transition-all duration-300 shadow-md shadow-[#063b2d]/5 hover:shadow-xl hover:shadow-[#00b87a]/15 hover:-translate-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-[#063b2d] text-[#00b87a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Bot className="w-6.5 h-6.5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#09251e] tracking-tight">AI GUIDANCE</h3>
                  <p className="text-xs font-semibold text-[#66827a]">Intelligent Habit Recommendation Engine</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#00b87a]/10 text-[#00b87a] text-xs font-extrabold tracking-wide">LIVE DEMO</span>
            </div>

            {/* Simulated AI Mentor Dialog */}
            <div className="bg-[#063b2d] rounded-2xl p-5 text-white space-y-4 border border-[#00b87a]/30 shadow-inner relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00c98a]">
                <div className="w-2 h-2 rounded-full bg-[#00c98a] animate-ping" />
                <span>SYLVA AI MENTOR</span>
              </div>

              <p className="text-sm text-[#c8f1e2] font-mono leading-relaxed">
                "Here's one small change you can make this week: Try replacing one short 2-mile car trip with walking or cycling."
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#00b87a]/20 text-xs text-white/75 font-sans">
                <span className="flex items-center gap-1.5 text-[#00c98a] font-bold"><CheckCircle2 className="w-4 h-4" /> -2.4 kg CO₂ Impact</span>
                <span>Calculated for your commute</span>
              </div>
            </div>

            <p className="text-sm text-[#66827a] leading-relaxed font-normal">
              Your personal AI mentor analyzes your daily patterns, suggesting micro-habits tailored specifically to your lifestyle so you make progress without feeling overwhelmed.
            </p>
          </motion.div>

          {/* Pillar 2: GAMIFICATION (5 cols) */}
          <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHoveredPillar(2)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="lg:col-span-5 bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-9 space-y-6 relative overflow-hidden group border border-[#063b2d]/10 hover:border-[#00b87a]/50 hover:bg-white transition-all duration-300 shadow-md shadow-[#063b2d]/5 hover:shadow-xl hover:shadow-[#00b87a]/15 hover:-translate-y-1.5"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#00b87a] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <Trophy className="w-6.5 h-6.5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#09251e] tracking-tight">GAMIFICATION</h3>
                <p className="text-xs font-semibold text-[#66827a]">Progress Driven Motivation</p>
              </div>
            </div>

            {/* Gamification Simulator Card */}
            <div className="bg-[#ecf8f3] rounded-2xl p-5 border border-[#00b87a]/25 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-[#66827a]">CURRENT TIER</span>
                  <p className="text-base font-black font-heading text-[#063b2d]">LEVEL 08 • GREEN EXPLORER</p>
                </div>
                <div className="px-3 py-1 rounded-xl bg-[#00b87a] text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                  <Zap className="w-3.5 h-3.5" /> +120 XP
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-[#09251e]">
                  <span>XP Progress</span>
                  <span>1,420 / 2,000 XP</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[#c8f1e2] overflow-hidden">
                  <div className="h-full bg-[#00b87a] rounded-full w-[71%]" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-[#063b2d]">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>7 DAY SUSTAINABILITY STREAK</span>
              </div>
            </div>

            <p className="text-sm text-[#66827a] leading-relaxed font-normal">
              Earn XP, complete daily eco missions, unlock badges, and level up your Eco DNA as sustainable choices become second nature.
            </p>
          </motion.div>

          {/* Pillar 3: LIVING EARTH (5 cols) */}
          <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHoveredPillar(3)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="lg:col-span-5 bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-9 space-y-6 relative overflow-hidden group border border-[#063b2d]/10 hover:border-[#00b87a]/50 hover:bg-white transition-all duration-300 shadow-md shadow-[#063b2d]/5 hover:shadow-xl hover:shadow-[#00b87a]/15 hover:-translate-y-1.5"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-[#063b2d] text-[#00b87a] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <Globe2 className="w-6.5 h-6.5" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#09251e] tracking-tight">LIVING EARTH</h3>
                <p className="text-xs font-semibold text-[#66827a]">Real-Time Digital Ecosystem</p>
              </div>
            </div>

            {/* Visual Globe Pulse Component */}
            <div className="h-36 rounded-2xl bg-gradient-to-br from-[#063b2d] to-[#073f32] p-5 text-white flex flex-col justify-between border border-[#00b87a]/30 relative overflow-hidden shadow-inner">
              <div className="relative z-10">
                <span className="text-xs font-semibold text-[#00c98a]">ECOSYSTEM HEALTH</span>
                <p className="text-2xl font-black font-heading text-white">92% PARADISE</p>
              </div>
              <div className="relative z-10 flex items-center justify-between text-xs text-[#c8f1e2] font-sans">
                <span>Lush Canopy • Clean Waters</span>
                <span className="font-bold text-[#00c98a]">ACTIVE</span>
              </div>
            </div>

            <p className="text-sm text-[#66827a] leading-relaxed font-normal">
              Watch your personal digital Earth transform from polluted to thriving paradise as you record real-world sustainable habits.
            </p>
          </motion.div>

          {/* Pillar 4: COMMUNITY (7 cols) */}
          <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHoveredPillar(4)}
            onMouseLeave={() => setHoveredPillar(null)}
            className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-9 space-y-6 relative overflow-hidden group border border-[#063b2d]/10 hover:border-[#00b87a]/50 hover:bg-white transition-all duration-300 shadow-md shadow-[#063b2d]/5 hover:shadow-xl hover:shadow-[#00b87a]/15 hover:-translate-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-[#00b87a] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Users2 className="w-6.5 h-6.5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#09251e] tracking-tight">COMMUNITY</h3>
                  <p className="text-xs font-semibold text-[#66827a]">Global Squad Action</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#063b2d]/10 text-[#063b2d] text-xs font-extrabold tracking-wide">SQUAD CHALLENGES</span>
            </div>

            {/* Community Squad Preview */}
            <div className="bg-[#ecf8f3] rounded-2xl p-5 border border-[#00b87a]/25 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#063b2d]">
                <span>WEEKLY COMMUNITY SQUAD OBJECTIVE</span>
                <span className="text-[#00b87a]">84% COMPLETED</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#c8f1e2] overflow-hidden">
                <div className="h-full bg-[#063b2d] rounded-full w-[84%]" />
              </div>
              <p className="text-xs text-[#66827a] font-medium">
                Goal: Prevent 5,000 kg CO₂ emissions collectively across 1,200 local members.
              </p>
            </div>

            <p className="text-sm text-[#66827a] leading-relaxed font-normal">
              Join local squads, compete on friendly leaderboards, and witness how individual actions pool together into massive collective ecological impact.
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}


