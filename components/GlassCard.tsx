import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'light';
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className = '', 
  variant = 'default',
  onClick 
}: GlassCardProps) {
  const variantClasses = {
    default: 'glass',
    strong: 'glass-strong',
    light: 'glass-light'
  };

  return (
    <div 
      className={cn(
        'rounded-3xl', // 24px border radius as per design system
        variantClasses[variant],
        onClick && 'cursor-pointer transition-transform hover:scale-[1.02]',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

