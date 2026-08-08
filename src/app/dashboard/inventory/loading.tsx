"use client";

import { PackageOpen } from "lucide-react";

export default function InventoryLoading() {
  return (
    <div className="w-full h-full relative overflow-y-auto custom-scrollbar bg-[var(--background)] p-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex flex-col min-h-full">
        
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-pulse">
          <div>
            <div className="flex items-center gap-3">
              <PackageOpen className="w-8 h-8 text-[var(--muted)]" />
              <div className="w-48 h-8 bg-[var(--muted)] rounded-xl" />
            </div>
            <div className="w-64 h-4 bg-[var(--muted)] rounded-lg mt-2" />
          </div>
          
          <div className="flex gap-4">
            <div className="w-24 h-16 bg-[var(--card)] border border-[var(--muted-foreground)]/20 rounded-2xl" />
            <div className="w-24 h-16 bg-[var(--card)] border border-[var(--muted-foreground)]/20 rounded-2xl" />
            <div className="w-24 h-16 bg-[var(--card)] border border-[var(--muted-foreground)]/20 rounded-2xl" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-2 mb-6 animate-pulse">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-24 h-10 bg-[var(--muted)] rounded-full" />
          ))}
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20 animate-pulse">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-[var(--card)] border border-[var(--muted-foreground)]/20 rounded-3xl overflow-hidden flex flex-col h-72">
              <div className="w-full h-32 bg-[var(--muted)]" />
              <div className="p-5 flex-1 flex flex-col">
                <div className="w-3/4 h-6 bg-[var(--muted)] rounded-lg mb-3" />
                <div className="flex gap-2 mb-4">
                  <div className="w-16 h-5 bg-[var(--muted)] rounded-full" />
                  <div className="w-20 h-5 bg-[var(--muted)] rounded-full" />
                </div>
                <div className="w-full h-3 bg-[var(--muted)] rounded-lg mb-2 mt-auto" />
                <div className="w-5/6 h-3 bg-[var(--muted)] rounded-lg mb-4" />
                <div className="w-full h-10 bg-[var(--muted)] rounded-xl mt-auto" />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
