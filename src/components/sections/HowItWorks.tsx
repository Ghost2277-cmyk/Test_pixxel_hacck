"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { Dna, Bot, CheckSquare, Award, Globe, Sparkles, ArrowDown, Leaf } from "lucide-react";

const steps = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "ECO DNA",
    stage: "SEEDS OF CHANGE",
    desc: "Complete a 60-second assessment to calculate your baseline ecological footprint and generate your unique Eco DNA profile.",
    icon: Dna,
    detail: "Analyzes mobility, dietary habits, home energy, and shopping patterns.",
  },
  {
    number: "02",
    phase: "CHOOSE",
    title: "AI MENTOR",
    stage: "INTELLIGENT ADAPTATION",
    desc: "Receive customized, high-impact micro-missions tailored specifically to your daily routine and local environment.",
    icon: Bot,
    detail: "AI continuously adapts challenge difficulty based on your weekly momentum.",
  },
  {
    number: "03",
    phase: "ACT",
    title: "DAILY MISSIONS",
    stage: "HABIT FORMATION",
    desc: "Log simple sustainable choices—from choosing plant-based meals to using reusable bags and saving energy.",
    icon: CheckSquare,
    detail: "Seamless 1-tap logging with smart receipts and IoT integrations.",
  },
  {
    number: "04",
    phase: "TRACK",
    title: "EARN XP",
    stage: "PROGRESSION & REWARDS",
    desc: "Gain XP for every positive habit, maintain daily streaks, unlock milestone badges, and climb friendly leaderboards.",
    icon: Award,
    detail: "Convert XP into real-world tree planting certificates and partner perks.",
  },
  {
    number: "05",
    phase: "IMPACT",
    title: "HEAL EARTH",
    stage: "ECOSYSTEM TRANSFORMATION",
    desc: "Watch your 3D digital planet heal in real-time as your real-world actions compound into tangible environmental progress.",
    icon: Globe,
    detail: "Direct visual link between your daily routine and a thriving planet.",
  },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="py-36 relative z-10 bg-[#f3faf7] overflow-hidden">
      {/* Background Atmosphere & Soft Environmental Contour Lines */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00b87a]/6 rounded-full blur-[160px] pointer-events-none" />

      {/* Growing Botanical Plant SVG Motifs & Floating Leaves */}
      <div className="absolute top-16 left-6 w-40 h-52 opacity-25 pointer-events-none text-[#00b87a] hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 20 140 Q 50 80 80 20 M 45 90 Q 30 75 20 75 M 55 60 Q 70 50 75 35 M 35 110 Q 15 100 10 85" />
          <path d="M 20 75 C 10 65 30 55 20 75 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M 75 35 C 85 25 65 15 75 35 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M 10 85 C 0 75 20 70 10 85 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-6 w-44 h-56 opacity-25 pointer-events-none text-[#063b2d] hidden lg:block" aria-hidden="true">
        <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 80 140 Q 50 80 20 20 M 55 90 Q 70 75 80 75 M 45 60 Q 30 50 25 35 M 65 110 Q 85 100 90 85" />
          <path d="M 80 75 C 90 65 70 55 80 75 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M 90 85 C 100 75 80 70 90 85 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      {/* Floating Leaves System */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-48 right-[5%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 rotate-12" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] left-[4%] text-[#00b87a]/30 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-7 h-7 -rotate-30" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[65%] right-[4%] text-[#063b2d]/25 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 rotate-45" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-40 left-[5%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-5 h-5 -rotate-45" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-24 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00b87a]/10 text-[#063b2d] text-xs font-bold uppercase tracking-wider border border-[#00b87a]/20 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00b87a]" />
            <span>5-STEP HABIT ENGINE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-[#09251e] tracking-tight leading-tight"
          >
            HOW IT <span className="text-[#00b87a]">WORKS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#66827a] font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Turn everyday choices into meaningful, measurable progress through our intelligent sustainability journey.
          </motion.p>

          {/* Visual Phase Progression Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:flex items-center justify-center gap-2.5 pt-6 text-xs font-bold text-[#063b2d]"
          >
            {["DISCOVER", "CHOOSE", "ACT", "TRACK", "IMPACT"].map((p, idx) => (
              <div key={p} className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-[#e0f2eb] border border-[#00b87a]/20 shadow-xs text-[#00b87a] tracking-widest uppercase">
                  {p}
                </span>
                {idx < 4 && <span className="text-[#00b87a]/50 font-bold">→</span>}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Interactive Habit Engine Timeline */}
        <div className="relative pt-4">
          
          {/* Background Central Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-16 w-[3px] bg-[#063b2d]/10 -translate-x-1/2 rounded-full" />

          {/* Animated Scroll-Illuminated Progress Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-16 w-[3px] -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-[#00b87a] via-[#00c98a] to-[#063b2d] rounded-full shadow-[0_0_14px_rgba(0,184,122,0.7)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps List */}
          <div className="space-y-20 md:space-y-24">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Center Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#063b2d] border-4 border-[#00b87a] flex items-center justify-center z-20 shadow-xl shadow-[#00b87a]/25 group transition-transform duration-300 hover:scale-110">
                    <span className="font-black text-white text-sm font-mono tracking-wider">{step.number}</span>
                    {/* Outer Glow Pulsing Ring */}
                    <div className="absolute inset-[-6px] rounded-full border border-[#00b87a]/40 animate-ping opacity-25 pointer-events-none" />
                  </div>

                  {/* Step Content Card Container */}
                  <div
                    className={`w-full md:w-[45%] pl-16 md:pl-0 ${
                      isEven ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 35 : -35, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-[#e0f2eb] rounded-3xl p-7 sm:p-8 border border-[#00b87a]/25 space-y-5 hover:border-[#00b87a]/60 hover:bg-[#d5ede1] hover:shadow-xl hover:shadow-[#00b87a]/15 hover:-translate-y-1.5 transition-all duration-300 group relative shadow-md shadow-[#063b2d]/5"
                    >
                      {/* Huge Decorative Step Number in Background (Placed on opposite side of text alignment for zero overlap) */}
                      <span className={`absolute top-4 text-6xl font-black font-heading text-[#063b2d]/15 select-none pointer-events-none group-hover:text-[#00b87a]/30 transition-colors ${
                        isEven ? "right-6" : "left-6"
                      }`}>
                        {step.number}
                      </span>

                      {/* Header Row */}
                      <div
                        className={`flex items-center gap-3.5 ${
                          isEven ? "md:justify-start" : "md:justify-end"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-[#00b87a] text-white flex items-center justify-center font-bold group-hover:scale-105 transition-transform duration-300 shadow-md shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="space-y-0.5">
                          <div className={`flex items-center gap-2 flex-wrap ${
                            isEven ? "md:justify-start" : "md:justify-end"
                          }`}>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00b87a]/15 text-[10px] font-extrabold text-[#063b2d] uppercase tracking-widest border border-[#00b87a]/20">
                              {step.phase}
                            </span>
                            <span className="text-[11px] font-bold text-[#527068] uppercase tracking-wider">
                              • {step.stage}
                            </span>
                          </div>
                          <h3 className="text-2xl font-extrabold font-heading text-[#09251e] tracking-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-base text-[#527068] leading-relaxed font-normal">
                        {step.desc}
                      </p>

                      {/* Technical Detail Footer */}
                      <div className={`pt-3.5 border-t border-[#063b2d]/15 flex items-center gap-2 text-xs font-semibold text-[#063b2d] ${
                        isEven ? "md:justify-start" : "md:justify-end"
                      }`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00b87a] shrink-0" />
                        <span>{step.detail}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Completion Marker: HABIT LOOP COMPLETE */}
          <div className="pt-20 flex flex-col items-center justify-center text-center space-y-3 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              className="w-12 h-12 rounded-full bg-[#063b2d] text-[#00b87a] border-2 border-[#00b87a] flex items-center justify-center shadow-lg shadow-[#00b87a]/25"
            >
              <Leaf className="w-5 h-5 text-[#00b87a]" />
            </motion.div>
            <span className="text-xs font-extrabold tracking-widest text-[#00b87a] uppercase">
              HABIT LOOP COMPLETE • EXPLORE THE LIVING EARTH ENGINE
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}




