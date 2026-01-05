// app/(operations)/dashboard/settings/page.tsx

'use client';

import { useState } from 'react';
import { Settings, Target, Database, Download, FileSpreadsheet, Mail } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { TARGETS } from '@/lib/emissions/constants';

export default function SettingsPage() {
  // Targets & Thresholds state
  const [targets, setTargets] = useState({
    reduction2030: (TARGETS.reduction2030 * 100).toString(),
    dailyEmissionsAlert: '1700',
    weeklyVarianceThreshold: '10',
    safMandate2026: (TARGETS.safMandate2026 * 100).toString(),
  });
  
  // Emission Factors state
  const [emissionFactors, setEmissionFactors] = useState({
    gridEF: '0.4057',
    jetFuelEF: '3.16',
    dieselEF: '2.31',
    plantBasedMealEF: '1.2',
    meatBasedMealEF: '2.5',
  });
  
  // Data Sources
  const dataSources = [
    {
      name: 'SMART Meters',
      status: 'active' as const,
      lastSync: '5 min ago',
      frequency: 'Real-time',
    },
    {
      name: 'Aircraft Tracking',
      status: 'active' as const,
      lastSync: '2 min ago',
      frequency: 'Real-time',
    },
    {
      name: 'POS Systems',
      status: 'active' as const,
      lastSync: '1 hr ago',
      frequency: 'Hourly',
    },
    {
      name: 'CarbonMax App',
      status: 'active' as const,
      lastSync: '1 hr ago',
      frequency: 'Hourly',
    },
    {
      name: 'Tenant Reporting',
      status: 'partial' as const,
      lastSync: 'Yesterday',
      frequency: 'Daily',
    },
    {
      name: 'Weather API',
      status: 'active' as const,
      lastSync: '30 min ago',
      frequency: 'Hourly',
    },
  ];
  
  const getStatusBadge = (status: 'active' | 'partial' | 'inactive') => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-medium">🟢 Active</span>;
      case 'partial':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm font-medium">🟡 Partial</span>;
      case 'inactive':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium">🔴 Inactive</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="⚙️ DASHBOARD SETTINGS"
        subtitle="Configure targets, thresholds, and data sources"
        icon={<Settings className="w-6 h-6" />}
      />
      
      {/* SECTION 1: TARGETS & THRESHOLDS */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          SECTION 1: TARGETS & THRESHOLDS
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">2030 Reduction Target</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={targets.reduction2030}
                onChange={(e) => setTargets({ ...targets, reduction2030: e.target.value })}
                className="w-24 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Daily Emissions Alert</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={targets.dailyEmissionsAlert}
                onChange={(e) => setTargets({ ...targets, dailyEmissionsAlert: e.target.value })}
                className="w-32 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">tCO2e (triggers ⚠️)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Weekly Variance Threshold</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={targets.weeklyVarianceThreshold}
                onChange={(e) => setTargets({ ...targets, weeklyVarianceThreshold: e.target.value })}
                className="w-24 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">SAF Mandate Target (2026)</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={targets.safMandate2026}
                onChange={(e) => setTargets({ ...targets, safMandate2026: e.target.value })}
                className="w-24 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* SECTION 2: EMISSION FACTORS */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          SECTION 2: EMISSION FACTORS
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Singapore Grid EF</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.0001"
                value={emissionFactors.gridEF}
                onChange={(e) => setEmissionFactors({ ...emissionFactors, gridEF: e.target.value })}
                className="w-32 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">kg CO2/kWh</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Jet Fuel Combustion EF</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.01"
                value={emissionFactors.jetFuelEF}
                onChange={(e) => setEmissionFactors({ ...emissionFactors, jetFuelEF: e.target.value })}
                className="w-32 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">kg CO2/kg fuel</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Diesel EF</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.01"
                value={emissionFactors.dieselEF}
                onChange={(e) => setEmissionFactors({ ...emissionFactors, dieselEF: e.target.value })}
                className="w-32 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">kg CO2/L</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Plant-based Meal EF</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.1"
                value={emissionFactors.plantBasedMealEF}
                onChange={(e) => setEmissionFactors({ ...emissionFactors, plantBasedMealEF: e.target.value })}
                className="w-32 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">kg CO2e/meal</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700">Meat-based Meal EF</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.1"
                value={emissionFactors.meatBasedMealEF}
                onChange={(e) => setEmissionFactors({ ...emissionFactors, meatBasedMealEF: e.target.value })}
                className="w-32 !bg-white !border !border-slate-300 !rounded-lg !px-3 !py-2"
              />
              <span className="text-sm text-slate-600">kg CO2e/meal</span>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 mb-3">
              Source: DEFRA 2024, Singapore NEA
            </p>
            <Button variant="secondary" size="sm">
              Update Factors
            </Button>
          </div>
        </div>
      </div>
      
      {/* SECTION 3: DATA SOURCES */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          SECTION 3: DATA SOURCES (Status)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Source</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Last Sync</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {dataSources.map((source, index) => (
                <tr key={index} className="border-b border-slate-100 last:border-b-0">
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">{source.name}</td>
                  <td className="py-3 px-4">{getStatusBadge(source.status)}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{source.lastSync}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{source.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* SECTION 4: EXPORT & REPORTING */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          SECTION 4: EXPORT & REPORTING
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">
            <FileSpreadsheet className="w-4 h-4" />
            Generate ACA Report
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Export to Excel
          </Button>
          <Button variant="secondary">
            <Mail className="w-4 h-4" />
            Schedule Email Report
          </Button>
        </div>
      </div>
    </div>
  );
}
