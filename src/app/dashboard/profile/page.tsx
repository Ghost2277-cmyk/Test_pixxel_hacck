"use client";

import { motion } from "framer-motion";
import { User, Shield, Target, Flame, Coins, Trophy } from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";

export default function ProfilePage() {
  const { level, xp, streak, greenCoins, health } = useEarthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Header & Avatar */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 glass-card p-8 rounded-3xl border border-black/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        
        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-1 relative z-10">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
            <User className="w-16 h-16 text-emerald-400" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-bold rounded-full mb-3">
            <Shield className="w-4 h-4" /> Eco DNA Verified
          </div>
          <h1 className="text-4xl font-bold font-heading mb-1">EcoWarrior_99</h1>
          <p className="text-slate-600 mb-6">Joined August 2026</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors">
              Edit Profile
            </button>
            <button className="px-6 py-2 glass border border-black/10 text-slate-900 font-bold rounded-xl hover:bg-white/5 transition-colors">
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Trophy} label="Rank / Level" value={level} color="text-yellow-400" />
        <StatCard icon={Target} label="Total XP" value={xp.toLocaleString()} color="text-emerald-400" />
        <StatCard icon={Flame} label="Day Streak" value={streak} color="text-orange-400" />
        <StatCard icon={Coins} label="Green Coins" value={greenCoins} color="text-cyan-400" />
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-8 rounded-3xl border border-black/10">
        <h2 className="text-2xl font-bold font-heading mb-6">Recent Activity</h2>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          <ActivityItem 
            title="Completed 'Cycle to Work'" 
            time="2 hours ago" 
            reward="+80 XP" 
          />
          <ActivityItem 
            title="Unlocked 'Plastic Free Hero' Badge" 
            time="Yesterday" 
            reward="Achievement" 
          />
          <ActivityItem 
            title="Tree grew to Stage 4" 
            time="3 days ago" 
            reward="Life Tree" 
          />
        </div>
      </div>

    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="glass-card p-6 rounded-2xl border border-black/10 text-center flex flex-col items-center justify-center hover:bg-white/5 transition-colors">
      <Icon className={`w-8 h-8 ${color} mb-3`} />
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-slate-600 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function ActivityItem({ title, time, reward }: any) {
  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-500 bg-black text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-4 rounded-2xl border border-black/10 hover:border-emerald-500/30 transition-colors">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-slate-900">{title}</h4>
          <span className="text-emerald-400 font-bold text-sm">{reward}</span>
        </div>
        <time className="text-xs text-gray-500">{time}</time>
      </div>
    </div>
  );
}
