// components/operations/charts/CompactTrendChart.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { CalculationInfoModal } from '@/components/operations/cards/CalculationInfoModal';
import type { CalculationFactor } from '@/lib/emissions/types';

interface DataPoint {
  label: string;
  value: number;
  target?: number;
}

interface CompactTrendChartProps {
  data: DataPoint[];
  valueFormatter?: (value: number) => string;
  className?: string;
  calculation?: {
    title: string;
    methodology: string;
    factors: CalculationFactor[];
  };
}

export function CompactTrendChart({
  data,
  valueFormatter = (v) => v.toLocaleString(),
  className,
  calculation,
}: CompactTrendChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showCalcModal, setShowCalcModal] = useState(false);
  
  // Filter out invalid values and ensure we have valid data
  const validData = data.filter(d => d != null && typeof d.value === 'number' && !isNaN(d.value) && isFinite(d.value));
  const values = validData.map(d => d.value);
  
  // Handle empty or invalid data
  if (validData.length === 0 || values.length === 0) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center justify-center" style={{ height: '128px' }}>
          <p className="text-sm text-slate-400">No data available</p>
        </div>
        {calculation && (
          <>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-600">Calculation Formula:</span>
                    <button
                      onClick={() => setShowCalcModal(true)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                      aria-label="View detailed calculation methodology"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 font-mono break-words">
                    {calculation.methodology}
                  </p>
                </div>
              </div>
            </div>
            
            <CalculationInfoModal
              isOpen={showCalcModal}
              onClose={() => setShowCalcModal(false)}
              title={calculation.title}
              methodology={calculation.methodology}
              factors={calculation.factors}
            />
          </>
        )}
      </div>
    );
  }
  
  const maxValue = Math.max(...values, 1) * 1.15; // Add some padding, ensure at least 1
  
  return (
    <div className={cn('space-y-3', className)}>
      {/* Chart bars */}
      <div className="flex items-end justify-between gap-1.5" style={{ height: '128px' }}>
        {validData.map((point, i) => {
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
            {values.length > 0 
              ? valueFormatter(Math.round(values.reduce((a, b) => a + b, 0) / values.length))
              : 'N/A'}
          </span>
        </div>
        <div className="text-xs text-slate-500">
          Peak: <span className="font-medium text-slate-700">
            {values.length > 0 
              ? valueFormatter(Math.max(...values))
              : 'N/A'}
          </span>
        </div>
      </div>
      
      {/* Calculation Formula Display */}
      {calculation && (
        <>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-600">Calculation Formula:</span>
                  <button
                    onClick={() => setShowCalcModal(true)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                    aria-label="View detailed calculation methodology"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 font-mono break-words">
                  {calculation.methodology}
                </p>
              </div>
            </div>
          </div>
          
          <CalculationInfoModal
            isOpen={showCalcModal}
            onClose={() => setShowCalcModal(false)}
            title={calculation.title}
            methodology={calculation.methodology}
            factors={calculation.factors}
          />
        </>
      )}
    </div>
  );
}

