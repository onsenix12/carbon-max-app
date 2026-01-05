// components/operations/charts/ForecastChart.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

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
}

export function ForecastChart({
  data,
  height = 300,
  className,
}: ForecastChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
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
  
  const getX = (index: number) => {
    return (index / (data.length - 1)) * (100 - 16) + 8; // percentage with padding
  };
  
  // Generate paths
  const actualPath = hasActual && actualEnd > 0
    ? data.slice(0, actualEnd).map((d, i) => {
        const x = getX(i);
        const y = getY(d.actual!);
        return `${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
      }).join(' ')
    : '';
  
  const predictedPath = hasPredicted
    ? (() => {
        const points: string[] = [];
        let isFirst = true;
        data.forEach((d, i) => {
          if (d.predicted !== undefined) {
            const x = getX(i);
            const y = getY(d.predicted);
            points.push(`${isFirst ? 'M' : 'L'} ${x}% ${y}`);
            isFirst = false;
          }
        });
        return points.join(' ');
      })()
    : '';
  
  // Confidence interval area
  const confidencePath = hasPredicted
    ? (() => {
        const upperPoints: string[] = [];
        const lowerPoints: string[] = [];
        let isFirst = true;
        
        // Build upper bound path
        data.forEach((d, i) => {
          if (d.confidenceUpper !== undefined && d.confidenceLower !== undefined) {
            const x = getX(i);
            const yUpper = getY(d.confidenceUpper);
            upperPoints.push(`${isFirst ? 'M' : 'L'} ${x}% ${yUpper}`);
            isFirst = false;
          }
        });
        
        // Build lower bound path in reverse
        for (let i = data.length - 1; i >= 0; i--) {
          const d = data[i];
          if (d.confidenceLower !== undefined && d.confidenceUpper !== undefined) {
            const x = getX(i);
            const yLower = getY(d.confidenceLower);
            lowerPoints.push(`L ${x}% ${yLower}`);
          }
        }
        
        return upperPoints.join(' ') + ' ' + lowerPoints.join(' ') + ' Z';
      })()
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
                x1="8%"
                y1={y}
                x2="92%"
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
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
        
        {/* Confidence Interval Area */}
        {confidencePath && (
          <path
            d={confidencePath}
            fill="#3b82f6"
            fillOpacity="0.1"
            stroke="none"
          />
        )}
        
        {/* Actual Line */}
        {actualPath && (
          <path
            d={actualPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        
        {/* Predicted Line */}
        {predictedPath && (
          <path
            d={predictedPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        
        {/* Vertical divider between actual and predicted */}
        {hasActual && actualEnd > 0 && actualEnd < data.length && (
          <line
            x1={`${getX(actualEnd - 1)}%`}
            y1={padding.top}
            x2={`${getX(actualEnd - 1)}%`}
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
          
          return (
            <g key={i}>
              {/* Actual point */}
              {isActual && (
                <circle
                  cx={`${x}%`}
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
              
              {/* Predicted point */}
              {isPredicted && (
                <circle
                  cx={`${x}%`}
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
                x={`${x}%`}
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
                    x={`${x - 6}%`}
                    y={isActual ? getY(d.actual!) - 50 : getY(d.predicted!) - 50}
                    width="12%"
                    height="40"
                    rx="4"
                    fill="#1e293b"
                  />
                  <text
                    x={`${x}%`}
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
                      x={`${x}%`}
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
    </div>
  );
}

