"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { JourneyMode, ModeConfig } from "@/lib/carbonmax/types";
import { MODE_CONFIGS } from "@/lib/carbonmax/constants";

interface JourneyModeContextType {
  mode: JourneyMode;
  setMode: (mode: JourneyMode) => void;
  modeConfig: ModeConfig;
}

const JourneyModeContext = createContext<JourneyModeContextType | undefined>(undefined);

const STORAGE_KEY = "carbonmax-journey-mode";

export function JourneyModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<JourneyMode>("jewel");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "jewel" || stored === "departure" || stored === "transit")) {
      setModeState(stored as JourneyMode);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when mode changes
  const setMode = (newMode: JourneyMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const modeConfig = MODE_CONFIGS[mode];

  // Prevent hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <JourneyModeContext.Provider value={{ mode, setMode, modeConfig }}>
      {children}
    </JourneyModeContext.Provider>
  );
}

export function useJourneyMode() {
  const context = useContext(JourneyModeContext);
  if (context === undefined) {
    throw new Error("useJourneyMode must be used within a JourneyModeProvider");
  }
  return context;
}

