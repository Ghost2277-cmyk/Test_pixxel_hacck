"use client";

import { useEffect } from "react";
import { useEarthStore } from "@/store/useEarthStore";

const EVENTS = [
  'Butterfly Migration',
  'Rainstorm',
  'Forest Festival',
  'Ocean Celebration',
  'Earth Day',
  'Meteor Shower',
  'Solar Eclipse'
];

export function RandomEventManager() {
  const triggerRandomEvent = useEarthStore(state => state.triggerRandomEvent);

  useEffect(() => {
    // Attempt to trigger a random event every 2 minutes (for demo purposes)
    const interval = setInterval(() => {
      if (Math.random() > 0.5) { // 50% chance
        const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        triggerRandomEvent(randomEvent);
      }
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [triggerRandomEvent]);

  return null; // Purely logical component
}
