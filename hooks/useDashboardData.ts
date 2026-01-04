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
 */
function generateWeeklyTrend(): WeeklyDataPoint[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const weeklyData: WeeklyDataPoint[] = [];
  
  // Get last 7 days of data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayData = dailyEmissionsData.dailyEmissions.find(
      (entry) => entry.date === dateStr
    );
    
    if (dayData) {
      const dayIndex = date.getDay();
      const dayName = days[dayIndex === 0 ? 6 : dayIndex - 1]; // Adjust for Monday = 0
      
      weeklyData.push({
        label: dayName,
        value: dayData.totalEmissions,
        target: dailyEmissionsData.metadata.baseline.dailyAverage * 0.95, // 5% below baseline
      });
    }
  }
  
  return weeklyData;
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
