"use client";

import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { CanvasContainer } from "@/components/canvas/CanvasContainer";
import { Hero } from "@/components/sections/Hero";
import { WhyEcoLife } from "@/components/sections/WhyEcoLife";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { LivingEarth } from "@/components/sections/LivingEarth";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(0.8); // Default health for landing page (mostly healthy)

  return (
    <main className="relative min-h-screen bg-sky-100 overflow-hidden selection:bg-emerald-500/30">
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Global 3D Canvas */}
      <div className="fixed inset-0 z-0">
        <CanvasContainer health={health} />
      </div>
      
      {/* Aurora Background overlay */}
      <div className="fixed inset-0 z-0 aurora-bg pointer-events-none opacity-40 mix-blend-screen" />

      {/* Content wrapper with z-index to sit above canvas */}
      <div className={`relative z-10 transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        
        <Hero />
        
        {/* Light gradient overlay to transition from hero earth to content */}
        <div className="w-full h-32 bg-gradient-to-b from-transparent to-sky-50" />
        
        <div className="bg-sky-50/90 backdrop-blur-sm">
          <WhyEcoLife />
          <HowItWorks />
          <Features />
          <LivingEarth health={health} setHealth={setHealth} />
          <Statistics />
          <Testimonials />
          <FAQ />
          <Footer />
        </div>
      </div>
    </main>
  );
}
