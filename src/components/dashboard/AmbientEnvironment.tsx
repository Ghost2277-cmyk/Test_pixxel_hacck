"use client";

import { motion } from "framer-motion";
import { useEarthStore } from "@/store/useEarthStore";
import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export function AmbientEnvironment() {
  const health = useEarthStore(state => state.health);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isHealthy = health >= 0.5;
  const isParadise = health >= 0.8;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Sunlight rays if healthy */}
      {isHealthy && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-50 mix-blend-screen" />
      )}

      {/* Floating Leaves or Smoke Particles */}
      {[...Array(15)].map((_, i) => {
        const isLeaf = isHealthy && Math.random() > 0.3;
        const size = Math.random() * 20 + 10;
        
        return (
          <motion.div
            key={i}
            initial={{ 
              top: "-10%", 
              left: `${Math.random() * 100}%`,
              rotate: 0,
              opacity: 0
            }}
            animate={{ 
              top: "110%",
              left: `${Math.random() * 100}%`,
              rotate: 360,
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute"
          >
            {isLeaf ? (
              <Leaf 
                className="text-emerald-500/30 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" 
                style={{ width: size, height: size }}
              />
            ) : (
              // Smoke / Dust particle
              <div 
                className="rounded-full bg-gray-500/20 blur-sm"
                style={{ width: size, height: size }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Fireflies in Paradise stage */}
      {isParadise && [...Array(20)].map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          initial={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_10px_rgba(253,224,71,0.8)] blur-[1px]"
        />
      ))}
    </div>
  );
}
