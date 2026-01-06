// components/operations/charts/TrendLineChart.tsx

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

interface TrendLineChartProps {
  data: DataPoint[];
  height?: number;
  showTarget?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
  calculation?: {
    title: string;
    methodology: string;
    factors: CalculationFactor[];
  };
}

export function TrendLineChart({
  data,
  height = 200,
  showTarget = true,
  valueFormatter = (v) => v.toLocaleString(),
  className,
  calculation,
}: TrendLineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showCalcModal, setShowCalcModal] = useState(false);
  
  const values = data.map(d => d.value);
  const targets = data.map(d => d.target || 0).filter(t => t > 0);
  const allValues = [...values, ...targets];
  
  const maxValue = Math.max(...allValues) * 1.1;
  const minValue = Math.min(...allValues) * 0.9;
  const range = maxValue - minValue;
  
  const padding = { top: 20, right: 20, bottom: 30, left: 100 };
  const chartWidth = 100; // percentage
  const chartHeight = height - padding.top - padding.bottom;
  
  const getY = (value: number) => {
    return chartHeight - ((value - minValue) / range) * chartHeight + padding.top;
  };
  
  const getX = (index: number) => {
    return (index / (data.length - 1)) * (100 - 18) + 10; // percentage with padding - increased to avoid y-axis labels
  };
  
  // Generate path for actual values
  const actualPath = data.map((d, i) => {
    const x = getX(i);
    const y = getY(d.value);
    return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
  }).join(' ');
  
  // Generate path for target line
  const targetPath = showTarget && data[0]?.target
    ? data.map((d, i) => {
        const x = getX(i);
        const y = getY(d.target || 0);
        return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
      }).join(' ')
    : '';
  
  return (
    <div className={cn('relative w-full pl-2', className)}>
      <svg
        width="100%"
        height={height}
        style={{ overflow: 'visible' }}
      >
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + chartHeight * (1 - ratio);
          const value = minValue + range * ratio;
          return (
            <g key={ratio}>
              <line
                x1="10%"
                y1={y}
                x2="92%"
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={y}
                fontSize="11"
                fill="#64748b"
                textAnchor="end"
                dominantBaseline="middle"
                fontWeight="500"
              >
                {valueFormatter(Math.round(value))}
              </text>
            </g>
          );
        })}
        
        {/* Target Line */}
        {targetPath && (
          <path
            d={targetPath}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
        )}
        
        {/* Actual Line */}
        <path
          d={actualPath}
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data Points */}
        {data.map((d, i) => {
          const x = getX(i);
          const y = getY(d.value);
          const isHovered = hoveredIndex === i;
          
          // Calculate label interval based on data length to prevent overlapping
          // For 24 hours, show every 2nd hour (12 labels)
          // For fewer points, show all labels
          const labelInterval = data.length > 12 ? Math.ceil(data.length / 12) : 1;
          const shouldShowLabel = i % labelInterval === 0 || i === data.length - 1;
          
          return (
            <g key={i}>
              <circle
                cx={`${x}%`}
                cy={y}
                r={isHovered ? 6 : 4}
                fill="#10b981"
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              
              {/* X-axis label - only show for selected intervals */}
              {shouldShowLabel && (
                <text
                  x={`${x}%`}
                  y={height - padding.bottom + 10}
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {d.label}
                </text>
              )}
              
              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={`${x - 5}%`}
                    y={y - 35}
                    width="10%"
                    height="24"
                    rx="4"
                    fill="#1e293b"
                  />
                  <text
                    x={`${x}%`}
                    y={y - 20}
                    fontSize="12"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {valueFormatter(d.value)}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-emerald-500 rounded" />
          <span className="text-xs text-slate-500">Actual</span>
        </div>
        {showTarget && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-slate-400 rounded" style={{ strokeDasharray: '4 4' }} />
            <span className="text-xs text-slate-500">Target</span>
          </div>
        )}
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

