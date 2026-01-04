// components/operations/layout/AlertBanner.tsx

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, X, ChevronRight, Info, CheckCircle } from 'lucide-react';
import Link from 'next/link';

type AlertType = 'warning' | 'error' | 'info' | 'success';

interface AlertBannerProps {
  type?: AlertType;
  message: string;
  linkText?: string;
  linkHref?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function AlertBanner({
  type = 'warning',
  message,
  linkText,
  linkHref,
  dismissible = true,
  onDismiss,
}: AlertBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (isDismissed) return null;
  
  const styles = {
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
      textColor: 'text-amber-800',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      textColor: 'text-red-800',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-500',
      textColor: 'text-blue-800',
    },
    success: {
      bg: 'bg-emerald-50 border-emerald-200',
      icon: CheckCircle,
      iconColor: 'text-emerald-500',
      textColor: 'text-emerald-800',
    },
  };
  
  const { bg, icon: Icon, iconColor, textColor } = styles[type];
  
  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };
  
  return (
    <div className={cn('border rounded-lg px-4 py-3 flex items-center gap-3', bg)}>
      <Icon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
      
      <p className={cn('flex-1 text-sm', textColor)}>
        {message}
      </p>
      
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className={cn(
            'flex items-center gap-1 text-sm font-medium hover:underline',
            textColor
          )}
        >
          {linkText}
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
      
      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn('p-1 hover:bg-black/5 rounded transition-colors', textColor)}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

