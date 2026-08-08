"use client";

import { motion } from "framer-motion";
import { useEarthStore } from "@/store/useEarthStore";
import { DailyLoginModal } from "@/components/dashboard/DailyLoginModal";
import { Cloud, Droplets, TreePine, Leaf, Zap, Trophy, Target, Gamepad2, Gift, Heart, Music, Lightbulb, MessageCircle, Star, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CanvasContainer } from "@/components/canvas/CanvasContainer"; // Ensure this is imported if we manage it here, but it's usually in layout.
import { IslandWidget } from "@/components/dashboard/IslandWidget";

export default function GameHomePage() {
  const { airQuality, oceanHealth, forestVitality, biodiversity, planetPulse, health, dailyMissions } = useEarthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const stats = [
    { label: "Air Quality", value: airQuality, icon: Cloud, color: "text-sky-500", progressColor: "stroke-sky-500" },
    { label: "Water Purity", value: oceanHealth, icon: Droplets, color: "text-blue-500", progressColor: "stroke-blue-500" },
    { label: "Forest Vitality", value: forestVitality, icon: TreePine, color: "text-green-600", progressColor: "stroke-green-600" },
    { label: "Biodiversity", value: biodiversity, icon: Leaf, color: "text-purple-500", progressColor: "stroke-purple-500" },
    { label: "Energy Balance", value: planetPulse, icon: Zap, color: "text-amber-500", progressColor: "stroke-amber-500" },
  ];

  return (
    <div className="w-full h-full relative overflow-y-auto custom-scrollbar">
      <DailyLoginModal />

      {/* Hero Section (Earth Viewport) - 90vh */}
      <div className="w-full h-[90vh] relative min-h-[700px] flex flex-col justify-between p-6 pointer-events-none">
        
        {/* Left Side: Planet Health */}
        <div className="absolute left-6 top-10 flex flex-col gap-3 pointer-events-auto w-48">
          <div className="bg-[var(--card)]/90 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 border border-[var(--muted-foreground)]/20 mb-4 shadow-xl text-[var(--foreground)]">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-[10px] font-bold opacity-70 uppercase tracking-wider text-[var(--muted-foreground)]">Planet Rank</div>
              <div className="font-bold">#12,458</div>
            </div>
          </div>

          <div className="bg-[var(--card)]/95 backdrop-blur-xl rounded-3xl p-5 border border-[var(--muted-foreground)]/20 shadow-xl text-[var(--foreground)]">
            <h3 className="font-bold mb-4 text-center">Planet Health</h3>
            
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray="251" strokeDashoffset={251 - (health * 251)} 
                  className="text-emerald-500 transition-all duration-1000" strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold font-heading">{Math.round(health * 100)}%</span>
              </div>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 text-center mb-6">Improving ✨+3% today</div>

            <div className="flex flex-col gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color} fill-current opacity-20`} />
                  <div className="flex flex-col w-full">
                    <div className="text-[10px] font-bold opacity-70 leading-none">{stat.label}</div>
                    <div className={`text-sm font-bold ${stat.color}`}>{Math.round(stat.value * 100)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Gaia & Quests */}
        <div className="absolute right-6 top-10 w-80 flex flex-col gap-4 pointer-events-auto">
          
          {/* Gaia Chat */}
          <div className="bg-[var(--card)]/95 backdrop-blur-xl rounded-3xl p-4 border border-[var(--muted-foreground)]/20 shadow-xl relative text-[var(--foreground)]">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span className="font-bold">Gaia</span>
              </div>
            </div>
            <div className="text-sm font-medium text-[var(--muted-foreground)] pr-24 mb-4">
              Wow! You're doing awesome! 🌱<br/>The trees are growing and the rivers are cleaner!
            </div>
            
            {/* Gaia Asset Generated */}
            <div className="absolute -right-8 -top-8 w-40 h-40 drop-shadow-2xl hover:scale-110 transition-transform cursor-pointer origin-bottom">
              <img src="/assets/gaia.png" alt="Gaia Mascot" className="w-full h-full object-contain mix-blend-multiply" />
            </div>

            <div className="flex gap-2 w-full justify-between mt-4">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 rounded-full text-xs font-bold text-[var(--foreground)] transition">
                <MessageCircle className="w-3 h-3 text-emerald-500 fill-current" /> Talk
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 rounded-full text-xs font-bold text-[var(--foreground)] transition">
                <Heart className="w-3 h-3 text-red-500 fill-current" /> Hug
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 rounded-full text-xs font-bold text-[var(--foreground)] transition">
                <Music className="w-3 h-3 text-blue-500 fill-current" /> Dance
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 rounded-full text-xs font-bold text-[var(--foreground)] transition">
                <Lightbulb className="w-3 h-3 text-amber-500 fill-current" /> Tips
              </button>
            </div>
          </div>

          {/* Today's Quests */}
          <div className="bg-[var(--card)]/95 backdrop-blur-xl rounded-3xl p-5 border border-[var(--muted-foreground)]/20 shadow-xl text-[var(--foreground)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" /> Today's Quests
              </h3>
              <span className="text-xs font-bold text-[var(--muted-foreground)]">
                {dailyMissions.filter(m => m.completed).length} / {dailyMissions.length}
              </span>
            </div>
            
            <div className="flex flex-col gap-3 mb-4">
              {dailyMissions.slice(0, 3).map((mission) => (
                <div key={mission.id} className="flex gap-3 items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${mission.completed ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                    {mission.completed ? <img src="https://api.iconify.design/lucide:check.svg?color=%2310b981" className="w-4 h-4"/> : <img src="https://api.iconify.design/lucide:bottle-water.svg?color=%233b82f6" className="w-4 h-4"/>}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold ${mission.completed ? 'opacity-50' : ''}`}>
                      {mission.title}
                    </div>
                    <div className="text-[10px] font-bold flex gap-2">
                      <span className="text-emerald-500">+{mission.xpReward} XP</span>
                      <span className="text-amber-500 flex items-center gap-1"><Trophy className="w-3 h-3"/> +10</span>
                    </div>
                  </div>
                  {mission.completed ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"><Leaf className="w-3 h-3 text-white" /></div>
                  ) : (
                    <div className="w-16 h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[60%]"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Link href="/dashboard/challenges">
              <button className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold text-sm transition-colors shadow-lg shadow-emerald-500/30">
                View All Quests
              </button>
            </Link>
          </div>
        </div>

        {/* Center Bottom HUD */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-auto">
          
          <button className="px-6 py-2 bg-[var(--card)]/90 backdrop-blur-md rounded-full shadow-lg font-bold text-sm text-[var(--foreground)] border border-[var(--muted-foreground)]/20 flex items-center gap-2 hover:scale-105 transition">
            Click on Earth to Explore 👆
          </button>

          <div className="px-6 py-1.5 bg-emerald-900/80 backdrop-blur-md rounded-full border border-emerald-500/30 flex items-center gap-2 shadow-xl">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-50 font-bold text-sm">Earth is Healing</span>
            <svg className="w-12 h-4 text-emerald-400 opacity-80" viewBox="0 0 100 20">
              <polyline fill="none" stroke="currentColor" strokeWidth="2" points="0,10 20,10 30,0 40,20 50,10 100,10" className="animate-[pulse_2s_ease-in-out_infinite]" />
            </svg>
          </div>

          <div className="flex gap-4 mt-2">
            <div className="bg-[var(--card)]/95 backdrop-blur-md rounded-full p-2 pr-6 flex items-center gap-3 shadow-xl cursor-pointer hover:scale-105 transition border border-[var(--muted-foreground)]/20">
              <div className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center text-2xl">🎡</div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[var(--foreground)] leading-none">Spin Wheel</span>
                <span className="text-[10px] font-bold text-sky-500">Free spin!</span>
              </div>
            </div>
            
            <div className="bg-[var(--card)]/95 backdrop-blur-md rounded-full p-2 pr-6 flex items-center gap-3 shadow-xl cursor-pointer hover:scale-105 transition border border-[var(--muted-foreground)]/20">
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center p-1">
                <img src="/assets/chest.png" className="w-full h-full object-contain drop-shadow-md mix-blend-multiply" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[var(--foreground)] leading-none">Daily Chest</span>
                <span className="text-[10px] font-bold text-amber-500">Ready!</span>
              </div>
            </div>
            
            <Link href="/dashboard/island" className="bg-[var(--card)]/95 backdrop-blur-md rounded-full p-2 pr-6 flex items-center gap-3 shadow-xl cursor-pointer hover:scale-105 transition border border-[var(--muted-foreground)]/20">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center p-1 overflow-hidden">
                <img src="/assets/island.png" className="w-full h-full object-cover scale-150 origin-bottom mix-blend-multiply" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[var(--foreground)] leading-none">My Island</span>
                <span className="text-[10px] font-bold text-emerald-500">Level 5</span>
              </div>
            </Link>
            
            <div className="bg-[var(--card)]/95 backdrop-blur-md rounded-full p-2 pr-6 flex items-center gap-3 shadow-xl cursor-pointer hover:scale-105 transition border border-[var(--muted-foreground)]/20">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-2xl">🐢</div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[var(--foreground)] leading-none">Pet</span>
                <span className="text-[10px] font-bold text-green-500">Turtle</span>
              </div>
            </div>
            
            <Link href="/dashboard/games" className="bg-[var(--card)]/95 backdrop-blur-md rounded-full p-2 pr-6 flex items-center gap-3 shadow-xl cursor-pointer hover:scale-105 transition border border-[var(--muted-foreground)]/20">
              <div className="w-10 h-10 bg-[var(--muted)] rounded-full flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-[var(--muted-foreground)]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[var(--foreground)] leading-none">Games</span>
                <span className="text-[10px] font-bold text-emerald-500">8 New</span>
              </div>
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom Expanding Panels Area */}
      <div className="w-full bg-gradient-to-b from-transparent via-white/40 to-white/80 backdrop-blur-sm p-6 pt-12 pb-24 relative z-20 pointer-events-auto">
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* My Island Panel */}
          <div className="col-span-12 md:col-span-4 h-full">
            <IslandWidget />
          </div>

          {/* Play & Earn Panel */}
          <div className="col-span-12 md:col-span-4 bg-[var(--card)] rounded-3xl p-5 shadow-xl border border-[var(--muted-foreground)]/20 flex flex-col text-[var(--foreground)]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Play & Earn</h3>
              <Link href="/dashboard/games" className="text-xs font-bold text-emerald-500 hover:underline">View All Games</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-1">
              {[
                { name: 'Waste Sorting', bg: 'bg-green-500/20', emoji: '♻️', lvl: 3, stars: 3 },
                { name: 'Ocean Cleanup', bg: 'bg-blue-500/20', emoji: '🐢', lvl: 2, stars: 4 },
                { name: 'Tree Planting', bg: 'bg-amber-500/20', emoji: '🌱', lvl: 4, stars: 5 },
                { name: 'Energy Saver', bg: 'bg-yellow-500/20', emoji: '💡', lvl: 1, stars: 2 },
              ].map(game => (
                <div key={game.name} className="bg-[var(--muted)] rounded-2xl p-2 border border-[var(--muted-foreground)]/10 flex flex-col items-center justify-center text-center hover:bg-[var(--muted-foreground)]/10 transition cursor-pointer relative overflow-hidden group">
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-br-lg z-10">New!</div>
                  <div className={`w-12 h-12 ${game.bg} rounded-xl flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform`}>{game.emoji}</div>
                  <div className="text-[10px] font-bold leading-tight mb-0.5">{game.name}</div>
                  <div className="text-[8px] text-[var(--muted-foreground)] font-bold mb-1">Level {game.lvl}</div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className={`w-2 h-2 ${s <= game.stars ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--muted-foreground)] fill-[var(--muted-foreground)]'}`} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Event & Leaderboard Combo */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            
            {/* Live Event */}
            <div className="bg-[var(--card)] rounded-3xl p-5 shadow-xl border border-[var(--muted-foreground)]/20 relative overflow-hidden text-[var(--foreground)]">
              <div className="absolute right-0 top-0 w-32 h-full bg-emerald-500/10 -skew-x-12 translate-x-8"></div>
              <div className="flex justify-between items-center mb-2 relative z-10">
                <h3 className="font-bold text-lg">Live Event</h3>
                <span className="text-[10px] font-bold bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-1 rounded-full flex items-center gap-1"><Clock className="w-3 h-3"/> 2d 14h left</span>
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-black text-emerald-500 mb-1">Green Festival</h4>
                <p className="text-xs text-[var(--muted-foreground)] font-medium mb-4 max-w-[60%]">Plant more trees with the community!</p>
                <button className="px-6 py-2 bg-emerald-500 text-white rounded-full font-bold text-sm hover:bg-emerald-600 transition shadow-lg">Join Now</button>
              </div>
              <div className="absolute right-[-10px] bottom-[-20px] text-8xl opacity-30 pointer-events-none">🌳</div>
            </div>

            {/* Mini Leaderboard */}
            <div className="bg-[var(--card)] rounded-3xl p-5 shadow-xl border border-[var(--muted-foreground)]/20 flex-1 flex flex-col text-[var(--foreground)]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Leaderboard</h3>
                <span className="text-[10px] font-bold text-[var(--muted-foreground)]">This Week ⌄</span>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                {[
                  { rank: 1, name: 'GreenWarrior', xp: '12,450', highlight: false },
                  { rank: 2, name: 'EarthSaver', xp: '9,870', highlight: false },
                  { rank: 3, name: 'NatureLover', xp: '8,620', highlight: false },
                  { rank: 4, name: 'EcoExplorer (You)', xp: '7,420', highlight: true },
                  { rank: 5, name: 'PlanetHero', xp: '6,010', highlight: false },
                ].map(p => (
                  <div key={p.rank} className={`flex items-center justify-between p-2 rounded-xl text-xs font-bold ${p.highlight ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-500' : 'text-[var(--muted-foreground)]'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-5 text-center ${p.rank === 1 ? 'text-yellow-500' : (p.rank===2 ? 'text-[var(--muted-foreground)]' : (p.rank===3 ? 'text-amber-500' : 'text-[var(--muted-foreground)]'))}`}>{p.rank}</span>
                      <div className="w-5 h-5 rounded-full bg-[var(--muted)]"></div>
                      <span>{p.name}</span>
                    </div>
                    <span>{p.xp} XP</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/leaderboard">
                <button className="w-full mt-3 py-2 bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 text-[var(--foreground)] rounded-xl font-bold text-xs transition">View Full Leaderboard</button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Persistent Footer Tip */}
      <div className="fixed bottom-0 left-64 right-0 bg-emerald-900/95 backdrop-blur-md text-slate-900 text-xs font-bold py-2 text-center z-30 border-t border-emerald-500/30">
        <span className="text-emerald-300">Gaia Tip:</span> Small actions create big changes! Keep going and make our planet beautiful! 🌍✨
      </div>

    </div>
  );
}

// Just a dummy clock icon since it wasn't imported above
function Clock(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
