"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { CanvasContainer } from "@/components/canvas/CanvasContainer";
import { AmbientEnvironment } from "@/components/dashboard/AmbientEnvironment";
import { GaiaCompanion } from "@/components/dashboard/Gaia";
import { GlobalAudio } from "@/components/dashboard/GlobalAudio";
import { RandomEventManager } from "@/components/dashboard/RandomEventManager";
import { CursorEffects } from "@/components/dashboard/CursorEffects";
import { RewardEffects } from "@/components/dashboard/RewardEffects";
import { AnimatePresence, motion } from "framer-motion";
import { useEarthStore } from "@/store/useEarthStore";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notifications = useEarthStore(state => state.notifications);
  const pathname = usePathname();
  const isHome = pathname === "/dashboard";

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden selection:bg-emerald-500/30 transition-colors duration-1000 ease-in-out bg-[#e0f2fe] text-slate-800">
      {/* Immersive Earth Background */}
      <div className="fixed inset-0 z-0">
        <CanvasContainer earthScale={1.8} />
      </div>

      {/* Aurora & Forest overlay */}
      {/* Background removed as requested */}

      {/* Ambient Particles removed */}

      {/* Game Ecosystem Systems */}
      <GaiaCompanion />
      <GlobalAudio />
      <RandomEventManager />
      <CursorEffects />
      <RewardEffects />

      {/* Toast Notifications Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((note, idx) => (
            <motion.div
              key={idx + note}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-white/60 backdrop-blur-xl border border-emerald-500/30 px-6 py-3 rounded-2xl text-emerald-400 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              {note}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar (Left) - Always visible now per Phase 8 */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        
        {/* Top Navigation */}
        <TopNav />
        
        <div className="flex-1 flex overflow-hidden">
          
          {/* Center Workspace */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar pointer-events-none *:pointer-events-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
