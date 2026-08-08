"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEarthStore } from "@/store/useEarthStore";
import { Sparkles, Leaf, TreePine, Droplets, Gem, Settings } from "lucide-react";

const RARITY_COLORS = {
  Common: "from-slate-400 to-slate-500 shadow-slate-500/20 text-slate-100 border-slate-500",
  Uncommon: "from-green-400 to-emerald-600 shadow-emerald-500/30 text-emerald-100 border-emerald-500",
  Rare: "from-blue-400 to-indigo-600 shadow-blue-500/40 text-blue-100 border-blue-500",
  Epic: "from-purple-400 to-fuchsia-600 shadow-purple-500/50 text-purple-100 border-purple-500",
  Legendary: "from-amber-300 to-orange-500 shadow-amber-500/60 text-amber-100 border-amber-500",
};

export function RewardModal() {
  const { rewardModalItem, clearRewardModal } = useEarthStore();

  return (
    <AnimatePresence>
      {rewardModalItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={clearRewardModal}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, rotate: -5 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`relative w-full max-w-sm rounded-3xl p-8 bg-[var(--card)] border-2 shadow-2xl flex flex-col items-center text-center overflow-hidden ${RARITY_COLORS[rewardModalItem.rarity].replace('from-', '').replace('to-', '').split(' ')[2].replace('border-', 'border-').replace('text-', '')}`}
            style={{ borderColor: RARITY_COLORS[rewardModalItem.rarity].includes('emerald') ? '#10b981' : RARITY_COLORS[rewardModalItem.rarity].includes('blue') ? '#3b82f6' : RARITY_COLORS[rewardModalItem.rarity].includes('purple') ? '#a855f7' : RARITY_COLORS[rewardModalItem.rarity].includes('amber') ? '#f59e0b' : '#64748b' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_COLORS[rewardModalItem.rarity].replace('text-', 'from-').replace('text-', 'to-')} opacity-10`} />

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className={`w-32 h-32 rounded-full bg-gradient-to-br ${RARITY_COLORS[rewardModalItem.rarity]} flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.3)] mb-6 relative z-10`}
            >
              {rewardModalItem.icon ? (
                <div className="text-6xl">{rewardModalItem.icon}</div>
              ) : (
                <>
                  {rewardModalItem.category === 'Seeds' && <Leaf className="w-16 h-16 text-white" />}
                  {rewardModalItem.category === 'Decorations' && <TreePine className="w-16 h-16 text-white" />}
                  {rewardModalItem.category === 'Pets' && <Sparkles className="w-16 h-16 text-white" />}
                  {rewardModalItem.category === 'Earth' && <Droplets className="w-16 h-16 text-white" />}
                  {rewardModalItem.category === 'Collectibles' && <Gem className="w-16 h-16 text-white" />}
                  {rewardModalItem.category === 'Special' && <Settings className="w-16 h-16 text-white" />}
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 w-full"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-1">
                New Item Unlocked!
              </h2>
              <h1 className={`text-3xl font-black font-heading mb-2 ${RARITY_COLORS[rewardModalItem.rarity].replace('from-', 'text-').split(' ')[0]}`}>
                {rewardModalItem.name}
              </h1>
              
              <div className="inline-block px-3 py-1 rounded-full bg-[var(--muted)] border border-[var(--muted-foreground)]/20 text-xs font-bold uppercase tracking-wider mb-4 text-[var(--foreground)]">
                {rewardModalItem.rarity}
              </div>

              <p className="text-sm text-[var(--muted-foreground)] mb-6 px-4">
                {rewardModalItem.description}
              </p>

              <button
                onClick={clearRewardModal}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-colors shadow-lg shadow-emerald-500/20"
              >
                Awesome!
              </button>
            </motion.div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
