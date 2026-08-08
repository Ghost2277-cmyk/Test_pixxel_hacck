"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Zap, Trophy, Users } from "lucide-react";

const stats = [
  { step: "01", value: "12,500+", label: "SUSTAINABLE ACTIONS", sub: "Logged daily by active members", icon: CheckCircle2 },
  { step: "02", value: "45,000+", label: "ECO MISSIONS", sub: "Completed across 12 countries", icon: Zap },
  { step: "03", value: "200,000+", label: "IMPACT POINTS", sub: "Earned through verified green choices", icon: Trophy },
  { step: "04", value: "10,000+", label: "COMMUNITY MEMBERS", sub: "Active climate champions", icon: Users },
];

export function Statistics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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
    <section id="impact" className="py-36 relative z-10 bg-[#063b2d] text-white overflow-hidden">
      {/* Background Soft Mint Atmosphere & Faint Orbital Data Circles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(0,184,122,0.18),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04241b] via-[#063b2d] to-[#04261c] pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none text-[#00b87a]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="300" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50%" cy="50%" r="480" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00b87a]/20 border border-[#00b87a]/30 text-[#00c98a] text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>MEASURABLE MILESTONES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-tight"
          >
            OUR COLLECTIVE <span className="text-[#00c98a]">IMPACT</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#c8f1e2]/80 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Proof that individual micro-habits compound into macro-environmental change.
          </motion.p>
        </div>

        {/* Milestone Journey Container */}
        <div className="relative pt-4">
          
          {/* Horizontal Connecting Progress Line (Desktop) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#00b87a]/30 via-[#00c98a]/60 to-[#00b87a]/30 z-0" />

          {/* Staggered Milestone Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={cardVariants}
                  className="bg-[#ecf8f3] p-8 rounded-3xl space-y-5 border border-[#00b87a]/30 text-center hover:border-[#00b87a]/70 hover:bg-[#e2f5ec] hover:-translate-y-1.5 transition-all duration-300 shadow-xl shadow-black/20 group relative overflow-hidden"
                >
                  {/* Step Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#00b87a]/15 text-[#063b2d] text-[10px] font-mono font-bold tracking-widest uppercase border border-[#00b87a]/30">
                    <span>MILESTONE {stat.step}</span>
                  </div>

                  <div className="w-13 h-13 rounded-2xl bg-[#00b87a] text-white flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <Icon className="w-6.5 h-6.5" />
                  </div>

                  <div>
                    <h3 className="text-4xl sm:text-5xl font-black font-heading text-[#09251e] tracking-tight group-hover:text-[#00b87a] transition-colors">
                      {stat.value}
                    </h3>
                    <p className="text-xs font-bold text-[#00b87a] tracking-widest uppercase mt-2 font-mono">
                      {stat.label}
                    </p>
                    <p className="text-xs text-[#66827a] mt-1 leading-relaxed font-normal">
                      {stat.sub}
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


