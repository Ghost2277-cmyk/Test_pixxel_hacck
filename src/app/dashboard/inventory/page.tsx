"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEarthStore } from "@/store/useEarthStore";
import { InventoryCard } from "@/components/inventory/InventoryCard";
import { PackageOpen, Sparkles, Sprout, ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["All", "Seeds", "Decorations", "Pets", "Earth", "Collectibles", "Special"];

export default function InventoryPage() {
  const { inventory, equipItem, placeOnIsland } = useEarthStore();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredInventory = activeCategory === "All" 
    ? inventory 
    : inventory.filter(item => item.category === activeCategory);

  const totalItems = inventory.reduce((acc, item) => acc + item.quantity, 0);
  const uniqueItems = inventory.length;
  const rareItems = inventory.filter(i => ['Rare', 'Epic', 'Legendary'].includes(i.rarity)).length;

  const handleEquip = (id: string) => {
    equipItem(id, undefined);
  };

  const handlePlace = (id: string) => {
    placeOnIsland(id, undefined);
  };

  return (
    <div className="w-full h-full relative overflow-y-auto custom-scrollbar bg-[var(--background)] p-6">
      <div className="max-w-6xl mx-auto flex flex-col min-h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-heading text-[var(--foreground)] flex items-center gap-3">
              <PackageOpen className="w-8 h-8 text-emerald-500" />
              My Inventory
            </h1>
            <p className="text-[var(--muted-foreground)] mt-1">Manage your eco-rewards and island decorations</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-[var(--card)] border border-[var(--muted-foreground)]/20 px-4 py-2 rounded-2xl shadow-sm text-center">
              <div className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">Total Items</div>
              <div className="text-xl font-bold text-[var(--foreground)]">{totalItems}</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--muted-foreground)]/20 px-4 py-2 rounded-2xl shadow-sm text-center">
              <div className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">Unlocked</div>
              <div className="text-xl font-bold text-emerald-500">{uniqueItems}</div>
            </div>
            <div className="bg-[var(--card)] border border-[var(--muted-foreground)]/20 px-4 py-2 rounded-2xl shadow-sm text-center">
              <div className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase">Rare+</div>
              <div className="text-xl font-bold text-purple-500 flex items-center gap-1 justify-center">
                <Sparkles className="w-4 h-4" /> {rareItems}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 custom-scrollbar hide-scroll-arrows">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                activeCategory === category 
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                  : "bg-[var(--card)] text-[var(--muted-foreground)] border border-[var(--muted-foreground)]/20 hover:bg-[var(--muted)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Inventory Grid */}
        <div className="flex-1">
          <AnimatePresence mode="popLayout">
            {filteredInventory.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20"
              >
                {filteredInventory.map(item => (
                  <InventoryCard 
                    key={item.id} 
                    item={item} 
                    onEquip={handleEquip}
                    onPlace={handlePlace}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full h-full min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-[var(--card)] rounded-3xl border border-[var(--muted-foreground)]/20 border-dashed"
              >
                <div className="w-20 h-20 bg-[var(--muted)] rounded-full flex items-center justify-center mb-6">
                  <Sprout className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--foreground)] font-heading mb-2">
                  {activeCategory === "All" ? "Your inventory is waiting to grow 🌱" : `No ${activeCategory} yet`}
                </h3>
                <p className="text-[var(--muted-foreground)] max-w-md mb-8">
                  Complete challenges, play games, and maintain your daily streak to collect rewards and decorations for your island!
                </p>
                <div className="flex gap-4">
                  <Link href="/dashboard/games">
                    <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                      Play a Game <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link href="/dashboard/challenges">
                    <button className="px-6 py-3 bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/10 text-[var(--foreground)] font-bold rounded-xl transition-all border border-[var(--muted-foreground)]/20">
                      View Challenges
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
