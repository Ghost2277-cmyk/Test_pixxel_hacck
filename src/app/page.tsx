"use client";

import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { CanvasContainer } from "@/components/canvas/CanvasContainer";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WhyEcoLife } from "@/components/sections/WhyEcoLife";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { LivingEarth } from "@/components/sections/LivingEarth";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [health, setHealth] = useState(0.85);

  return (
    <main className="relative min-h-screen bg-[#f3faf7] text-[#09251e] overflow-hidden selection:bg-[#00b87a]/20 selection:text-[#063b2d]">
      
      {/* Optional Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Global 3D Interactive Canvas */}
      <div className="fixed inset-0 z-0">
        <CanvasContainer health={health} />
      </div>

      {/* Content wrapper sitting above fixed 3D Canvas */}
      <div className={`relative z-10 transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        
        {/* 1. Hero Section */}
        <Hero />
        
        {/* Storytelling Content Stream */}
        <div className="bg-[#f3faf7]">
          {/* 2. The Problem Storytelling Section */}
          <ProblemSection />
          
          {/* 3. Why EcoLife Section */}
          <WhyEcoLife />
          
          {/* 4. How It Works Timeline */}
          <HowItWorks />
          
          {/* 5. Living Earth Engine Interactive Simulator */}
          <LivingEarth health={health} setHealth={setHealth} />
          
          {/* 6. Complete Ecosystem Section */}
          <EcosystemSection />
          
          {/* 7. Impact Metrics Counter */}
          <Statistics />
          
          {/* 8. Stories of Impact */}
          <Testimonials />
          
          {/* 9. FAQ Accordion */}
          <FAQ />
          
          {/* 10. Final CTA */}
          <FinalCTA />
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}

