"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

const messages = [
  "Preparing your SYLVA experience...",
  "Growing your digital ecosystem...",
  "Loading your sustainability journey...",
];

// Pre-defined deterministic particle configuration to prevent SSR / Client hydration mismatch
const PARTICLE_CONFIGS = [
  { startX: "-35vw", endX: "-15vw", duration: 3.2, delay: 0.2 },
  { startX: "-10vw", endX: "10vw", duration: 2.8, delay: 0.8 },
  { startX: "15vw", endX: "35vw", duration: 3.5, delay: 0.1 },
  { startX: "-25vw", endX: "-5vw", duration: 2.5, delay: 1.2 },
  { startX: "5vw", endX: "25vw", duration: 3.8, delay: 0.5 },
  { startX: "30vw", endX: "45vw", duration: 2.9, delay: 1.0 },
];

export function AppPreloader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if we've already shown the preloader in this session
    const hasLoaded = sessionStorage.getItem("ecolife_preloaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 800);

    // Progress bar simulation (0 to 100 in 2.5 seconds)
    const totalDuration = 2500;
    const intervalDuration = 50;
    const steps = totalDuration / intervalDuration;
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(progressInterval);
      }
    }, intervalDuration);

    // End preloader after 2.5s minimum time
    const timeout = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("ecolife_preloaded", "true");
    }, 2500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] w-screen h-[100dvh] bg-[#020617] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#00b87a]/20 via-transparent to-transparent opacity-80" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-[#00b87a]/15 rounded-full blur-[100px] pointer-events-none"
            />

            {/* Floating Deterministic Particles (Leaves) */}
            {PARTICLE_CONFIGS.map((particle, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: "100vh", 
                  x: particle.startX,
                  rotate: 0,
                  opacity: 0
                }}
                animate={{ 
                  y: "-20vh", 
                  x: particle.endX,
                  rotate: 360,
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: particle.duration, 
                  repeat: Infinity, 
                  delay: particle.delay,
                  ease: "linear"
                }}
                className="absolute text-[#00c98a]/30"
              >
                <Leaf className="w-8 h-8" />
              </motion.div>
            ))}

            <div className="relative z-10 flex flex-col items-center">
              {/* CSS Earth Placeholder */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="relative w-32 h-32 mb-8"
              >
                {/* Earth Base */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00b87a] to-[#063b2d] shadow-[0_0_50px_rgba(0,184,122,0.4)] overflow-hidden">
                  {/* CSS Continents */}
                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-[200%] flex"
                  >
                    <div className="w-1/2 h-full relative">
                      <div className="absolute top-[20%] left-[20%] w-[40%] h-[30%] bg-[#00c98a] rounded-full blur-[2px] opacity-80" />
                      <div className="absolute bottom-[30%] right-[20%] w-[35%] h-[40%] bg-[#c8f1e2] rounded-full blur-[2px] opacity-80" />
                    </div>
                    <div className="w-1/2 h-full relative">
                      <div className="absolute top-[20%] left-[20%] w-[40%] h-[30%] bg-[#00c98a] rounded-full blur-[2px] opacity-80" />
                      <div className="absolute bottom-[30%] right-[20%] w-[35%] h-[40%] bg-[#c8f1e2] rounded-full blur-[2px] opacity-80" />
                    </div>
                  </motion.div>
                </div>
                {/* Atmosphere */}
                <div className="absolute inset-[-4px] rounded-full border-2 border-[#00c98a]/30 blur-[4px]" />
              </motion.div>

              {/* Logo text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2.5 mb-8"
              >
                <Leaf className="w-8 h-8 text-[#00b87a]" />
                <span className="text-4xl font-extrabold font-heading text-white tracking-tight">
                  SYL<span className="text-[#00b87a]">VA</span>
                </span>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-64 h-2 bg-slate-800/50 rounded-full overflow-hidden mb-4 backdrop-blur-sm border border-slate-700/50">
                <motion.div 
                  className="h-full bg-[#00b87a]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.05 }}
                />
              </div>

              {/* Changing Text */}
              <div className="h-6 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#00c98a] text-sm font-medium tracking-wide"
                  >
                    {messages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {children}
    </>
  );
}

