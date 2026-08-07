"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Leaf } from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";

export function RewardEffects() {
  const rewardTrigger = useEarthStore(state => state.rewardTrigger);
  const [activeEffects, setActiveEffects] = useState<{ id: number; type: 'coin' | 'leaf' }[]>([]);

  useEffect(() => {
    if (rewardTrigger > 0) {
      // Spawn multiple coins and leaves
      const newEffects = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i,
        type: (Math.random() > 0.5 ? 'coin' : 'leaf') as 'coin' | 'leaf'
      }));
      
      setActiveEffects(prev => [...prev, ...newEffects]);

      // Trigger screen shake (applies to document body)
      document.body.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 500);

      // Clean up effects after animation
      setTimeout(() => {
        setActiveEffects(prev => prev.filter(e => !newEffects.find(n => n.id === e.id)));
      }, 2000);
    }
  }, [rewardTrigger]);

  if (activeEffects.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {activeEffects.map((effect, index) => {
          // Calculate random start position around the center
          const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
          const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
          
          // Animate towards top right (where HUD usually is)
          const targetX = window.innerWidth - 100;
          const targetY = 50;

          return (
            <motion.div
              key={effect.id}
              initial={{ x: startX, y: startY, scale: 0, opacity: 0, rotate: 0 }}
              animate={{ 
                x: [startX, startX + (Math.random() - 0.5) * 300, targetX], 
                y: [startY, startY - 200, targetY],
                scale: [0, 1.5, 0.5],
                opacity: [0, 1, 0],
                rotate: Math.random() * 720
              }}
              transition={{ 
                duration: 1.5 + Math.random() * 0.5, 
                ease: "easeInOut",
                delay: index * 0.05
              }}
              className="absolute"
            >
              {effect.type === 'coin' ? (
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.8)]">
                  <Coins className="w-5 h-5 text-yellow-700" />
                </div>
              ) : (
                <Leaf className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
