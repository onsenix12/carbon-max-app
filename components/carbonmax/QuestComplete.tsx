"use client";

import { Quest } from "@/lib/carbonmax/types";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { X, Share2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestCompleteProps {
  isOpen: boolean;
  quest: Quest;
  pointsEarned: number;
  bonusEarned: boolean;
  extraData?: Record<string, any>;
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
            className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-eco-leaf to-eco-forest p-6 text-center text-white relative">
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
                className="text-6xl mb-3"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold">Quest Complete!</h2>
              <p className="text-white/80 mt-1">{quest.title}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Points Breakdown */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base points</span>
                    <span className="font-medium">+{basePoints}</span>
                  </div>
                  {bonusEarned && (
                    <div className="flex justify-between text-amber-600">
                      <span>Bonus!</span>
                      <span className="font-medium">+{bonusPoints}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total earned</span>
                    <span className="font-bold text-eco-leaf text-lg">+{pointsEarned} pts</span>
                  </div>
                </div>
              </div>

              {/* Impact */}
              {extraData?.co2Avoided && extraData.co2Avoided > 0 && (
                <div className="bg-eco-lime/30 rounded-xl p-4 text-center">
                  <p className="text-sm text-eco-forest">
                    🌍 You avoided{" "}
                    <span className="font-bold">{extraData.co2Avoided} kg CO₂</span>
                  </p>
                </div>
              )}

              {/* Tier Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">Tier Progress</span>
                  <span className="font-medium">
                    {tierProgress.currentTier.icon} {tierProgress.currentTier.name}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tierProgress.progressPercent}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-eco-leaf to-eco-mint"
                  />
                </div>
                {tierProgress.nextTier && (
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {tierProgress.pointsToNextTier} pts to {tierProgress.nextTier.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // TODO: Implement share
                    alert("Share feature coming soon!");
                  }}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-eco-leaf text-white rounded-xl font-medium hover:bg-eco-forest transition-colors flex items-center justify-center gap-2"
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

