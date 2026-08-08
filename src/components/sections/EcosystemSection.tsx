"use client";

import { motion } from "framer-motion";
import { Sparkles, Bot, ShieldCheck, CheckSquare, Users, LineChart, Cpu, Lightbulb, Gift, Leaf } from "lucide-react";
import { useState } from "react";

const ecosystemFeatures = [
  { title: "AI Guidance", desc: "Personalized smart habit suggestions", icon: Bot },
  { title: "Eco Challenges", desc: "Weekly community sustainability sprints", icon: ShieldCheck },
  { title: "Daily Missions", desc: "Achievable 1-tap micro-actions", icon: CheckSquare },
  { title: "Community", desc: "Local squad collaboration & rankings", icon: Users },
  { title: "Impact Tracking", desc: "Verified carbon & water analytics", icon: LineChart },
  { title: "AI Mentor", desc: "Contextual eco lifestyle coach", icon: Cpu },
  { title: "Eco Insights", desc: "Behavioral science tips & reports", icon: Lightbulb },
  { title: "Rewards", desc: "XP levels, badges & eco perks", icon: Gift },
];

export function EcosystemSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="ecosystem" className="py-36 relative z-10 bg-[#f7fcfa] overflow-hidden">
      {/* Background Soft Mint Atmosphere & Concentric Orbital Data Circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,184,122,0.08),transparent_70%)] pointer-events-none" />
      
      {/* Corner Ecosystem Botanical Framing */}
      <div className="absolute top-10 left-6 w-44 h-44 opacity-25 pointer-events-none text-[#00b87a] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 10 10 Q 40 40 60 90 M 30 30 Q 50 30 55 45 M 45 55 Q 65 60 70 75 M 20 20 Q 45 15 50 30" />
          <path d="M 55 45 C 65 35 45 25 55 45 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M 50 30 C 60 20 40 10 50 30 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      <div className="absolute bottom-10 right-6 w-40 h-40 opacity-25 pointer-events-none text-[#063b2d] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 90 90 Q 60 60 40 10 M 70 70 Q 70 50 55 45 M 80 80 Q 55 85 50 70" />
          <path d="M 55 45 C 65 35 75 55 55 45 Z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Floating Leaves System */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[6%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 -rotate-45" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-48 left-[5%] text-[#00b87a]/30 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-7 h-7 rotate-25" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 right-[7%] text-[#063b2d]/25 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 -rotate-12" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-24 left-[6%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-5 h-5 rotate-12" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20 relative z-10">
        
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
            <span>HOLISTIC ARCHITECTURE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#09251e] tracking-tight leading-tight"
          >
            A COMPLETE <span className="text-[#00b87a]">ECOSYSTEM</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#66827a] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Everything you need to turn sustainability from a vague intention into a rewarding daily lifestyle.
          </motion.p>
        </div>

        {/* System Map Container */}
        <div className="relative py-6">
          
          {/* Central Hub Core Visual Anchor */}
          <div className="flex items-center justify-center mb-12">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-48 h-48 rounded-full bg-[#063b2d] text-white flex flex-col items-center justify-center space-y-2.5 shadow-2xl shadow-[#063b2d]/30 border-4 border-[#00b87a] z-20 relative group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-13 h-13 rounded-full bg-[#00b87a] text-[#063b2d] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-6.5 h-6.5" />
              </div>
              <span className="font-heading font-black text-2xl tracking-tight">
                SYL<span className="text-[#00b87a]">VA</span>
              </span>
              <span className="text-[10px] font-bold text-[#c8f1e2] uppercase tracking-widest font-mono">
                CORE HUB
              </span>

              {/* Pulsing Outer Ecosystem Ring */}
              <div className="absolute inset-[-12px] rounded-full border border-[#00b87a]/40 animate-ping opacity-20 pointer-events-none" />
            </motion.div>
          </div>

          {/* Connected Grid of 8 Ecosystem Nodes */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4"
          >
            {ecosystemFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              const isHovered = hoveredIdx === idx;

              return (
                <motion.div
                  key={feat.title}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`bg-[#e0f2eb] p-6 sm:p-7 rounded-3xl space-y-4 border transition-all duration-300 group shadow-md shadow-[#063b2d]/5 hover:shadow-xl hover:shadow-[#00b87a]/15 hover:-translate-y-1.5 ${
                    isHovered
                      ? "border-[#00b87a] bg-[#d5ede1]"
                      : "border-[#00b87a]/25 hover:border-[#00b87a]/60"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#00b87a] text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-[#09251e] tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#527068] mt-1 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}


