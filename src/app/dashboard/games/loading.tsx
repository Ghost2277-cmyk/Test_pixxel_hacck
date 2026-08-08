"use client";

import { Gamepad2 } from "lucide-react";

export default function GamesLoading() {
  return (
    <div className="w-full h-full p-8 max-w-7xl mx-auto flex flex-col pointer-events-none">
      
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8 animate-pulse">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--muted)]" />
            <div className="w-48 h-8 bg-[var(--muted)] rounded-xl" />
          </div>
          <div className="w-64 h-4 bg-[var(--muted)] rounded-lg ml-1" />
        </div>
        <div className="flex gap-4">
          <div className="w-24 h-10 bg-[var(--muted)] rounded-full" />
          <div className="w-24 h-10 bg-[var(--muted)] rounded-full" />
        </div>
      </div>

      {/* Featured Game Skeleton */}
      <div className="w-full h-64 rounded-3xl bg-[var(--card)] border border-[var(--muted-foreground)]/20 shadow-xl mb-12 animate-pulse overflow-hidden flex">
        <div className="w-2/3 h-full bg-[var(--muted)]" />
        <div className="w-1/3 h-full p-8 flex flex-col justify-center gap-4">
          <div className="w-16 h-6 bg-[var(--card)] rounded-full" />
          <div className="w-48 h-8 bg-[var(--card)] rounded-xl" />
          <div className="w-full h-16 bg-[var(--card)] rounded-xl" />
          <div className="w-32 h-10 bg-[var(--card)] rounded-xl mt-4" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="w-48 h-6 bg-[var(--muted)] rounded-xl mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-[var(--card)] rounded-3xl p-5 border border-[var(--muted-foreground)]/20 shadow-xl h-64 flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-[var(--muted)] mb-4" />
            <div className="w-32 h-6 bg-[var(--muted)] rounded-xl mb-2" />
            <div className="w-full h-12 bg-[var(--muted)] rounded-lg mb-auto" />
            <div className="flex justify-between mt-4">
              <div className="w-16 h-4 bg-[var(--muted)] rounded" />
              <div className="w-16 h-4 bg-[var(--muted)] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
