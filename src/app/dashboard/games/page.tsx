"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, ArrowLeft, Trash2, Sailboat, TreePine, Zap, HelpCircle, Building } from "lucide-react";

const GAMES = [
  { id: 'waste-sorting', title: 'Waste Sorting', description: 'Drag waste into the correct bins', icon: Trash2, color: 'bg-emerald-500', href: '/dashboard/games/WasteSorting' },
  { id: 'river-rescue', title: 'River Rescue', description: 'Collect plastic, avoid fish', icon: Sailboat, color: 'bg-blue-500', href: '/dashboard/games/RiverRescue' },
  { id: 'forest-guardian', title: 'Forest Guardian', description: 'Plant and protect trees', icon: TreePine, color: 'bg-green-600', href: '/dashboard/games/ForestGuardian' },
  { id: 'energy-defender', title: 'Energy Defender', description: 'Balance the power grid', icon: Zap, color: 'bg-amber-500', href: '/dashboard/games/EnergyDefender' },
  { id: 'eco-quiz', title: 'Eco Quiz', description: 'Test your knowledge', icon: HelpCircle, color: 'bg-purple-500', href: '/dashboard/games/EcoQuiz' },
  { id: 'city-builder', title: 'Green City Builder', description: 'Design an eco-city', icon: Building, color: 'bg-sky-500', href: '/dashboard/games/CityBuilder' },
];

export default function EcoArcade() {
  return (
    <div className="w-full h-full p-8 max-w-6xl mx-auto overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <button className="p-3 rounded-full glass-card hover:bg-white/10 transition">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold font-heading flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-emerald-400" /> Eco Arcade
          </h1>
          <p className="opacity-70 mt-1">Play games, earn XP, and heal the Earth!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={game.href}>
              <div className="glass-card p-6 rounded-3xl hover:scale-105 transition-transform cursor-pointer h-full border border-black/10 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 ${game.color} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className={`${game.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <game.icon className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-sm opacity-70">{game.description}</p>
                <div className="mt-6 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <span>Play Now</span>
                  <span>+ XP & Coins</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
