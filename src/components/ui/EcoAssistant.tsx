"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Expression = "idle" | "happy" | "thinking" | "celebrating" | "sad";

interface EcoAssistantProps {
  expression?: Expression;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EcoAssistant({ expression = "idle", className, size = "md" }: EcoAssistantProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const getEyes = () => {
    switch (expression) {
      case "happy":
      case "celebrating":
        return (
          <>
            <path d="M 30 45 Q 35 35 40 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 60 45 Q 65 35 70 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "sad":
        return (
          <>
            <path d="M 30 40 Q 35 35 40 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 60 45 Q 65 35 70 40" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "thinking":
        return (
          <>
            <circle cx="35" cy="40" r="3" fill="currentColor" />
            <path d="M 60 45 Q 65 35 70 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        );
      case "idle":
      default:
        return (
          <>
            <circle cx="35" cy="42" r="3.5" fill="currentColor" />
            <circle cx="65" cy="42" r="3.5" fill="currentColor" />
          </>
        );
    }
  };

  const getMouth = () => {
    switch (expression) {
      case "happy":
      case "celebrating":
        return <path d="M 40 55 Q 50 65 60 55" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case "sad":
        return <path d="M 40 60 Q 50 50 60 60" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />;
      case "thinking":
        return <line x1="45" y1="58" x2="55" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />;
      case "idle":
      default:
        return <path d="M 45 55 Q 50 58 55 55" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
    }
  };

  const getAnimationProps = () => {
    switch (expression) {
      case "celebrating":
        return {
          animate: { y: [0, -5, 0], rotate: [0, -5, 5, -5, 0] },
          transition: { duration: 0.5, repeat: Infinity }
        };
      case "thinking":
        return {
          animate: { y: [0, -2, 0], rotate: [0, 2, 0] },
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "happy":
        return {
          animate: { y: [0, -3, 0] },
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
        };
      case "idle":
      default:
        return {
          animate: { y: [0, -2, 0] },
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
        };
    }
  };

  return (
    <motion.div 
      className={cn("relative flex items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)] border border-emerald-500/20", sizeClasses[size], className)}
      {...getAnimationProps()}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* Antenna / Leaf */}
        <motion.path 
          d="M 50 20 C 45 5, 65 5, 50 20" 
          fill="currentColor"
          animate={expression === "thinking" ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ originX: "50px", originY: "20px" }}
        />
        
        {/* Head/Body Base */}
        <rect x="20" y="25" width="60" height="55" rx="20" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="3" />
        
        {/* Screen/Face Area */}
        <rect x="25" y="30" width="50" height="45" rx="15" fill="currentColor" fillOpacity="0.1" />

        {/* Dynamic Expressions */}
        {getEyes()}
        {getMouth()}
        
        {/* Little arms */}
        <path d="M 20 50 L 12 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M 80 50 L 88 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      
      {expression === "celebrating" && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8], y: -20 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute -top-2 right-0 text-yellow-400 text-lg pointer-events-none"
        >
          ✨
        </motion.div>
      )}
    </motion.div>
  );
}
