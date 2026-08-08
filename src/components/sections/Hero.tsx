"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown, Leaf } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-8 overflow-hidden bg-hero-glow"
    >
      {/* Subtle grid pattern background with soft mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#063b2d08_1px,transparent_1px),linear-gradient(to_bottom,#063b2d08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Soft Mint Radial Glow behind 3D Earth for visual integration */}
      <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#00b87a]/12 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Planetary Orbital Background Graphics matching reference image */}
      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00b87a]/12 pointer-events-none hidden lg:block z-0" />
      <div className="absolute right-[9%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-dashed border-[#00b87a]/15 pointer-events-none hidden lg:block z-0" />
      <div className="absolute right-[14%] top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-[#00b87a]/10 pointer-events-none hidden lg:block z-0" />

      {/* Floating Decorative Leaf Silhouettes matching reference */}
      <div className="absolute right-[45%] top-[25%] pointer-events-none opacity-30 text-[#00b87a] hidden xl:block z-0">
        <Leaf className="w-5 h-5 transform -rotate-45" />
      </div>
      <div className="absolute right-[12%] top-[18%] pointer-events-none opacity-25 text-[#00b87a] hidden xl:block z-0">
        <Leaf className="w-4 h-4 transform rotate-12" />
      </div>
      <div className="absolute right-[8%] bottom-[22%] pointer-events-none opacity-30 text-[#00b87a] hidden xl:block z-0">
        <Leaf className="w-5 h-5 transform rotate-90" />
      </div>

      {/* Subtle Trajectory Visual Connector (Text → Earth) */}
      <svg className="absolute left-[34%] top-[28%] w-64 h-64 pointer-events-none opacity-25 text-[#00b87a] hidden xl:block z-0" viewBox="0 0 200 200" fill="none">
        <path d="M10,40 Q110,20 180,140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="180" cy="140" r="4" fill="#00b87a" />
      </svg>
      <svg className="absolute left-[15%] bottom-[35%] w-48 h-48 pointer-events-none opacity-20 text-[#00b87a] hidden xl:block z-0" viewBox="0 0 200 200" fill="none">
        <path d="M20,160 Q10,60 160,20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
        
        {/* Left Side Editorial Content Block (7 cols on desktop - strictly controlled width) */}
        <div className="lg:col-span-7 space-y-7 text-left max-w-xl">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00b87a]/10 border border-[#00b87a]/25 text-[#063b2d] text-xs font-semibold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00b87a]" />
            <span className="tracking-wide">AI-Powered Personal Sustainability</span>
          </motion.div>

          {/* Headline matching reference image line breaks: HEAL THE / PLANET. / ONE HABIT / AT A TIME. */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-black font-heading tracking-tight text-5xl sm:text-7xl xl:text-8xl leading-[0.92]"
          >
            <span className="block text-[#09251e]">HEAL THE</span>
            <span className="block text-[#09251e]">PLANET.</span>
            <span className="block text-[#00b87a] mt-2">ONE HABIT</span>
            <span className="block text-[#00b87a]">AT A TIME.</span>
          </motion.div>

          {/* Supporting Tagline & Body Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2.5 pt-2"
          >
            <p className="text-xl sm:text-2xl font-bold text-[#063b2d] tracking-wide">
              Small actions. Smarter choices. Measurable impact.
            </p>
            <p className="text-sm sm:text-base text-[#66827a] leading-relaxed font-normal max-w-[500px]">
              SYLVA uses AI to turn everyday choices into sustainable habits, helping you understand your impact, take meaningful action, and build a healthier planet.
            </p>
          </motion.div>

          {/* CTA Buttons Group matching reference pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Link
              href="/signup"
              className="px-7 py-3.5 rounded-full bg-[#00b87a] hover:bg-[#00c98a] text-white font-bold text-xs tracking-wider transition-all duration-300 shadow-xl shadow-[#00b87a]/25 hover:shadow-2xl hover:shadow-[#00b87a]/35 transform hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#why-sylva"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#063b2d] border border-[#063b2d]/15 hover:border-[#00b87a]/40 font-bold text-xs tracking-wider transition-all duration-300 shadow-xs transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center cursor-pointer"
            >
              EXPLORE SYLVA
            </a>
          </motion.div>

          {/* Social Proof Trust Indicator matching reference avatars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="pt-2 flex items-center gap-3 text-xs text-[#66827a]"
          >
            <div className="flex -space-x-2.5">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
              ].map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt="Member"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs"
                />
              ))}
            </div>
            <p className="font-semibold text-[#09251e]">
              Joined by <span className="text-[#00b87a] font-extrabold">10,000+</span> conscious climate champions
            </p>
          </motion.div>

        </div>

        {/* Right Side Spacer on desktop to leave 3D Canvas Earth area 100% untouched */}
        <div className="hidden lg:block lg:col-span-5 h-[500px] pointer-events-none relative" />

      </div>

      {/* Bottom Center Scroll Indicator matching reference image */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, repeat: Infinity, repeatType: "reverse" }}
        className="relative z-10 flex flex-col items-center gap-1 mx-auto text-[#66827a] text-[11px] font-bold tracking-widest uppercase cursor-pointer pointer-events-auto pt-4"
      >
        <a href="#problem" className="flex flex-col items-center gap-1 hover:text-[#00b87a] transition-colors">
          <span>EXPLORE</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#00b87a]" />
        </a>
      </motion.div>
    </section>
  );
}



