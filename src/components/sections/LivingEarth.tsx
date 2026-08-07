"use client";

import { motion } from "framer-motion";

interface LivingEarthProps {
  health: number;
  setHealth: (val: number) => void;
}

export function LivingEarth({ health, setHealth }: LivingEarthProps) {
  // Determine stage based on health
  let stageText = "Polluted";
  let stageDesc = "Smoke, Grey, Plastic, Dead trees";
  if (health > 0.25) {
    stageText = "Healing Begins";
    stageDesc = "Small improvement, Grass, Clouds";
  }
  if (health > 0.6) {
    stageText = "Healthy";
    stageDesc = "Blue oceans, Birds, Waterfalls, Whales, Aurora";
  }
  if (health > 0.9) {
    stageText = "Paradise";
    stageDesc = "Lush forests, Animals, Flowers, Rainbow, Northern lights";
  }

  return (
    <section id="living-earth" className="py-40 relative z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 glass-card p-10 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              The <span className="text-emerald-400">Living Earth</span> Engine
            </h2>
            <p className="text-gray-400 text-lg">
              Your actions have a direct visual impact. Scrub the slider to see how collective habits can transform our planet from a polluted wasteland into a thriving paradise.
            </p>

            <div className="space-y-6 pt-8">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold text-white transition-all duration-300">Stage: {stageText}</h3>
                  <p className="text-emerald-400 text-sm mt-1">{stageDesc}</p>
                </div>
                <span className="text-3xl font-bold font-heading text-white/20">{Math.round(health * 100)}%</span>
              </div>
              
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={health}
                onChange={(e) => setHealth(parseFloat(e.target.value))}
                className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
              />
              
              <div className="flex justify-between text-xs text-gray-500 font-medium px-1">
                <span>POLLUTED</span>
                <span>PARADISE</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block h-[500px]">
            {/* Space reserved for Earth which is in the fixed canvas */}
          </div>
          
        </div>
      </div>
    </section>
  );
}
