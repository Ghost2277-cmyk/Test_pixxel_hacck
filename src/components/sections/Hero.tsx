"use client";

import { Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 z-10">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight text-emerald-950">
              Heal the Planet. <br />
              <span className="text-emerald-600 drop-shadow-sm">One Habit at a Time.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-700 max-w-lg leading-relaxed font-medium">
              EcoLife transforms sustainable living into an AI-powered journey where every eco-friendly action heals a living digital Earth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/signup" className="w-full sm:w-auto">
              <div className="magnetic-glow w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] inline-flex items-center justify-center cursor-pointer">
                Get Started
              </div>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <div className="w-full sm:w-auto px-8 py-4 rounded-full glass border border-black/10 hover:bg-black/5 text-slate-800 font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <Play className="w-4 h-4 fill-slate-800 text-slate-800" />
                </div>
                Go to Dashboard
              </div>
            </Link>
          </div>
          
          <div className="pt-8 flex items-center gap-4 opacity-80">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-700 font-semibold">Join 10,000+ Earth Healers</p>
          </div>
        </div>

        {/* Right Side is empty for the 3D Canvas Earth to shine through */}
        <div className="hidden lg:flex items-center justify-center pointer-events-none">
          {/* We position the canvas earth to be slightly offset to the right in the CanvasContainer based on scroll, or we just leave space here */}
        </div>
      </div>
    </section>
  );
}
