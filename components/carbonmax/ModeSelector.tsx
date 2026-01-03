"use client";

import { useJourneyMode } from "@/hooks/useJourneyMode";
import { JourneyMode } from "@/lib/carbonmax/types";
import { MODE_CONFIGS } from "@/lib/carbonmax/constants";
import { cn } from "@/lib/utils";

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
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md",
                "transition-all duration-200",
                isActive
                  ? "text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:-translate-y-0.5"
              )}
              style={isActive ? { backgroundColor: colors.activeBg } : undefined}
            >
              <span className="text-lg">{config.icon}</span>
              <span className="font-display font-medium text-sm">{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mode Tagline */}
      <div
        className="text-center py-2 px-4 rounded-md transition-all duration-300"
        style={{ backgroundColor: MODE_COLORS[mode].taglineBg }}
      >
        <p className="text-sm font-medium text-foreground">
          {modeConfig.icon} {modeConfig.tagline}
        </p>
      </div>
    </div>
  );
}
