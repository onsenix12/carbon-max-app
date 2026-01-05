// components/operations/tables/AirlineLeaderboard.tsx

'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AirlineEmissions } from '@/lib/emissions/types';

interface AirlineLeaderboardProps {
  airlines: AirlineEmissions[];
}

export function AirlineLeaderboard({ airlines }: AirlineLeaderboardProps) {
  // Sort by total emissions descending
  const sortedAirlines = [...airlines].sort((a, b) => b.totalEmissions - a.totalEmissions);
  
  const maxEmissions = Math.max(...sortedAirlines.map(a => a.totalEmissions));
  
  return (
    <div className="space-y-3">
      {sortedAirlines.slice(0, 10).map((airline, index) => {
        const barWidth = (airline.totalEmissions / maxEmissions) * 100;
        
        const TrendIcon = airline.trend === 'up' 
          ? TrendingUp 
          : airline.trend === 'down' 
          ? TrendingDown 
          : Minus;
        
        const trendColor = airline.trend === 'down' 
          ? 'text-emerald-500' 
          : airline.trend === 'up' 
          ? 'text-red-500' 
          : 'text-slate-400';
        
        return (
          <div key={airline.airlineCode} className="relative">
            {/* Background bar */}
            <div
              className="absolute inset-y-0 left-0 bg-blue-100 rounded-lg transition-all duration-500"
              style={{ width: `${barWidth}%` }}
            />
            
            {/* Content */}
            <div className="relative flex items-center justify-between gap-3 p-3 min-h-[60px]">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-sm font-medium text-slate-400 w-6 flex-shrink-0">
                  {index + 1}.
                </span>
                <div className="min-w-0 flex-1">
                  <p 
                    className="font-medium text-slate-900 truncate" 
                    title={airline.airlineName}
                  >
                    {airline.airlineName}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {airline.flights} {airline.flights === 1 ? 'flight' : 'flights'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <p className="font-semibold text-slate-900 text-sm whitespace-nowrap">
                    {airline.totalEmissions.toFixed(0)} <span className="text-xs font-normal">tCO2e</span>
                  </p>
                  <div className={cn('flex items-center justify-end gap-1 text-xs mt-0.5', trendColor)}>
                    <TrendIcon className="w-3 h-3 flex-shrink-0" />
                    <span className="whitespace-nowrap">{Math.abs(airline.trendPercent).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

