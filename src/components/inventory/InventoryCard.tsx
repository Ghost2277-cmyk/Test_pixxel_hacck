"use client";

import { motion } from "framer-motion";
import { Sparkles, Leaf, TreePine, Droplets, Gem, Settings } from "lucide-react";
import type { InventoryItem } from "@/lib/db";

interface InventoryCardProps {
  item: InventoryItem;
  onEquip?: (id: string) => void;
  onPlace?: (id: string) => void;
}

const RARITY_COLORS = {
  Common: "from-slate-400 to-slate-500 shadow-slate-500/20 text-slate-100",
  Uncommon: "from-green-400 to-emerald-600 shadow-emerald-500/30 text-emerald-100",
  Rare: "from-blue-400 to-indigo-600 shadow-blue-500/40 text-blue-100",
  Epic: "from-purple-400 to-fuchsia-600 shadow-purple-500/50 text-purple-100",
  Legendary: "from-amber-300 to-orange-500 shadow-amber-500/60 text-amber-100",
};

const RARITY_BADGE = {
  Common: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  Uncommon: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Rare: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Epic: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Legendary: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export function InventoryCard({ item, onEquip, onPlace }: InventoryCardProps) {
  const getActionText = () => {
    if (item.category === 'Seeds') return "Plant Seed";
    if (item.category === 'Decorations') return item.isPlaced ? "Remove from Island" : "Place on Island";
    if (item.category === 'Pets') return item.isEquipped ? "Unequip Pet" : "Equip Pet";
    if (item.category === 'Earth') return item.isEquipped ? "Remove Effect" : "Apply Effect";
    return null;
  };

  const handleAction = () => {
    if (item.category === 'Decorations' && onPlace) onPlace(item.id);
    if (item.category === 'Pets' && onEquip) onEquip(item.id);
    if (item.category === 'Earth' && onEquip) onEquip(item.id);
  };

  const actionText = getActionText();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-[var(--card)] border border-[var(--muted-foreground)]/20 rounded-3xl overflow-hidden flex flex-col group`}
    >
      {/* Rarity Glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${RARITY_COLORS[item.rarity]}`} />
      
      <div className="w-full h-32 flex items-center justify-center relative z-10 pt-4 bg-gradient-to-b from-[var(--muted)] to-transparent">
        {item.icon ? (
          <div className="text-5xl drop-shadow-xl hover:scale-110 transition-transform cursor-pointer origin-bottom">
            {item.icon}
          </div>
        ) : (
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${RARITY_COLORS[item.rarity]} flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
            {item.category === 'Seeds' && <Leaf className="w-8 h-8 text-white" />}
            {item.category === 'Decorations' && <TreePine className="w-8 h-8 text-white" />}
            {item.category === 'Pets' && <Sparkles className="w-8 h-8 text-white" />}
            {item.category === 'Earth' && <Droplets className="w-8 h-8 text-white" />}
            {item.category === 'Collectibles' && <Gem className="w-8 h-8 text-white" />}
            {item.category === 'Special' && <Settings className="w-8 h-8 text-white" />}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-[var(--card)]/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-[var(--foreground)] border border-[var(--muted-foreground)]/20 shadow-sm">
          x{item.quantity}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col z-10 bg-[var(--card)]">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-[var(--foreground)] text-lg leading-tight">{item.name}</h3>
        </div>
        
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${RARITY_BADGE[item.rarity]} uppercase tracking-wider`}>
            {item.rarity}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-[var(--muted-foreground)]/30 bg-[var(--muted)] text-[var(--muted-foreground)] uppercase tracking-wider">
            {item.category}
          </span>
        </div>

        <p className="text-xs text-[var(--muted-foreground)] mb-4 flex-1">
          {item.description}
        </p>

        {actionText && (
          <button
            onClick={handleAction}
            className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${
              item.isEquipped || item.isPlaced
                ? "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted-foreground)]/20"
                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
            }`}
          >
            {actionText}
          </button>
        )}
      </div>
    </motion.div>
  );
}
