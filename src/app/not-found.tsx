"use client";

import { motion } from "framer-motion";
import { TreePine, Map, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { EcoAssistant } from "@/components/ui/EcoAssistant";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 text-[var(--muted)] opacity-20 pointer-events-none">
        <TreePine className="w-64 h-64" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-[var(--muted)] opacity-20 pointer-events-none">
        <Map className="w-48 h-48" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-lg w-full p-8 md:p-12 text-center relative z-10 flex flex-col items-center"
      >
        <EcoAssistant size="lg" expression="sad" className="mb-6 mx-auto" />
        
        <h1 className="text-4xl font-bold font-heading text-[var(--foreground)] mb-2">
          Lost in the Forest
        </h1>
        <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
          It looks like the path you're trying to follow has overgrown or doesn't exist. Let's get you back to familiar territory.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 magnetic-glow">
              <Home className="w-4 h-4" />
              Return to Dashboard
            </button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl glass border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
