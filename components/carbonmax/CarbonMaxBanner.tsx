"use client";

import Link from "next/link";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Leaf, ChevronRight, Sparkles } from "lucide-react";

export function CarbonMaxBanner() {
  let totalPoints = 0;
  
  try {
    const progress = useQuestProgress();
    totalPoints = progress.totalPoints;
  } catch {
    // Not inside provider, use default
  }

  return (
    <Link href="/carbonmax" className="block group">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-success-dark p-5 text-white shadow-success">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg">CarbonMax</h3>
                  <Sparkles className="w-4 h-4 text-accent-gold-light" />
                </div>
                <p className="text-sm text-white/80">
                  {totalPoints > 0
                    ? `${totalPoints.toLocaleString()} eco-points earned`
                    : "Start your green journey"}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/60 transition-transform duration-200 group-hover:translate-x-1" />
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-white/70">Complete quests • Earn rewards</span>
            <span className="px-3 py-1 bg-white/20 rounded-lg text-sm font-medium backdrop-blur-sm transition-all duration-200 group-hover:bg-white/30 group-hover:shadow">
              Explore →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
