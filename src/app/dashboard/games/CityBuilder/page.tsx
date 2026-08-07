"use client";

import { useState } from "react";
import { ArrowLeft, Building, Sun, Wind, TreePine, Car, Trophy, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEarthStore } from "@/store/useEarthStore";

type TileType = 'empty' | 'road' | 'solar' | 'wind' | 'park';

interface CityStats {
  population: number;
  pollution: number;
  power: number;
  funds: number;
}

export default function CityBuilderGame() {
  const [grid, setGrid] = useState<TileType[]>(Array(36).fill('empty'));
  const [stats, setStats] = useState<CityStats>({ population: 0, pollution: 50, power: 50, funds: 1000 });
  const [selectedTool, setSelectedTool] = useState<TileType>('empty');
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const TOOLS = [
    { type: 'road', name: 'Road', cost: 10, icon: Car, color: 'bg-zinc-600', effect: { pop: 10, pol: 5, pow: -2 } },
    { type: 'park', name: 'Park', cost: 50, icon: TreePine, color: 'bg-emerald-500', effect: { pop: 5, pol: -10, pow: -1 } },
    { type: 'solar', name: 'Solar', cost: 100, icon: Sun, color: 'bg-amber-400', effect: { pop: 0, pol: -2, pow: 20 } },
    { type: 'wind', name: 'Wind', cost: 150, icon: Wind, color: 'bg-sky-400', effect: { pop: 0, pol: -5, pow: 30 } },
    { type: 'empty', name: 'Bulldoze', cost: 5, icon: AlertTriangle, color: 'bg-red-500', effect: { pop: 0, pol: 0, pow: 0 } },
  ];

  const startGame = () => {
    setGrid(Array(36).fill('empty'));
    setStats({ population: 0, pollution: 50, power: 50, funds: 1000 });
    setIsPlaying(true);
    setGameOver(false);
  };

  const finishGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    // Score based on population and low pollution
    const score = Math.max(0, stats.population * 10 - stats.pollution * 5);
    useEarthStore.setState(s => ({
      xp: s.xp + score,
      greenCoins: s.greenCoins + Math.floor(score/5),
      rewardTrigger: Date.now()
    }));
  };

  const handleTileClick = (index: number) => {
    if (!isPlaying) return;
    
    const tool = TOOLS.find(t => t.type === selectedTool);
    if (!tool) return;
    
    const currentTile = grid[index];
    if (selectedTool !== 'empty' && currentTile !== 'empty') return; // Must bulldoze first
    if (stats.funds < tool.cost) return; // Not enough money

    // Apply Cost & Effects
    setStats(s => ({
      ...s,
      funds: s.funds - tool.cost,
      population: s.population + tool.effect.pop,
      pollution: Math.max(0, Math.min(100, s.pollution + tool.effect.pol)),
      power: Math.max(0, s.power + tool.effect.pow)
    }));

    // If bulldozing, we should technically remove the old stats, but to keep it simple, bulldoze just costs money and clears space
    const newGrid = [...grid];
    newGrid[index] = selectedTool;
    setGrid(newGrid);
  };

  return (
    <div className="w-full h-full p-8 max-w-6xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/games">
            <button className="p-3 rounded-full glass-card hover:bg-white/10 transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold font-heading flex items-center gap-3">
            <Building className="w-8 h-8 text-sky-400" /> Green City Builder
          </h1>
        </div>
        
        {isPlaying && (
          <div className="flex gap-4 font-bold text-sm">
            <div className="glass-card px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="opacity-50">Funds</span>
              <span className="text-green-400">${stats.funds}</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="opacity-50">Population</span>
              <span className="text-blue-400">{stats.population}</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="opacity-50">Pollution</span>
              <span className={stats.pollution > 70 ? 'text-red-400' : 'text-emerald-400'}>{stats.pollution}%</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-xl flex flex-col items-center">
              <span className="opacity-50">Power</span>
              <span className={stats.power < 20 ? 'text-red-400' : 'text-yellow-400'}>{stats.power} MW</span>
            </div>
          </div>
        )}
      </div>

      {!isPlaying && !gameOver && (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg">
            <Building className="w-20 h-20 text-sky-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Build a Green City</h2>
            <p className="opacity-70 mb-8">Place roads, parks, and renewable energy to grow your population while keeping pollution low! When you run out of funds or finish building, click 'Finish City'.</p>
            <button onClick={startGame} className="w-full py-4 rounded-xl bg-sky-500 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
              Start Building
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg border border-yellow-400/30">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-2">City Complete!</h2>
            <div className="text-2xl mb-8">Score: <span className="text-yellow-400 font-bold">{Math.max(0, stats.population * 10 - stats.pollution * 5)}</span></div>
            <p className="text-emerald-400 font-bold mb-8">+ {Math.max(0, stats.population * 10 - stats.pollution * 5)} XP earned!</p>
            <button onClick={startGame} className="w-full py-4 rounded-xl bg-sky-500 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
              Build Another City
            </button>
          </div>
        </div>
      )}

      {isPlaying && (
        <div className="flex-1 flex gap-8">
          
          {/* Toolbar */}
          <div className="w-64 glass-card rounded-3xl p-6 flex flex-col gap-4">
            <h3 className="font-bold text-lg mb-2">Tools</h3>
            {TOOLS.map(tool => (
              <button
                key={tool.type}
                onClick={() => setSelectedTool(tool.type as TileType)}
                className={`p-4 rounded-xl flex items-center gap-3 transition-all ${selectedTool === tool.type ? 'bg-white/20 ring-2 ring-white' : 'bg-black/20 hover:bg-white/10'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tool.color}`}>
                  <tool.icon className="w-5 h-5 text-slate-900" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold">{tool.name}</div>
                  <div className="text-xs text-green-400">${tool.cost}</div>
                </div>
              </button>
            ))}

            <div className="mt-auto">
              <button onClick={finishGame} className="w-full py-4 rounded-xl bg-emerald-500 text-slate-900 font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Finish City
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 flex items-center justify-center">
            <div className="grid grid-cols-6 gap-2 bg-[#2a3026] p-4 rounded-3xl border-8 border-[#1f241c] shadow-2xl">
              {grid.map((tile, i) => (
                <div 
                  key={i} 
                  onClick={() => handleTileClick(i)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:ring-2 ring-white/50
                    ${tile === 'empty' ? 'bg-[#3b4436]' : ''}
                    ${tile === 'road' ? 'bg-zinc-700' : ''}
                    ${tile === 'park' ? 'bg-emerald-600' : ''}
                    ${tile === 'solar' ? 'bg-[#0f172a]' : ''}
                    ${tile === 'wind' ? 'bg-sky-900' : ''}
                  `}
                >
                  {tile === 'road' && <div className="w-full h-2 bg-yellow-500/50 border-t border-b border-dashed border-yellow-400"></div>}
                  {tile === 'park' && <TreePine className="w-12 h-12 text-emerald-300" />}
                  {tile === 'solar' && <div className="grid grid-cols-2 gap-1"><div className="w-6 h-6 bg-blue-500/50 border border-blue-400"></div><div className="w-6 h-6 bg-blue-500/50 border border-blue-400"></div><div className="w-6 h-6 bg-blue-500/50 border border-blue-400"></div><div className="w-6 h-6 bg-blue-500/50 border border-blue-400"></div></div>}
                  {tile === 'wind' && <Wind className="w-12 h-12 text-slate-900 animate-spin-slow" />}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
