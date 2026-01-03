import { JourneyModeProvider } from "@/hooks/useJourneyMode";
import { QuestProgressProvider } from "@/hooks/useQuestProgress";

export default function CarbonMaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JourneyModeProvider>
      <QuestProgressProvider>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </QuestProgressProvider>
    </JourneyModeProvider>
  );
}

