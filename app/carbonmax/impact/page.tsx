"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ArrowLeft, Share2, TreePine, Droplets, Plane, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ImpactPage() {
  const { userImpact, completedQuests, tierProgress } = useQuestProgress();

  const impactStats = [
    {
      icon: <TreePine className="w-6 h-6" />,
      value: `${userImpact.co2Avoided.toFixed(1)} kg`,
      label: "CO₂ Avoided",
      color: "text-eco-leaf",
      bgColor: "bg-eco-lime/30",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      value: `${userImpact.plasticSaved}g`,
      label: "Plastic Saved",
      color: "text-mode-transit",
      bgColor: "bg-mode-transit-accent",
    },
    {
      icon: <Plane className="w-6 h-6" />,
      value: completedQuests.length.toString(),
      label: "Quests Done",
      color: "text-mode-departure",
      bgColor: "bg-mode-departure-accent",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      value: userImpact.totalPointsEarned.toLocaleString(),
      label: "Eco-Points",
      color: "text-mode-jewel-dark",
      bgColor: "bg-mode-jewel-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-leaf to-eco-forest">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/carbonmax" className="flex items-center gap-2 text-white/80">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <button className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-md mx-auto px-4 pt-8 pb-12 text-center text-white">
        <div className="text-6xl mb-4">🌍</div>
        <h1 className="text-3xl font-bold mb-2">Your Impact Story</h1>
        <p className="text-white/80">
          Every action counts. Here's what you've achieved.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-t-3xl pt-8 pb-4 px-4 -mt-4">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-4 text-center`}
              >
                <div className={`${stat.color} flex justify-center mb-2`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tree Equivalent */}
          {userImpact.treesEquivalent > 0 && (
            <div className="bg-eco-lime/30 rounded-2xl p-6 text-center mb-8">
              <div className="text-4xl mb-3">🌳</div>
              <p className="text-gray-900">
                Your impact equals{" "}
                <span className="font-bold text-eco-forest text-2xl">
                  {userImpact.treesEquivalent.toFixed(1)}
                </span>{" "}
                trees
              </p>
              <p className="text-sm text-gray-600 mt-1">
                absorbing CO₂ for an entire year
              </p>
            </div>
          )}

          {/* Current Tier */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tierProgress.currentTier.icon}</span>
                <div>
                  <div className="font-bold text-gray-900">
                    {tierProgress.currentTier.name}
                  </div>
                  <div className="text-sm text-gray-500">Current Tier</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-eco-leaf">
                  {tierProgress.totalPoints.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Eco-Points</div>
              </div>
            </div>

            {tierProgress.nextTier && (
              <>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-eco-leaf to-eco-mint transition-all duration-500"
                    style={{ width: `${tierProgress.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {tierProgress.pointsToNextTier} pts to{" "}
                  {tierProgress.nextTier.icon} {tierProgress.nextTier.name}
                </p>
              </>
            )}
          </div>

          {/* Empty State */}
          {userImpact.questsCompleted === 0 && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-bold text-gray-900 mb-2">Start Your Journey</h3>
              <p className="text-gray-500 mb-6">
                Complete your first quest to begin building your impact story!
              </p>
              <Link
                href="/carbonmax"
                className="inline-flex items-center gap-2 px-6 py-3 bg-eco-leaf text-white rounded-xl font-medium"
              >
                Explore Quests
              </Link>
            </div>
          )}

          {/* Motivational Footer */}
          {userImpact.questsCompleted > 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">
                "Every small action adds up to big change." 🌿
              </p>
            </div>
          )}

          {/* Spacer for safe area */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}

