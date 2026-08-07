"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Sailboat, Trophy, Heart } from "lucide-react";
import Link from "next/link";
import { useEarthStore } from "@/store/useEarthStore";

export default function RiverRescueGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const animationRef = useRef<number>(0);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setIsPlaying(true);
    setGameOver(false);
  };

  useEffect(() => {
    if (!isPlaying || gameOver || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Game state
    let boat = { x: canvas.width / 2, y: canvas.height - 80, width: 40, height: 60, speed: 6, dx: 0 };
    let obstacles: { x: number, y: number, width: number, height: number, type: 'plastic' | 'rock' | 'fish', speed: number }[] = [];
    let frame = 0;
    let currentScore = 0;
    let currentLives = 3;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") boat.dx = -boat.speed;
      if (e.key === "ArrowRight" || e.key === "d") boat.dx = boat.speed;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === "a" || e.key === "d") boat.dx = 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Mouse/Touch controls
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      boat.x = e.clientX - rect.left - boat.width / 2;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw River
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Water effect (scrolling lines)
      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 10; i++) {
        const y = ((frame * 2 + i * 50) % canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update Boat
      boat.x += boat.dx;
      if (boat.x < 0) boat.x = 0;
      if (boat.x + boat.width > canvas.width) boat.x = canvas.width - boat.width;

      // Draw Boat
      ctx.fillStyle = "#eab308";
      ctx.beginPath();
      ctx.moveTo(boat.x + boat.width/2, boat.y);
      ctx.lineTo(boat.x + boat.width, boat.y + boat.height);
      ctx.lineTo(boat.x, boat.y + boat.height);
      ctx.fill();

      // Spawn Obstacles
      if (frame % 30 === 0) {
        const type = Math.random() > 0.6 ? 'plastic' : (Math.random() > 0.5 ? 'rock' : 'fish');
        obstacles.push({
          x: Math.random() * (canvas.width - 30),
          y: -50,
          width: 30,
          height: 30,
          type,
          speed: 3 + Math.random() * 3 + (currentScore / 100)
        });
      }

      // Update and Draw Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += obs.speed;

        // Draw
        if (obs.type === 'plastic') {
          ctx.fillStyle = "#d1d5db"; // grey plastic
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        } else if (obs.type === 'rock') {
          ctx.fillStyle = "#4b5563"; // dark rock
          ctx.beginPath();
          ctx.arc(obs.x + 15, obs.y + 15, 15, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.type === 'fish') {
          ctx.fillStyle = "#fbbf24"; // yellow fish
          ctx.beginPath();
          ctx.ellipse(obs.x + 15, obs.y + 15, 15, 8, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Collision Check
        if (
          boat.x < obs.x + obs.width &&
          boat.x + boat.width > obs.x &&
          boat.y < obs.y + obs.height &&
          boat.y + boat.height > obs.y
        ) {
          if (obs.type === 'plastic') {
            currentScore += 10;
            setScore(currentScore);
          } else {
            currentLives -= 1;
            setLives(currentLives);
            if (currentLives <= 0) {
              setGameOver(true);
              setIsPlaying(false);
              
              // Apply rewards
              useEarthStore.setState(s => ({
                xp: s.xp + currentScore,
                greenCoins: s.greenCoins + Math.floor(currentScore / 10),
                rewardTrigger: Date.now()
              }));
              useEarthStore.getState().addNotification(`Earned ${currentScore} XP!`);
            }
          }
          obstacles.splice(i, 1);
        } else if (obs.y > canvas.height) {
          obstacles.splice(i, 1);
        }
      }

      frame++;
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

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
            <Sailboat className="w-8 h-8 text-blue-400" /> River Rescue
          </h1>
        </div>
        
        {isPlaying && (
          <div className="flex gap-6 font-bold text-xl glass-card px-6 py-3 rounded-full">
            <div className="flex items-center gap-2"><Trophy className="text-yellow-400" /> {score}</div>
            <div className="flex items-center gap-2 text-red-500">
              {Array.from({ length: lives }).map((_, i) => <Heart key={i} className="fill-current w-5 h-5" />)}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={600} 
          className={`rounded-3xl border border-white/20 shadow-2xl bg-sky-900 ${isPlaying ? 'cursor-none' : ''}`}
        />

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-3xl">
            <div className="glass-card p-12 rounded-3xl text-center max-w-sm">
              <Sailboat className="w-20 h-20 text-blue-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Clean the River</h2>
              <p className="opacity-70 mb-2">Use mouse or arrows to steer your boat.</p>
              <ul className="text-sm opacity-80 mb-8 text-left space-y-2">
                <li>🟩 <b>Grey Box:</b> Collect Plastic (+10)</li>
                <li>🪨 <b>Dark Circle:</b> Avoid Rocks (-1 Life)</li>
                <li>🐟 <b>Yellow Oval:</b> Avoid Fish (-1 Life)</li>
              </ul>
              <button onClick={startGame} className="w-full py-4 rounded-xl bg-blue-500 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
                Start Game
              </button>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-3xl">
            <div className="glass-card p-12 rounded-3xl text-center max-w-sm border border-yellow-400/30">
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
              <div className="text-xl mb-8">You scored <span className="text-yellow-400 font-bold">{score}</span></div>
              <p className="text-emerald-400 font-bold mb-8">+ {score} XP & {Math.floor(score/10)} Coins earned!</p>
              <button onClick={startGame} className="w-full py-4 rounded-xl bg-blue-500 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
