"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is SYLVA?",
    answer: "SYLVA is an AI-powered sustainability platform designed to make environmental habit-building intuitive, engaging, and rewarding. It combines personal AI guidance, daily eco missions, gamification, and real-time 3D ecosystem feedback."
  },
  {
    question: "How does SYLVA use AI?",
    answer: "Our AI Mentor analyzes your baseline habits, daily activity logs, and local environmental context to recommend simple, personalized, high-impact action items tailored specifically to your lifestyle."
  },
  {
    question: "How are sustainability actions calculated?",
    answer: "SYLVA utilizes environmental data models aligned with EPA and IPCC emission guidelines to estimate carbon prevention, freshwater savings, and energy conservation based on your verified habits."
  },
  {
    question: "How does the XP system work?",
    answer: "Every time you log a positive eco mission, you earn Experience Points (XP). Sustaining consecutive daily habits builds streaks, unlocks tier levels (such as Green Explorer and Eco Master), and earns digital badges."
  },
  {
    question: "Can I connect my environmental data?",
    answer: "Yes! SYLVA allows you to sync daily mobility, energy savings, and eco choices directly, making logging effortless while tracking your individual and collective footprint."
  },
  {
    question: "Can I participate with friends?",
    answer: "Absolutely. You can join local community squads, compete in friendly leaderboard challenges, and contribute to shared environmental milestones together."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-36 relative z-10 bg-[#f3faf7] overflow-hidden">
      {/* Background Soft Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,184,122,0.05),transparent_70%)] pointer-events-none" />

      {/* Corner Botanical Accent */}
      <div className="absolute top-10 right-8 w-36 h-36 opacity-20 pointer-events-none text-[#00b87a] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 90 10 Q 60 40 40 90 M 70 30 Q 50 30 45 45" />
          <path d="M 45 45 C 35 35 55 25 45 45 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      <div className="absolute bottom-10 left-8 w-32 h-32 opacity-20 pointer-events-none text-[#063b2d] hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 10 90 Q 40 60 90 40 M 30 70 Q 30 50 45 45" />
          <path d="M 45 45 C 35 35 25 55 45 45 Z" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      {/* Floating Leaves */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-28 left-[5%] text-[#00b87a]/30 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-6 h-6 rotate-45" />
      </motion.div>

      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-24 right-[5%] text-[#00b87a]/30 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <Leaf className="w-5 h-5 -rotate-12" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00b87a]/10 border border-[#00b87a]/20 text-[#063b2d] text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00b87a]" />
            <span>TRANSPARENCY & CLARITY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-[#09251e] tracking-tight leading-tight"
          >
            COMMON <span className="text-[#00b87a]">QUESTIONS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-[#66827a] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Everything you need to know about the platform and habit engine.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={cn(
                  "bg-[#e0f2eb] rounded-2xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md",
                  isOpen ? "border-[#00b87a]/60 bg-[#d5ede1]" : "border-[#00b87a]/25 hover:border-[#00b87a]/50"
                )}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-[#00b87a]/10 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="font-bold text-[#09251e] text-base sm:text-lg font-heading tracking-tight">
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0",
                    isOpen ? "bg-[#00b87a] text-white" : "bg-[#00b87a]/15 text-[#00b87a]"
                  )}>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        isOpen ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm text-[#527068] leading-relaxed border-t border-[#063b2d]/10 pt-4 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


