// components/operations/cards/CarbonMaxSummaryCard.tsx

'use client';

import { Leaf, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { CarbonMaxActivity } from '@/lib/emissions/types';
import { DASHBOARD_ROUTES } from '@/lib/emissions/constants';

interface CarbonMaxSummaryCardProps {
  data: CarbonMaxActivity;
}

export function CarbonMaxSummaryCard({ data }: CarbonMaxSummaryCardProps) {
  // Convert kg to tonnes for display
  const co2AvoidedTonnes = data.co2Avoided / 1000;
  
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            CarbonMax Live Impact
          </h3>
        </div>
        <Link
          href={DASHBOARD_ROUTES.carbonmax}
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          View Dashboard
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Main Metric */}
      <div className="mb-6">
        <p className="text-sm text-slate-500 mb-1">Today's Avoided Emissions</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-emerald-600">
            {co2AvoidedTonnes.toFixed(1)}
          </span>
          <span className="text-slate-500">tCO2e</span>
        </div>
        {/* Progress bar visualization */}
        <div className="mt-2 h-2 bg-emerald-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((co2AvoidedTonnes / 3) * 100, 100)}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-1">Target: 3.0 tCO2e/day</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-lg p-3">
          <p className="text-xs text-slate-500">Quests Completed</p>
          <p className="text-xl font-bold text-slate-900">{data.questsCompleted.toLocaleString()}</p>
        </div>
        <div className="bg-white/60 rounded-lg p-3">
          <p className="text-xs text-slate-500">Green Meals</p>
          <p className="text-xl font-bold text-slate-900">{data.greenMealsServed.toLocaleString()}</p>
        </div>
        <div className="bg-white/60 rounded-lg p-3">
          <p className="text-xs text-slate-500">SAF Contributors</p>
          <p className="text-xl font-bold text-slate-900">{data.safContributionsCount}</p>
        </div>
        <div className="bg-white/60 rounded-lg p-3">
          <p className="text-xs text-slate-500">Plastic Avoided</p>
          <p className="text-xl font-bold text-slate-900">{data.plasticBottlesAvoided.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

