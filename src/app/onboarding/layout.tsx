"use client";

import { CanvasContainer } from "@/components/canvas/CanvasContainer";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIntro = pathname === "/onboarding/intro";
  const isAnalysis = pathname === "/onboarding/analysis";

  // For the questionnaire, we show the Earth on the right
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-black overflow-hidden flex flex-col selection:bg-emerald-500/30">
        
        {/* Aurora overlay */}
        <div className="fixed inset-0 z-0 aurora-bg opacity-30 mix-blend-screen pointer-events-none" />

        {/* Progress Bar (hidden on intro and analysis) */}
        {!isIntro && !isAnalysis && (
          <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5 z-50">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 relative"
              initial={{ width: "0%" }}
              animate={{ width: "12.5%" }} // Example, will be dynamic in the real questionnaire component
              transition={{ duration: 0.5 }}
            >
              <div className="absolute right-0 -top-1.5 w-4 h-4 text-emerald-400">
                <Leaf className="w-full h-full fill-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
            </motion.div>
          </div>
        )}

        <div className="flex-1 flex w-full max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Left Side: Content */}
          <div className={`flex flex-col justify-center ${isIntro || isAnalysis ? "w-full items-center text-center" : "w-full lg:w-1/2 py-12"} transition-all duration-700`}>
            {children}
          </div>

          {/* Right Side: Earth (Hidden on mobile or centered in background for intro) */}
          <div className={`${isIntro || isAnalysis ? "absolute inset-0 z-[-1] opacity-30 pointer-events-none" : "hidden lg:flex w-1/2"} items-center justify-center`}>
            <div className={isIntro || isAnalysis ? "w-full h-full" : "w-full h-[600px] relative"}>
              <CanvasContainer earthScale={isIntro || isAnalysis ? 1.5 : 1.2} />
            </div>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
