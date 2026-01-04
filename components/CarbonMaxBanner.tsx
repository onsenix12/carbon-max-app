"use client";

import Link from "next/link";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Leaf, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/routes";

export function CarbonMaxBanner() {
  let totalPoints = 0;
  
  try {
    const progress = useQuestProgress();
    totalPoints = progress.totalPoints;
  } catch {
    // Not inside provider, use default
  }

  return (
    <Link href={ROUTES.CARBONMAX} className="block group">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-success-dark p-5 text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        {/* Shimmer overlay */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
              >
                <Leaf className="w-6 h-6" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg">CarbonMax</h3>
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-accent-gold-light" />
                  </motion.div>
                </div>
                <p className="text-sm text-white/80">
                  {totalPoints > 0
                    ? `${totalPoints.toLocaleString()} eco-points earned`
                    : "Start your green journey"}
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5 text-white/60" />
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-white/70">Complete quests • Earn rewards</span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-white/20 rounded-lg text-sm font-medium backdrop-blur-sm hover:bg-white/30 shadow-sm"
            >
              Explore →
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

