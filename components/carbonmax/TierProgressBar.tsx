"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { cn } from "@/lib/utils";

export function TierProgressBar() {
  const { tierProgress } = useQuestProgress();
  const { currentTier, nextTier, totalPoints, pointsToNextTier, progressPercent } = tierProgress;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Tier Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentTier.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{currentTier.name}</span>
              {nextTier && (
                <>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-500 text-sm">{nextTier.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="font-bold text-eco-leaf">{totalPoints.toLocaleString()}</span>
          {nextTier && (
            <span className="text-gray-400 text-sm"> / {nextTier.minPoints.toLocaleString()} pts</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="absolute h-full bg-gradient-to-r from-eco-leaf to-eco-mint rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Progress Text */}
      {nextTier ? (
        <p className="text-xs text-gray-500 text-center">
          🎯 <span className="font-medium">{pointsToNextTier}</span> pts to unlock{" "}
          <span className="font-medium">{nextTier.name}</span> tier
        </p>
      ) : (
        <p className="text-xs text-eco-forest text-center font-medium">
          🏆 Maximum tier achieved!
        </p>
      )}
    </div>
  );
}

