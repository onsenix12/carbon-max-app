"use client";

import { Quest } from "@/lib/types";
import { Clock, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestCardProps {
  quest: Quest;
  completed: boolean;
  onStart: () => void;
}

export function QuestCard({ quest, completed, onStart }: QuestCardProps) {
  return (
    <motion.button
      onClick={onStart}
      disabled={completed}
      whileHover={{ scale: completed ? 1 : 1.01 }}
      whileTap={{ scale: completed ? 1 : 0.99 }}
      className={cn(
        "w-full text-left card-premium relative",
        completed && "opacity-60"
      )}
    >
      {/* Points badge - top right */}
      <div className="absolute top-4 right-4">
        <span className="badge-minimal badge-success">
          +{quest.basePoints} pts
        </span>
      </div>

      <div className="flex items-start gap-4 pr-20">
        {/* Icon - larger and more prominent */}
        <div className="w-14 h-14 rounded-3xl bg-muted flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
          {completed ? <Check className="w-7 h-7 text-success" /> : quest.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-foreground mb-1.5 text-lg">{quest.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{quest.description}</p>
          
          {/* Meta row */}
          {quest.estimatedTime && (
            <div className="flex items-center gap-1 mt-3">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{quest.estimatedTime}</span>
            </div>
          )}
        </div>
        
        {/* Arrow */}
        {!completed && (
          <ChevronRight className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-1" />
        )}
      </div>
    </motion.button>
  );
}

