"use client";

import { useRouter } from "next/navigation";
import { useJourneyMode } from "@/hooks/useJourneyMode";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ModeSelector } from "@/components/carbonmax/ModeSelector";
import { TierProgressBar } from "@/components/carbonmax/TierProgressBar";
import { QuestCard } from "@/components/carbonmax/QuestCard";
import { MyImpact } from "@/components/carbonmax/MyImpact";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

// Import quest data
import questsData from "@/data/quests.json";
import { Quest } from "@/lib/carbonmax/types";

export default function QuestHubPage() {
  const router = useRouter();
  const { mode, modeConfig } = useJourneyMode();
  const { isQuestCompleted } = useQuestProgress();

  // Filter quests by current mode
  const quests = (questsData.quests as Quest[]).filter((q) => q.mode === mode);
  const availableCount = quests.filter((q) => !isQuestCompleted(q.id)).length;

  const handleStartQuest = (questId: string) => {
    router.push(`/carbonmax/quest/${questId}`);
  };

  // Dynamic background color based on mode
  const bgColor =
    mode === "jewel"
      ? "bg-mode-jewel-bg"
      : mode === "departure"
      ? "bg-mode-departure-bg"
      : "bg-mode-transit-bg";

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <h1 className="font-bold text-lg text-gray-900">CarbonMax</h1>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Tier Progress */}
        <TierProgressBar />

        {/* Mode Selector */}
        <ModeSelector />

        {/* Active Quests Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Active Quests</h2>
            <span className="text-sm text-gray-500">
              {availableCount} available
            </span>
          </div>

          <div className="space-y-3">
            {quests.length > 0 ? (
              quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  isCompleted={isQuestCompleted(quest.id)}
                  onStartQuest={handleStartQuest}
                />
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-2xl">
                <p className="text-gray-500">No quests available for this mode</p>
              </div>
            )}
          </div>
        </div>

        {/* My Impact Section */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">My Impact</h2>
          <MyImpact />
        </div>
      </div>

      {/* Floating Ask Max Button */}
      <Link
        href="/carbonmax/chat"
        className="fixed bottom-6 right-6 w-14 h-14 bg-eco-leaf text-white rounded-full shadow-lg flex items-center justify-center hover:bg-eco-forest transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  );
}

