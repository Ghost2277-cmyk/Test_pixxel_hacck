"use client";

import { motion } from "framer-motion";
import { Sparkles, Quote, Leaf } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Community Leader & Architect",
    text: "SYLVA turned my daily environmental anxiety into purposeful action. Watching my digital Earth heal every time I choose sustainable options is remarkably motivating.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    metric: "420 kg CO₂ Prevented",
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    text: "The AI Mentor is brilliant. It suggested microscopic habit changes that fit into my busy schedule without disruption, saving energy and lowering my carbon footprint.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    metric: "1,200 L Water Saved",
  },
  {
    name: "Elena Rodriguez",
    role: "Environmental Educator",
    text: "My students use SYLVA for our university project. The gamification and squad challenges completely transformed how they engage with real-world sustainability.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    metric: "Level 14 Eco Master",
  },
];

export function Testimonials() {
  return (
    <section id="community" className="py-36 relative z-10 bg-[#f7fcfa] overflow-hidden">
      {/* Background Soft Mint Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,184,122,0.06),transparent_70%)] pointer-events-none" />

      {/* Corner Botanical Framing */}
      <div className="absolute top-8 right-6 w-40 h-40 opacity-25 pointer-events-none text-[#00b87a] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 90 10 Q 60 40 40 90 M 70 30 Q 50 30 45 45 M 55 55 Q 35 60 30 75 M 80 20 Q 65 15 50 25" />
          <path d="M 45 45 C 35 35 55 25 45 45 Z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-10 left-6 w-36 h-36 opacity-25 pointer-events-none text-[#063b2d] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 10 90 Q 40 60 90 40 M 30 70 Q 30 50 45 45 M 55 55 Q 60 35 75 30" />
          <path d="M 45 45 C 35 35 25 55 45 45 Z" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Floating Leaves System */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 left-[6%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 rotate-45" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-36 right-[5%] text-[#00b87a]/30 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-7 h-7 -rotate-25" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-20 right-[7%] text-[#00b87a]/35 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-5 h-5 -rotate-12" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-28 left-[7%] text-[#063b2d]/25 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 rotate-12" />
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
            <span>COMMUNITY VOICES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#09251e] tracking-tight leading-tight"
          >
            STORIES OF <span className="text-[#00b87a]">IMPACT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#66827a] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Real people building real environmental momentum every single day.
          </motion.p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-[#e0f2eb] p-8 rounded-3xl space-y-6 flex flex-col justify-between border border-[#00b87a]/25 hover:border-[#00b87a]/60 hover:bg-[#d5ede1] hover:-translate-y-1.5 transition-all duration-300 shadow-md shadow-[#063b2d]/5 hover:shadow-xl hover:shadow-[#00b87a]/15 group relative overflow-hidden"
            >
              <div className="space-y-4 relative z-10">
                <Quote className="w-8 h-8 text-[#00b87a]/40 group-hover:text-[#00b87a] transition-colors" />
                <p className="text-base text-[#09251e] font-normal leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#063b2d]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#00b87a]/40"
                  />
                  <div>
                    <h4 className="font-bold text-[#09251e] text-sm">{t.name}</h4>
                    <p className="text-xs text-[#527068] font-medium">{t.role}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00b87a]/15 border border-[#00b87a]/20 text-[#063b2d] text-[11px] font-extrabold">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


