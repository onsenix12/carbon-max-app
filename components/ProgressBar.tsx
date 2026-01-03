import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ 
  value, 
  max, 
  color = '#10B981',
  showLabel = false,
  className = '' 
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 glass-light rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${percentage}%`,
              background: color
            }}
          />
        </div>
        {showLabel && (
          <span className="text-sm text-muted-foreground min-w-[60px] text-right">
            {value} / {max}
          </span>
        )}
      </div>
    </div>
  );
}

