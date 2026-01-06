// app/(operations)/dashboard/carbonmax/page.tsx

'use client';

import { Leaf, TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { KPICard } from '@/components/operations/cards/KPICard';
import { CompactHourlyChart } from '@/components/operations/charts/CompactHourlyChart';
import { useCarbonMaxData } from '@/hooks/useCarbonMaxData';

export default function CarbonMaxPage() {
  const { data, isLoading } = useCarbonMaxData();
  
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }
  
  const summary = data.summary;
  const co2AvoidedTonnes = summary.totalCO2Avoided / 1000;
  
  // Convert hourly activity to chart format
  const hourlyData = data.hourlyActivity.map((hour) => ({
    hour: hour.hour.split(':')[0] + ':00',
    value: hour.co2Avoided,
  }));
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="CarbonMax Impact"
        subtitle="Consumer app activity and emissions avoided"
        icon={<Leaf className="w-6 h-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="CO₂ Avoided Today"
          value={co2AvoidedTonnes.toFixed(1)}
          unit="tCO2e"
          size="large"
          status="positive"
          icon={<Leaf className="w-5 h-5" />}
        />
        
        <KPICard
          title="Quests Completed"
          value={summary.totalQuestsCompleted.toLocaleString()}
          subtitle="user actions"
        />
        
        <KPICard
          title="Active Users"
          value={summary.activeUsers.toLocaleString()}
          subtitle="today"
        />
        
        <KPICard
          title="Green Meals"
          value={summary.totalGreenMeals.toLocaleString()}
          subtitle="served today"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Hourly Activity
          </h3>
          <CompactHourlyChart
            data={hourlyData}
            valueFormatter={(v) => `${v} kg`}
            calculation={{
              title: 'CarbonMax Hourly CO₂ Avoided',
              methodology: `Hourly CO₂ avoided = Sum of all user actions (Green Meals + Plastic Avoided + SAF Contributions) per hour. Total daily = ${(summary.totalCO2Avoided / 1000).toFixed(1)} tCO2e`,
              factors: [
                { name: 'Green Meals Impact', value: summary.totalGreenMeals, unit: 'meals', source: 'Lower carbon meal choices' },
                { name: 'Plastic Avoided Impact', value: summary.totalPlasticAvoided, unit: 'items', source: 'Reusable alternatives' },
                { name: 'SAF Contributions', value: summary.totalSAFContributions, unit: 'contributions', source: 'User SAF purchases' },
              ],
            }}
          />
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Impact Breakdown
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Green Meals</span>
                <span className="font-medium text-slate-900">{summary.totalGreenMeals}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Plastic Avoided</span>
                <span className="font-medium text-slate-900">{summary.totalPlasticAvoided}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">SAF Contributions</span>
                <span className="font-medium text-slate-900">{summary.totalSAFContributions}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

