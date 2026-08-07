"use client";

import { useState } from "react";
import { ArrowLeft, HelpCircle, Trophy, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEarthStore } from "@/store/useEarthStore";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    q: "Which of these materials takes the longest to decompose?",
    options: ["Paper", "Banana Peel", "Plastic Bottle", "Cotton Shirt"],
    a: 2,
    explanation: "A plastic bottle can take up to 450 years to decompose in a landfill!"
  },
  {
    q: "What percentage of the Earth's water is fresh and available to drink?",
    options: ["1%", "10%", "30%", "50%"],
    a: 0,
    explanation: "Only about 1.2% of all fresh water is surface water, which serves most of life's needs."
  },
  {
    q: "Which renewable energy source is currently the most widely used globally?",
    options: ["Solar", "Wind", "Hydropower", "Geothermal"],
    a: 2,
    explanation: "Hydropower provides about 16% of the world's electricity, making it the largest renewable source."
  },
  {
    q: "What is the primary greenhouse gas emitted by human activities?",
    options: ["Methane", "Carbon Dioxide", "Nitrous Oxide", "Ozone"],
    a: 1,
    explanation: "Carbon dioxide (CO2) accounts for about 76% of total greenhouse gas emissions."
  },
  {
    q: "How many trees are cut down each year globally?",
    options: ["1 Billion", "5 Billion", "15 Billion", "50 Billion"],
    a: 2,
    explanation: "Roughly 15 billion trees are cut down each year, significantly impacting global biodiversity."
  }
];

export default function EcoQuizGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const startGame = () => {
    setScore(0);
    setCurrentQ(0);
    setSelected(null);
    setShowAnswer(false);
    setIsPlaying(true);
    setGameOver(false);
  };

  const handleSelect = (index: number) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
    
    if (index === QUESTIONS[currentQ].a) {
      setScore(s => s + 100);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setIsPlaying(false);
      setGameOver(true);
      useEarthStore.setState(s => ({
        xp: s.xp + score,
        greenCoins: s.greenCoins + Math.floor(score/10),
        rewardTrigger: Date.now()
      }));
    }
  };

  return (
    <div className="w-full h-full p-8 max-w-3xl mx-auto flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/games">
            <button className="p-3 rounded-full glass-card hover:bg-white/10 transition">
              <ArrowLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold font-heading flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-purple-400" /> Eco Quiz
          </h1>
        </div>
        
        {isPlaying && (
          <div className="flex gap-6 font-bold text-xl glass-card px-6 py-3 rounded-full">
            <div className="flex items-center gap-2"><Trophy className="text-yellow-400" /> {score}</div>
          </div>
        )}
      </div>

      {!isPlaying && !gameOver && (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg">
            <HelpCircle className="w-20 h-20 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Test Your Knowledge</h2>
            <p className="opacity-70 mb-8">Answer questions about the environment, sustainability, and climate change to earn massive XP!</p>
            <button onClick={startGame} className="w-full py-4 rounded-xl bg-purple-500 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-12 rounded-3xl text-center max-w-lg border border-yellow-400/30">
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
            <div className="text-2xl mb-8">You scored <span className="text-yellow-400 font-bold">{score}</span></div>
            <p className="text-emerald-400 font-bold mb-8">+ {score} XP earned!</p>
            <button onClick={startGame} className="w-full py-4 rounded-xl bg-purple-500 text-slate-900 font-bold text-lg hover:scale-105 transition-transform">
              Play Again
            </button>
          </div>
        </div>
      )}

      {isPlaying && (
        <div className="flex-1 flex flex-col items-center">
          
          <div className="w-full mb-8 flex justify-between text-sm font-bold opacity-50 uppercase tracking-widest">
            <span>Question {currentQ + 1} of {QUESTIONS.length}</span>
          </div>

          <div className="glass-card w-full p-8 rounded-3xl mb-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <h2 className="text-2xl font-bold text-center leading-relaxed">
              {QUESTIONS[currentQ].q}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
            {QUESTIONS[currentQ].options.map((opt, i) => {
              const isCorrect = i === QUESTIONS[currentQ].a;
              const isSelected = i === selected;
              
              let bg = "bg-white/5 hover:bg-white/10 border border-black/10";
              if (showAnswer) {
                if (isCorrect) bg = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                else if (isSelected) bg = "bg-red-500/20 border-red-500 text-red-400";
                else bg = "bg-black/20 border-transparent opacity-30";
              }

              return (
                <button 
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showAnswer}
                  className={`p-6 rounded-2xl font-bold text-lg transition-all ${bg} flex justify-between items-center`}
                >
                  {opt}
                  {showAnswer && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                  {showAnswer && !isCorrect && isSelected && <XCircle className="w-6 h-6 text-red-400" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showAnswer && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center gap-6"
              >
                <div className="glass-card p-6 rounded-2xl border border-sky-400/30 text-sky-100 text-center w-full max-w-2xl">
                  {QUESTIONS[currentQ].explanation}
                </div>
                <button 
                  onClick={nextQuestion}
                  className="px-12 py-4 rounded-xl bg-purple-500 text-slate-900 font-bold text-lg hover:scale-105 transition-transform"
                >
                  {currentQ < QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </div>
  );
}
