"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.to(".particle", { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" })
      .to(".particle", { scale: 35, opacity: 0, duration: 1.0, ease: "power4.inOut" }, "+=0.2")
      .to(textRef.current, { opacity: 1, duration: 0.6 }, "-=0.4")
      .to(".tagline", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .to({}, { duration: 0.4 });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f3faf7]">
      <div className="particle absolute w-3.5 h-3.5 bg-[#00b87a] rounded-full opacity-0 scale-0 shadow-[0_0_24px_#00b87a]" />

      <div ref={textRef} className="relative z-10 flex flex-col items-center opacity-0 text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-black font-heading text-[#09251e] tracking-tight">
          SYL<span className="text-[#00b87a]">VA</span>
        </h1>

        <p className="tagline opacity-0 translate-y-3 text-[#66827a] mt-2 font-sans tracking-wide font-semibold text-sm sm:text-base">
          HEAL THE PLANET. ONE HABIT AT A TIME.
        </p>
      </div>
    </div>
  );
}


