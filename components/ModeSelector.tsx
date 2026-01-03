"use client";

import { useJourneyMode } from "@/hooks/useJourneyMode";
import { JourneyMode } from "@/lib/types";
import { MODE_CONFIGS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      {/* Clean Tab Bar with mode color accents */}
      <div className="flex bg-white/70 backdrop-blur-sm rounded-3xl p-1.5 shadow-sm border border-gray-100/50">
        {modes.map((m) => {
          const config = MODE_CONFIGS[m];
          const isActive = mode === m;
          const modeColor = getModeColor(m);

          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-semibold transition-all duration-200 relative",
                isActive
                  ? "text-gray-900 bg-gray-50/50"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {isActive && (
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full"
                  style={{ backgroundColor: modeColor }}
                />
              )}
              <span>{config.icon}</span>
              <span>{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tagline - subtle */}
      <motion.p
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm text-gray-600 font-medium"
      >
        {modeConfig.icon} {modeConfig.tagline}
      </motion.p>
    </div>
  );
}

