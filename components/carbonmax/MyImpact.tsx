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
    <div className="card-base">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
          <span className="impact-icon text-2xl">🌍</span> My Impact
        </h3>
        <Link
          href="/carbonmax/impact"
          className="text-sm text-primary font-medium flex items-center gap-1 hover:underline group"
        >
          Full Story <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="impact-stat">
            <div className="text-xl mb-1 filter drop-shadow-sm">{stat.icon}</div>
            <div className="font-mono font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trees Equivalent */}
      {userImpact.treesEquivalent > 0 && (
        <div className="bg-success-light rounded-lg p-3 text-center">
          <p className="text-sm text-success-dark">
            🌳 Equivalent to{" "}
            <span className="font-mono font-bold">
              {userImpact.treesEquivalent.toFixed(1)} trees
            </span>{" "}
            absorbing CO₂ for a year
          </p>
        </div>
      )}

      {/* Empty State */}
      {userImpact.questsCompleted === 0 && (
        <div className="text-center py-4">
          <p className="text-muted-foreground text-sm">
            Complete your first quest to start tracking your impact!
          </p>
        </div>
      )}
    </div>
  );
}
