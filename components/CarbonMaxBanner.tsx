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
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-white p-6 shadow-lg"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">WELCOME TO</p>
            <h2 className="font-display font-bold text-4xl text-gray-900 mb-2">
              <span className="text-primary">CARBON</span>
              <span className="text-yellow-500">MAX</span>
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Complete quests, earn eco-points, and unlock green tiers to receive sustainable rewards!
            </p>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <span>SWIPE DOWN TO PLAY</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}

