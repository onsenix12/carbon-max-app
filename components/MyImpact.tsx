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
    <div className="card-premium">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">My Impact</h3>
        <Link href="/impact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
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
            <stat.icon className="w-5 h-5 text-gray-400 mx-auto mb-2" />
            <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {userImpact.questsCompleted === 0 && (
        <p className="text-center text-sm text-gray-400 mt-4 pt-4 border-t border-gray-100">
          Complete your first quest to start tracking your impact!
        </p>
      )}
    </div>
  );
}

