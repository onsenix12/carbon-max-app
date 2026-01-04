// app/(operations)/dashboard/settings/page.tsx

'use client';

import { Settings, Target, Database, Bell } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { KPICard } from '@/components/operations/cards/KPICard';
import { TARGETS, CURRENT_ACA_LEVEL, ACA_LEVELS } from '@/lib/emissions/constants';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Dashboard configuration and targets"
        icon={<Settings className="w-6 h-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="2030 Reduction Target"
          value={`${(TARGETS.reduction2030 * 100).toFixed(0)}%`}
          subtitle="vs FY21/22 baseline"
          icon={<Target className="w-5 h-5" />}
        />
        
        <KPICard
          title="Net Zero Target"
          value={TARGETS.netZero.toString()}
          subtitle="year"
        />
        
        <KPICard
          title="Current ACA Level"
          value={`Level ${CURRENT_ACA_LEVEL}`}
          subtitle={ACA_LEVELS[CURRENT_ACA_LEVEL as keyof typeof ACA_LEVELS].name}
          icon={<Bell className="w-5 h-5" />}
        />
        
        <KPICard
          title="SAF Mandate 2026"
          value={`${(TARGETS.safMandate2026 * 100).toFixed(0)}%`}
          subtitle="target"
        />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Data Sources
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">SMART Meters</p>
              <p className="text-sm text-slate-500">Terminal electricity consumption</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-medium">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Flight Data</p>
              <p className="text-sm text-slate-500">Aircraft movements and taxi times</p>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm font-medium">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div>
              <p className="font-medium text-slate-900">Tenant Revenue</p>
              <p className="text-sm text-slate-500">Spend-based emissions calculation</p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm font-medium">
              Partial
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

