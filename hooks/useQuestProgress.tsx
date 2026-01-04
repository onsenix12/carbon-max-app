"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { QuestProgress, UserImpact, UserTierProgress, QuestExtraData } from "@/lib/types";
import { GREEN_TIERS } from "@/lib/constants";

interface QuestProgressContextType {
  completedQuests: string[];
  questProgress: Record<string, QuestProgress>;
  totalPoints: number;
  userImpact: UserImpact;
  tierProgress: UserTierProgress;
  
  startQuest: (questId: string) => void;
  completeQuest: (questId: string, points: number, bonus: boolean, extraData?: QuestExtraData) => void;
  isQuestCompleted: (questId: string) => boolean;
  isQuestInProgress: (questId: string) => boolean;
}

const QuestProgressContext = createContext<QuestProgressContextType | undefined>(undefined);

const STORAGE_KEY = "carbonmax-quest-progress";

function calculateTierProgress(points: number): UserTierProgress {
  let currentTier = GREEN_TIERS[0];
  let nextTier = GREEN_TIERS[1];
  
  for (let i = 0; i < GREEN_TIERS.length; i++) {
    const tier = GREEN_TIERS[i];
    if (points >= tier.minPoints && (tier.maxPoints === null || points <= tier.maxPoints)) {
      currentTier = tier;
      nextTier = GREEN_TIERS[i + 1] || null;
      break;
    }
  }
  
  const pointsToNextTier = nextTier ? nextTier.minPoints - points : 0;
  const tierRange = currentTier.maxPoints ? currentTier.maxPoints - currentTier.minPoints : 1000;
  const progressInTier = points - currentTier.minPoints;
  const progressPercent = Math.min((progressInTier / tierRange) * 100, 100);
  
  return {
    currentTier,
    nextTier,
    totalPoints: points,
    pointsToNextTier,
    progressPercent,
  };
}

export function QuestProgressProvider({ children }: { children: ReactNode }) {
  const [questProgress, setQuestProgress] = useState<Record<string, QuestProgress>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [userImpact, setUserImpact] = useState<UserImpact>({
    questsCompleted: 0,
    totalPointsEarned: 0,
    co2Avoided: 0,
    plasticSaved: 0,
    treesEquivalent: 0,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setQuestProgress(data.questProgress || {});
        setTotalPoints(data.totalPoints || 0);
        setUserImpact(data.userImpact || userImpact);
      } catch (e) {
        console.error("Failed to parse quest progress:", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        questProgress,
        totalPoints,
        userImpact,
      }));
    }
  }, [questProgress, totalPoints, userImpact, isHydrated]);

  const completedQuests = Object.keys(questProgress).filter(
    (id) => questProgress[id].status === "completed"
  );

  const startQuest = (questId: string) => {
    setQuestProgress((prev) => ({
      ...prev,
      [questId]: {
        questId,
        status: "in-progress",
        startedAt: new Date().toISOString(),
        pointsEarned: 0,
        bonusEarned: false,
      },
    }));
  };

  const completeQuest = (
    questId: string,
    points: number,
    bonus: boolean,
    extraData?: QuestExtraData
  ) => {
    const newTotalPoints = totalPoints + points;
    
    setQuestProgress((prev) => ({
      ...prev,
      [questId]: {
        questId,
        status: "completed",
        startedAt: prev[questId]?.startedAt,
        completedAt: new Date().toISOString(),
        pointsEarned: points,
        bonusEarned: bonus,
        extraData,
      },
    }));
    
    setTotalPoints(newTotalPoints);
    
    setUserImpact((prev) => ({
      questsCompleted: prev.questsCompleted + 1,
      totalPointsEarned: newTotalPoints,
      co2Avoided: prev.co2Avoided + (extraData?.co2Avoided || 0),
      plasticSaved: prev.plasticSaved + (extraData?.plasticSaved || 0),
      treesEquivalent: (prev.co2Avoided + (extraData?.co2Avoided || 0)) / 21,
    }));
  };

  const isQuestCompleted = (questId: string) => {
    return questProgress[questId]?.status === "completed";
  };

  const isQuestInProgress = (questId: string) => {
    return questProgress[questId]?.status === "in-progress";
  };

  const tierProgress = calculateTierProgress(totalPoints);

  if (!isHydrated) {
    return null;
  }

  return (
    <QuestProgressContext.Provider
      value={{
        completedQuests,
        questProgress,
        totalPoints,
        userImpact,
        tierProgress,
        startQuest,
        completeQuest,
        isQuestCompleted,
        isQuestInProgress,
      }}
    >
      {children}
    </QuestProgressContext.Provider>
  );
}

export function useQuestProgress() {
  const context = useContext(QuestProgressContext);
  if (context === undefined) {
    throw new Error("useQuestProgress must be used within a QuestProgressProvider");
  }
  return context;
}

