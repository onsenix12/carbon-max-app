"use client";

import { useJourneyMode } from "@/hooks/useJourneyMode";
import { JourneyMode } from "@/lib/carbonmax/types";
import { MODE_CONFIGS } from "@/lib/carbonmax/constants";
import { cn } from "@/lib/utils";

export function ModeSelector() {
  const { mode, setMode, modeConfig } = useJourneyMode();

  const modes: JourneyMode[] = ["jewel", "departure", "transit"];

  return (
    <div className="space-y-3">
      {/* Mode Tabs */}
      <div className="flex bg-white rounded-xl p-1 shadow-sm">
        {modes.map((m) => {
          const config = MODE_CONFIGS[m];
          const isActive = mode === m;

          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200",
                isActive
                  ? `bg-${config.color} text-white shadow-md`
                  : "text-gray-500 hover:bg-gray-50"
              )}
              style={
                isActive
                  ? {
                      backgroundColor:
                        m === "jewel"
                          ? "#F5A623"
                          : m === "departure"
                          ? "#1E3A8A"
                          : "#0D9488",
                    }
                  : undefined
              }
            >
              <span className="text-lg">{config.icon}</span>
              <span className="font-medium text-sm">{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mode Tagline */}
      <div
        className={cn(
          "text-center py-2 px-4 rounded-lg transition-all duration-300"
        )}
        style={{
          backgroundColor:
            mode === "jewel"
              ? "#FFFBF0"
              : mode === "departure"
              ? "#F0F7FF"
              : "#F0FDFA",
        }}
      >
        <p className="text-sm font-medium text-gray-700">
          {modeConfig.icon} {modeConfig.tagline}
        </p>
      </div>
    </div>
  );
}

