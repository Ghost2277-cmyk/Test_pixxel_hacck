"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Send, UploadCloud, Recycle, ImageIcon } from "lucide-react";
import { getGeminiResponse } from "@/lib/actions/gemini";

export default function RecyclingAIPage() {
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: "Hello! I am your Recycling AI. Upload an image of an item, or ask me how to dispose of or upcycle something!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: newMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const responseText = await getGeminiResponse(
        `You are an expert Recycling AI. The user is asking about: "${newMsg}". 
        Give them 3 short, punchy bullet points on how to recycle, dispose of, or creatively reuse this item.`
      );
      setMessages(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col glass-card border border-black/10 rounded-3xl overflow-hidden relative">
      
      {/* Header */}
      <div className="h-24 bg-white/40 border-b border-black/10 flex items-center px-8 gap-6 z-10 flex-shrink-0">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Recycle className="w-8 h-8 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Recycling AI</h1>
          <p className="text-slate-600 text-sm">Powered by Gemini Vision (Mocked)</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-gradient-to-b from-transparent to-black/40">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'ai' && (
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mt-1">
                  <BrainCircuit className="w-5 h-5 text-emerald-400" />
                </div>
              )}
              <div 
                className={`p-4 rounded-3xl text-[15px] leading-relaxed max-w-[80%] whitespace-pre-wrap shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-emerald-500 text-black rounded-tr-sm font-medium' 
                    : 'glass-card border border-black/10 text-slate-700 rounded-tl-sm'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
               <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mt-1">
                  <BrainCircuit className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="glass-card border border-black/10 p-5 rounded-3xl rounded-tl-sm flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
             </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-6 bg-white/60 border-t border-black/10 backdrop-blur-xl flex-shrink-0">
        <div className="glass-card rounded-2xl border border-black/10 flex items-center p-2 focus-within:border-emerald-500/50 transition-colors shadow-2xl">
          <button className="w-12 h-12 flex items-center justify-center text-slate-600 hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center text-slate-600 hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-colors">
            <UploadCloud className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type 'coffee cup' or 'batteries'..."
            className="flex-1 bg-transparent border-none outline-none px-4 text-slate-900 placeholder:text-gray-500 text-lg"
          />
          
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="w-12 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>

    </div>
  );
}
