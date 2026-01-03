"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TierProgressBar() {
  const { tierProgress } = useQuestProgress();
  const { currentTier, nextTier, totalPoints, pointsToNextTier, progressPercent } = tierProgress;
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercent);
    }, 300);
    return () => clearTimeout(timer);
  }, [progressPercent]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01, y: -1 }}
      className="card-premium"
    >
      {/* Tier Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <span className="text-xl">{currentTier.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-gray-900 text-lg">{currentTier.name}</span>
              {nextTier && (
                <>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-500 text-sm font-medium">{nextTier.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <motion.span
            key={totalPoints}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono font-bold text-primary text-lg"
          >
            {totalPoints.toLocaleString()}
          </motion.span>
          {nextTier && (
            <span className="text-gray-500 text-sm"> / {nextTier.minPoints.toLocaleString()}</span>
          )}
        </div>
      </div>

      {/* Progress Bar - cleaner design */}
      <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary-dark)) 100%)"
          }}
        />
      </div>

      {/* Progress Text - simplified */}
      {nextTier ? (
        <p className="text-xs text-gray-600 text-center">
          <span className="font-mono font-semibold text-gray-900">{pointsToNextTier}</span> pts to unlock{" "}
          <span className="font-semibold text-gray-900">{nextTier.name}</span>
        </p>
      ) : (
        <p className="text-xs text-success-dark text-center font-semibold">
          Maximum tier achieved!
        </p>
      )}
    </motion.div>
  );
}

