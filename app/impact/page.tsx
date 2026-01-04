"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ArrowLeft, Share2, TreePine, Droplets, Plane, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/Button";

// Animated Counter Component
function AnimatedCounter({ 
  value, 
  duration = 2,
  decimals = 0,
  suffix = "",
  prefix = ""
}: { 
  value: number; 
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(value * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function ImpactPage() {
  const { userImpact, completedQuests, tierProgress } = useQuestProgress();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const impactStats = [
    {
      icon: <TreePine className="w-6 h-6" />,
      value: userImpact.co2Avoided,
      valueDisplay: (val: number) => `${val.toFixed(1)} kg`,
      label: "CO₂ Avoided",
      color: "text-primary",
      bgColor: "bg-success-light",
      decimals: 1,
      suffix: " kg",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      value: userImpact.plasticSaved,
      valueDisplay: (val: number) => `${val.toFixed(0)}g`,
      label: "Plastic Saved",
      color: "text-accent-teal",
      bgColor: "bg-accent-teal/20",
      decimals: 0,
      suffix: "g",
    },
    {
      icon: <Plane className="w-6 h-6" />,
      value: completedQuests.length,
      valueDisplay: (val: number) => val.toString(),
      label: "Quests Done",
      color: "text-secondary",
      bgColor: "bg-secondary-100",
      decimals: 0,
      suffix: "",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      value: userImpact.totalPointsEarned,
      valueDisplay: (val: number) => Math.floor(val).toLocaleString(),
      label: "Eco-Points",
      color: "text-accent-gold",
      bgColor: "bg-accent-gold/20",
      decimals: 0,
      suffix: "",
    },
  ];

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
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-md mx-auto px-4 pt-8 pb-12 text-center text-white"
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
          🌍
        </motion.div>
        <h1 className="font-display text-3xl font-bold mb-2">Your Impact Story</h1>
        <p className="text-white/80">
          Every action counts. Here's what you've achieved.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="max-w-md mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-strong rounded-t-3xl pt-8 pb-4 px-4 -mt-4 shadow-2xl"
          >
          <div ref={statsRef} className="grid grid-cols-2 gap-4 mb-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isStatsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`${stat.bgColor} rounded-2xl p-4 text-center cursor-pointer shadow-sm hover:shadow-md transition-shadow`}
              >
                <motion.div 
                  className={`${stat.color} flex justify-center mb-2`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="font-mono text-2xl font-bold text-foreground">
                  {isStatsInView ? (
                    <AnimatedCounter 
                      value={stat.value} 
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  ) : (
                    stat.valueDisplay(0)
                  )}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tree Equivalent */}
          {userImpact.treesEquivalent > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-success-light rounded-2xl p-6 text-center mb-8 shadow-sm"
            >
              <motion.div 
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                className="text-4xl mb-3 inline-block"
              >
                🌳
              </motion.div>
              <p className="text-foreground">
                Your impact equals{" "}
                <span className="font-mono font-bold text-success-dark text-2xl">
                  {isStatsInView ? (
                    <AnimatedCounter 
                      value={userImpact.treesEquivalent} 
                      decimals={1}
                    />
                  ) : (
                    "0.0"
                  )}
                </span>{" "}
                trees
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                absorbing CO₂ for an entire year
              </p>
            </motion.div>
          )}

          {/* Current Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="border border-border rounded-2xl p-4 mb-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <motion.span 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-3xl"
                >
                  {tierProgress.currentTier.icon}
                </motion.span>
                <div>
                  <div className="font-display font-bold text-foreground">
                    {tierProgress.currentTier.name}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Tier</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-primary text-lg">
                  {isStatsInView ? (
                    <AnimatedCounter 
                      value={tierProgress.totalPoints} 
                      decimals={0}
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Eco-Points</div>
              </div>
            </div>

            {tierProgress.nextTier && (
              <>
                <div className="progress-bar mb-2 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tierProgress.progressPercent}%` }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="progress-fill h-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {tierProgress.pointsToNextTier} pts to{" "}
                  {tierProgress.nextTier.icon} {tierProgress.nextTier.name}
                </p>
              </>
            )}
          </motion.div>

          {/* Empty State */}
          {userImpact.questsCompleted === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center py-8"
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="text-5xl mb-4 inline-block"
              >
                🌱
              </motion.div>
              <h3 className="font-display font-bold text-foreground mb-2">Start Your Journey</h3>
              <p className="text-muted-foreground mb-6">
                Complete your first quest to begin building your impact story!
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={ROUTES.CARBONMAX}>
                  <Button variant="primary">
                    Explore Quests
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* Motivational Footer */}
          {userImpact.questsCompleted > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center py-4"
            >
              <p className="text-muted-foreground text-sm">
                "Every small action adds up to big change." 🌿
              </p>
            </motion.div>
          )}

          {/* Spacer for safe area */}
          <div className="h-8" />
        </motion.div>
      </div>
    </motion.div>
  );
}

