"use client";

import { Leaf, Calculator, TreePine, Trees, Trophy, Gamepad, Recycle, Globe } from "lucide-react";

const features = [
  { name: "AI Mentor", icon: Leaf },
  { name: "Carbon Calculator", icon: Calculator },
  { name: "Life Tree", icon: TreePine },
  { name: "Community Forest", icon: Trees },
  { name: "Leaderboards", icon: Trophy },
  { name: "Mini Games", icon: Gamepad },
  { name: "Recycling Assistant", icon: Recycle },
  { name: "Earth Engine", icon: Globe },
];

export function Features() {
  return (
    <section id="features-grid" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            A Complete <span className="text-emerald-400">Ecosystem</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feat, idx) => (
            <div 
              key={idx}
              className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group hover:-translate-y-2 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black text-emerald-400 transition-colors duration-300">
                <feat.icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-gray-200">{feat.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
