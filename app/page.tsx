"use client";

import { useRouter } from "next/navigation";
import { useJourneyMode } from "@/hooks/useJourneyMode";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ModeSelector } from "@/components/ModeSelector";
import { TierProgressBar } from "@/components/TierProgressBar";
import { QuestCard } from "@/components/QuestCard";
import { MyImpact } from "@/components/MyImpact";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import questsData from "@/data/quests.json";
import { Quest } from "@/lib/types";

const MODE_BACKGROUNDS: Record<string, { gradient: string; particles: Array<{ color: string; size: string; position: string }> }> = {
  jewel: {
    gradient: "from-[#FFFBEB] via-amber-50/50 to-yellow-50/30",
    particles: [
      { color: "bg-accent-gold/10", size: "w-80 h-80", position: "top-0 right-0" },
      { color: "bg-amber-200/10", size: "w-64 h-64", position: "bottom-0 left-0" },
    ],
  },
  departure: {
    gradient: "from-[#EFF6FF] via-blue-50/50 to-sky-50/30",
    particles: [
      { color: "bg-secondary/10", size: "w-80 h-80", position: "top-0 left-0" },
      { color: "bg-blue-200/10", size: "w-64 h-64", position: "bottom-0 right-0" },
    ],
  },
  transit: {
    gradient: "from-[#ECFDF5] via-emerald-50/50 to-teal-50/30",
    particles: [
      { color: "bg-primary/10", size: "w-80 h-80", position: "top-0 right-0" },
      { color: "bg-emerald-200/10", size: "w-64 h-64", position: "bottom-0 left-0" },
    ],
  },
};

export default function QuestHubPage() {
  const router = useRouter();
  const { mode } = useJourneyMode();
  const { isQuestCompleted } = useQuestProgress();

  const quests = (questsData.quests as Quest[]).filter((q) => q.mode === mode);
  const availableCount = quests.filter((q) => !isQuestCompleted(q.id)).length;

  const handleStartQuest = (questId: string) => {
    router.push(`/quest/${questId}`);
  };

  const bgColor = MODE_BACKGROUNDS[mode] || MODE_BACKGROUNDS.transit;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1] as const,
      },
    },
  };

  const bgConfig = MODE_BACKGROUNDS[mode] || MODE_BACKGROUNDS.transit;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen bg-gradient-to-br ${bgConfig.gradient} transition-all duration-700 relative overflow-hidden`}
    >
      {/* Animated Background Particles */}
      {bgConfig.particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.size} ${particle.color} rounded-full blur-3xl`}
          style={{
            top: particle.position.includes("top") ? "0" : undefined,
            bottom: particle.position.includes("bottom") ? "0" : undefined,
            left: particle.position.includes("left") ? "0" : undefined,
            right: particle.position.includes("right") ? "0" : undefined,
          }}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-10 border-b border-border/50"
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="w-16" />
            <h1 className="font-display font-bold text-lg text-foreground">CarbonMax</h1>
            <div className="w-16" />
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24 relative z-10"
      >
        <motion.div variants={itemVariants}>
          <TierProgressBar />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ModeSelector />
        </motion.div>

        {/* Active Quests Section */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-foreground">Active Quests</h2>
            <motion.span 
              key={availableCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-sm text-muted-foreground font-medium"
            >
              {availableCount} available
            </motion.span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {quests.length > 0 ? (
                quests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                  >
                    <QuestCard
                      quest={quest}
                      isCompleted={isQuestCompleted(quest.id)}
                      onStartQuest={handleStartQuest}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 card-base"
                >
                  <p className="text-muted-foreground">No quests available for this mode</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* My Impact Section */}
        <motion.div variants={itemVariants}>
          <h2 className="font-display font-semibold text-foreground mb-3">My Impact</h2>
          <MyImpact />
        </motion.div>
      </motion.div>

      {/* Floating Ask Max Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link
          href="/chat"
          className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-all duration-200 hover:shadow-xl backdrop-blur-sm"
        >
          <MessageCircle className="w-6 h-6" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
