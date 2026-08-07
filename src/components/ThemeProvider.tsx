"use client";

import { useEffect } from "react";
import { useEarthStore } from "@/store/useEarthStore";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useEarthStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}
