"use client";

import { useJourneyMode } from "@/hooks/useJourneyMode";
import { JourneyMode } from "@/lib/carbonmax/types";
import { MODE_CONFIGS } from "@/lib/carbonmax/constants";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const MODE_COLORS: Record<JourneyMode, { bg: string; activeBg: string; taglineBg: string }> = {
  jewel: {
    bg: "bg-accent-gold",
    activeBg: "#F59E0B",
    taglineBg: "#FFFBEB",
  },
  departure: {
    bg: "bg-secondary",
    activeBg: "#3B82F6",
    taglineBg: "#EFF6FF",
  },
  transit: {
    bg: "bg-primary",
    activeBg: "#10B981",
    taglineBg: "#ECFDF5",
  },
};

export function ModeSelector() {
  const { mode, setMode, modeConfig } = useJourneyMode();

  const modes: JourneyMode[] = ["jewel", "departure", "transit"];

  return (
    <div className="space-y-3">
      {/* Mode Tabs */}
      <div className="flex bg-white rounded-lg p-1 shadow-sm border border-border">
        {modes.map((m) => {
          const config = MODE_CONFIGS[m];
          const colors = MODE_COLORS[m];
          const isActive = mode === m;

          return (
            <motion.button
              key={m}
              onClick={() => setMode(m)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md relative",
                "transition-all duration-300",
                isActive
                  ? "text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted"
              )}
              style={isActive ? { backgroundColor: colors.activeBg } : undefined}
            >
              <motion.span
                animate={isActive ? { rotate: [0, 360] } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-lg"
              >
                {config.icon}
              </motion.span>
              <span className="font-display font-medium text-sm">{config.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Mode Tagline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="text-center py-2 px-4 rounded-md"
          style={{ backgroundColor: MODE_COLORS[mode].taglineBg }}
        >
          <p className="text-sm font-medium text-foreground">
            {modeConfig.icon} {modeConfig.tagline}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
