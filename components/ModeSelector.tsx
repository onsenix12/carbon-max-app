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

  return (
    <div className="space-y-4">
      {/* Clean Tab Bar */}
      <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
        {modes.map((m) => {
          const config = MODE_CONFIGS[m];
          const isActive = mode === m;

          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
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
        className="text-center text-sm text-gray-500"
      >
        {modeConfig.icon} {modeConfig.tagline}
      </motion.p>
    </div>
  );
}

