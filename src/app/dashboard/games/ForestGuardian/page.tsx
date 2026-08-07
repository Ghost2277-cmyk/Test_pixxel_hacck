"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, TreePine, Flame, Droplets, Trophy } from "lucide-react";
import Link from "next/link";
import { useEarthStore } from "@/store/useEarthStore";

type TileState = 'empty' | 'seedling' | 'tree' | 'burning';

export default function ForestGuardianGame() {
  const [grid, setGrid] = useState<TileState[]>(Array(25).fill('empty'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [water, setWater] = useState(10); // limited water
  
  const startGame = () => {
    setGrid(Array(25).fill('empty'));
    setScore(0);
    setWater(20);
    setIsPlaying(true);
    setGameOver(false);
  };

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setGrid(currentGrid => {
        const newGrid = [...currentGrid];
        
        // 1. Sometimes a tree catches fire
        if (Math.random() < 0.3) {
          const treeIndices = newGrid.map((t, i) => t === 'tree' ? i : -1).filter(i => i !== -1);
          if (treeIndices.length > 0) {
            const index = treeIndices[Math.floor(Math.random() * treeIndices.length)];
            newGrid[index] = 'burning';
          }
        }

        // 2. Burning trees destroy themselves if left too long (simplified: just random chance to die)
        newGrid.forEach((tile, i) => {
          if (tile === 'burning' && Math.random() < 0.2) {
            newGrid[i] = 'empty';
            setScore(s => Math.max(0, s - 50));
          }
        });

        // 3. Score points passively for living trees
        const treeCount = newGrid.filter(t => t === 'tree').length;
        if (treeCount > 0) {
          setScore(s => s + treeCount);
        }

        // 4. Regenerate water slowly
        setWater(w => Math.min(20, w + 1));

        return newGrid;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // End game if too many fires or time limit (let's say score reaches 500 you win, or all trees burn)
  useEffect(() => {
    if (!isPlaying) return;
    if (score >= 1000) {
      setIsPlaying(false);
      setGameOver(true);
      useEarthStore.setState(s => ({
        xp: s.xp + 1000,
        greenCoins: s.greenCoins + 100,
        rewardTrigger: Date.now()
      }));
      useEarthStore.getState().addNotification(`Won Forest Guardian! +1000 XP`);
    }
  }, [score, isPlaying]);

  const handleTileClick = (index: number) => {
    if (!isPlaying) return;
    
    const tile = grid[index];
    
    if (tile === 'empty' && water >= 2) {
      // Plant seed
      setWater(w => w - 2);
      const newGrid = [...grid];
      newGrid[index] = 'seedling';
      setGrid(newGrid);
      setScore(s => s + 10);
    } else if (tile === 'seedling' && water >= 1) {
      // Water seedling to tree
      setWater(w => w - 1);
      const newGrid = [...grid];
      newGrid[index] = 'tree';
      setGrid(newGrid);
      setScore(s => s + 20);
    } else if (tile === 'burning' && water >= 3) {
      // Extinguish fire
      setWater(w => w - 3);
      const newGrid = [...grid];
      newGrid[index] = 'tree'; // saved it
      setGrid(newGrid);
      setScore(s => s + 50);
    }
  };

  return (
    <div className="w-full h-full p-8 max-w-4xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/games">
            <button className="p-3 rounded-full glass-card hover:bg-white/10 transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold font-heading flex items-center gap-3">
            <TreePine className="w-8 h-8 text-green-500" /> Forest Guardian
          </h1>
        </div>
        
        {isPlaying && (
          <div className="flex gap-6 font-bold text-xl glass-card px-6 py-3 rounded-full">
            <div className="flex items-center gap-2"><Trophy className="text-yellow-400" /> {score}/1000</div>
            <div className="flex items-center gap-2 text-blue-400">
              <Droplets className="w-5 h-5" /> {water}/20
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="glass-card p-12 rounded-3xl text-center max-w-md bg-black/80">
              <TreePine className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Protect the Forest</h2>
              <ul className="text-sm opacity-80 mb-8 text-left space-y-3">
                <li>🌱 <b>Empty (Cost 2):</b> Click to plant a seedling.</li>
                <li>🪴 <b>Seedling (Cost 1):</b> Click to grow into a tree.</li>
                <li>🔥 <b>Fire (Cost 3):</b> Click to extinguish!</li>
                <li>Trees passively generate points. Reach 1000 to win!</li>
              </ul>
              <button onClick={startGame} className="w-full py-4 rounded-xl bg-green-600 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
                Start Game
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="glass-card p-12 rounded-3xl text-center max-w-md border border-yellow-400/30 bg-black/80">
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-2">Victory!</h2>
              <p className="text-green-400 font-bold mb-8">You saved the forest and earned massive rewards!</p>
              <button onClick={startGame} className="w-full py-4 rounded-xl bg-green-600 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
                Play Again
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-5 gap-3 bg-[#4a3f35] p-4 rounded-2xl shadow-2xl border-4 border-[#2c241b]">
          {grid.map((tile, i) => (
            <div 
              key={i} 
              onClick={() => handleTileClick(i)}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105
                ${tile === 'empty' ? 'bg-[#5c4f42] hover:bg-[#6c5f52]' : ''}
                ${tile === 'seedling' ? 'bg-[#7a6b57]' : ''}
                ${tile === 'tree' ? 'bg-green-600 shadow-[0_0_15px_rgba(22,163,74,0.5)]' : ''}
                ${tile === 'burning' ? 'bg-red-900 animate-pulse' : ''}
              `}
            >
              {tile === 'seedling' && <span className="text-3xl">🌱</span>}
              {tile === 'tree' && <TreePine className="w-12 h-12 text-slate-900" />}
              {tile === 'burning' && <Flame className="w-12 h-12 text-orange-400" />}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
