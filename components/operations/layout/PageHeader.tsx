// components/operations/layout/PageHeader.tsx

'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Download } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  date?: string;
  showExport?: boolean;
  onExport?: () => void;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  date,
  showExport = true,
  onExport,
  actions,
  className,
}: PageHeaderProps) {
  // Default to today's date if not provided
  const displayDate = date || new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className={cn('flex items-start justify-between mb-6', className)}>
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Date Display */}
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
          <Calendar className="w-4 h-4" />
          <span>{displayDate}</span>
        </div>
        
        {/* Export Button */}
        {showExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        )}
        
        {/* Custom Actions */}
        {actions}
      </div>
    </div>
  );
}

