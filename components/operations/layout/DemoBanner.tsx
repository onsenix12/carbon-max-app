// components/operations/layout/DemoBanner.tsx

'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';
import { DEMO_MODE } from '@/lib/emissions/constants';

export function DemoBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  
  if (!DEMO_MODE.enabled || isDismissed) return null;
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
      <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1">
        <p className="text-sm text-blue-800">
          <span className="font-medium">DEMO MODE:</span>{' '}
          {DEMO_MODE.disclaimer}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Data period: {DEMO_MODE.startDate} to {DEMO_MODE.endDate}
        </p>
      </div>
      
      <button
        onClick={() => setIsDismissed(true)}
        className="p-1 hover:bg-blue-100 rounded transition-colors text-blue-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

