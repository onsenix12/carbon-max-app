"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "./GlassCard";
import { ProgressBar } from "./ProgressBar";
import { ROUTES } from "@/lib/routes";

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
      whileHover={{ scale: 1.01 }}
    >
      <Link href={ROUTES.TIERS}>
        <GlassCard className="p-6 cursor-pointer hover:shadow-lg transition-shadow">
        {/* Tier Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981]/10 flex items-center justify-center">
              <span className="text-xl">{currentTier.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-foreground text-lg">{currentTier.name}</span>
                {nextTier && (
                  <>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-muted-foreground text-sm font-medium">{nextTier.name}</span>
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
              className="font-mono font-bold text-[#10B981] text-lg"
            >
              {totalPoints.toLocaleString()}
            </motion.span>
            {nextTier && (
              <span className="text-muted-foreground text-sm"> / {nextTier.minPoints.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Progress Bar - using design system component */}
        <div className="mb-3">
          <ProgressBar
            value={animatedProgress}
            max={100}
            color="#10B981"
            showLabel={false}
          />
        </div>

        {/* Progress Text - simplified */}
        {nextTier ? (
          <p className="text-xs text-muted-foreground text-center">
            <span className="font-mono font-semibold text-foreground">{pointsToNextTier}</span> pts to unlock{" "}
            <span className="font-semibold text-foreground">{nextTier.name}</span>
          </p>
        ) : (
          <p className="text-xs text-[#10B981] text-center font-semibold">
            Maximum tier achieved!
          </p>
        )}
        <div className="mt-2 text-center">
          <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
            View all tiers →
          </span>
        </div>
      </GlassCard>
      </Link>
    </motion.div>
  );
}

