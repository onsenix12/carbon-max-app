"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJourneyMode } from "@/hooks/useJourneyMode";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Quest } from "@/lib/carbonmax/types";
import { GreenPlateQuest } from "@/components/carbonmax/quests/GreenPlateQuest";
import { GreenFlightQuest } from "@/components/carbonmax/quests/GreenFlightQuest";
import { HydrationQuest } from "@/components/carbonmax/quests/HydrationQuest";
import { QuestComplete } from "@/components/carbonmax/QuestComplete";
import { ArrowLeft, Clock, Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuestDetailClientProps {
  quest: Quest;
}

export function QuestDetailClient({ quest }: QuestDetailClientProps) {
  const router = useRouter();
  const { mode } = useJourneyMode();
  const { isQuestCompleted, completeQuest } = useQuestProgress();

  const [showCelebration, setShowCelebration] = useState(false);
  const [completionData, setCompletionData] = useState<{
    points: number;
    bonus: boolean;
    extraData?: Record<string, any>;
  } | null>(null);

  const alreadyCompleted = isQuestCompleted(quest.id);

  // Mode-specific colors
  const modeColors = {
    jewel: { bg: "bg-mode-jewel-bg", accent: "bg-mode-jewel", text: "text-mode-jewel-dark" },
    departure: { bg: "bg-mode-departure-bg", accent: "bg-mode-departure", text: "text-mode-departure" },
    transit: { bg: "bg-mode-transit-bg", accent: "bg-mode-transit", text: "text-mode-transit" },
  };

  const colors = modeColors[quest.mode];

  const handleComplete = (points: number, bonus: boolean, extraData?: Record<string, any>) => {
    completeQuest(quest.id, points, bonus, extraData);
    setCompletionData({ points, bonus, extraData });
    setShowCelebration(true);
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    router.push("/carbonmax");
  };

  const renderQuestContent = () => {
    if (alreadyCompleted) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quest Completed!</h3>
          <p className="text-gray-500 mb-6">You've already finished this quest.</p>
          <Link
            href="/carbonmax"
            className="inline-flex items-center gap-2 px-6 py-3 bg-eco-leaf text-white rounded-xl font-medium hover:bg-eco-forest transition-colors"
          >
            Back to Quests
          </Link>
        </div>
      );
    }

    switch (quest.id) {
      case "jewel-green-plate":
        return <GreenPlateQuest quest={quest} onComplete={handleComplete} />;
      case "departure-green-flight":
        return <GreenFlightQuest quest={quest} onComplete={handleComplete} />;
      case "transit-hydration":
        return <HydrationQuest quest={quest} onComplete={handleComplete} />;
      default:
        return <div className="text-center py-8 text-gray-500">Quest content not available</div>;
    }
  };

  return (
    <div className={cn("min-h-screen", colors.bg)}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/carbonmax" className="flex items-center gap-2 text-gray-600">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium text-white",
                colors.accent
              )}
              style={{
                backgroundColor:
                  quest.mode === "jewel"
                    ? "#F5A623"
                    : quest.mode === "departure"
                    ? "#1E3A8A"
                    : "#0D9488",
              }}
            >
              {quest.mode.charAt(0).toUpperCase() + quest.mode.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Quest Header */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-4">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{quest.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900">{quest.title}</h1>
          <p className="text-gray-500 mt-2">{quest.description}</p>

          {/* Meta */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="points-badge text-base">
              +{quest.basePoints} pts
            </span>
            {quest.bonusPoints && (
              <span className="text-sm text-amber-600">
                Up to +{quest.basePoints + quest.bonusPoints}
              </span>
            )}
            {quest.estimatedTime && (
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {quest.estimatedTime}
              </span>
            )}
          </div>
        </div>

        {/* Carbon Fact */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 text-sm">Carbon Fact</p>
              <p className="text-sm text-gray-600 mt-1">{quest.carbonFact}</p>
            </div>
          </div>
        </div>

        {/* Quest-Specific Content */}
        {renderQuestContent()}
      </div>

      {/* Celebration Modal */}
      {completionData && (
        <QuestComplete
          isOpen={showCelebration}
          quest={quest}
          pointsEarned={completionData.points}
          bonusEarned={completionData.bonus}
          extraData={completionData.extraData}
          onClose={handleCloseCelebration}
        />
      )}
    </div>
  );
}

