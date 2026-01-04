// components/operations/tables/TenantLeaderboard.tsx

'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARBON_RATING_COLORS } from '@/lib/emissions/constants';
import type { TenantPerformance } from '@/lib/emissions/types';

interface TenantLeaderboardProps {
  tenants: TenantPerformance[];
}

export function TenantLeaderboard({ tenants }: TenantLeaderboardProps) {
  const sortedTenants = [...tenants].sort((a, b) => b.emissions - a.emissions);
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-3 font-medium text-slate-600">Tenant</th>
            <th className="text-left p-3 font-medium text-slate-600">Category</th>
            <th className="text-left p-3 font-medium text-slate-600">Location</th>
            <th className="text-center p-3 font-medium text-slate-600">Rating</th>
            <th className="text-right p-3 font-medium text-slate-600">Emissions</th>
            <th className="text-right p-3 font-medium text-slate-600">Sustainable %</th>
            <th className="text-center p-3 font-medium text-slate-600">Trend</th>
          </tr>
        </thead>
        <tbody>
          {sortedTenants.map((tenant) => {
            const TrendIcon = tenant.trend === 'up' 
              ? TrendingUp 
              : tenant.trend === 'down' 
              ? TrendingDown 
              : Minus;
            
            const trendColor = tenant.trend === 'down' 
              ? 'text-emerald-500' 
              : tenant.trend === 'up' 
              ? 'text-red-500' 
              : 'text-slate-400';
            
            const ratingStyle = CARBON_RATING_COLORS[tenant.rating];
            
            return (
              <tr key={tenant.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium text-slate-900">{tenant.name}</td>
                <td className="p-3 text-slate-600 capitalize">{tenant.category}</td>
                <td className="p-3 text-slate-600">{tenant.location}</td>
                <td className="p-3 text-center">
                  <span className={cn('px-2 py-1 rounded text-xs font-medium', ratingStyle.bg, ratingStyle.text)}>
                    {tenant.rating}
                  </span>
                </td>
                <td className="p-3 text-right text-slate-700">{tenant.emissions.toFixed(1)} tCO₂e</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${tenant.sustainableTransactionPercent}%` }}
                      />
                    </div>
                    <span className="text-slate-700 text-xs">{tenant.sustainableTransactionPercent}%</span>
                  </div>
                </td>
                <td className="p-3 text-center">
                  <div className={cn('flex items-center justify-center gap-1', trendColor)}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-xs">{Math.abs(tenant.trendPercent)}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

