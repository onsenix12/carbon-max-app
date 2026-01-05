// components/operations/charts/CompactHourlyChart.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface HourlyDataPoint {
  hour: string;
  value: number;
}

interface CompactHourlyChartProps {
  data: HourlyDataPoint[];
  valueFormatter?: (value: number) => string;
  className?: string;
}

export function CompactHourlyChart({
  data,
  valueFormatter = (v) => v.toLocaleString(),
  className,
}: CompactHourlyChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const maxValue = Math.max(...data.map(d => d.value), 1) * 1.1; // Ensure at least 1 to avoid division by zero
  
  // Ensure we have 24 hours of data, pad with zeros if needed
  const paddedData = [...data];
  while (paddedData.length < 24) {
    paddedData.push({ hour: `${String(paddedData.length).padStart(2, '0')}:00`, value: 0 });
  }
  
  // Group hours into 6-hour periods for better readability
  const periods = [
    { label: '00-05', hours: paddedData.slice(0, 6) },
    { label: '06-11', hours: paddedData.slice(6, 12) },
    { label: '12-17', hours: paddedData.slice(12, 18) },
    { label: '18-23', hours: paddedData.slice(18, 24) },
  ];
  
  return (
    <div className={cn('space-y-3', className)}>
      {/* Chart bars grouped by period */}
      <div className="space-y-2">
        {periods.map((period, periodIdx) => {
          const periodMax = Math.max(...period.hours.map(h => h.value));
          const periodAvg = period.hours.reduce((sum, h) => sum + h.value, 0) / period.hours.length;
          
          return (
            <div key={periodIdx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{period.label}</span>
                <span className="text-slate-600 font-semibold">
                  {valueFormatter(Math.round(periodAvg))}
                </span>
              </div>
              
              {/* Mini bars for each hour in period */}
              <div className="flex items-end gap-0.5" style={{ height: '32px' }}>
                {period.hours.map((hour, hourIdx) => {
                  const globalIdx = periodIdx * 6 + hourIdx;
                  const heightPercent = (hour.value / maxValue) * 100;
                  const barHeight = (heightPercent / 100) * 32; // Calculate actual pixel height
                  const isHovered = hoveredIndex === globalIdx;
                  
                  return (
                    <div
                      key={hourIdx}
                      className="flex-1 flex flex-col items-center group relative h-full"
                      onMouseEnter={() => setHoveredIndex(globalIdx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="w-full h-full flex flex-col justify-end">
                        <div
                          className={cn(
                            'w-full rounded-t transition-all duration-150 cursor-pointer',
                            isHovered
                              ? 'bg-emerald-600'
                              : 'bg-emerald-400 hover:bg-emerald-500'
                          )}
                          style={{ height: `${Math.max(barHeight, 2)}px` }}
                          title={`${hour.hour}: ${valueFormatter(hour.value)}`}
                        />
                      </div>
                      
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                          <div className="bg-slate-900 text-white text-xs font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap">
                            {hour.hour}: {valueFormatter(hour.value)}
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-slate-900 rotate-45" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="text-slate-500">
          Peak: <span className="font-medium text-slate-700">
            {valueFormatter(Math.max(...data.map(d => d.value)))}
          </span>
        </div>
        <div className="text-slate-500">
          Total: <span className="font-medium text-slate-700">
            {valueFormatter(data.reduce((sum, d) => sum + d.value, 0))}
          </span>
        </div>
      </div>
    </div>
  );
}

