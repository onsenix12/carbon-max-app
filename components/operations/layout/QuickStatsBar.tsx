// components/operations/layout/QuickStatsBar.tsx

'use client';

import { Plane, Users, Store, Thermometer } from 'lucide-react';

interface QuickStatsBarProps {
  flights: number;
  passengers: number;
  tenants: number;
  temperature: number;
}

export function QuickStatsBar({
  flights,
  passengers,
  tenants,
  temperature,
}: QuickStatsBarProps) {
  const stats = [
    {
      icon: Plane,
      label: 'Flights',
      value: flights.toLocaleString(),
    },
    {
      icon: Users,
      label: 'Passengers',
      value: passengers.toLocaleString(),
    },
    {
      icon: Store,
      label: 'Active Tenants',
      value: tenants.toString(),
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${temperature}°C`,
    },
  ];
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between divide-x divide-slate-200">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 px-6 first:pl-0 last:pr-0"
          >
            <stat.icon className="w-5 h-5 text-slate-400" />
            <div>
              <p className="text-xs text-slate-500">{stat.label}</p>
              <p className="text-sm font-semibold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

