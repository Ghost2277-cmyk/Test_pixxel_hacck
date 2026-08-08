"use client";

import { useEarthStore } from "@/store/useEarthStore";
import { motion } from "framer-motion";
import { Trees, Home, Droplets, Sun, Wind, Recycle } from "lucide-react";
import Link from "next/link";

export function IslandWidget() {
  const { islandLevel, xp, inventory } = useEarthStore();
  
  // Calculate next unlock
  const unlocks = [
    { level: 2, name: "Tree & Small House", icon: Home },
    { level: 3, name: "Garden & Lake", icon: Droplets },
    { level: 4, name: "Solar Panels", icon: Sun },
    { level: 5, name: "Wind Turbine", icon: Wind },
    { level: 6, name: "Recycling Center", icon: Recycle },
    { level: 7, name: "Eco Village", icon: Home },
    { level: 8, name: "Green City", icon: Home },
    { level: 9, name: "Biodiversity Sanctuary", icon: Trees },
    { level: 10, name: "Paradise", icon: Trees }
  ];

  const nextUnlock = unlocks.find(u => u.level > islandLevel) || unlocks[unlocks.length - 1];
  const progress = Math.min(100, Math.floor((xp / (nextUnlock.level * 500)) * 100));
  
  const placedItems = inventory.filter(i => i.isPlaced);

  return (
    <div className="glass-card p-6 flex flex-col justify-between h-full relative overflow-hidden bg-[var(--card)]/80 backdrop-blur-md border border-[var(--muted-foreground)]/20">
      
      {/* Background Graphic representing the island level abstractly */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Trees className="w-48 h-48 text-emerald-500" />
          {/* Render Placed Items */}
          {placedItems.slice(0, 3).map((item, idx) => (
            <div 
              key={item.id}
              className="absolute text-3xl drop-shadow-md bg-white/20 backdrop-blur rounded-full w-8 h-8 flex items-center justify-center"
              style={{
                top: `${20 + (idx * 25)}%`,
                left: `${idx % 2 === 0 ? 10 : 60}%`,
              }}
              title={item.name}
            >
              {item.icon || '✨'}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10">
        <h2 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-2 flex justify-between items-center">
          <span>My Eco Island</span>
          {placedItems.length > 0 && (
            <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded-full">
              {placedItems.length} Placed
            </span>
          )}
        </h2>
        <div className="text-3xl font-heading font-bold text-emerald-500 mb-1">
          Level {islandLevel}
        </div>
        <p className="text-sm text-[var(--foreground)] mb-6">
          {islandLevel === 1 ? "A fresh plot of land awaits your care." : "Your island is growing beautifully!"}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs text-[var(--muted-foreground)] font-medium">
            <span>Next: {nextUnlock.name}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <Link 
        href="/dashboard/island"
        className="relative z-10 w-full magnetic-glow py-3 rounded-xl bg-[var(--muted)] hover:bg-emerald-500 hover:text-white transition-all duration-300 font-bold text-center border border-[var(--muted-foreground)]/20 flex justify-center items-center"
      >
        Enter Island
      </Link>
    </div>
  );
}
