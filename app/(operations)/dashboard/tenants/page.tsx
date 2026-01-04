// app/(operations)/dashboard/tenants/page.tsx

'use client';

import { Store } from 'lucide-react';
import { PageHeader } from '@/components/operations/layout/PageHeader';
import { KPICard } from '@/components/operations/cards/KPICard';
import { TenantLeaderboard } from '@/components/operations/tables/TenantLeaderboard';
import { useTenantData } from '@/hooks/useTenantData';

export default function TenantsPage() {
  const { data, isLoading } = useTenantData();
  
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }
  
  const tenantData = data;
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tenant Emissions"
        subtitle="Retail and F&B carbon performance"
        icon={<Store className="w-6 h-6" />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Tenant Emissions"
          value={tenantData.totalEmissions.toFixed(1)}
          unit="tCO2e"
          size="large"
          status={tenantData.vsLastWeek < 0 ? 'positive' : 'neutral'}
        />
        
        <KPICard
          title="Active Tenants"
          value={tenantData.totalTenants}
          subtitle="across all terminals"
        />
        
        <KPICard
          title="Avg per Tenant"
          value={tenantData.avgEmissionsPerTenant.toFixed(2)}
          unit="tCO2e"
        />
        
        <KPICard
          title="vs Last Week"
          value={`${tenantData.vsLastWeek > 0 ? '+' : ''}${tenantData.vsLastWeek.toFixed(1)}%`}
          trend={{
            value: Math.abs(tenantData.vsLastWeek),
            direction: tenantData.vsLastWeek < 0 ? 'down' : 'up',
            isPositive: tenantData.vsLastWeek < 0,
          }}
          status={tenantData.vsLastWeek < 0 ? 'positive' : 'neutral'}
        />
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Tenant Performance Leaderboard
        </h3>
        <TenantLeaderboard tenants={tenantData.tenants} />
      </div>
    </div>
  );
}

