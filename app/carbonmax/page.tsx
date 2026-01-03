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

import questsData from "@/data/quests.json";
import { Quest } from "@/lib/carbonmax/types";

const MODE_BACKGROUNDS: Record<string, string> = {
  jewel: "bg-[#FFFBEB]",
  departure: "bg-[#EFF6FF]",
  transit: "bg-[#ECFDF5]",
};

export default function QuestHubPage() {
  const router = useRouter();
  const { mode } = useJourneyMode();
  const { isQuestCompleted } = useQuestProgress();

  const quests = (questsData.quests as Quest[]).filter((q) => q.mode === mode);
  const availableCount = quests.filter((q) => !isQuestCompleted(q.id)).length;

  const handleStartQuest = (questId: string) => {
    router.push(`/carbonmax/quest/${questId}`);
  };

  const bgColor = MODE_BACKGROUNDS[mode] || MODE_BACKGROUNDS.transit;

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b border-border">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <h1 className="font-display font-bold text-lg text-foreground">CarbonMax</h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        <TierProgressBar />
        <ModeSelector />

        {/* Active Quests Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-foreground">Active Quests</h2>
            <span className="text-sm text-muted-foreground">
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
              <div className="text-center py-8 card-base">
                <p className="text-muted-foreground">No quests available for this mode</p>
              </div>
            )}
          </div>
        </div>

        {/* My Impact Section */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-3">My Impact</h2>
          <MyImpact />
        </div>
      </div>

      {/* Floating Ask Max Button */}
      <Link
        href="/carbonmax/chat"
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark hover:-translate-y-1 transition-all duration-200"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  );
}
