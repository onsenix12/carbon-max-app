import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 font-medium';
  
  const variantClasses = {
    primary: 'bg-[#10B981] text-white hover:bg-[#059669] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'glass hover:glass-strong active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent hover:glass-light active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button 
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

