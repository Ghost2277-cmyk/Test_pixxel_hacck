"use client";

import { CanvasContainer } from "@/components/canvas/CanvasContainer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[var(--background)] overflow-hidden flex items-center justify-center">
      {/* Background canvas for slow rotating earth in background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <CanvasContainer health={0.6} earthScale={1.5} />
      </div>
      
      {/* Aurora overlay */}
      <div className="fixed inset-0 z-0 aurora-bg opacity-30 mix-blend-screen pointer-events-none" />
      
      {/* Floating particles effect (CSS handled) */}
      <div className="fixed inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md p-6">
        {children}
      </div>
    </main>
  );
}
