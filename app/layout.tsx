import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JourneyModeProvider } from "@/hooks/useJourneyMode";
import { QuestProgressProvider } from "@/hooks/useQuestProgress";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CarbonMax - Changi Airport",
  description: "Complete green quests, earn rewards, and track your impact at Changi Airport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <JourneyModeProvider>
          <QuestProgressProvider>
            {children}
          </QuestProgressProvider>
        </JourneyModeProvider>
      </body>
    </html>
  );
}
