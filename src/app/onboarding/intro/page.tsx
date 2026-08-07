"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BrainCircuit } from "lucide-react";

export default function IntroPage() {
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="max-w-3xl flex flex-col items-center gap-8"
    >
      <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
        <BrainCircuit className="w-10 h-10 text-emerald-400" />
      </div>
      
      <div className="space-y-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl md:text-5xl font-bold font-heading text-white"
        >
          Welcome to <span className="text-emerald-400">EcoLife.</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="space-y-4 text-xl text-gray-300 font-medium leading-relaxed max-w-2xl"
        >
          <p>Before we begin our journey together...</p>
          <p>I'd love to understand your lifestyle.</p>
          <p className="text-gray-400 text-lg">
            This helps me build your unique Eco DNA and create a personalized roadmap for protecting our planet.
          </p>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        onClick={() => router.push("/onboarding/questionnaire")}
        className="mt-8 magnetic-glow px-10 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
      >
        Begin Journey
      </motion.button>
    </motion.div>
  );
}
