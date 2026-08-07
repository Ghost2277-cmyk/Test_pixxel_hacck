"use client";

import { motion } from "framer-motion";
import { useEarthStore } from "@/store/useEarthStore";
import { TreePine, Droplets, Wind, HeartPulse, Sparkles } from "lucide-react";

export default function EarthPage() {
  const { planetPulse, forestVitality, oceanHealth, airQuality, biodiversity } = useEarthStore();

  return (
    <div className="w-full h-[calc(100vh-80px)] relative pointer-events-none flex flex-col justify-between p-6">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-auto max-w-md"
      >
        <h1 className="text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 drop-shadow-md">
          Cinematic Earth
        </h1>
        <p className="text-slate-700 glass-card p-4 rounded-xl border border-black/10">
          This is a real-time, interactive visualization of our planet. Drag to rotate, scroll to zoom.
          The environment naturally adapts to your daily eco-actions.
        </p>
      </motion.div>

      {/* Health Indicators HUD (Floating at the bottom) */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pointer-events-auto grid grid-cols-2 md:grid-cols-5 gap-4 bg-white/40 backdrop-blur-xl p-4 rounded-3xl border border-black/10"
      >
        <HudStat label="Planet Pulse" value={planetPulse} icon={HeartPulse} color="text-red-500" />
        <HudStat label="Forest Vitality" value={forestVitality} icon={TreePine} color="text-emerald-500" />
        <HudStat label="Ocean Health" value={oceanHealth} icon={Droplets} color="text-blue-400" />
        <HudStat label="Air Quality" value={airQuality} icon={Wind} color="text-cyan-400" />
        <HudStat label="Biodiversity" value={biodiversity} icon={Sparkles} color="text-purple-400" />
      </motion.div>
    </div>
  );
}

function HudStat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex flex-col items-center justify-center p-4 glass hover:bg-white/5 rounded-2xl transition-colors text-center group cursor-default">
      <Icon className={`w-6 h-6 mb-2 ${color} drop-shadow-lg group-hover:scale-110 transition-transform`} />
      <span className="text-xs text-slate-600 uppercase tracking-wider mb-1">{label}</span>
      <span className="text-xl font-bold">{Math.round(value * 100)}%</span>
    </div>
  );
}
