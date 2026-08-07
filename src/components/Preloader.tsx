"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CanvasContainer } from "./canvas/CanvasContainer";
import { cn } from "@/lib/utils";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [health, setHealth] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out preloader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    // 1. Screen starts black, particle appears (handled by CSS/initial state)
    tl.to(".particle", { opacity: 1, scale: 1, duration: 1, ease: "power2.out" })
      .to(".particle", { scale: 50, opacity: 0, duration: 1.5, ease: "power4.inOut" }, "+=0.5")
      // Earth appears polluted (health = 0)
      .fromTo(".preloader-canvas", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, "-=0.5")
      // Text sequence
      .to(textRef.current, { opacity: 1, duration: 1 })
      // Simulate healing
      .to({}, {
        duration: 2,
        onUpdate: function() {
          setHealth(this.progress());
        },
      })
      // Logo text
      .to(".tagline", { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .to({}, { duration: 1 }); // hold

  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="particle absolute w-2 h-2 bg-emerald-500 rounded-full opacity-0 scale-0 shadow-[0_0_20px_#10b981]" />
      
      <div className="preloader-canvas absolute inset-0 opacity-0">
        <CanvasContainer health={health} earthScale={1.5} />
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center opacity-0 mt-64">
        <h1 className="text-6xl font-bold font-heading text-gradient tracking-tight">EcoLife</h1>
        <p className="tagline opacity-0 translate-y-4 text-gray-400 mt-2 font-sans tracking-wide">
          Every Small Action Heals the Earth.
        </p>
      </div>
    </div>
  );
}
