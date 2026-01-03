"use client";

import { useJourneyMode } from "@/hooks/useJourneyMode";
import { JourneyMode } from "@/lib/types";
import { MODE_CONFIGS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

const MODE_COLORS: Record<JourneyMode, string> = {
  jewel: "#F59E0B",
  departure: "#3B82F6",
  transit: "#10B981",
};

export function ModeSelector() {
  const { mode, setMode, modeConfig } = useJourneyMode();
  const modes: JourneyMode[] = ["jewel", "departure", "transit"];

  const getModeColor = (m: JourneyMode) => {
    return MODE_COLORS[m];
  };

  return (
    <div className="space-y-4">
      {/* Tab Bar with glassmorphism - 16px radius for component */}
      <GlassCard className="p-1">
        <div className="flex">
          {modes.map((m) => {
            const config = MODE_CONFIGS[m];
            const isActive = mode === m;
            const modeColor = getModeColor(m);

            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-display font-medium transition-all duration-200 relative",
                  isActive
                    ? "text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
                style={isActive ? { backgroundColor: modeColor } : undefined}
              >
                <span>{config.icon}</span>
                <span>{config.name}</span>
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Tagline - subtle */}
      <motion.p
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-muted-foreground font-medium"
      >
        {modeConfig.icon} {modeConfig.tagline}
      </motion.p>
    </div>
  );
}

