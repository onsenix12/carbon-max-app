// components/operations/charts/CompactTrendChart.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface DataPoint {
  label: string;
  value: number;
  target?: number;
}

interface CompactTrendChartProps {
  data: DataPoint[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function CompactTrendChart({
  data,
  valueFormatter = (v) => v.toLocaleString(),
  className,
}: CompactTrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const values = data.map(d => d.value);
  const maxValue = Math.max(...values, 1) * 1.15; // Add some padding, ensure at least 1
  
  return (
    <div className={cn('space-y-3', className)}>
      {/* Chart bars */}
      <div className="flex items-end justify-between gap-1.5" style={{ height: '128px' }}>
        {data.map((point, i) => {
          const heightPercent = (point.value / maxValue) * 100;
          const barHeight = (heightPercent / 100) * 128; // Calculate actual pixel height
          const isHovered = hoveredIndex === i;
          
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center group relative h-full"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Bar container */}
              <div className="w-full h-full flex flex-col justify-end">
                <div
                  className={cn(
                    'w-full rounded-t transition-all duration-200 cursor-pointer',
                    isHovered 
                      ? 'bg-emerald-600 shadow-md' 
                      : 'bg-emerald-500 hover:bg-emerald-600'
                  )}
                  style={{ height: `${Math.max(barHeight, 4)}px` }}
                />
              </div>
              
              {/* Day label */}
              <div className="mt-2 text-xs text-slate-500 font-medium">
                {point.label}
              </div>
              
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    {valueFormatter(point.value)}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-slate-900 rotate-45" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Summary stats */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="text-xs text-slate-500">
          Avg: <span className="font-medium text-slate-700">
            {valueFormatter(Math.round(values.reduce((a, b) => a + b, 0) / values.length))}
          </span>
        </div>
        <div className="text-xs text-slate-500">
          Peak: <span className="font-medium text-slate-700">
            {valueFormatter(Math.max(...values))}
          </span>
        </div>
      </div>
    </div>
  );
}

