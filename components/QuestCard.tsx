"use client";

import { Quest } from "@/lib/types";
import { Clock, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";
import { Badge } from "./Badge";

interface QuestCardProps {
  quest: Quest;
  completed: boolean;
  onStart: () => void;
}

export function QuestCard({ quest, completed, onStart }: QuestCardProps) {
  return (
    <motion.div
      whileHover={{ scale: completed ? 1 : 1.02 }}
      whileTap={{ scale: completed ? 1 : 0.98 }}
      className={cn(
        "w-full relative",
        completed && "opacity-60"
      )}
    >
      <GlassCard
        onClick={completed ? undefined : onStart}
        className={cn(
          "p-5 text-left",
          !completed && "cursor-pointer"
        )}
      >
        {/* Points badge - top right */}
        <div className="absolute top-4 right-4">
          <Badge variant="success">
            +{quest.basePoints} pts
          </Badge>
        </div>

        <div className="flex items-start gap-4 pr-20">
          {/* Icon - larger and more prominent, 16px radius as per design system */}
          <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 flex items-center justify-center text-3xl flex-shrink-0">
            {completed ? <Check className="w-7 h-7 text-[#10B981]" /> : quest.icon}
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
      </GlassCard>
    </motion.div>
  );
}

