"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, Coins, Zap } from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";
import { useState } from "react";

export function DailyLoginModal() {
  const { lastClaimDate, claimDaily } = useEarthStore();
  const today = new Date().toISOString().split('T')[0];
  const hasClaimedDaily = lastClaimDate === today;
  
  const [isOpen, setIsOpen] = useState(!hasClaimedDaily);
  const [isOpening, setIsOpening] = useState(false);

  const handleClaim = () => {
    setIsOpening(true);
    setTimeout(() => {
      claimDaily();
      setIsOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto px-4">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass-card max-w-md w-full border border-emerald-500/30 p-8 rounded-[2rem] relative z-10 text-center shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

        <h2 className="text-3xl font-bold font-heading mb-2 text-slate-900">Daily Reward</h2>
        <p className="text-slate-600 mb-8">Welcome back! Claim your daily energy and coins to continue healing the Earth.</p>

        <div className="relative h-48 flex items-center justify-center mb-8">
          {/* Particles */}
          {isOpening && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl"
            />
          )}

          <motion.div
            animate={isOpening ? { 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1.2, 1]
            } : {
              y: [0, -10, 0]
            }}
            transition={{ 
              rotate: { duration: 0.5 },
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            className="w-32 h-32 relative flex items-center justify-center cursor-pointer group"
            onClick={!isOpening ? handleClaim : undefined}
          >
            <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl rotate-45 group-hover:rotate-90 transition-all duration-500 blur-md" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-cyan-400 rounded-3xl rotate-45 group-hover:rotate-90 transition-all duration-500 opacity-50" />
            <Gift className={`w-16 h-16 text-slate-900 relative z-10 drop-shadow-xl ${isOpening ? "animate-ping" : ""}`} />
          </motion.div>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-2">
              <Coins className="w-6 h-6" />
            </div>
            <span className="font-bold text-yellow-400">+20 Coins</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <Zap className="w-6 h-6" />
            </div>
            <span className="font-bold text-emerald-400">+50 Energy</span>
          </div>
        </div>

        <button 
          onClick={handleClaim}
          disabled={isOpening}
          className="w-full py-4 bg-emerald-500 text-black font-bold text-lg rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50"
        >
          {isOpening ? "Opening..." : "Claim Reward"}
        </button>
      </motion.div>
    </div>
  );
}
