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
            <div className="relative flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-400 w-6">
                  {index + 1}.
                </span>
                <div>
                  <p className="font-medium text-slate-900">{airline.airlineName}</p>
                  <p className="text-xs text-slate-500">{airline.flights} flights</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-slate-900">
                    {airline.totalEmissions.toFixed(0)} tCO2e
                  </p>
                  <div className={cn('flex items-center gap-1 text-xs', trendColor)}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{Math.abs(airline.trendPercent)}%</span>
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

