// lib/emissions/types.ts

/**
 * Types for the Operations Dashboard
 */

// ═══════════════════════════════════════════════════════════════════════════
// EMISSIONS DATA STRUCTURES
// ═══════════════════════════════════════════════════════════════════════════

export interface Scope1Emissions {
  vehicles: number;      // tCO2e from airport vehicles
  generators: number;    // tCO2e from backup generators
  refrigerants: number;  // tCO2e from refrigerant leakage
  total: number;
}

export interface Scope2Emissions {
  t1: number;           // Terminal 1
  t2: number;           // Terminal 2
  t3: number;           // Terminal 3
  t4: number;           // Terminal 4
  jewel: number;        // Jewel Changi
  airside: number;      // Airside operations
  total: number;
}

export interface AircraftEmissions {
  lto: number;          // Landing/Takeoff cycle
  taxi: number;         // Taxi operations
  apu: number;          // Auxiliary Power Unit
  total: number;
}

export interface TenantEmissions {
  fnb: number;          // Food & Beverage
  retail: number;       // Retail
  services: number;     // Services (lounges, etc.)
  total: number;
}

export interface GroundTransportEmissions {
  taxi: number;
  mrt: number;
  bus: number;
  privateCar: number;
  total: number;
}

export interface Scope3Emissions {
  aircraft: AircraftEmissions;
  tenants: TenantEmissions;
  groundTransport: GroundTransportEmissions;
  total: number;
}

export interface CarbonMaxActivity {
  questsCompleted: number;
  co2Avoided: number;           // kg CO2e
  greenMealsServed: number;
  plasticBottlesAvoided: number;
  safContributionsCount: number;
  safLitersAttributed: number;
  activeUsers: number;
}

export interface DailyEmissions {
  date: string;                 // ISO date string (YYYY-MM-DD)
  
  // Core emissions by scope
  scope1: Scope1Emissions;
  scope2: Scope2Emissions;
  scope3: Scope3Emissions;
  
  // Totals
  totalEmissions: number;       // tCO2e
  
  // Comparison metrics
  vsLastWeek: number;           // % change vs same day last week
  vsTarget: number;             // % vs daily target
  
  // Consumer app integration
  carbonMaxActivity: CarbonMaxActivity;
  
  // Operational context
  operationalData: {
    flights: number;
    passengers: number;
    avgTaxiTime: number;        // minutes
    temperature: number;        // Celsius (affects HVAC)
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// HOURLY DATA (for CarbonMax feed)
// ═══════════════════════════════════════════════════════════════════════════

export interface HourlyActivity {
  hour: string;                 // "00:00", "01:00", etc.
  questsCompleted: number;
  co2Avoided: number;
  breakdown: {
    greenPlate: number;
    hydration: number;
    greenFlight: number;
    other: number;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// AIRCRAFT DATA
// ═══════════════════════════════════════════════════════════════════════════

export interface AirlineEmissions {
  airlineCode: string;
  airlineName: string;
  flights: number;
  totalEmissions: number;       // tCO2e
  avgEmissionsPerFlight: number;
  safUsagePercent: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

export interface AircraftTypePerformance {
  aircraftType: string;
  flights: number;
  avgFuelKg: number;
  co2PerPax: number;            // kg CO2 per passenger
  efficiencyScore: number;      // 0-100
  trend: 'up' | 'down' | 'stable';
}

// ═══════════════════════════════════════════════════════════════════════════
// TENANT DATA
// ═══════════════════════════════════════════════════════════════════════════

export type CarbonRating = 'A+' | 'A' | 'B' | 'C' | 'D';

export interface TenantPerformance {
  id: string;
  name: string;
  category: 'fnb' | 'retail' | 'services';
  location: 'T1' | 'T2' | 'T3' | 'T4' | 'Jewel';
  rating: CarbonRating;
  emissions: number;            // tCO2e today
  sustainableTransactionPercent: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// AI INSIGHTS
// ═══════════════════════════════════════════════════════════════════════════

export type InsightType = 'anomaly' | 'trend' | 'opportunity' | 'forecast';
export type InsightPriority = 'high' | 'medium' | 'low';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface AIInsight {
  id: string;
  type: InsightType;
  priority: InsightPriority;
  title: string;
  description: string;
  impact?: string;              // e.g., "-12 tCO2e/week"
  effort?: 'low' | 'medium' | 'high';
  confidence: ConfidenceLevel;
  confidencePercent: number;
  generatedAt: string;
}

export interface ForecastDataPoint {
  date: string;
  actual?: number;
  predicted: number;
  lowerBound: number;
  upperBound: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// CALCULATION TRANSPARENCY
// ═══════════════════════════════════════════════════════════════════════════

export interface CalculationFactor {
  name: string;
  value: number;
  unit: string;
  source: string;
}

export interface CalculationResult {
  value: number;
  unit: string;
  methodology: string;
  factors: CalculationFactor[];
}

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS & CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export interface DashboardSettings {
  targets: {
    reductionTarget2030: number;      // % reduction target
    dailyEmissionsAlert: number;      // tCO2e threshold
    weeklyVarianceThreshold: number;  // % threshold for alerts
    safMandateTarget: number;         // % SAF target
  };
  dataSourceStatus: DataSourceStatus[];
}

export interface DataSourceStatus {
  name: string;
  status: 'active' | 'partial' | 'inactive';
  lastSync: string;
  frequency: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// JOURNEY MODE BREAKDOWN (Links to consumer app)
// ═══════════════════════════════════════════════════════════════════════════

export interface JourneyModeEmissions {
  mode: 'jewel' | 'departure' | 'transit';
  emissions: number;            // tCO2e
  vsLastWeek: number;           // % change
  topSource: string;            // Main emission source
  carbonMaxImpact: number;      // CO2 avoided via app
}

