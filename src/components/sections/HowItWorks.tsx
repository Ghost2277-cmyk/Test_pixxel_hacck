"use client";

import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { number: "1", title: "Eco DNA", desc: "Complete a quick assessment to generate your unique ecological profile." },
  { number: "2", title: "AI Mentor", desc: "Receive personalized, achievable daily goals tailored to your lifestyle." },
  { number: "3", title: "Daily Missions", desc: "Log your actions, from bringing a reusable cup to taking public transit." },
  { number: "4", title: "Earn XP", desc: "Level up your profile, unlock badges, and earn Eco Coins." },
  { number: "5", title: "Heal Earth", desc: "Watch your personal 3D Earth transform from polluted to paradise." },
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="py-32 relative z-10" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold font-heading">
            How It <span className="text-cyan-400">Works</span>
          </h2>
        </div>

        <div className="relative">
          {/* Animated Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-emerald-400 to-cyan-400"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, idx) => (
              <div key={idx} className={`relative flex items-center md:justify-between flex-col md:flex-row ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border-4 border-emerald-500 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  <span className="font-bold text-white">{step.number}</span>
                </div>

                {/* Content */}
                <div className={`w-full md:w-5/12 pl-24 md:pl-0 ${idx % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-card p-8 rounded-3xl"
                  >
                    <h3 className="text-2xl font-bold font-heading mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
