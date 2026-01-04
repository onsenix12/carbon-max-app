// hooks/useCarbonMaxData.ts

'use client';

import { useState, useEffect } from 'react';
import type { HourlyActivity } from '@/lib/emissions/types';
import carbonMaxData from '@/data/emissions/carbonmax-hourly.json';
import dailyEmissionsData from '@/data/emissions/daily-emissions.json';

interface CarbonMaxData {
  summary: {
    totalQuestsCompleted: number;
    totalCO2Avoided: number;
    totalGreenMeals: number;
    totalPlasticAvoided: number;
    totalSAFContributions: number;
    totalSAFLiters: number;
    activeUsers: number;
  };
  hourlyActivity: HourlyActivity[];
}

function generateCarbonMaxData(): CarbonMaxData {
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = dailyEmissionsData.dailyEmissions.find(
    (entry) => entry.date === today
  ) || dailyEmissionsData.dailyEmissions[dailyEmissionsData.dailyEmissions.length - 1];
  
  const activity = todayEntry.carbonMaxActivity;
  
  // Convert hourly data to HourlyActivity format
  const hourlyActivity: HourlyActivity[] = carbonMaxData.hourlyActivity.map((hour) => ({
    hour: hour.hour,
    questsCompleted: hour.questsCompleted,
    co2Avoided: hour.co2Avoided,
    breakdown: {
      greenPlate: hour.breakdown.greenPlate || 0,
      hydration: hour.breakdown.hydration || 0,
      greenFlight: hour.breakdown.greenFlight || 0,
      other: hour.breakdown.other || 0,
    },
  }));
  
  return {
    summary: {
      totalQuestsCompleted: activity.questsCompleted,
      totalCO2Avoided: activity.co2Avoided,
      totalGreenMeals: activity.greenMealsServed,
      totalPlasticAvoided: activity.plasticBottlesAvoided,
      totalSAFContributions: activity.safContributionsCount,
      totalSAFLiters: activity.safLitersAttributed,
      activeUsers: activity.activeUsers,
    },
    hourlyActivity,
  };
}

export function useCarbonMaxData() {
  const [data, setData] = useState<CarbonMaxData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateCarbonMaxData());
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    data: data || generateCarbonMaxData(),
    isLoading,
  };
}

