"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";
import { getAIEncouragement } from "@/lib/actions/gemini";
import { cn } from "@/lib/utils";
import { EcoAssistant } from "@/components/ui/EcoAssistant";

const sections = [
  {
    id: "transport",
    title: "Transportation",
    question: "How do you usually travel?",
    options: ["Walking", "Bicycle", "Car", "Bus", "Metro", "Train", "Mixed"]
  },
  {
    id: "plasticUsage",
    title: "Plastic Usage",
    question: "How often do you use single-use plastics?",
    options: ["Rarely", "Sometimes", "Often", "Daily"]
  },
  {
    id: "electricity",
    title: "Electricity",
    question: "Are you conscious of your electricity usage?",
    options: ["Very Conscious", "Somewhat", "Not really", "I leave everything on"]
  },
  {
    id: "showerDuration",
    title: "Water",
    question: "What's your average shower duration?",
    options: ["Under 5 mins", "5-10 mins", "10-15 mins", "Over 15 mins"]
  },
  {
    id: "diet",
    title: "Food",
    question: "How would you describe your diet?",
    options: ["Vegan", "Vegetarian", "Pescatarian", "Meat Eater"]
  },
  {
    id: "recycling",
    title: "Recycling",
    question: "Do you actively recycle?",
    options: ["Everything possible", "Paper & Plastic only", "Occasionally", "No"]
  },
  {
    id: "lifestyle",
    title: "Lifestyle",
    question: "How often do you buy fast fashion or new clothes?",
    options: ["Rarely (Thrift/Used)", "A few times a year", "Monthly", "Weekly"]
  },
  {
    id: "goals",
    title: "Personal Goals",
    question: "What is your main goal here?",
    options: ["Reduce plastic", "Save electricity", "Plant trees", "Learn sustainability"]
  }
];

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  const updateEarth = useEarthStore((state) => state.updateFromAnswers);

  const handleOptionSelect = async (option: string) => {
    const section = sections[currentStep];
    const newAnswers = { ...answers, [section.id]: option };
    setAnswers(newAnswers);
    
    // Update 3D Earth Live
    updateEarth(newAnswers);

    // Get AI Encouragement
    setIsAiLoading(true);
    const reply = await getAIEncouragement(section.title, option);
    setAiResponse(reply);
    setIsAiLoading(false);
  };

  const handleNext = async () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(prev => prev + 1);
      setAiResponse(null);
    } else {
      router.push("/onboarding/analysis");
    }
  };

  const progress = ((currentStep) / sections.length) * 100;

  // We portal the progress bar up using normal state or just render it inside layout via store.
  // For simplicity, we just have a local one if we didn't hook up layout correctly.
  
  const currentSection = sections[currentStep];

  return (
    <div className="w-full flex flex-col pt-8">
      
      {/* Local Progress Bar Override (since Layout was hardcoded to 12.5) */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 relative"
          initial={{ width: "0%" }}
          animate={{ width: progress + "%" }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl mx-auto space-y-8"
        >
          <div className="space-y-2">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-sm">{currentSection.title}</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
              {currentSection.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentSection.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all duration-300",
                  answers[currentSection.id] === option 
                    ? "bg-emerald-500/20 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                    : "glass hover:bg-white/10 hover:border-white/30 border-white/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={answers[currentSection.id] === option ? "text-emerald-400 font-semibold" : "text-gray-300"}>
                    {option}
                  </span>
                  {answers[currentSection.id] === option && (
                    <Check className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* AI Response Area */}
          <AnimatePresence>
            {(aiResponse || isAiLoading) && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                className="glass-card rounded-2xl p-5 border border-emerald-500/30 flex gap-4 overflow-hidden"
              >
                <EcoAssistant size="sm" expression={isAiLoading ? "thinking" : "happy"} className="flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-emerald-400 font-semibold text-sm mb-1">AI Mentor</p>
                  {isAiLoading ? (
                    <div className="flex gap-1 items-center h-5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0s" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm leading-relaxed">{aiResponse}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          <AnimatePresence>
            {answers[currentSection.id] && !isAiLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pt-4"
              >
                <button
                  onClick={handleNext}
                  className="w-full magnetic-glow px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {currentStep === sections.length - 1 ? "Generate Eco DNA" : "Continue"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
