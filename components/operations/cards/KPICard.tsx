// components/operations/cards/KPICard.tsx

'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CalculationInfoModal } from './CalculationInfoModal';
import type { CalculationFactor } from '@/lib/emissions/types';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
    isPositive?: boolean; // Whether "up" is good or bad
  };
  status?: 'positive' | 'negative' | 'warning' | 'neutral';
  icon?: ReactNode;
  size?: 'default' | 'large';
  // Calculation transparency
  calculation?: {
    title: string;
    methodology: string;
    factors: CalculationFactor[];
  };
  className?: string;
}

export function KPICard({
  title,
  value,
  unit,
  subtitle,
  trend,
  status = 'neutral',
  icon,
  size = 'default',
  calculation,
  className,
}: KPICardProps) {
  const [showCalcModal, setShowCalcModal] = useState(false);
  
  const statusStyles = {
    positive: 'border-emerald-200 bg-emerald-50/50',
    negative: 'border-red-200 bg-red-50/50',
    warning: 'border-amber-200 bg-amber-50/50',
    neutral: 'border-slate-200 bg-white',
  };
  
  const trendColors = {
    up: trend?.isPositive ? 'text-emerald-600' : 'text-red-600',
    down: trend?.isPositive === false ? 'text-emerald-600' : 'text-red-600',
    stable: 'text-slate-500',
  };
  
  const TrendIcon = trend?.direction === 'up' 
    ? TrendingUp 
    : trend?.direction === 'down' 
    ? TrendingDown 
    : Minus;

  return (
    <>
      <div
        className={cn(
          'rounded-xl border p-4 transition-all duration-200',
          'hover:shadow-md',
          statusStyles[status],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="text-slate-400">
                {icon}
              </div>
            )}
            <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          </div>
          
          {calculation && (
            <button
              onClick={() => setShowCalcModal(true)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 -m-1"
              aria-label="View calculation methodology"
            >
              <Info className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Value */}
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'font-bold text-slate-900',
              size === 'large' ? 'text-4xl' : 'text-2xl'
            )}
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span className="text-sm text-slate-500">{unit}</span>
          )}
        </div>
        
        {/* Trend & Subtitle */}
        <div className="mt-2 flex items-center gap-2">
          {trend && (
            <div className={cn('flex items-center gap-1 text-sm', trendColors[trend.direction])}>
              <TrendIcon className="w-4 h-4" />
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
          {subtitle && (
            <span className="text-sm text-slate-500">{subtitle}</span>
          )}
        </div>
      </div>
      
      {/* Calculation Modal */}
      {calculation && (
        <CalculationInfoModal
          isOpen={showCalcModal}
          onClose={() => setShowCalcModal(false)}
          title={calculation.title}
          methodology={calculation.methodology}
          factors={calculation.factors}
        />
      )}
    </>
  );
}

