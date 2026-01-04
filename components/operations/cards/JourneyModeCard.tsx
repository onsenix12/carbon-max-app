// components/operations/cards/JourneyModeCard.tsx

'use client';

import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { DASHBOARD_ROUTES } from '@/lib/emissions/constants';

interface JourneyModeCardProps {
  mode: 'jewel' | 'departure' | 'transit';
  emissions: number;
  vsLastWeek: number;
  topSource: string;
}

const modeConfig = {
  jewel: {
    name: 'Jewel Mode',
    icon: '🏬',
    color: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
  },
  departure: {
    name: 'Departure Mode',
    icon: '✈️',
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
  },
  transit: {
    name: 'Transit Mode',
    icon: '🔄',
    color: 'teal',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
  },
};

export function JourneyModeCard({
  mode,
  emissions,
  vsLastWeek,
  topSource,
}: JourneyModeCardProps) {
  const config = modeConfig[mode];
  const isPositive = vsLastWeek < 0;
  
  return (
    <div
      className={cn(
        'rounded-xl border p-5 transition-all duration-200 hover:shadow-md',
        config.bgColor,
        config.borderColor
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{config.icon}</span>
        <h4 className={cn('font-semibold', config.textColor)}>
          {config.name}
        </h4>
      </div>
      
      {/* Emissions Value */}
      <div className="mb-3">
        <span className="text-3xl font-bold text-slate-900">
          {emissions.toLocaleString()}
        </span>
        <span className="text-sm text-slate-500 ml-2">tCO2e</span>
      </div>
      
      {/* Trend */}
      <div className="flex items-center gap-2 mb-3">
        {isPositive ? (
          <TrendingDown className="w-4 h-4 text-emerald-500" />
        ) : (
          <TrendingUp className="w-4 h-4 text-red-500" />
        )}
        <span
          className={cn(
            'text-sm font-medium',
            isPositive ? 'text-emerald-600' : 'text-red-600'
          )}
        >
          {vsLastWeek > 0 ? '+' : ''}{vsLastWeek}% vs last week
        </span>
      </div>
      
      {/* Top Source */}
      <div className="pt-3 border-t border-slate-200/50">
        <p className="text-xs text-slate-500">Top source:</p>
        <p className="text-sm font-medium text-slate-700">{topSource}</p>
      </div>
      
      {/* Link */}
      <Link
        href={`${DASHBOARD_ROUTES.insights}?mode=${mode}`}
        className={cn(
          'mt-4 flex items-center gap-1 text-sm font-medium',
          config.textColor,
          'hover:underline'
        )}
      >
        View Details
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

