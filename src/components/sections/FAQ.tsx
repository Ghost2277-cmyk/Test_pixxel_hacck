"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does the AI Mentor work?",
    answer: "Our AI analyzes the daily habits you log and compares them against global sustainability data. It then suggests small, high-impact changes tailored to your specific lifestyle and location."
  },
  {
    question: "Is SYLVA-eCO LIFE really free?",
    answer: "Yes, the core SYLVA-eCO LIFE experience is completely free. We believe everyone should have access to tools that help heal the planet. We offer an optional premium tier for advanced analytics."
  },
  {
    question: "How accurate is the Carbon Calculator?",
    answer: "Our calculator uses the latest emissions factors from the EPA and IPCC, updated quarterly. While it's an estimate, it provides one of the most accurate personal footprints available."
  },
  {
    question: "Can I connect it to my smart home devices?",
    answer: "Yes! SYLVA-eCO LIFE integrates with major smart home platforms to automatically log energy savings, thermostat adjustments, and smart plug usage."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            Common <span className="text-emerald-400">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-2xl overflow-hidden border border-white/5 transition-all duration-300"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown 
                  className={cn("w-5 h-5 text-emerald-400 transition-transform duration-300", openIndex === idx ? "rotate-180" : "")} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
