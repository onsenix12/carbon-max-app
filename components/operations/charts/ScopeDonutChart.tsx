// components/operations/charts/ScopeDonutChart.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { CalculationInfoModal } from '@/components/operations/cards/CalculationInfoModal';
import type { CalculationFactor } from '@/lib/emissions/types';

interface DonutSegment {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface ScopeDonutChartProps {
  segments: DonutSegment[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
  className?: string;
  calculation?: {
    title: string;
    methodology: string;
    factors: CalculationFactor[];
  };
}

export function ScopeDonutChart({
  segments,
  centerLabel,
  centerValue,
  size = 160,
  className,
  calculation,
}: ScopeDonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showCalcModal, setShowCalcModal] = useState(false);
  
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* SVG Donut */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {segments.map((segment, index) => {
            const segmentLength = (segment.value / total) * circumference;
            const offset = currentOffset;
            currentOffset += segmentLength;
            
            const isHovered = hoveredIndex === index;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={-offset}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <span className="text-2xl font-bold text-slate-900">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="text-xs text-slate-500">{centerLabel}</span>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 space-y-2 w-full">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={cn(
              'flex items-center justify-between p-2 rounded-lg transition-colors',
              hoveredIndex === index ? 'bg-slate-100' : ''
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-slate-600">{segment.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-900">
                {segment.value.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">
                ({segment.percentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
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

