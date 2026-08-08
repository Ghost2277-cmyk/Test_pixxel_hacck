"use client";

import { motion } from "framer-motion";
import { Sparkles, Droplets, Zap, TreePine, CloudRain, Activity, SlidersHorizontal } from "lucide-react";

interface LivingEarthProps {
  health: number;
  setHealth: (val: number) => void;
}

export function LivingEarth({ health, setHealth }: LivingEarthProps) {
  let stageText = "Polluted";
  let stageDesc = "High atmospheric carbon, degraded ecosystem, low biodiversity.";
  if (health > 0.25) {
    stageText = "Healing In Progress";
    stageDesc = "Initial habit adoption, grass restoration, cloud stabilization.";
  }
  if (health > 0.6) {
    stageText = "Healthy Ecosystem";
    stageDesc = "Clean ocean currents, bird migrations, thriving forestry.";
  }
  if (health > 0.9) {
    stageText = "Thriving Paradise";
    stageDesc = "Maximum biodiversity, zero-waste equilibrium, lush canopy.";
  }

  const metrics = [
    { label: "CARBON IMPACT", value: `${(24.8 * (0.4 + health * 0.6)).toFixed(1)} kg`, icon: CloudRain, unit: "CO₂ emissions prevented" },
    { label: "WATER SAVED", value: `${Math.round(1240 * (0.4 + health * 0.6))} L`, icon: Droplets, unit: "Clean freshwater conserved" },
    { label: "ENERGY SAVED", value: `${Math.round(68 * (0.4 + health * 0.6))} kWh`, icon: Zap, unit: "Renewable energy optimized" },
    { label: "TREES SUPPORTED", value: `${Math.round(18 * (0.4 + health * 0.6))}`, icon: TreePine, unit: "Equivalent forest growth" },
  ];

  return (
    <section id="living-earth" className="py-36 relative z-10 bg-[#063b2d] text-white overflow-hidden">
      {/* Background Soft Mint Atmosphere & Circular Data Rings */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(0,184,122,0.18),transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#04241b] via-[#063b2d] to-[#04261c] pointer-events-none" />

      {/* Faint Background Orbital Data Circles */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none text-[#00b87a]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="40%" r="280" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50%" cy="40%" r="440" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00b87a]/20 border border-[#00b87a]/30 text-[#00c98a] text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            <div className="w-2 h-2 rounded-full bg-[#00c98a] animate-pulse" />
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-TIME SIMULATION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-tight"
          >
            THE <span className="text-[#00c98a]">LIVING EARTH</span> ENGINE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#c8f1e2]/80 font-medium max-w-xl mx-auto leading-relaxed"
          >
            Turn everyday actions into measurable environmental progress.
          </motion.p>
        </div>

        {/* Engine Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Control Center Card (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-9 rounded-3xl space-y-8 border border-[#00b87a]/30 hover:border-[#00b87a]/60 transition-all duration-300 shadow-2xl shadow-black/30 relative overflow-hidden"
          >
            {/* Control Center Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#00c98a]">
                <Activity className="w-4 h-4 text-[#00c98a] animate-pulse" />
                <span>INTERACTIVE DEMO CONTROL</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b87a]/15 border border-[#00b87a]/30 text-[11px] font-bold text-[#00c98a] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c98a] animate-ping" />
                <span>SIMULATION LIVE</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-tight flex items-center gap-3">
                <SlidersHorizontal className="w-6 h-6 text-[#00c98a]" />
                <span>ECOSYSTEM HEAL SLIDER</span>
              </h3>
              <p className="text-sm text-[#c8f1e2]/75 leading-relaxed font-normal">
                Drag the slider to preview how continuous daily habits transform the digital planet from polluted to thriving paradise.
              </p>
            </div>

            {/* Slider & Dynamic Ecosystem State */}
            <div className="space-y-6 pt-2">
              <div className="flex justify-between items-end bg-white/[0.03] p-5 rounded-2xl border border-white/10">
                <div>
                  <span className="text-[11px] text-[#00c98a] font-bold tracking-wider uppercase font-mono">CURRENT ECOSYSTEM STATE</span>
                  <h4 className="text-2xl font-black text-white mt-1 font-heading">{stageText}</h4>
                  <p className="text-xs text-[#c8f1e2]/70 mt-1 max-w-xs">{stageDesc}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black font-heading text-[#00c98a] drop-shadow-[0_0_15px_rgba(0,184,122,0.4)]">
                    {Math.round(health * 100)}%
                  </span>
                  <p className="text-[11px] text-white/60 font-mono">Vitality Index</p>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-2.5">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={health}
                  onChange={(e) => setHealth(parseFloat(e.target.value))}
                  className="w-full h-3 bg-[#04241b] rounded-lg appearance-none cursor-pointer accent-[#00b87a] hover:accent-[#00c98a] transition-all border border-[#00b87a]/30 shadow-inner"
                />
                <div className="flex justify-between text-[11px] font-bold text-[#c8f1e2]/60 px-1 font-mono">
                  <span>CRITICAL (0%)</span>
                  <span>BALANCED (50%)</span>
                  <span>PARADISE (100%)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Real-time Metric Cards (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              const ratio = Math.round((0.4 + health * 0.6) * 100);

              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/[0.04] backdrop-blur-xl p-6 rounded-3xl space-y-4 border border-[#00b87a]/20 hover:border-[#00b87a]/60 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 group shadow-lg shadow-black/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#00b87a]/20 text-[#00c98a] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#00c98a] bg-[#00b87a]/10 px-2.5 py-0.5 rounded-md border border-[#00b87a]/20">
                      {ratio}%
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#00c98a] tracking-wider font-mono">{m.label}</span>
                    <p className="text-2xl sm:text-3xl font-black font-heading text-white mt-1 group-hover:text-[#00c98a] transition-colors">
                      {m.value}
                    </p>
                    <p className="text-xs text-[#c8f1e2]/65 mt-1">{m.unit}</p>
                  </div>

                  {/* Progress Indicator Line */}
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden pt-1">
                    <div 
                      className="h-full bg-[#00b87a] rounded-full transition-all duration-300"
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        <p className="text-center text-xs text-[#c8f1e2]/50 font-mono">
          * Impact values are illustrative demo estimates based on IPCC/EPA personal sustainability factors.
        </p>

      </div>
    </section>
  );
}


