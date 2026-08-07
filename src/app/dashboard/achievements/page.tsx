"use client";

import { motion } from "framer-motion";
import { Award, Droplets, Leaf, TreePine, Wind, Lock } from "lucide-react";

const achievements = [
  { id: 1, title: "Plastic Free Hero", desc: "Went 30 days without single-use plastics.", icon: Droplets, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30", unlocked: true },
  { id: 2, title: "Earth Guardian", desc: "Reached 10,000 XP.", icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30", unlocked: true },
  { id: 3, title: "Forest Builder", desc: "Planted 50 digital trees.", icon: TreePine, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", unlocked: true },
  { id: 4, title: "Ocean Saver", desc: "Complete 100 water challenges.", icon: Droplets, color: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/30", unlocked: false },
  { id: 5, title: "100-Day Streak", desc: "Log in for 100 consecutive days.", icon: Leaf, color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30", unlocked: false },
  { id: 6, title: "Carbon Master", desc: "Reduce footprint by 50%.", icon: Wind, color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500/30", unlocked: false },
];

export default function AchievementsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-heading mb-2">Achievements</h1>
        <p className="text-slate-600">Collect badges by completing milestones on your journey to save the planet.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((badge, idx) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-3xl border flex flex-col items-center text-center transition-all duration-300 ${
              badge.unlocked 
                ? `glass-card ${badge.border} hover:-translate-y-2` 
                : "bg-white/40 border-white/5 opacity-60 grayscale"
            }`}
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 relative ${
              badge.unlocked ? badge.bg : "bg-white/5"
            }`}>
              {badge.unlocked ? (
                <badge.icon className={`w-12 h-12 ${badge.color} drop-shadow-lg`} />
              ) : (
                <Lock className="w-8 h-8 text-gray-500" />
              )}
              {badge.unlocked && (
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[spin_10s_linear_infinite] border-t-transparent" />
              )}
            </div>
            
            <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">{badge.title}</h3>
            <p className="text-sm text-slate-600">{badge.desc}</p>
            
          </motion.div>
        ))}
      </div>
    </div>
  );
}
