"use client";

import { motion } from "framer-motion";
import { useEarthStore } from "@/store/useEarthStore";
import { CheckCircle2, Target, Calendar, Sparkles, Trophy, Zap } from "lucide-react";

export default function ChallengesPage() {
  const { dailyMissions, completeMission } = useEarthStore();

  const challengeCategories = [
    { title: "Daily", icon: Zap, color: "text-yellow-400" },
    { title: "Weekly", icon: Calendar, color: "text-blue-400" },
    { title: "Monthly", icon: Trophy, color: "text-purple-400" },
    { title: "Special Events", icon: Sparkles, color: "text-emerald-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-heading mb-2">Eco Challenges</h1>
        <p className="text-slate-600">Complete challenges to earn XP, Green Coins, and heal the Earth.</p>
      </div>

      {/* Categories Tabs */}
      <div className="flex flex-wrap gap-4">
        {challengeCategories.map((cat, i) => (
          <button 
            key={cat.title}
            className={`px-6 py-3 rounded-full glass-card border flex items-center gap-2 transition-all ${
              i === 0 ? "bg-white/10 border-white/20" : "border-white/5 hover:bg-white/5"
            }`}
          >
            <cat.icon className={`w-5 h-5 ${cat.color}`} />
            <span className="font-semibold">{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Daily Challenges List */}
      <div className="grid gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 mt-4">
          <Target className="w-6 h-6 text-emerald-500" /> Active Daily Challenges
        </h2>
        
        {dailyMissions.map((mission, idx) => (
          <motion.div 
            key={mission.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
              mission.completed 
                ? "bg-emerald-900/20 border-emerald-500/30 opacity-70" 
                : "glass-card hover:bg-white/5 border-black/10 hover:border-emerald-500/30"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 rounded-full">
                  {mission.type}
                </span>
                <span className="text-emerald-400 text-sm font-bold">+{mission.xpReward} XP</span>
                <span className="text-yellow-400 text-sm font-bold">+{mission.coinReward} Coins</span>
              </div>
              <h3 className={`text-xl font-bold font-heading ${mission.completed ? "text-emerald-400 line-through" : "text-slate-900"}`}>
                {mission.title}
              </h3>
              <p className="text-slate-600 mt-1">{mission.description}</p>
            </div>
            
            {mission.completed ? (
              <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-6 py-3 rounded-xl font-bold">
                <CheckCircle2 className="w-6 h-6" /> Completed
              </div>
            ) : (
              <button 
                onClick={() => completeMission(mission.id)}
                className="w-full md:w-auto px-8 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
              >
                Complete Mission
              </button>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  );
}
