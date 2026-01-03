"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

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
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>🌍</span> My Impact
        </h3>
        <Link
          href="/carbonmax/impact"
          className="text-sm text-eco-leaf font-medium flex items-center gap-1 hover:underline"
        >
          Full Story <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trees Equivalent */}
      {userImpact.treesEquivalent > 0 && (
        <div className="bg-eco-lime/30 rounded-xl p-3 text-center">
          <p className="text-sm text-eco-forest">
            🌳 Equivalent to{" "}
            <span className="font-bold">
              {userImpact.treesEquivalent.toFixed(1)} trees
            </span>{" "}
            absorbing CO₂ for a year
          </p>
        </div>
      )}

      {/* Empty State */}
      {userImpact.questsCompleted === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            Complete your first quest to start tracking your impact!
          </p>
        </div>
      )}
    </div>
  );
}

