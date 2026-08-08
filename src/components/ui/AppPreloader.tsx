"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

const messages = [
  "Preparing your SYLVA-eCO LIFE...",
  "Growing your world...",
  "Loading your eco journey...",
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
    }, 800); // rotate every 0.8s so it shows all three in 2.4s

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
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent opacity-80" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vh] h-[60vh] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"
            />

            {/* Floating Particles (Leaves) */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: "100vh", 
                  x: Math.random() * 100 - 50 + "vw",
                  rotate: 0,
                  opacity: 0
                }}
                animate={{ 
                  y: "-20vh", 
                  x: Math.random() * 100 - 50 + "vw",
                  rotate: 360,
                  opacity: [0, 0.5, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute text-emerald-400/30"
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_50px_rgba(16,185,129,0.4)] overflow-hidden">
                  {/* CSS Continents */}
                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-[200%] flex"
                  >
                    <div className="w-1/2 h-full relative">
                      <div className="absolute top-[20%] left-[20%] w-[40%] h-[30%] bg-emerald-400 rounded-full blur-[2px] opacity-80" />
                      <div className="absolute bottom-[30%] right-[20%] w-[35%] h-[40%] bg-emerald-500 rounded-full blur-[2px] opacity-80" />
                    </div>
                    <div className="w-1/2 h-full relative">
                      <div className="absolute top-[20%] left-[20%] w-[40%] h-[30%] bg-emerald-400 rounded-full blur-[2px] opacity-80" />
                      <div className="absolute bottom-[30%] right-[20%] w-[35%] h-[40%] bg-emerald-500 rounded-full blur-[2px] opacity-80" />
                    </div>
                  </motion.div>
                </div>
                {/* Atmosphere */}
                <div className="absolute inset-[-4px] rounded-full border-2 border-cyan-300/30 blur-[4px]" />
              </motion.div>

              {/* Logo text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-8"
              >
                <Leaf className="w-8 h-8 text-emerald-400" />
                <span className="text-4xl font-bold font-heading text-white tracking-tight">SYLVA-eCO LIFE</span>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-64 h-2 bg-slate-800/50 rounded-full overflow-hidden mb-4 backdrop-blur-sm border border-slate-700/50">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
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
                    className="text-emerald-400/80 text-sm font-medium tracking-wide"
                  >
                    {messages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 
        We render children immediately behind the preloader so it can fetch data,
        hydrate, and render its DOM. The preloader is fixed on top and z-indexed.
      */}
      {children}
    </>
  );
}
