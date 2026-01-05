import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  step?: string | number;
  min?: string | number;
  max?: string | number;
}

export function Input({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange,
  onKeyPress,
  icon,
  className = '',
  disabled = false,
  step,
  min,
  max,
}: InputProps) {
  return (
    <div className={cn(
      'glass rounded-2xl flex items-center gap-3 px-5 py-3',
      disabled && 'opacity-50',
      className
    )}>
      {icon && <div className="text-muted-foreground flex-shrink-0">{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
      />
    </div>
  );
}

