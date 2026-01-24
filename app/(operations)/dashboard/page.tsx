// app/(operations)/dashboard/page.tsx

'use client';

import { LayoutDashboard, Plane, Users, Target, Award } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { AlertBanner } from '@/components/operations/layout/AlertBanner';
import { KPICard } from '@/components/operations/cards/KPICard';
import { ScopeDonutChart } from '@/components/operations/charts/ScopeDonutChart';
import { CompactTrendChart } from '@/components/operations/charts/CompactTrendChart';
import { JourneyModeCard } from '@/components/operations/cards/JourneyModeCard';
import { CarbonMaxSummaryCard } from '@/components/operations/cards/CarbonMaxSummaryCard';
import { AIInsightCard } from '@/components/operations/cards/AIInsightCard';
import { QuickStatsBar } from '@/components/operations/layout/QuickStatsBar';

// Import simulated data (we'll create this later)
import { useDashboardData } from '@/hooks/useDashboardData';

export default function OverviewPage() {
  const { todayData, weeklyTrend, isLoading } = useDashboardData();
  
  if (isLoading) {
    return <OverviewSkeleton />;
  }
  
  // Calculate alert condition
  const showAlert = todayData.vsTarget > 5; // More than 5% above target
  
  // Scope breakdown for donut chart
  const scopeSegments = [
    {
      label: 'Scope 1',
      value: todayData.scope1.total,
      color: '#f59e0b',
      percentage: (todayData.scope1.total / todayData.totalEmissions) * 100,
    },
    {
      label: 'Scope 2',
      value: todayData.scope2.total,
      color: '#3b82f6',
      percentage: (todayData.scope2.total / todayData.totalEmissions) * 100,
    },
    {
      label: 'Scope 3',
      value: todayData.scope3.total,
      color: '#10b981',
      percentage: (todayData.scope3.total / todayData.totalEmissions) * 100,
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Overview"
        subtitle="Real-time carbon emissions monitoring"
        icon={<LayoutDashboard className="w-6 h-6" />}
      />
      
      {/* Alert Banner (conditional) */}
      {showAlert && (
        <AlertBanner
          type="warning"
          message={`Scope 3 emissions ${todayData.vsTarget.toFixed(1)}% above weekly target`}
          linkText="View Insights AI"
          linkHref="/dashboard/insights"
        />
      )}
      
      {/* Row 1: Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Emissions"
          value={todayData.totalEmissions.toFixed(0)}
          unit="tCO2e today"
          status={todayData.vsLastWeek < 0 ? 'positive' : 'negative'}
          size="large"
          calculation={{
            title: 'Total Daily Emissions',
            methodology: `Scope 1 + Scope 2 + Scope 3 = ${todayData.scope1.total.toFixed(1)} + ${todayData.scope2.total.toFixed(1)} + ${todayData.scope3.total.toFixed(1)} = ${todayData.totalEmissions.toFixed(1)} tCO2e`,
            factors: [
              { name: 'Scope 1', value: todayData.scope1.total, unit: 'tCO2e', source: 'Direct measurement' },
              { name: 'Scope 2', value: todayData.scope2.total, unit: 'tCO2e', source: 'SMART meters × Grid EF' },
              { name: 'Scope 3', value: todayData.scope3.total, unit: 'tCO2e', source: 'Activity-based calculation' },
            ],
          }}
        />
        
        <KPICard
          title="vs Last Week"
          value={`${todayData.vsLastWeek > 0 ? '+' : ''}${todayData.vsLastWeek.toFixed(1)}%`}
          trend={{
            value: Math.abs(todayData.vsLastWeek),
            direction: todayData.vsLastWeek < 0 ? 'down' : 'up',
            isPositive: todayData.vsLastWeek < 0,
          }}
          subtitle={todayData.vsLastWeek < 0 ? 'improvement' : 'increase'}
          status={todayData.vsLastWeek < 0 ? 'positive' : 'negative'}
        />
        
        <KPICard
          title="2030 Target Progress"
          value="62%"
          subtitle="on track"
          icon={<Target className="w-5 h-5" />}
          status="positive"
          calculation={{
            title: '2030 Reduction Target Progress',
            methodology: 'Current reduction vs baseline / Target reduction × 100 = (582,414 - ~530,000) / (582,414 × 0.20) × 100 = 62%',
            factors: [
              { name: 'FY21/22 Baseline', value: 582414, unit: 'tCO2e/year', source: 'CAG Sustainability Report' },
              { name: 'Target Reduction', value: 20, unit: '%', source: 'CAG 2030 Commitment' },
              { name: 'Current Annual', value: 530000, unit: 'tCO2e/year (est)', source: 'Extrapolated from daily' },
            ],
          }}
        />
        
        <KPICard
          title="ACA Level Status"
          value="Level 3"
          subtitle="Level 4 ready: 85%"
          icon={<Award className="w-5 h-5" />}
          status="neutral"
        />
      </div>
      
      {/* Row 2: Scope Breakdown + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scope Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Emissions by Scope
          </h3>
          <ScopeDonutChart
            segments={scopeSegments}
            centerValue={todayData.totalEmissions.toFixed(0)}
            centerLabel="tCO2e"
            calculation={{
              title: 'Emissions by Scope Breakdown',
              methodology: `Total Emissions = Scope 1 + Scope 2 + Scope 3 = ${todayData.scope1.total.toFixed(1)} + ${todayData.scope2.total.toFixed(1)} + ${todayData.scope3.total.toFixed(1)} = ${todayData.totalEmissions.toFixed(1)} tCO2e`,
              factors: [
                { name: 'Scope 1', value: todayData.scope1.total, unit: 'tCO2e', source: 'Direct measurement' },
                { name: 'Scope 2', value: todayData.scope2.total, unit: 'tCO2e', source: 'SMART meters × Grid EF' },
                { name: 'Scope 3', value: todayData.scope3.total, unit: 'tCO2e', source: 'Activity-based calculation' },
              ],
            }}
          />
        </div>
        
        {/* 7-Day Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            7-Day Trend
          </h3>
          <CompactTrendChart
            data={weeklyTrend}
            valueFormatter={(v) => `${v.toLocaleString()} tCO2e`}
            calculation={{
              title: '7-Day Emissions Trend',
              methodology: weeklyTrend.length > 0
                ? `Daily emissions calculated as sum of Scope 1, Scope 2, and Scope 3 emissions. Weekly average = (Day 1 + Day 2 + ... + Day 7) / 7 = ${(weeklyTrend.reduce((sum, d) => sum + d.value, 0) / weeklyTrend.length).toFixed(1)} tCO2e/day`
                : 'Daily emissions calculated as sum of Scope 1, Scope 2, and Scope 3 emissions. Weekly average = (Day 1 + Day 2 + ... + Day 7) / 7',
              factors: weeklyTrend.length > 0
                ? [
                    { name: 'Daily Calculation', value: 1, unit: 'sum of scopes', source: 'Scope 1 + Scope 2 + Scope 3' },
                    { name: 'Weekly Average', value: weeklyTrend.reduce((sum, d) => sum + d.value, 0) / weeklyTrend.length, unit: 'tCO2e/day', source: '7-day rolling average' },
                  ]
                : [
                    { name: 'Daily Calculation', value: 1, unit: 'sum of scopes', source: 'Scope 1 + Scope 2 + Scope 3' },
                  ],
            }}
          />
        </div>
      </div>
      
      {/* Row 3: Journey Mode Breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Emissions by Journey Mode
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <JourneyModeCard
            mode="jewel"
            emissions={312}
            vsLastWeek={-5}
            topSource="Retail energy"
          />
          <JourneyModeCard
            mode="departure"
            emissions={1089}
            vsLastWeek={2}
            topSource="Aircraft LTO"
          />
          <JourneyModeCard
            mode="transit"
            emissions={195}
            vsLastWeek={-1}
            topSource="Lounge energy"
          />
        </div>
      </div>
      
      {/* Row 4: CarbonMax Impact + AI Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CarbonMaxSummaryCard data={todayData.carbonMaxActivity} />
        <AIInsightCard />
      </div>
      
      {/* Row 5: Quick Stats Bar */}
      <QuickStatsBar
        flights={todayData.operationalData.flights}
        passengers={todayData.operationalData.passengers}
        tenants={142}
        temperature={todayData.operationalData.temperature}
      />
    </div>
  );
}

// Loading skeleton
function OverviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-12 bg-slate-200 rounded-lg w-1/3" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-200 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-80 bg-slate-200 rounded-xl" />
        <div className="h-80 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

