"use client";

import Link from "next/link";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Leaf, ChevronRight, Sparkles } from "lucide-react";

export function CarbonMaxBanner() {
  // Note: This will only work inside QuestProgressProvider
  // If used outside, we'll show default values
  let totalPoints = 0;
  
  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7243/ingest/ff043c46-ebaa-49ee-a75d-5e6b254857f8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/carbonmax/CarbonMaxBanner.tsx:7',message:'CarbonMaxBanner rendering',data:{isClient:typeof window !== 'undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  }
  // #endregion
  
  try {
    const progress = useQuestProgress();
    totalPoints = progress.totalPoints;
    // #region agent log
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7243/ingest/ff043c46-ebaa-49ee-a75d-5e6b254857f8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/carbonmax/CarbonMaxBanner.tsx:16',message:'useQuestProgress hook called successfully',data:{totalPoints},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    }
    // #endregion
  } catch (e) {
    // #region agent log
    if (typeof window !== 'undefined') {
      fetch('http://127.0.0.1:7243/ingest/ff043c46-ebaa-49ee-a75d-5e6b254857f8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/carbonmax/CarbonMaxBanner.tsx:20',message:'useQuestProgress hook error',data:{error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    }
    // #endregion
    // Not inside provider, use default
  }

  return (
    <Link href="/carbonmax" className="block">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-eco-leaf via-eco-forest to-eco-sage p-6 text-white shadow-lg">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating icons */}
        <div className="absolute top-4 right-4 text-3xl animate-bounce">🌿</div>
        <div className="absolute bottom-4 right-12 text-2xl opacity-60">✈️</div>

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium text-white/80">NEW</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">
            WELCOME TO CARBONMAX
          </h2>
          <p className="text-white/80 text-sm mb-4">
            Complete green quests, earn rewards,<br />and track your impact!
          </p>

          {/* Points badge */}
          {totalPoints > 0 && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
              <Leaf className="w-4 h-4" />
              <span className="font-semibold">{totalPoints} Eco-Points</span>
            </div>
          )}

          {/* CTA Button */}
          <div className="flex items-center gap-2 bg-white text-eco-forest rounded-xl px-4 py-3 font-semibold w-fit hover:bg-white/90 transition-colors">
            <span>🌱 Start Your Green Journey</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

