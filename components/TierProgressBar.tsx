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
      whileHover={{ scale: 1.02, y: -2 }}
      className="card-base"
    >
      {/* Tier Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-2xl"
          >
            {currentTier.icon}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-foreground">{currentTier.name}</span>
              {nextTier && (
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-muted-foreground"
                >
                  →
                </motion.span>
              )}
              {nextTier && (
                <span className="text-muted-foreground text-sm">{nextTier.name}</span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <motion.span
            key={totalPoints}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-mono font-bold text-primary"
          >
            {totalPoints.toLocaleString()}
          </motion.span>
          {nextTier && (
            <span className="text-muted-foreground text-sm"> / {nextTier.minPoints.toLocaleString()} pts</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-2 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="progress-fill h-full"
        />
      </div>

      {/* Progress Text */}
      {nextTier ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs text-muted-foreground text-center"
        >
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="inline-block"
          >
            🎯
          </motion.span>{" "}
          <span className="font-medium font-mono">{pointsToNextTier}</span> pts to unlock{" "}
          <span className="font-medium">{nextTier.name}</span> tier
        </motion.p>
      ) : (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-xs text-success-dark text-center font-medium"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            🏆
          </motion.span>{" "}
          Maximum tier achieved!
        </motion.p>
      )}
    </motion.div>
  );
}

