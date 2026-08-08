"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, Trophy, Clock } from "lucide-react";
import Link from "next/link";
import { useEarthStore } from "@/store/useEarthStore";
import { GameResultModal } from "@/components/games/GameResultModal";

type BinType = 'plastic' | 'paper' | 'glass' | 'organic' | 'ewaste';

interface WasteItem {
  id: string;
  name: string;
  type: BinType;
  emoji: string;
}

const ALL_WASTE: WasteItem[] = [
  { id: '1', name: 'Plastic Bottle', type: 'plastic', emoji: '🥤' },
  { id: '2', name: 'Newspaper', type: 'paper', emoji: '📰' },
  { id: '3', name: 'Wine Glass', type: 'glass', emoji: '🍷' },
  { id: '4', name: 'Apple Core', type: 'organic', emoji: '🍎' },
  { id: '5', name: 'Old Phone', type: 'ewaste', emoji: '📱' },
  { id: '6', name: 'Cardboard Box', type: 'paper', emoji: '📦' },
  { id: '7', name: 'Banana Peel', type: 'organic', emoji: '🍌' },
  { id: '8', name: 'Broken Bulb', type: 'glass', emoji: '💡' },
  { id: '9', name: 'Plastic Bag', type: 'plastic', emoji: '🛍️' },
  { id: '10', name: 'Laptop Battery', type: 'ewaste', emoji: '🔋' },
];

const BINS: { type: BinType; color: string; label: string }[] = [
  { type: 'plastic', color: 'bg-blue-500', label: 'Plastic' },
  { type: 'paper', color: 'bg-yellow-500', label: 'Paper' },
  { type: 'glass', color: 'bg-green-500', label: 'Glass' },
  { type: 'organic', color: 'bg-amber-700', label: 'Organic' },
  { type: 'ewaste', color: 'bg-red-500', label: 'E-Waste' },
];

export default function WasteSortingGame() {
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentWaste, setCurrentWaste] = useState<WasteItem | null>(null);
  
  const { addXP } = useEarthStore();

  const startGame = () => {
    setScore(0);
    setCombo(1);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false);
    nextWaste();
  };

  const nextWaste = () => {
    const rand = ALL_WASTE[Math.floor(Math.random() * ALL_WASTE.length)];
    setCurrentWaste({ ...rand, id: Math.random().toString() });
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isPlaying && timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true);
      // Give rewards dynamically using a fake mission
      addXP(score, Math.floor(score / 10));
      useEarthStore.getState().addNotification(`Earned ${score} XP from Waste Sorting!`);
    }
  }, [isPlaying, timeLeft, score, addXP]);

  const handleDrop = (e: React.DragEvent, binType: BinType) => {
    e.preventDefault();
    if (!currentWaste) return;

    if (currentWaste.type === binType) {
      setScore(s => s + (10 * combo));
      setCombo(c => Math.min(c + 1, 5));
    } else {
      setCombo(1);
      setScore(s => Math.max(0, s - 5));
    }
    nextWaste();
  };

  return (
    <div className="w-full h-full p-8 max-w-5xl mx-auto flex flex-col relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/games">
            <button className="p-3 rounded-full bg-[var(--card)] border border-[var(--muted-foreground)]/20 hover:bg-[var(--muted)] transition text-[var(--foreground)]">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold font-heading flex items-center gap-3">
            <Trash2 className="w-8 h-8 text-emerald-400" /> Waste Sorting
          </h1>
        </div>
        <div className="flex gap-6 font-bold text-xl bg-[var(--card)] px-6 py-3 rounded-full border border-[var(--muted-foreground)]/20 shadow-sm text-[var(--foreground)]">
          <div className="flex items-center gap-2"><Trophy className="text-yellow-400" /> {score}</div>
          <div className="flex items-center gap-2 text-emerald-400">x{combo}</div>
          <div className="flex items-center gap-2"><Clock className={timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-sky-400"} /> {timeLeft}s</div>
        </div>
      </div>

      {!isPlaying && !gameOver && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-[var(--card)] p-12 rounded-3xl text-center max-w-lg border border-[var(--muted-foreground)]/20 shadow-xl text-[var(--foreground)]">
            <Trash2 className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Sort?</h2>
            <p className="text-[var(--muted-foreground)] mb-8">Drag the waste items into the correct recycling bins before time runs out! Build your combo for massive points.</p>
            <button onClick={startGame} className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:scale-105 transition-transform shadow-lg">
              Start Game
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <GameResultModal
          score={score}
          xpEarned={score}
          coinsEarned={Math.floor(score / 10)}
          onPlayAgain={startGame}
        />
      )}

      {isPlaying && (
        <div className="flex-1 flex flex-col items-center justify-between py-10">
          
          {/* Active Item to Drag */}
          <div className="h-48 flex items-center justify-center w-full">
            <AnimatePresence mode="popLayout">
              {currentWaste && (
                <motion.div
                  key={currentWaste.id}
                  initial={{ scale: 0, y: -50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="glass-card p-6 rounded-3xl cursor-grab active:cursor-grabbing flex flex-col items-center shadow-2xl border border-white/20"
                  draggable
                  onDragStart={(e: any) => e.dataTransfer.setData('text/plain', currentWaste.type)}
                >
                  <span className="text-6xl mb-2">{currentWaste.emoji}</span>
                  <span className="font-bold">{currentWaste.name}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bins */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-4xl">
            {BINS.map(bin => (
              <div
                key={bin.type}
                className={`${bin.color} rounded-2xl h-32 flex flex-col items-center justify-end p-4 text-slate-900 font-bold shadow-lg border-t-8 border-white/20 transition-transform hover:scale-105`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, bin.type)}
              >
                <Trash2 className="w-8 h-8 mb-2 opacity-50" />
                {bin.label}
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
