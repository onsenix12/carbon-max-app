// hooks/useDashboardData.ts

'use client';

import { useState, useEffect } from 'react';
import type { DailyEmissions } from '@/lib/emissions/types';
import dailyEmissionsData from '@/data/emissions/daily-emissions.json';

interface WeeklyDataPoint {
  label: string;
  value: number;
  target: number;
}

interface DashboardData {
  todayData: DailyEmissions;
  weeklyTrend: WeeklyDataPoint[];
  isLoading: boolean;
}

/**
 * Get today's emissions data from the 30-day dataset
 */
function getTodayData(): DailyEmissions {
  const today = new Date().toISOString().split('T')[0];
  
  // Find today's data or use the most recent
  const todayEntry = dailyEmissionsData.dailyEmissions.find(
    (entry) => entry.date === today
  ) || dailyEmissionsData.dailyEmissions[dailyEmissionsData.dailyEmissions.length - 1];
  
  // Convert JSON structure to DailyEmissions type
  return {
    date: todayEntry.date,
    scope1: todayEntry.scope1,
    scope2: todayEntry.scope2,
    scope3: {
      aircraft: todayEntry.scope3.aircraft,
      tenants: todayEntry.scope3.tenants,
      groundTransport: todayEntry.scope3.groundTransport,
      total: todayEntry.scope3.total,
    },
    totalEmissions: todayEntry.totalEmissions,
    vsLastWeek: todayEntry.vsLastWeek,
    vsTarget: todayEntry.vsTarget,
    carbonMaxActivity: {
      questsCompleted: todayEntry.carbonMaxActivity.questsCompleted,
      co2Avoided: todayEntry.carbonMaxActivity.co2Avoided,
      greenMealsServed: todayEntry.carbonMaxActivity.greenMealsServed,
      plasticBottlesAvoided: todayEntry.carbonMaxActivity.plasticBottlesAvoided,
      safContributionsCount: todayEntry.carbonMaxActivity.safContributionsCount,
      safLitersAttributed: todayEntry.carbonMaxActivity.safLitersAttributed,
      activeUsers: todayEntry.carbonMaxActivity.activeUsers,
    },
    operationalData: {
      flights: todayEntry.operationalData.flights,
      passengers: todayEntry.operationalData.passengers,
      avgTaxiTime: todayEntry.operationalData.avgTaxiTime,
      temperature: todayEntry.operationalData.temperature,
    },
  };
}

/**
 * Generate weekly trend data from the 30-day dataset
 * Uses the last 7 entries from the data file to ensure we always have data
 */
function generateWeeklyTrend(): WeeklyDataPoint[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Get the last 7 entries from the data file
  const last7Entries = dailyEmissionsData.dailyEmissions.slice(-7);
  
  // If we have fewer than 7 entries, duplicate the last one to fill the array
  if (last7Entries.length < 7 && last7Entries.length > 0) {
    const lastEntry = last7Entries[last7Entries.length - 1];
    while (last7Entries.length < 7) {
      last7Entries.push(lastEntry);
    }
  }
  
  // If no data at all, return empty array (component will handle this)
  if (last7Entries.length === 0) {
    return [];
  }
  
  // Map to WeeklyDataPoint format with proper day labels
  return last7Entries.map((entry, index) => {
    const date = new Date(entry.date);
    const dayIndex = date.getDay();
    const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1]; // Adjust for Monday = 0
    
    return {
      label: dayName,
      value: entry.totalEmissions,
      target: dailyEmissionsData.metadata.baseline.dailyAverage * 0.95, // 5% below baseline
    };
  });
}

export function useDashboardData(): DashboardData {
  const [isLoading, setIsLoading] = useState(true);
  const [todayData, setTodayData] = useState<DailyEmissions | null>(null);
  const [weeklyTrend, setWeeklyTrend] = useState<WeeklyDataPoint[]>([]);
  
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setTodayData(getTodayData());
      setWeeklyTrend(generateWeeklyTrend());
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    todayData: todayData || getTodayData(),
    weeklyTrend,
    isLoading,
  };
}
