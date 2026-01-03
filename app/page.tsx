"use client";

import { useRouter } from "next/navigation";
import { useJourneyMode } from "@/hooks/useJourneyMode";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ModeSelector } from "@/components/ModeSelector";
import { TierProgressBar } from "@/components/TierProgressBar";
import { QuestCard } from "@/components/QuestCard";
import { MyImpact } from "@/components/MyImpact";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import questsData from "@/data/quests.json";
import { Quest } from "@/lib/types";

export default function QuestHubPage() {
  const router = useRouter();
  const { mode } = useJourneyMode();
  const { isQuestCompleted } = useQuestProgress();

  const quests = (questsData.quests as Quest[]).filter((q) => q.mode === mode);
  const availableCount = quests.filter((q) => !isQuestCompleted(q.id)).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Clean Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100/50 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-5 py-4">
          <h1 className="font-display font-bold text-xl text-gray-900 text-center">CarbonMax</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-5 py-8 space-y-8">
        
        {/* Tier Progress */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <TierProgressBar />
        </motion.section>

        {/* Mode Selector */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <ModeSelector />
        </motion.section>

        {/* Quests Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display text-2xl font-bold text-gray-900">Active Quests</h2>
            <span className="text-sm text-gray-600 font-medium">{availableCount} available</span>
          </div>
          
          <div className="space-y-3">
            {quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                completed={isQuestCompleted(quest.id)}
                onStart={() => router.push(`/quest/${quest.id}`)}
              />
            ))}
          </div>
        </motion.section>

        {/* Impact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <MyImpact />
        </motion.section>
      </main>

      {/* Floating Chat Button - cleaner */}
      <Link
        href="/chat"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 hover:scale-105 transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  );
}
