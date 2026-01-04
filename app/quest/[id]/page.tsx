import { Quest } from "@/lib/types";
import questsData from "@/data/quests.json";
import Link from "next/link";
import { QuestDetailClient } from "./QuestDetailClient";

// Required for Next.js static export with dynamic routes
export async function generateStaticParams() {
  const quests = questsData.quests as Quest[];
  return quests.map((quest) => ({
    id: quest.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuestDetailPage({ params }: PageProps) {
  const { id: questId } = await params;
  
  // Find the quest
  const quest = (questsData.quests as Quest[]).find((q) => q.id === questId);

  if (!quest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Quest not found</p>
          <Link href="/carbonmax" className="text-eco-leaf font-medium">
            Back to Quest Hub
          </Link>
        </div>
      </div>
    );
  }

  return <QuestDetailClient quest={quest} />;
}

