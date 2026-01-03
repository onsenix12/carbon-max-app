"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Leaf, Droplets, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function MyImpact() {
  const { userImpact } = useQuestProgress();

  const stats = [
    { icon: Award, value: userImpact.questsCompleted, label: "Quests" },
    { icon: Leaf, value: `${userImpact.co2Avoided.toFixed(1)}kg`, label: "CO₂ Saved" },
    { icon: Droplets, value: `${userImpact.plasticSaved}g`, label: "Plastic Saved" },
  ];

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-foreground">My Impact</h3>
        <Link href="/impact" className="text-sm text-primary font-medium hover:underline transition-colors flex items-center gap-1">
          Full Story →
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <stat.icon className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
            <p className="font-mono text-xl font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {userImpact.questsCompleted === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
          Complete your first quest to start tracking your impact!
        </p>
      )}
    </div>
  );
}

