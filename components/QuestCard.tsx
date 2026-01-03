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
        "w-full text-left card-premium",
        completed && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
          {completed ? <Check className="w-6 h-6 text-green-600" /> : quest.icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-gray-900 mb-1">{quest.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{quest.description}</p>
          
          {/* Meta row */}
          <div className="flex items-center gap-3 mt-3">
            <span className="badge-minimal badge-success">
              +{quest.basePoints} pts
            </span>
            {quest.estimatedTime && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                {quest.estimatedTime}
              </span>
            )}
          </div>
        </div>
        
        {/* Arrow */}
        {!completed && (
          <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
        )}
      </div>
    </motion.button>
  );
}

