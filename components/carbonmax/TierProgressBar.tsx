"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";

export function TierProgressBar() {
  const { tierProgress } = useQuestProgress();
  const { currentTier, nextTier, totalPoints, pointsToNextTier, progressPercent } = tierProgress;

  return (
    <div className="card-base">
      {/* Tier Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentTier.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-foreground">{currentTier.name}</span>
              {nextTier && (
                <>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-muted-foreground text-sm">{nextTier.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono font-bold text-primary">{totalPoints.toLocaleString()}</span>
          {nextTier && (
            <span className="text-muted-foreground text-sm"> / {nextTier.minPoints.toLocaleString()} pts</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-2">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Progress Text */}
      {nextTier ? (
        <p className="text-xs text-muted-foreground text-center">
          🎯 <span className="font-medium font-mono">{pointsToNextTier}</span> pts to unlock{" "}
          <span className="font-medium">{nextTier.name}</span> tier
        </p>
      ) : (
        <p className="text-xs text-success-dark text-center font-medium">
          🏆 Maximum tier achieved!
        </p>
      )}
    </div>
  );
}
