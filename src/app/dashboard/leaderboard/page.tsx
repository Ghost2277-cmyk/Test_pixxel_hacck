"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useState } from "react";

const leaderboardData = [
  { rank: 1, name: "EcoWarrior_99", xp: 12500, level: "Earth Legend", change: "up" },
  { rank: 2, name: "GreenPlanet", xp: 11200, level: "Earth Legend", change: "same" },
  { rank: 3, name: "OceanSaver", xp: 10800, level: "Earth Legend", change: "down" },
  { rank: 4, name: "TreeHugger", xp: 9500, level: "Planet Protector", change: "up" },
  { rank: 5, name: "RecycleKing", xp: 8200, level: "Planet Protector", change: "same" },
  { rank: 6, name: "SolarFlare", xp: 7100, level: "Forest Hero", change: "down" },
  { rank: 7, name: "WindRider", xp: 6800, level: "Forest Hero", change: "up" },
  { rank: 8, name: "AquaMarine", xp: 5400, level: "Guardian", change: "same" },
  // ... mock data
];

const categories = ["Global", "College", "Friends", "City", "Country", "Monthly", "All Time"];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("Global");

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          <Trophy className="w-10 h-10 text-yellow-400" />
        </div>
        <h1 className="text-4xl font-bold font-heading mb-2">Global Leaderboard</h1>
        <p className="text-slate-600">See how you stack up against the rest of the world.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === cat 
                ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
                : "glass border border-black/10 hover:bg-white/5 text-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rankings */}
      <div className="space-y-3">
        {leaderboardData.map((user, idx) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`glass-card p-4 flex items-center justify-between rounded-2xl border transition-all hover:bg-white/5 ${
              idx < 3 ? "border-yellow-500/30 bg-yellow-500/5" : "border-white/5"
            }`}
          >
            <div className="flex items-center gap-6">
              <div className={`text-2xl font-bold font-heading w-8 text-center ${
                idx === 0 ? "text-yellow-400" : idx === 1 ? "text-slate-700" : idx === 2 ? "text-amber-600" : "text-gray-500"
              }`}>
                #{user.rank}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-xs">
                    {user.name.substring(0,2).toUpperCase()}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{user.name}</h3>
                  <p className="text-xs text-slate-600">{user.level}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="font-bold text-emerald-400">{user.xp.toLocaleString()} XP</div>
              </div>
              
              <div className="w-8 flex justify-center">
                {user.change === 'up' && <ArrowUp className="w-5 h-5 text-emerald-500" />}
                {user.change === 'down' && <ArrowDown className="w-5 h-5 text-red-500" />}
                {user.change === 'same' && <Minus className="w-5 h-5 text-gray-600" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
