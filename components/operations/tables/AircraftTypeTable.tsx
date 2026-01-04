// components/operations/tables/AircraftTypeTable.tsx

'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AircraftTypePerformance } from '@/lib/emissions/types';

interface AircraftTypeTableProps {
  types: AircraftTypePerformance[];
}

export function AircraftTypeTable({ types }: AircraftTypeTableProps) {
  const sortedTypes = [...types].sort((a, b) => b.flights - a.flights);
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-3 font-medium text-slate-600">Aircraft Type</th>
            <th className="text-right p-3 font-medium text-slate-600">Flights</th>
            <th className="text-right p-3 font-medium text-slate-600">Avg Fuel (kg)</th>
            <th className="text-right p-3 font-medium text-slate-600">CO₂/pax</th>
            <th className="text-right p-3 font-medium text-slate-600">Efficiency</th>
            <th className="text-center p-3 font-medium text-slate-600">Trend</th>
          </tr>
        </thead>
        <tbody>
          {sortedTypes.map((type, index) => {
            const TrendIcon = type.trend === 'up' 
              ? TrendingUp 
              : type.trend === 'down' 
              ? TrendingDown 
              : Minus;
            
            const trendColor = type.trend === 'down' 
              ? 'text-emerald-500' 
              : type.trend === 'up' 
              ? 'text-red-500' 
              : 'text-slate-400';
            
            return (
              <tr key={type.aircraftType} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-900">{type.aircraftType}</td>
                <td className="p-3 text-right text-slate-700">{type.flights}</td>
                <td className="p-3 text-right text-slate-700">{type.avgFuelKg.toLocaleString()}</td>
                <td className="p-3 text-right text-slate-700">{type.co2PerPax} kg</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${type.efficiencyScore}%` }}
                      />
                    </div>
                    <span className="text-slate-700 font-medium">{type.efficiencyScore}</span>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <TrendIcon className={cn('w-4 h-4 mx-auto', trendColor)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

