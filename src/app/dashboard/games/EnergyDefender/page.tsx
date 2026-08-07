"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Zap, Sun, Wind, Droplets, Factory, Trophy } from "lucide-react";
import Link from "next/link";
import { useEarthStore } from "@/store/useEarthStore";

export default function EnergyDefenderGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const [demand, setDemand] = useState(500);
  const [solar, setSolar] = useState(0);
  const [wind, setWind] = useState(0);
  const [hydro, setHydro] = useState(0);
  const [coal, setCoal] = useState(0);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setSolar(0);
    setWind(0);
    setHydro(0);
    setCoal(0);
    setDemand(500);
    setIsPlaying(true);
    setGameOver(false);
  };

  // Demand fluctuation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setDemand(d => Math.max(200, Math.min(1000, d + (Math.floor(Math.random() * 200) - 100))));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Scoring and Timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          useEarthStore.setState(s => ({
            xp: s.xp + score,
            greenCoins: s.greenCoins + Math.floor(score/10),
            rewardTrigger: Date.now()
          }));
          return 0;
        }
        return t - 1;
      });

      // Calculate score per second
      setScore(s => {
        const supply = solar + wind + hydro + coal;
        const diff = Math.abs(demand - supply);
        let points = 10;
        
        // Penalize for mismatch
        if (diff > 50) points -= 5;
        if (diff > 150) points -= 10; // 0 points if way off
        
        // Massive penalty for coal
        if (coal > 0) points -= Math.floor(coal / 10);
        
        return Math.max(0, s + points);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, demand, solar, wind, hydro, coal, score]);

  const supply = solar + wind + hydro + coal;
  const statusColor = Math.abs(demand - supply) < 50 ? "text-emerald-400" : (supply < demand ? "text-red-400" : "text-yellow-400");
  const statusMsg = Math.abs(demand - supply) < 50 ? "Grid Stable" : (supply < demand ? "Blackout Risk!" : "Overloading!");

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
            <Zap className="w-8 h-8 text-amber-400" /> Energy Defender
          </h1>
        </div>
        
        <div className="flex gap-6 font-bold text-xl glass-card px-6 py-3 rounded-full">
          <div className="flex items-center gap-2"><Trophy className="text-yellow-400" /> {score}</div>
          <div className="flex items-center gap-2 text-sky-400">0:{timeLeft.toString().padStart(2, '0')}</div>
        </div>
      </div>

      {!isPlaying && !gameOver && (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg">
            <Zap className="w-20 h-20 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Balance the Grid</h2>
            <p className="opacity-70 mb-8">Adjust power sources to match the city's fluctuating demand. Use renewables to score high. Using Coal will destroy your score!</p>
            <button onClick={startGame} className="w-full py-4 rounded-xl bg-amber-500 text-black font-bold text-lg hover:scale-105 transition-transform">
              Start Game
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg border border-yellow-400/30">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-2">Time's Up!</h2>
            <div className="text-2xl mb-8">Final Score: <span className="text-yellow-400 font-bold">{score}</span></div>
            <button onClick={startGame} className="w-full py-4 rounded-xl bg-amber-500 text-black font-bold text-lg hover:scale-105 transition-transform">
              Play Again
            </button>
          </div>
        </div>
      )}

      {isPlaying && (
        <div className="flex-1 flex flex-col items-center">
          
          {/* Main Display */}
          <div className="glass-card w-full p-8 rounded-3xl mb-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-white/10">
              <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${(supply/1000)*100}%` }} />
            </div>
            
            <h3 className="text-xl font-bold mb-6 opacity-70 uppercase tracking-widest">City Power Grid</h3>
            <div className="flex justify-center items-end gap-16 mb-4">
              <div>
                <div className="text-sm opacity-60 mb-2">Demand</div>
                <div className="text-5xl font-bold font-mono">{demand} <span className="text-lg opacity-50">MW</span></div>
              </div>
              <div className="text-4xl opacity-30 pb-2">vs</div>
              <div>
                <div className="text-sm opacity-60 mb-2">Supply</div>
                <div className={`text-5xl font-bold font-mono ${statusColor}`}>{supply} <span className="text-lg opacity-50">MW</span></div>
              </div>
            </div>
            <div className={`font-bold uppercase tracking-widest ${statusColor} animate-pulse`}>
              {statusMsg}
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <ControlSlider icon={Sun} color="text-amber-400" bg="bg-amber-500/20" label="Solar Array" value={solar} setter={setSolar} max={400} />
            <ControlSlider icon={Wind} color="text-sky-400" bg="bg-sky-500/20" label="Wind Farm" value={wind} setter={setWind} max={400} />
            <ControlSlider icon={Droplets} color="text-blue-400" bg="bg-blue-500/20" label="Hydro Dam" value={hydro} setter={setHydro} max={400} />
            <ControlSlider icon={Factory} color="text-red-500" bg="bg-red-500/20" label="Coal Plant (Penalty)" value={coal} setter={setCoal} max={600} />
          </div>
          
        </div>
      )}
    </div>
  );
}

function ControlSlider({ icon: Icon, color, bg, label, value, setter, max }: any) {
  return (
    <div className={`glass-card p-6 rounded-2xl border border-white/5 ${bg}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`w-6 h-6 ${color}`} />
          <span className="font-bold">{label}</span>
        </div>
        <span className="font-mono font-bold text-xl">{value} MW</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max={max} 
        value={value}
        onChange={(e) => setter(parseInt(e.target.value))}
        className="w-full h-3 bg-white/40 rounded-full appearance-none cursor-pointer accent-white"
      />
    </div>
  );
}
