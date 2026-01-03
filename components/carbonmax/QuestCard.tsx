"use client";

import { Quest } from "@/lib/carbonmax/types";
import { cn } from "@/lib/utils";
import { Clock, ChevronRight } from "lucide-react";

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
        "group bg-white rounded-md p-4 shadow border border-border cursor-pointer",
        "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        isCompleted && "bg-success-light/30 border-success/30"
      )}
      onClick={() => onStartQuest(quest.id)}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0",
            "transition-transform duration-200 group-hover:scale-105",
            isCompleted ? "bg-success/20" : "bg-muted"
          )}
        >
          {isCompleted ? "✅" : quest.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-foreground truncate">
                {quest.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                {quest.description}
              </p>
            </div>
          </div>

          {/* Meta Row */}
          <div className="flex items-center gap-3 mt-3">
            {/* Points Badge */}
            <span
              className={cn(
                "badge",
                isCompleted ? "badge-success" : "bg-success-light text-success-dark"
              )}
            >
              {isCompleted ? "Completed" : `+${quest.basePoints} pts`}
            </span>

            {/* Bonus Indicator */}
            {!isCompleted && quest.bonusPoints && (
              <span className="text-xs text-muted-foreground">
                Up to +{totalPossiblePoints}
              </span>
            )}

            {/* Time Estimate */}
            {quest.estimatedTime && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {quest.estimatedTime}
              </span>
            )}

            {/* Arrow */}
            <ChevronRight className="w-5 h-5 text-muted-foreground/50 ml-auto flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
