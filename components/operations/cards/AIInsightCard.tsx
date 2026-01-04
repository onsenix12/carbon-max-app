// components/operations/cards/AIInsightCard.tsx

'use client';

import { Brain, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { DASHBOARD_ROUTES } from '@/lib/emissions/constants';

export function AIInsightCard() {
  // This would typically come from the AI insights API
  // For demo, we'll use static content
  const insight = {
    title: 'Taxi Time Anomaly Detected',
    description: 'Aircraft taxi times increased 12% this week due to runway maintenance. This added approximately 18 tCO2e. Expected to normalize by Thursday.',
    confidence: 'High',
    confidencePercent: 92,
    type: 'anomaly' as const,
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            AI Insight of the Day
          </h3>
        </div>
        <Link
          href={DASHBOARD_ROUTES.insights}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View Full Analysis
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Insight Content */}
      <div className="bg-white/60 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-slate-900 mb-1">{insight.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              "{insight.description}"
            </p>
          </div>
        </div>
      </div>
      
      {/* Confidence */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Confidence Level</p>
          <p className="text-sm font-medium text-slate-900">
            {insight.confidence} ({insight.confidencePercent}%)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Based on:</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
            Historical patterns
          </span>
        </div>
      </div>
    </div>
  );
}

