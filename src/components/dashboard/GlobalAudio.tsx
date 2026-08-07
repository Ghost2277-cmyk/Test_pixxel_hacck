"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useEarthStore } from "@/store/useEarthStore";

export function GlobalAudio() {
  const [muted, setMuted] = useState(true); // Browsers require interaction before unmuting
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentEvent = useEarthStore(state => state.currentEvent);

  // Determine which track to play based on time of day and events
  const getAudioSource = () => {
    if (currentEvent === 'Rainstorm') return 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg';
    
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'https://actions.google.com/sounds/v1/nature/birds_in_forest.ogg'; // Morning
    if (hour >= 18 || hour < 6) return 'https://actions.google.com/sounds/v1/nature/crickets_and_frogs.ogg'; // Night
    return 'https://actions.google.com/sounds/v1/nature/forest_ambience.ogg'; // Day
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = getAudioSource();
      if (!muted) {
        audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
    }
  }, [currentEvent, muted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (muted) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
    setMuted(!muted);
  };

  return (
    <>
      <audio ref={audioRef} loop />
      <button 
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-white/40 backdrop-blur-xl border border-black/10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white/10 transition-colors pointer-events-auto"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
      </button>
    </>
  );
}
