"use client";

import { Quest } from "@/lib/carbonmax/types";
import { cn } from "@/lib/utils";
import { Clock, ChevronRight, Check } from "lucide-react";

interface QuestCardProps {
  quest: Quest;
  isCompleted?: boolean;
  onStartQuest: (questId: string) => void;
}

export function QuestCard({ quest, isCompleted = false, onStartQuest }: QuestCardProps) {
  const totalPossiblePoints = quest.basePoints + (quest.bonusPoints || 0);

  return (
    <div
      className={cn(
        "quest-card cursor-pointer",
        isCompleted && "bg-eco-lime/10 border-eco-leaf/30"
      )}
      onClick={() => onStartQuest(quest.id)}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
            isCompleted ? "bg-eco-leaf/20" : "bg-gray-100"
          )}
        >
          {isCompleted ? "✅" : quest.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{quest.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
                {quest.description}
              </p>
            </div>
          </div>

          {/* Meta Row */}
          <div className="flex items-center gap-3 mt-3">
            {/* Points Badge */}
            <span
              className={cn(
                "points-badge",
                isCompleted && "bg-eco-leaf/20 text-eco-forest"
              )}
            >
              {isCompleted ? "Completed" : `+${quest.basePoints} pts`}
            </span>

            {/* Bonus Indicator */}
            {!isCompleted && quest.bonusPoints && (
              <span className="text-xs text-gray-400">
                Up to +{totalPossiblePoints}
              </span>
            )}

            {/* Time Estimate */}
            {quest.estimatedTime && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {quest.estimatedTime}
              </span>
            )}

            {/* Arrow */}
            <ChevronRight className="w-5 h-5 text-gray-300 ml-auto flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

