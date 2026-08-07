"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export default function AnalysisPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate AI thinking and generating the report
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 4000); // 4 seconds of "analysis"
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center space-y-12 h-[60vh]">
      
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-t-2 border-r-2 border-emerald-500 opacity-50 absolute inset-0"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 rounded-full border-b-2 border-l-2 border-cyan-400 opacity-50 absolute inset-0 scale-110"
        />
        
        <div className="w-32 h-32 rounded-full glass flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
          <BrainCircuit className="w-12 h-12 text-emerald-400 animate-pulse" />
        </div>

        {/* Floating particles (CSS) */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0.5],
                x: (Math.random() - 0.5) * 150,
                y: (Math.random() - 0.5) * 150,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-emerald-400 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold font-heading text-white">
          Analyzing your <span className="text-emerald-400">Eco DNA</span>
        </h2>
        <motion.p 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 text-lg"
        >
          Generating personalized sustainability roadmap...
        </motion.p>
      </div>

    </div>
  );
}
