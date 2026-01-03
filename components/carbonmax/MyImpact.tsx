"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function MyImpact() {
  const { userImpact } = useQuestProgress();

  const stats = [
    {
      value: userImpact.questsCompleted,
      label: "Quests",
      icon: "🎯",
    },
    {
      value: `${userImpact.co2Avoided.toFixed(0)} kg`,
      label: "CO₂ Saved",
      icon: "🌍",
    },
    {
      value: `${userImpact.plasticSaved}g`,
      label: "Plastic Saved",
      icon: "♻️",
    },
  ];

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className="card-base"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="impact-icon text-2xl"
          >
            🌍
          </motion.span> My Impact
        </h3>
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/carbonmax/impact"
            className="text-sm text-primary font-medium flex items-center gap-1 hover:underline group"
          >
            Full Story <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1, y: -4 }}
            className="impact-stat cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: [0, -15, 15, -15, 0] }}
              transition={{ duration: 0.5 }}
              className="text-xl mb-1 filter drop-shadow-sm"
            >
              {stat.icon}
            </motion.div>
            <div className="font-mono font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Trees Equivalent */}
      {userImpact.treesEquivalent > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="bg-success-light rounded-lg p-3 text-center"
        >
          <p className="text-sm text-success-dark">
            <motion.span
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block mr-1"
            >
              🌳
            </motion.span> Equivalent to{" "}
            <span className="font-mono font-bold">
              {userImpact.treesEquivalent.toFixed(1)} trees
            </span>{" "}
            absorbing CO₂ for a year
          </p>
        </motion.div>
      )}

      {/* Empty State */}
      {userImpact.questsCompleted === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center py-4"
        >
          <p className="text-muted-foreground text-sm">
            Complete your first quest to start tracking your impact!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
