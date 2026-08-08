"use client";

import { motion } from "framer-motion";
import { Trophy, Star, ArrowRight, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

interface GameResultModalProps {
  score: number;
  xpEarned: number;
  coinsEarned: number;
  onPlayAgain: () => void;
  title?: string;
}

export function GameResultModal({ score, xpEarned, coinsEarned, onPlayAgain, title = "Time's Up!" }: GameResultModalProps) {
  const { user } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        className="bg-[var(--card)] p-10 rounded-3xl text-center max-w-md w-full border border-[var(--muted-foreground)]/20 shadow-2xl relative overflow-hidden text-[var(--foreground)]"
      >
        {/* Confetti / Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center border-4 border-yellow-500/30"
        >
          <Trophy className="w-12 h-12 text-yellow-500" />
        </motion.div>

        <h2 className="text-4xl font-black mb-2 font-heading">{title}</h2>
        
        <div className="text-xl mb-8 font-medium text-[var(--muted-foreground)]">
          You scored <span className="text-yellow-500 font-bold text-2xl">{score}</span> points
        </div>
        
        <div className="bg-[var(--muted)] p-6 rounded-2xl mb-8 border border-[var(--muted-foreground)]/10">
          <h3 className="text-sm font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-4">Rewards Earned</h3>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="font-bold text-emerald-500 text-lg">+{xpEarned} XP</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <span className="text-2xl">🪙</span>
              </div>
              <span className="font-bold text-yellow-500 text-lg">+{coinsEarned}</span>
            </div>
          </div>
          {!user && (
            <p className="text-xs text-red-500 mt-4 font-bold bg-red-500/10 py-1 rounded">Log in to save these rewards!</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onPlayAgain} 
            className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-400 transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Play Again
          </button>
          
          <Link href="/dashboard/games">
            <button className="w-full py-4 rounded-xl bg-[var(--muted)] hover:bg-[var(--muted-foreground)]/20 text-[var(--foreground)] font-bold text-lg transition-colors flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" /> Back to Arcade
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
