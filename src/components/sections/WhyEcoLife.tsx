"use client";

import { Brain, Gamepad2, Globe2, Users2 } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "AI Guidance",
    description: "Your personal AI mentor analyzes your habits and suggests easy, high-impact changes.",
    icon: Brain,
    colSpan: "md:col-span-2",
  },
  {
    title: "Gamification",
    description: "Earn XP, complete daily missions, and level up your Eco DNA.",
    icon: Gamepad2,
    colSpan: "md:col-span-1",
  },
  {
    title: "Living Earth",
    description: "Watch your digital Earth heal in real-time as you log positive actions.",
    icon: Globe2,
    colSpan: "md:col-span-1",
  },
  {
    title: "Community",
    description: "Join local squads, compete on leaderboards, and grow the Community Forest.",
    icon: Users2,
    colSpan: "md:col-span-2",
  },
];

export function WhyEcoLife() {
  return (
    <section id="features" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            Why <span className="text-emerald-400">EcoLife?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We combined behavioral science, AI, and game design to make saving the planet genuinely addictive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={cn(
                "glass-card rounded-3xl p-8 relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]",
                card.colSpan
              )}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/20 transition-colors duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-300">
                  <card.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-heading">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
