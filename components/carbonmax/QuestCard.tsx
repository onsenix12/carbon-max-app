"use client";

import { Quest } from "@/lib/carbonmax/types";
import { cn } from "@/lib/utils";
import { Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface QuestCardProps {
  quest: Quest;
  isCompleted?: boolean;
  onStartQuest: (questId: string) => void;
}

export function QuestCard({ quest, isCompleted = false, onStartQuest }: QuestCardProps) {
  const totalPossiblePoints = quest.basePoints + (quest.bonusPoints || 0);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group bg-white rounded-md p-4 shadow border border-border cursor-pointer",
        "transition-all duration-300 hover:shadow-lg",
        isCompleted && "bg-success-light/30 border-success/30"
      )}
      onClick={() => onStartQuest(quest.id)}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0",
            "transition-all duration-300 group-hover:scale-110",
            isCompleted ? "bg-success/20" : "bg-muted group-hover:bg-primary/10"
          )}
        >
          {isCompleted ? "✅" : quest.icon}
        </motion.div>

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
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground/50 ml-auto flex-shrink-0 group-hover:text-primary transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
