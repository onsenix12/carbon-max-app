// hooks/useTenantData.ts

'use client';

import { useState, useEffect } from 'react';
import type { TenantPerformance } from '@/lib/emissions/types';
import tenantsData from '@/data/emissions/tenants.json';

interface TenantData {
  totalEmissions: number;
  totalTenants: number;
  avgEmissionsPerTenant: number;
  vsLastWeek: number;
  tenants: TenantPerformance[];
}

function generateTenantData(): TenantData {
  const summary = tenantsData.summary;
  
  // Convert tenants JSON to TenantPerformance type
  const tenants: TenantPerformance[] = tenantsData.tenants.map((tenant) => ({
    id: tenant.id,
    name: tenant.name,
    category: tenant.category as 'fnb' | 'retail' | 'services',
    location: tenant.location as 'T1' | 'T2' | 'T3' | 'T4' | 'Jewel',
    rating: tenant.rating as 'A+' | 'A' | 'B' | 'C' | 'D',
    emissions: tenant.emissions,
    sustainableTransactionPercent: tenant.sustainableTransactionPercent,
    trend: tenant.trend as 'up' | 'down' | 'stable',
    trendPercent: tenant.trendPercent,
  }));
  
  // Calculate vs last week (simplified)
  const vsLastWeek = -3.2; // Would calculate from historical data
  
  return {
    totalEmissions: summary.totalTenantEmissions,
    totalTenants: summary.tenantsReporting,
    avgEmissionsPerTenant: summary.totalTenantEmissions / summary.tenantsReporting,
    vsLastWeek,
    tenants,
  };
}

export function useTenantData() {
  const [data, setData] = useState<TenantData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateTenantData());
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    data: data || generateTenantData(),
    isLoading,
  };
}

