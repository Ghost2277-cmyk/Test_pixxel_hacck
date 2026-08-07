"use client";

import { BrainCircuit, Send, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AIPanel() {
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: "Welcome back! You're only one mission away from reaching a 7-day streak. Today's weather is perfect for cycling!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: newMsg }]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "That's a great approach! Reducing energy consumption even slightly can drastically improve the global Air Quality metric over time." 
      }]);
    }, 1500);
  };

  return (
    <aside className="w-80 h-full border-l border-black/10 glass bg-white/40 flex flex-col relative z-20 hidden 2xl:flex flex-shrink-0">
      
      {/* Header */}
      <div className="h-20 border-b border-white/5 flex items-center px-6 gap-4 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <BrainCircuit className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="font-bold font-heading text-slate-900 flex items-center gap-2">
            AI Mentor <Sparkles className="w-3 h-3 text-emerald-400" />
          </h2>
          <p className="text-xs text-emerald-400">Online & Tracking</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'ai' && (
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-emerald-500/20 flex items-center justify-center mt-1">
                  <BrainCircuit className="w-4 h-4 text-emerald-400" />
                </div>
              )}
              <div 
                className={`p-3 rounded-2xl text-sm leading-relaxed max-w-[85%] ${
                  msg.role === 'user' 
                    ? 'bg-emerald-500 text-black rounded-tr-sm' 
                    : 'glass-card border border-black/10 text-slate-700 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mt-1">
                  <BrainCircuit className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="glass-card border border-black/10 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center h-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
             </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-black/20 flex-shrink-0">
        <div className="glass-card rounded-xl border border-black/10 flex items-center p-2 focus-within:border-emerald-500/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for eco advice..."
            className="flex-1 bg-transparent border-none outline-none px-2 text-sm text-slate-900 placeholder:text-gray-500"
          />
          <button 
            onClick={handleSend}
            className="w-8 h-8 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 flex items-center justify-center text-emerald-400 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </aside>
  );
}
