// components/operations/charts/ForecastChart.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { CalculationInfoModal } from '@/components/operations/cards/CalculationInfoModal';
import type { CalculationFactor } from '@/lib/emissions/types';

interface ForecastDataPoint {
  date: string;
  actual?: number;
  predicted?: number;
  confidenceUpper?: number;
  confidenceLower?: number;
}

interface ForecastChartProps {
  data: ForecastDataPoint[];
  height?: number;
  className?: string;
  calculation?: {
    title: string;
    methodology: string;
    factors: CalculationFactor[];
  };
}

export function ForecastChart({
  data,
  height = 300,
  className,
  calculation,
}: ForecastChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showCalcModal, setShowCalcModal] = useState(false);
  
  // Find the split point between actual and predicted
  const actualEndIndex = data.findIndex(d => d.actual === undefined);
  const hasActual = data.some(d => d.actual !== undefined);
  const hasPredicted = data.some(d => d.predicted !== undefined);
  const actualEnd = actualEndIndex === -1 ? data.length : actualEndIndex;
  
  // Calculate min/max for scaling
  const allValues = data.flatMap(d => [
    d.actual,
    d.predicted,
    d.confidenceUpper,
    d.confidenceLower,
  ].filter((v): v is number => v !== undefined));
  
  const maxValue = Math.max(...allValues) * 1.1;
  const minValue = Math.min(...allValues) * 0.9;
  const range = maxValue - minValue;
  
  const padding = { top: 20, right: 20, bottom: 50, left: 85 };
  const chartHeight = height - padding.top - padding.bottom;
  
  const getY = (value: number) => {
    return chartHeight - ((value - minValue) / range) * chartHeight + padding.top;
  };
  
  // Use viewBox for proper coordinate scaling
  const viewBoxWidth = 1000;
  const viewBoxHeight = height;
  
  // Calculate x positions in viewBox coordinates
  const chartAreaLeft = (8 / 100) * viewBoxWidth; // 8% padding
  const chartAreaWidth = (84 / 100) * viewBoxWidth; // 84% width
  const getX = (index: number) => {
    return chartAreaLeft + (index / (data.length - 1)) * chartAreaWidth;
  };
  
  // Generate paths using viewBox coordinates
  const actualPath = hasActual && actualEnd > 0
    ? data.slice(0, actualEnd).map((d, i) => {
        const x = getX(i);
        const y = getY(d.actual!);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ')
    : '';
  
  // Predicted path - only show in forecast zone (where actual data doesn't exist)
  // Start from the last actual point for smooth transition
  const predictedPath = hasPredicted
    ? (() => {
        const points: string[] = [];
        let isFirst = true;
        
        // Start predicted line from the last actual point (if it has predicted value)
        // This creates a smooth transition from actual to predicted
        if (actualEnd > 0 && actualEnd <= data.length) {
          const lastActualIndex = actualEnd - 1;
          const lastActualPoint = data[lastActualIndex];
          
          // Use predicted value at the last actual point for transition
          if (lastActualPoint.predicted !== undefined) {
            const x = getX(lastActualIndex);
            const y = getY(lastActualPoint.predicted);
            points.push(`M ${x} ${y}`);
            isFirst = false;
          }
        }
        
        // Add all predicted points in the forecast zone (where actual data doesn't exist)
        data.forEach((d, i) => {
          // Only include points in the forecast zone (no actual data)
          if (d.predicted !== undefined && i >= actualEnd) {
            const x = getX(i);
            const y = getY(d.predicted);
            points.push(`${isFirst ? 'M' : 'L'} ${x} ${y}`);
            isFirst = false;
          }
        });
        
        return points.join(' ');
      })()
    : '';
  
  // Confidence interval area - needs to be calculated after getX is defined
  // We'll calculate it inline in the render
  
  return (
    <div className={cn('relative w-full pl-2', className)}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding.top + chartHeight * (1 - ratio);
          const value = minValue + range * ratio;
          return (
            <g key={ratio}>
              <line
                x1={chartAreaLeft}
                y1={y}
                x2={chartAreaLeft + chartAreaWidth}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
              <text
                x={chartAreaLeft - 20}
                y={y}
                fontSize="11"
                fill="#64748b"
                textAnchor="end"
                dominantBaseline="middle"
                fontWeight="500"
              >
                {Math.round(value).toLocaleString()}
              </text>
            </g>
          );
        })}
        
        {/* Confidence Interval Area - only in forecast zone */}
        {hasPredicted && (() => {
          const upperPoints: string[] = [];
          const lowerPoints: string[] = [];
          let isFirst = true;
          
          // Start from transition point if it has confidence data
          if (actualEnd > 0 && actualEnd <= data.length) {
            const lastActualIndex = actualEnd - 1;
            const lastActualPoint = data[lastActualIndex];
            
            // If transition point has confidence data, start from there
            if (lastActualPoint.confidenceUpper !== undefined && lastActualPoint.confidenceLower !== undefined) {
              const x = getX(lastActualIndex);
              const yUpper = getY(lastActualPoint.confidenceUpper);
              upperPoints.push(`M ${x} ${yUpper}`);
              isFirst = false;
            }
          }
          
          // Build upper bound path - only in forecast zone
          data.forEach((d, i) => {
            if (i >= actualEnd && d.confidenceUpper !== undefined && d.confidenceLower !== undefined) {
              const x = getX(i);
              const yUpper = getY(d.confidenceUpper);
              upperPoints.push(`${isFirst ? 'M' : 'L'} ${x} ${yUpper}`);
              isFirst = false;
            }
          });
          
          // Build lower bound path in reverse - only in forecast zone
          for (let i = data.length - 1; i >= actualEnd; i--) {
            const d = data[i];
            if (d.confidenceLower !== undefined && d.confidenceUpper !== undefined) {
              const x = getX(i);
              const yLower = getY(d.confidenceLower);
              lowerPoints.push(`L ${x} ${yLower}`);
            }
          }
          
          // Close the path at the transition point if we started from there
          if (actualEnd > 0 && actualEnd <= data.length) {
            const lastActualPoint = data[actualEnd - 1];
            if (lastActualPoint.confidenceLower !== undefined && lastActualPoint.confidenceUpper !== undefined) {
              const x = getX(actualEnd - 1);
              const yLower = getY(lastActualPoint.confidenceLower);
              lowerPoints.push(`L ${x} ${yLower}`);
            }
          }
          
          const confidencePath = upperPoints.join(' ') + ' ' + lowerPoints.join(' ') + ' Z';
          
          return confidencePath && upperPoints.length > 0 ? (
            <path
              d={confidencePath}
              fill="#3b82f6"
              fillOpacity="0.1"
              stroke="none"
            />
          ) : null;
        })()}
        
        {/* Actual Line */}
        {actualPath && actualPath.trim().length > 0 && (
          <path
            d={actualPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
        )}
        
        {/* Predicted Line */}
        {predictedPath && predictedPath.trim().length > 0 && (
          <path
            d={predictedPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
        )}
        
        {/* Vertical divider between actual and predicted */}
        {hasActual && actualEnd > 0 && actualEnd < data.length && (
          <line
            x1={getX(actualEnd - 1)}
            y1={padding.top}
            x2={getX(actualEnd - 1)}
            y2={height - padding.bottom}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.5"
          />
        )}
        
        {/* Data Points */}
        {data.map((d, i) => {
          const x = getX(i);
          const isHovered = hoveredIndex === i;
          const isActual = d.actual !== undefined;
          const isPredicted = d.predicted !== undefined;
          const isInForecastZone = i >= actualEnd; // Points in forecast zone (no actual data)
          
          return (
            <g key={i}>
              {/* Actual point - only show in actual period */}
              {isActual && !isInForecastZone && (
                <circle
                  cx={x}
                  cy={getY(d.actual!)}
                  r={isHovered ? 6 : 4}
                  fill="#10b981"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              )}
              
              {/* Predicted point - only show in forecast zone */}
              {isPredicted && isInForecastZone && (
                <circle
                  cx={x}
                  cy={getY(d.predicted!)}
                  r={isHovered ? 5 : 3}
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              )}
              
              {/* X-axis label */}
              <text
                x={x}
                y={height - padding.bottom + 15}
                fontSize="10"
                fill="#64748b"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </text>
              
              {/* Tooltip */}
              {isHovered && (
                <g>
                  <rect
                    x={x - 60}
                    y={isActual ? getY(d.actual!) - 50 : getY(d.predicted!) - 50}
                    width="120"
                    height="40"
                    rx="4"
                    fill="#1e293b"
                  />
                  <text
                    x={x}
                    y={(isActual ? getY(d.actual!) : getY(d.predicted!)) - 35}
                    fontSize="11"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {isActual ? `Actual: ${Math.round(d.actual!).toLocaleString()}` : ''}
                  </text>
                  {isPredicted && (
                    <text
                      x={x}
                      y={(isActual ? getY(d.actual!) : getY(d.predicted!)) - 20}
                      fontSize="11"
                      fill="white"
                      textAnchor="middle"
                      fontWeight="500"
                    >
                      {isActual ? `Pred: ${Math.round(d.predicted!).toLocaleString()}` : `Predicted: ${Math.round(d.predicted!).toLocaleString()}`}
                    </text>
                  )}
                </g>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs">
        {hasActual && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-emerald-500 rounded" />
            <span className="text-slate-600">Actual</span>
          </div>
        )}
        {hasPredicted && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-blue-500 rounded border-dashed border border-blue-500" style={{ borderStyle: 'dashed' }} />
              <span className="text-slate-600">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-blue-200 rounded" />
              <span className="text-slate-600">Confidence Interval (±8%)</span>
            </div>
          </>
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

