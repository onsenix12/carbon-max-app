// components/operations/charts/HourlyEmissionsChart.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { CalculationInfoModal } from '@/components/operations/cards/CalculationInfoModal';
import type { CalculationFactor } from '@/lib/emissions/types';

interface HourlyDataPoint {
  hour: string;
  emissions: number;
}

interface HourlyEmissionsChartProps {
  data: HourlyDataPoint[];
  height?: number;
  calculation?: {
    title: string;
    methodology: string;
    factors: CalculationFactor[];
  };
}

export function HourlyEmissionsChart({ data, height = 200, calculation }: HourlyEmissionsChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showCalcModal, setShowCalcModal] = useState(false);
  
  const maxEmissions = Math.max(...data.map(d => d.emissions));
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartHeight = height - padding.top - padding.bottom;
  
  const getY = (value: number) => {
    return chartHeight - (value / maxEmissions) * chartHeight + padding.top;
  };
  
  const getX = (index: number) => {
    return (index / (data.length - 1)) * (100 - 15) + 7.5;
  };
  
  // Generate bar path
  const bars = data.map((d, i) => {
    const x = getX(i);
    const barHeight = (d.emissions / maxEmissions) * chartHeight;
    const y = getY(d.emissions);
    
    return {
      x: `${x}%`,
      y,
      width: `${(100 - 15) / data.length}%`,
      height: barHeight,
      value: d.emissions,
      hour: d.hour,
    };
  });
  
  return (
    <div className="relative" style={{ height }}>
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + chartHeight * (1 - ratio);
          const value = maxEmissions * ratio;
          return (
            <g key={ratio}>
              <line
                x1="7.5%"
                y1={y}
                x2="92.5%"
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
              <text
                x="5%"
                y={y}
                fontSize="11"
                fill="#94a3b8"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {Math.round(value)}
              </text>
            </g>
          );
        })}
        
        {/* Bars */}
        {bars.map((bar, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g key={i}>
              <rect
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={isHovered ? "#10b981" : "#34d399"}
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                rx="2"
              />
              
              {/* Hour label */}
              <text
                x={`${parseFloat(bar.x) + parseFloat(bar.width) / 2}%`}
                y={height - 10}
                fontSize="10"
                fill="#64748b"
                textAnchor="middle"
              >
                {bar.hour.split(':')[0]}
              </text>
              
              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={`${parseFloat(bar.x) + parseFloat(bar.width) / 2 - 3}%`}
                    y={bar.y - 30}
                    width="6%"
                    height="24"
                    rx="4"
                    fill="#1e293b"
                  />
                  <text
                    x={`${parseFloat(bar.x) + parseFloat(bar.width) / 2}%`}
                    y={bar.y - 15}
                    fontSize="11"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {bar.value.toFixed(1)} tCO₂e
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      
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

