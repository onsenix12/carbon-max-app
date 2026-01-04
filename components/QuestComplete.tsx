"use client";

import { Quest, QuestExtraData } from "@/lib/types";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { X, Share2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestCompleteProps {
  isOpen: boolean;
  quest: Quest;
  pointsEarned: number;
  bonusEarned: boolean;
  extraData?: QuestExtraData;
  onClose: () => void;
}

export function QuestComplete({
  isOpen,
  quest,
  pointsEarned,
  bonusEarned,
  extraData,
  onClose,
}: QuestCompleteProps) {
  const { tierProgress } = useQuestProgress();

  if (!isOpen) return null;

  const basePoints = quest.basePoints;
  const bonusPoints = bonusEarned ? (quest.bonusPoints || 0) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-sm overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-success-dark p-6 text-center text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="text-6xl mb-3 animate-celebrate"
              >
                🎉
              </motion.div>
              <h2 className="font-display text-2xl font-bold">Quest Complete!</h2>
              <p className="text-white/80 mt-1">{quest.title}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Points Breakdown */}
              <div className="bg-muted rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base points</span>
                    <span className="font-mono font-medium">+{basePoints}</span>
                  </div>
                  {bonusEarned && (
                    <div className="flex justify-between text-accent-gold">
                      <span>Bonus!</span>
                      <span className="font-mono font-medium">+{bonusPoints}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold text-foreground">Total earned</span>
                    <span className="font-mono font-bold text-primary text-lg">+{pointsEarned} pts</span>
                  </div>
                </div>
              </div>

              {/* Impact */}
              {extraData?.co2Avoided && extraData.co2Avoided > 0 && (
                <div className="bg-success-light rounded-lg p-4 text-center">
                  <p className="text-sm text-success-dark">
                    🌍 You avoided{" "}
                    <span className="font-mono font-bold">{extraData.co2Avoided} kg CO₂</span>
                  </p>
                </div>
              )}

              {/* Tier Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tier Progress</span>
                  <span className="font-medium">
                    {tierProgress.currentTier.icon} {tierProgress.currentTier.name}
                  </span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tierProgress.progressPercent}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="progress-fill"
                  />
                </div>
                {tierProgress.nextTier && (
                  <p className="text-xs text-muted-foreground mt-1 text-center font-mono">
                    {tierProgress.pointsToNextTier} pts to {tierProgress.nextTier.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    alert("Share feature coming soon!");
                  }}
                  className="flex-1 py-3 px-4 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

