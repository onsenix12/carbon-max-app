// hooks/useAircraftData.ts

'use client';

import { useState, useEffect } from 'react';
import type { AirlineEmissions, AircraftTypePerformance } from '@/lib/emissions/types';
import airlinesData from '@/data/emissions/airlines.json';
import aircraftTypesData from '@/data/emissions/aircraft-types.json';
import dailyEmissionsData from '@/data/emissions/daily-emissions.json';

interface AircraftData {
  emissions: {
    lto: number;
    taxi: number;
    apu: number;
    total: number;
  };
  flights: number;
  avgTaxiTime: number;
  vsLastWeek: number;
  topAirlines: AirlineEmissions[];
  aircraftTypes: AircraftTypePerformance[];
  hourlyPattern: { hour: string; emissions: number }[];
}

/**
 * Get today's aircraft emissions from daily data
 */
function getTodayAircraftEmissions() {
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = dailyEmissionsData.dailyEmissions.find(
    (entry) => entry.date === today
  ) || dailyEmissionsData.dailyEmissions[dailyEmissionsData.dailyEmissions.length - 1];
  
  return todayEntry.scope3.aircraft;
}

/**
 * Get today's operational data
 */
function getTodayOperationalData() {
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = dailyEmissionsData.dailyEmissions.find(
    (entry) => entry.date === today
  ) || dailyEmissionsData.dailyEmissions[dailyEmissionsData.dailyEmissions.length - 1];
  
  return todayEntry.operationalData;
}

/**
 * Convert airlines JSON to AirlineEmissions type
 */
function convertAirlines(): AirlineEmissions[] {
  return airlinesData.airlines.slice(0, 10).map((airline) => ({
    airlineCode: airline.airlineCode,
    airlineName: airline.airlineName,
    flights: airline.flights,
    totalEmissions: airline.totalEmissions,
    avgEmissionsPerFlight: airline.avgEmissionsPerFlight,
    safUsagePercent: airline.safUsagePercent,
    trend: airline.trend as 'up' | 'down' | 'stable',
    trendPercent: airline.trendPercent,
  }));
}

/**
 * Convert aircraft types JSON to AircraftTypePerformance type
 */
function convertAircraftTypes(): AircraftTypePerformance[] {
  return aircraftTypesData.aircraftTypes.map((type) => ({
    aircraftType: type.aircraftType,
    flights: type.flights,
    avgFuelKg: type.avgFuelKg,
    co2PerPax: type.co2PerPax,
    efficiencyScore: type.efficiencyScore,
    trend: type.trend as 'up' | 'down' | 'stable',
  }));
}

/**
 * Generate hourly pattern from today's data
 * Uses a simple distribution based on typical airport patterns
 */
function generateHourlyPattern(totalEmissions: number): { hour: string; emissions: number }[] {
  const hourlyPattern = Array.from({ length: 24 }, (_, i) => {
    let baseRatio = 0.03; // Base 3% per hour
    
    // Morning peak (6-10am)
    if (i >= 6 && i <= 10) baseRatio = 0.05 + (i - 6) * 0.01;
    // Afternoon (11am-4pm)
    else if (i >= 11 && i <= 16) baseRatio = 0.045;
    // Evening peak (5-9pm)
    else if (i >= 17 && i <= 21) baseRatio = 0.05 + (21 - i) * 0.008;
    // Night (10pm-5am)
    else baseRatio = 0.02;
    
    return {
      hour: `${i.toString().padStart(2, '0')}:00`,
      emissions: totalEmissions * baseRatio,
    };
  });
  
  return hourlyPattern;
}

function generateAircraftData(): AircraftData {
  const aircraftEmissions = getTodayAircraftEmissions();
  const operationalData = getTodayOperationalData();
  
  // Calculate vs last week (simplified - would need historical data)
  const today = new Date().toISOString().split('T')[0];
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const lastWeekStr = lastWeekDate.toISOString().split('T')[0];
  
  const lastWeekEntry = dailyEmissionsData.dailyEmissions.find(
    (entry) => entry.date === lastWeekStr
  );
  
  const vsLastWeek = lastWeekEntry
    ? ((aircraftEmissions.total - lastWeekEntry.scope3.aircraft.total) / lastWeekEntry.scope3.aircraft.total) * 100
    : -2.3;
  
  return {
    emissions: {
      lto: aircraftEmissions.lto,
      taxi: aircraftEmissions.taxi,
      apu: aircraftEmissions.apu,
      total: aircraftEmissions.total,
    },
    flights: operationalData.flights,
    avgTaxiTime: operationalData.avgTaxiTime,
    vsLastWeek,
    topAirlines: convertAirlines(),
    aircraftTypes: convertAircraftTypes(),
    hourlyPattern: generateHourlyPattern(aircraftEmissions.total),
  };
}

export function useAircraftData() {
  const [data, setData] = useState<AircraftData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateAircraftData());
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    data: data || generateAircraftData(),
    isLoading,
  };
}
