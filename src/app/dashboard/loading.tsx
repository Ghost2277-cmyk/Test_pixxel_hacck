"use client";

import { motion } from "framer-motion";
import { Cloud, Droplets, TreePine, Leaf, Zap, Trophy, Target, Gamepad2, Heart, Music, Lightbulb, MessageCircle } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="w-full h-full relative overflow-y-auto custom-scrollbar bg-[var(--background)]">
      {/* Hero Section (Earth Viewport) - 90vh */}
      <div className="w-full h-[90vh] relative min-h-[700px] flex flex-col justify-between p-6 pointer-events-none">
        
        {/* Left Side: Planet Health Skeleton */}
        <div className="absolute left-6 top-10 flex flex-col gap-3 pointer-events-none w-48">
          <div className="bg-[var(--card)]/90 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 border border-[var(--muted-foreground)]/20 mb-4 shadow-xl animate-pulse">
            <div className="w-10 h-10 rounded-full bg-[var(--muted)]" />
            <div className="flex flex-col gap-2">
              <div className="w-20 h-2 bg-[var(--muted)] rounded" />
              <div className="w-16 h-3 bg-[var(--muted)] rounded" />
            </div>
          </div>

          <div className="bg-[var(--card)]/95 backdrop-blur-xl rounded-3xl p-5 border border-[var(--muted-foreground)]/20 shadow-xl animate-pulse">
            <div className="w-24 h-4 mx-auto bg-[var(--muted)] rounded mb-4" />
            
            <div className="w-24 h-24 mx-auto rounded-full bg-[var(--muted)] mb-2" />
            <div className="w-20 h-2 mx-auto bg-[var(--muted)] rounded mb-6" />

            <div className="flex flex-col gap-4">
              {[1,2,3,4,5].map((stat) => (
                <div key={stat} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--muted)]" />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="w-16 h-2 bg-[var(--muted)] rounded" />
                    <div className="w-8 h-3 bg-[var(--muted)] rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Gaia & Quests Skeleton */}
        <div className="absolute right-6 top-10 w-80 flex flex-col gap-4 pointer-events-none">
          
          <div className="bg-[var(--card)]/95 backdrop-blur-xl rounded-3xl p-4 border border-[var(--muted-foreground)]/20 shadow-xl animate-pulse">
            <div className="w-16 h-4 bg-[var(--muted)] rounded mb-2" />
            <div className="w-full h-10 bg-[var(--muted)] rounded mb-4" />
            <div className="flex gap-2 w-full justify-between mt-4">
              <div className="w-12 h-6 rounded-full bg-[var(--muted)]" />
              <div className="w-12 h-6 rounded-full bg-[var(--muted)]" />
              <div className="w-12 h-6 rounded-full bg-[var(--muted)]" />
              <div className="w-12 h-6 rounded-full bg-[var(--muted)]" />
            </div>
          </div>

          <div className="bg-[var(--card)]/95 backdrop-blur-xl rounded-3xl p-5 border border-[var(--muted-foreground)]/20 shadow-xl animate-pulse">
            <div className="flex justify-between items-center mb-4">
              <div className="w-24 h-4 bg-[var(--muted)] rounded" />
              <div className="w-8 h-3 bg-[var(--muted)] rounded" />
            </div>
            
            <div className="flex flex-col gap-3 mb-4">
              {[1,2,3].map((mission) => (
                <div key={mission} className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--muted)] shrink-0" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="w-full h-3 bg-[var(--muted)] rounded" />
                    <div className="w-16 h-2 bg-[var(--muted)] rounded" />
                  </div>
                  <div className="w-16 h-1.5 bg-[var(--muted)] rounded-full" />
                </div>
              ))}
            </div>
            <div className="w-full h-10 rounded-xl bg-[var(--muted)]" />
          </div>
        </div>

      </div>

      {/* Bottom Expanding Panels Area Skeleton */}
      <div className="w-full bg-gradient-to-b from-transparent via-white/40 to-white/80 backdrop-blur-sm p-6 pt-12 pb-24 relative z-20 pointer-events-none">
        <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          <div className="col-span-12 md:col-span-4 h-64 bg-[var(--card)] rounded-3xl shadow-xl animate-pulse" />
          <div className="col-span-12 md:col-span-4 h-64 bg-[var(--card)] rounded-3xl shadow-xl animate-pulse" />
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6">
            <div className="h-32 bg-[var(--card)] rounded-3xl shadow-xl animate-pulse" />
            <div className="flex-1 min-h-32 bg-[var(--card)] rounded-3xl shadow-xl animate-pulse" />
          </div>

        </div>
      </div>
    </div>
  );
}
