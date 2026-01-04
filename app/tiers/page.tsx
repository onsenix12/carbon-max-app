"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ArrowLeft, Award, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ROUTES } from "@/lib/routes";
import { GREEN_TIERS } from "@/lib/constants";

export default function TiersPage() {
  const { tierProgress } = useQuestProgress();
  const tiersRef = useRef(null);
  const isTiersInView = useInView(tiersRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-primary via-success-dark to-primary relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -60, 60, 0],
          scale: [1, 1.3, 0.7, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          delay: 0.5,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl"
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Radial Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Header with glassmorphism */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-10 glass-strong"
        style={{ backgroundColor: 'rgba(16, 185, 129, 0.9)' }}
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href={ROUTES.CARBONMAX} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </Link>
            </motion.div>
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Award className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-md mx-auto px-4 pt-8 pb-6 text-center text-white"
      >
        <motion.div 
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
          className="text-6xl mb-4 inline-block"
        >
          🌿
        </motion.div>
        <h1 className="font-display text-3xl font-bold mb-2">Green Tiers</h1>
        <p className="text-white/80">
          Level up your sustainability journey and unlock exclusive perks.
        </p>
      </motion.div>

      {/* Current Tier Card */}
      <div className="max-w-md mx-auto px-4 relative z-10 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          className="glass-strong rounded-2xl p-6 shadow-2xl border-2 border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.span 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                {tierProgress.currentTier.icon}
              </motion.span>
              <div>
                <div className="font-display font-bold text-foreground text-xl">
                  {tierProgress.currentTier.name}
                </div>
                <div className="text-sm text-muted-foreground">Your Current Tier</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-bold text-primary text-2xl">
                {tierProgress.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Eco-Points</div>
            </div>
          </div>

          {tierProgress.nextTier && (
            <>
              <div className="progress-bar mb-3 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tierProgress.progressPercent}%` }}
                  transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  className="progress-fill h-full"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {tierProgress.pointsToNextTier} pts to unlock{" "}
                <span className="font-semibold text-foreground">
                  {tierProgress.nextTier.icon} {tierProgress.nextTier.name}
                </span>
              </p>
            </>
          )}
        </motion.div>
      </div>

      {/* All Tiers List */}
      <div className="max-w-md mx-auto px-4 relative z-10 pb-8">
        <motion.div 
          ref={tiersRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTiersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-strong rounded-3xl pt-6 pb-4 px-4 shadow-2xl"
        >
          <h2 className="font-display font-bold text-foreground text-xl mb-4 text-center">
            All Tiers
          </h2>
          
          <div className="space-y-4">
            {GREEN_TIERS.map((tier, index) => {
              const isCurrentTier = tier.id === tierProgress.currentTier.id;
              const isUnlocked = tierProgress.totalPoints >= tier.minPoints;
              const isLocked = !isUnlocked;

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isTiersInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.5,
                    delay: 0.5 + (index * 0.1)
                  }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`
                    rounded-2xl p-5 border-2 transition-all
                    ${isCurrentTier 
                      ? 'bg-success-light border-primary shadow-lg' 
                      : isUnlocked
                        ? 'bg-white/50 border-white/30 shadow-md'
                        : 'bg-muted/30 border-border/50 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                        ${isCurrentTier ? 'bg-primary/20' : isUnlocked ? 'bg-success-light/50' : 'bg-muted'}
                      `}>
                        {tier.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`
                            font-display font-bold text-lg
                            ${isCurrentTier ? 'text-primary' : isUnlocked ? 'text-foreground' : 'text-muted-foreground'}
                          `}>
                            {tier.name}
                          </h3>
                          {isCurrentTier && (
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-primary"
                            >
                              <Sparkles className="w-4 h-4" />
                            </motion.span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tier.minPoints.toLocaleString()} - {tier.maxPoints ? tier.maxPoints.toLocaleString() : '∞'} pts
                        </p>
                      </div>
                    </div>
                    {isCurrentTier && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-full"
                      >
                        Current
                      </motion.div>
                    )}
                  </div>

                  {/* Perks */}
                  <div className="space-y-1.5">
                    {tier.perks.map((perk, perkIndex) => (
                      <motion.div
                        key={perkIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isTiersInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + (index * 0.1) + (perkIndex * 0.05) }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className={`
                          mt-0.5
                          ${isUnlocked ? 'text-primary' : 'text-muted-foreground'}
                        `}>
                          ✓
                        </span>
                        <span className={`
                          ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}
                        `}>
                          {perk}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Message */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isTiersInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="text-center mt-6 pt-4 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground">
              Complete quests to earn Eco-Points and unlock higher tiers! 🌱
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

