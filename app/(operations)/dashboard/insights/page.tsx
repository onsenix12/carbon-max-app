// app/(operations)/dashboard/insights/page.tsx

'use client';

import { Brain, Sparkles, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { AlertBanner } from '@/components/operations/layout/AlertBanner';

export default function InsightsPage() {
  const insights = [
    {
      id: '1',
      type: 'anomaly' as const,
      priority: 'high' as const,
      title: 'Taxi Time Anomaly Detected',
      description: 'Aircraft taxi times increased 12% this week due to runway maintenance. This added approximately 18 tCO2e. Expected to normalize by Thursday.',
      impact: '-18 tCO2e/week',
      confidence: 'high' as const,
      confidencePercent: 92,
      generatedAt: '2026-01-04T08:00:00Z',
    },
    {
      id: '2',
      type: 'opportunity' as const,
      priority: 'medium' as const,
      title: 'SAF Adoption Opportunity',
      description: 'Singapore Airlines shows 1.2% SAF usage. Encouraging other airlines to match could reduce emissions by 5-8% across the fleet.',
      impact: '-5% potential reduction',
      effort: 'medium' as const,
      confidence: 'medium' as const,
      confidencePercent: 75,
      generatedAt: '2026-01-04T07:30:00Z',
    },
    {
      id: '3',
      type: 'trend' as const,
      priority: 'low' as const,
      title: 'Weekend Pattern Identified',
      description: 'Jewel emissions consistently 20% higher on weekends. Consider optimizing HVAC schedules during peak visitor hours.',
      impact: '-3% potential reduction',
      confidence: 'high' as const,
      confidencePercent: 88,
      generatedAt: '2026-01-03T18:00:00Z',
    },
  ];
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'anomaly': return AlertTriangle;
      case 'opportunity': return Lightbulb;
      case 'trend': return TrendingUp;
      default: return Sparkles;
    }
  };
  
  const getColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-amber-200 bg-amber-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Insights"
        subtitle="AI-powered emissions analysis and recommendations"
        icon={<Brain className="w-6 h-6" />}
      />
      
      <AlertBanner
        type="info"
        message="Insights are generated daily using machine learning models trained on historical emissions data."
      />
      
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = getIcon(insight.type);
          const colorClass = getColor(insight.priority);
          
          return (
            <div
              key={insight.id}
              className={`rounded-xl border p-6 ${colorClass}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                    <span className="text-xs px-2 py-1 bg-white rounded text-slate-600 capitalize">
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-3">{insight.description}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    {insight.impact && (
                      <span className="font-medium">Impact: {insight.impact}</span>
                    )}
                    <span>Confidence: {insight.confidencePercent}%</span>
                    <span>{new Date(insight.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

