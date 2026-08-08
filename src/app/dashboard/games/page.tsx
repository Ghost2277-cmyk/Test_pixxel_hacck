"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Gamepad2, ArrowLeft, Trash2, Sailboat, TreePine, Zap, HelpCircle, Building, Star, Trophy, Target, Lock } from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";

const LEVEL_RANKS: Record<string, number> = {
  "Seed": 1,
  "Sprout": 2,
  "Eco Explorer": 3,
  "Guardian": 4,
  "Forest Hero": 5,
  "Planet Protector": 6,
  "Earth Legend": 7
};

const GAMES = [
  { id: 'waste-sorting', title: 'Waste Sorting', category: 'Action', description: 'Drag waste into the correct bins', icon: Trash2, color: 'bg-emerald-500', href: '/dashboard/games/WasteSorting', xp: 50, coins: 20, reqLevel: 1 },
  { id: 'eco-quiz', title: 'Eco Quiz', category: 'Trivia', description: 'Test your knowledge', icon: HelpCircle, color: 'bg-purple-500', href: '/dashboard/games/EcoQuiz', xp: 40, coins: 15, reqLevel: 1 },
  { id: 'river-rescue', title: 'River Rescue', category: 'Action', description: 'Collect plastic, avoid fish', icon: Sailboat, color: 'bg-blue-500', href: '/dashboard/games/RiverRescue', xp: 60, coins: 25, reqLevel: 2 },
  { id: 'energy-defender', title: 'Energy Defender', category: 'Puzzle', description: 'Balance the power grid', icon: Zap, color: 'bg-amber-500', href: '/dashboard/games/EnergyDefender', xp: 80, coins: 40, reqLevel: 3 },
  { id: 'city-builder', title: 'Green City Builder', category: 'Simulation', description: 'Design an eco-city', icon: Building, color: 'bg-sky-500', href: '/dashboard/games/CityBuilder', xp: 200, coins: 100, reqLevel: 4 },
  { id: 'forest-guardian', title: 'Forest Guardian', category: 'Strategy', description: 'Plant and protect trees', icon: TreePine, color: 'bg-green-600', href: '/dashboard/games/ForestGuardian', xp: 100, coins: 50, reqLevel: 5 },
];

export default function EcoArcade() {
  const { xp, greenCoins, level } = useEarthStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Action', 'Strategy', 'Puzzle', 'Trivia', 'Simulation', 'Locked'];
  const userRank = LEVEL_RANKS[level] || 1;
  
  const filteredGames = GAMES.filter(game => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Locked') return game.reqLevel > userRank;
    return game.category === activeCategory;
  });

  return (
    <div className="w-full h-full p-8 max-w-7xl mx-auto overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <button className="p-3 rounded-full bg-[var(--card)] border border-[var(--muted-foreground)]/20 hover:bg-[var(--muted)] transition text-[var(--foreground)]">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold font-heading flex items-center gap-3 text-emerald-500">
              <Gamepad2 className="w-8 h-8" /> Eco Arcade
            </h1>
            <p className="text-[var(--muted-foreground)] mt-1 font-medium">Play games, earn XP, and heal the Earth!</p>
          </div>
        </div>

        {/* Player Stats */}
        <div className="flex gap-4">
          <div className="bg-[var(--card)] px-4 py-2 rounded-xl border border-[var(--muted-foreground)]/20 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Star className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider">Level</div>
              <div className="text-sm font-bold text-[var(--foreground)]">{level}</div>
            </div>
          </div>
          <div className="bg-[var(--card)] px-4 py-2 rounded-xl border border-[var(--muted-foreground)]/20 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider">Coins</div>
              <div className="text-sm font-bold text-[var(--foreground)]">{greenCoins}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Game */}
      <div className="w-full bg-[var(--card)] rounded-3xl p-8 border border-[var(--muted-foreground)]/20 shadow-xl mb-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none" />
        <div className="flex-1 relative z-10">
          <div className="inline-block px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider shadow-sm">Featured</div>
          <h2 className="text-3xl font-black text-[var(--foreground)] mb-2">Forest Guardian</h2>
          <p className="text-[var(--muted-foreground)] mb-6 max-w-md">Take on the ultimate challenge! Plant trees, defend them from pollution, and watch your forest grow to earn massive rewards.</p>
          <Link href={userRank >= 5 ? "/dashboard/games/ForestGuardian" : "#"}>
            <button className={`px-8 py-3 rounded-xl font-bold transition shadow-lg flex items-center gap-2 ${userRank >= 5 ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed'}`}>
              {userRank >= 5 ? <><Gamepad2 className="w-5 h-5" /> Play Now</> : <><Lock className="w-5 h-5" /> Unlocks at Rank 5</>}
            </button>
          </Link>
        </div>
        <div className="relative z-10 w-48 h-48 bg-green-600 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shrink-0">
          <TreePine className="w-24 h-24 text-white drop-shadow-md" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 custom-scrollbar hide-scroll-arrows">
        {categories.map((cat, i) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition whitespace-nowrap border ${activeCategory === cat ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-[var(--card)] text-[var(--muted-foreground)] border-[var(--muted-foreground)]/20 hover:bg-[var(--muted)]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGames.map((game, i) => {
            const isLocked = game.reqLevel > userRank;
            
            return (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {isLocked ? (
                  <div className="bg-[var(--card)] p-6 rounded-3xl h-full border border-[var(--muted-foreground)]/20 shadow-sm relative overflow-hidden flex flex-col items-center justify-center text-center opacity-70 cursor-not-allowed">
                    <div className="w-16 h-16 bg-[var(--muted)] rounded-2xl flex items-center justify-center mb-4">
                      <Lock className="w-8 h-8 text-[var(--muted-foreground)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">{game.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">Unlocks at Rank {game.reqLevel}</p>
                    <div className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider bg-[var(--muted)] px-3 py-1 rounded-full">
                      {Object.keys(LEVEL_RANKS).find(key => LEVEL_RANKS[key] === game.reqLevel)} required
                    </div>
                  </div>
                ) : (
                  <Link href={game.href} className="block h-full">
                    <div className="bg-[var(--card)] p-6 rounded-3xl hover:-translate-y-2 transition-transform cursor-pointer h-full border border-[var(--muted-foreground)]/20 shadow-md relative overflow-hidden group flex flex-col">
                      <div className={`absolute top-0 right-0 w-32 h-32 ${game.color} blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity`} />
                      
                      <div className="flex justify-between items-start mb-4">
                        <div className={`${game.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                          <game.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)] tracking-wider bg-[var(--muted)] px-3 py-1 rounded-full">{game.category}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{game.title}</h3>
                      <p className="text-sm text-[var(--muted-foreground)] flex-1">{game.description}</p>
                      
                      <div className="mt-6 pt-4 border-t border-[var(--muted-foreground)]/10 flex justify-between items-center text-sm font-bold">
                        <div className="flex gap-3">
                          <span className="flex items-center gap-1 text-emerald-500"><Target className="w-4 h-4"/> {game.xp} XP</span>
                          <span className="flex items-center gap-1 text-yellow-500"><Trophy className="w-4 h-4"/> {game.coins}</span>
                        </div>
                        <span className="text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">Play</span>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
