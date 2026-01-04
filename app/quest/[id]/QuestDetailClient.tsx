"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJourneyMode } from "@/hooks/useJourneyMode";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Quest, QuestExtraData } from "@/lib/types";
import { GreenPlateQuest } from "@/components/quests/GreenPlateQuest";
import { GreenFlightQuest } from "@/components/quests/GreenFlightQuest";
import { HydrationQuest } from "@/components/quests/HydrationQuest";
import { QuestComplete } from "@/components/QuestComplete";
import { ArrowLeft, Clock, Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ROUTES } from "@/lib/routes";

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
    extraData?: QuestExtraData;
  } | null>(null);

  const alreadyCompleted = isQuestCompleted(quest.id);

  // Mode-specific colors
  const modeColors = {
    jewel: { bg: "bg-mode-jewel-bg", accent: "bg-mode-jewel", text: "text-mode-jewel-dark" },
    departure: { bg: "bg-mode-departure-bg", accent: "bg-mode-departure", text: "text-mode-departure" },
    transit: { bg: "bg-mode-transit-bg", accent: "bg-mode-transit", text: "text-mode-transit" },
  };

  const colors = modeColors[quest.mode];

  const handleComplete = (points: number, bonus: boolean, extraData?: QuestExtraData) => {
    completeQuest(quest.id, points, bonus, extraData);
    setCompletionData({ points, bonus, extraData });
    setShowCelebration(true);
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    router.push(ROUTES.CARBONMAX);
  };

  const renderQuestContent = () => {
    if (alreadyCompleted) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-foreground mb-2">Quest Completed!</h3>
          <p className="text-muted-foreground mb-6">You've already finished this quest.</p>
          <Button onClick={() => router.push(ROUTES.CARBONMAX)}>
            Back to Quests
          </Button>
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
        return <div className="text-center py-8 text-muted-foreground">Quest content not available</div>;
    }
  };

  return (
    <div className={cn("min-h-screen", colors.bg)}>
      {/* Header with glassmorphism */}
      <div className="glass-strong border-b border-border sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href={ROUTES.CARBONMAX} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <Badge
              variant={
                quest.mode === "jewel"
                  ? "warning"
                  : quest.mode === "departure"
                  ? "info"
                  : "success"
              }
            >
              {quest.mode.charAt(0).toUpperCase() + quest.mode.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quest Header */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-4">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{quest.icon}</div>
          <h1 className="text-2xl font-display font-bold text-foreground">{quest.title}</h1>
          <p className="text-muted-foreground mt-2">{quest.description}</p>

          {/* Meta */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="points-badge text-base">
              +{quest.basePoints} pts
            </span>
            {quest.bonusPoints && (
              <span className="text-sm text-warning">
                Up to +{quest.basePoints + quest.bonusPoints}
              </span>
            )}
            {quest.estimatedTime && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {quest.estimatedTime}
              </span>
            )}
          </div>
        </div>

        {/* Carbon Fact - using glass card */}
        <GlassCard className="p-4 mb-6">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Carbon Fact</p>
              <p className="text-sm text-muted-foreground mt-1">{quest.carbonFact}</p>
            </div>
          </div>
        </GlassCard>

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

