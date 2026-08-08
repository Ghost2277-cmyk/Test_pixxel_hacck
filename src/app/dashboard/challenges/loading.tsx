"use client";

import { Target } from "lucide-react";

export default function ChallengesLoading() {
  return (
    <div className="w-full h-full p-8 max-w-5xl mx-auto flex flex-col pointer-events-none">
      
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-10 animate-pulse">
        <div className="w-12 h-12 rounded-2xl bg-[var(--muted)]" />
        <div className="flex flex-col gap-2">
          <div className="w-48 h-8 bg-[var(--muted)] rounded-xl" />
          <div className="w-64 h-4 bg-[var(--muted)] rounded-lg" />
        </div>
      </div>

      {/* Daily Challenges Skeleton */}
      <div className="w-32 h-6 bg-[var(--muted)] rounded-xl mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[var(--card)] rounded-3xl p-6 border border-[var(--muted-foreground)]/20 shadow-xl flex flex-col">
            <div className="flex gap-4 items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--muted)] shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="w-3/4 h-6 bg-[var(--muted)] rounded-lg" />
                <div className="w-full h-4 bg-[var(--muted)] rounded" />
                <div className="w-5/6 h-4 bg-[var(--muted)] rounded" />
              </div>
            </div>
            <div className="w-full h-2 bg-[var(--muted)] rounded-full mt-auto mb-4" />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <div className="w-16 h-6 bg-[var(--muted)] rounded-full" />
                <div className="w-16 h-6 bg-[var(--muted)] rounded-full" />
              </div>
              <div className="w-24 h-8 bg-[var(--muted)] rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Community Goal Skeleton */}
      <div className="w-48 h-6 bg-[var(--muted)] rounded-xl mb-6 animate-pulse" />
      <div className="w-full bg-[var(--card)] rounded-3xl p-8 border border-[var(--muted-foreground)]/20 shadow-xl animate-pulse">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-32 h-32 rounded-full bg-[var(--muted)] shrink-0" />
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className="w-1/3 h-8 bg-[var(--muted)] rounded-xl" />
            <div className="w-2/3 h-4 bg-[var(--muted)] rounded" />
            <div className="w-full h-4 bg-[var(--muted)] rounded-full mt-4" />
            <div className="flex justify-between mt-2">
              <div className="w-24 h-4 bg-[var(--muted)] rounded" />
              <div className="w-24 h-4 bg-[var(--muted)] rounded" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
