import { GlassCard } from './GlassCard';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  trend?: string;
  className?: string;
}

export function StatCard({ icon, value, label, trend, className = '' }: StatCardProps) {
  return (
    <GlassCard className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-3xl font-bold mb-2 text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
          {trend && (
            <div className="text-xs text-[#10B981] mt-2 font-medium">{trend}</div>
          )}
        </div>
        <div className="text-[#10B981] opacity-60 text-2xl flex-shrink-0">
          {icon}
        </div>
      </div>
    </GlassCard>
  );
}

