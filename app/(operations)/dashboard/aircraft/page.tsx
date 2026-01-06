// app/(operations)/dashboard/aircraft/page.tsx

'use client';

import { Plane, Clock, Fuel, Leaf } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { KPICard } from '@/components/operations/cards/KPICard';
import { ScopeDonutChart } from '@/components/operations/charts/ScopeDonutChart';
import { AirlineLeaderboard } from '@/components/operations/tables/AirlineLeaderboard';
import { AircraftTypeTable } from '@/components/operations/tables/AircraftTypeTable';
import { HourlyEmissionsChart } from '@/components/operations/charts/HourlyEmissionsChart';
import { useAircraftData } from '@/hooks/useAircraftData';

export default function AircraftPage() {
  const { data, isLoading } = useAircraftData();
  
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }
  
  const phaseSegments = [
    {
      label: 'LTO Cycle',
      value: data.emissions.lto,
      color: '#3b82f6',
      percentage: (data.emissions.lto / data.emissions.total) * 100,
    },
    {
      label: 'Taxi',
      value: data.emissions.taxi,
      color: '#f59e0b',
      percentage: (data.emissions.taxi / data.emissions.total) * 100,
    },
    {
      label: 'APU',
      value: data.emissions.apu,
      color: '#8b5cf6',
      percentage: (data.emissions.apu / data.emissions.total) * 100,
    },
  ];
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Aircraft Emissions"
        subtitle="Flight operations and airline performance"
        icon={<Plane className="w-6 h-6" />}
      />
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Aircraft Emissions"
          value={data.emissions.total.toFixed(0)}
          unit="tCO2e"
          size="large"
          status={data.vsLastWeek < 0 ? 'positive' : 'neutral'}
          calculation={{
            title: 'Aircraft Emissions Calculation',
            methodology: `LTO + Taxi + APU = ${data.emissions.lto.toFixed(0)} + ${data.emissions.taxi.toFixed(0)} + ${data.emissions.apu.toFixed(0)} = ${data.emissions.total.toFixed(0)} tCO2e`,
            factors: [
              { name: 'LTO Cycle', value: data.emissions.lto, unit: 'tCO2e', source: 'ICAO Doc 9889' },
              { name: 'Taxi Operations', value: data.emissions.taxi, unit: 'tCO2e', source: 'Calculated from taxi times' },
              { name: 'APU Usage', value: data.emissions.apu, unit: 'tCO2e', source: 'Estimated gate time' },
            ],
          }}
        />
        
        <KPICard
          title="Avg Taxi Time"
          value={data.avgTaxiTime.toFixed(1)}
          unit="minutes"
          icon={<Clock className="w-5 h-5" />}
          trend={{
            value: 2,
            direction: 'up',
            isPositive: false,
          }}
          subtitle="⚠️ above baseline"
          status="warning"
        />
        
        <KPICard
          title="Flights Today"
          value={data.flights}
          trend={{
            value: 3,
            direction: 'down',
            isPositive: false,
          }}
          subtitle="vs last week"
        />
        
        <KPICard
          title="SAF Usage"
          value="0.8%"
          subtitle="target: 1%"
          icon={<Leaf className="w-5 h-5" />}
          status="warning"
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Emissions by Flight Phase
          </h3>
          <ScopeDonutChart
            segments={phaseSegments}
            centerValue={data.emissions.total.toFixed(0)}
            centerLabel="tCO2e"
            calculation={{
              title: 'Aircraft Emissions by Flight Phase',
              methodology: `Total Aircraft Emissions = LTO Cycle + Taxi + APU = ${data.emissions.lto.toFixed(1)} + ${data.emissions.taxi.toFixed(1)} + ${data.emissions.apu.toFixed(1)} = ${data.emissions.total.toFixed(1)} tCO2e`,
              factors: [
                { name: 'LTO Cycle', value: data.emissions.lto, unit: 'tCO2e', source: 'ICAO Doc 9889' },
                { name: 'Taxi Operations', value: data.emissions.taxi, unit: 'tCO2e', source: 'Calculated from taxi times' },
                { name: 'APU Usage', value: data.emissions.apu, unit: 'tCO2e', source: 'Estimated gate time' },
              ],
            }}
          />
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Top 10 Airlines by Emissions
          </h3>
          <AirlineLeaderboard airlines={data.topAirlines} />
        </div>
      </div>
      
      {/* Aircraft Type Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Aircraft Type Performance
        </h3>
        <AircraftTypeTable types={data.aircraftTypes} />
      </div>
      
      {/* Hourly Pattern */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Emissions by Hour
        </h3>
        <HourlyEmissionsChart 
          data={data.hourlyPattern}
          calculation={{
            title: 'Hourly Aircraft Emissions',
            methodology: `Hourly emissions = Sum of all flight operations (LTO + Taxi + APU) per hour. Total daily = ${data.hourlyPattern.reduce((sum, h) => sum + h.emissions, 0).toFixed(1)} tCO2e`,
            factors: [
              { name: 'Hourly Calculation', value: 1, unit: 'sum of operations', source: 'LTO + Taxi + APU per hour' },
              { name: 'Peak Hour', value: Math.max(...data.hourlyPattern.map(h => h.emissions)), unit: 'tCO2e', source: '08:00-10:00 (morning departures)' },
            ],
          }}
        />
        <p className="text-sm text-slate-500 mt-4">
          Peak: 08:00-10:00 (morning departures)
        </p>
      </div>
    </div>
  );
}

