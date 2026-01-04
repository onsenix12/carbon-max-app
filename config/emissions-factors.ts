// config/emissions-factors.ts

/**
 * Centralized Emission Factors Configuration
 * 
 * This file contains all emission factors used in calculations.
 * Each factor includes its source and last update date for transparency.
 * 
 * To update factors:
 * 1. Update the value and source
 * 2. Update lastUpdated date
 * 3. Increment CONFIG_VERSION
 */

export const CONFIG_VERSION = '1.0.0';
export const CONFIG_LAST_UPDATED = '2025-01-04';

export interface EmissionFactor {
  value: number;
  unit: string;
  source: string;
  lastUpdated: string;
  notes?: string;
}

export interface EmissionFactorCategory {
  [key: string]: EmissionFactor;
}

export const EMISSIONS_CONFIG = {
  version: CONFIG_VERSION,
  lastUpdated: CONFIG_LAST_UPDATED,
  
  sources: {
    grid: 'Singapore Energy Market Authority (EMA) 2024',
    fuel: 'DEFRA 2024 Conversion Factors',
    food: 'Our World in Data / Poore & Nemecek 2018',
    transport: 'Land Transport Authority Singapore',
    aircraft: 'ICAO Doc 9889 / IATA RP 1726',
  },
  
  factors: {
    // ═══════════════════════════════════════════════════════════════
    // SCOPE 2: ELECTRICITY
    // ═══════════════════════════════════════════════════════════════
    electricity: {
      singapore_grid: {
        value: 0.4057,
        unit: 'kg CO2e/kWh',
        source: 'Singapore EMA Grid Emission Factor 2023',
        lastUpdated: '2024-01-01',
        notes: 'Based on Singapore national grid average',
      },
    } as EmissionFactorCategory,
    
    // ═══════════════════════════════════════════════════════════════
    // SCOPE 1 & 3: FUELS
    // ═══════════════════════════════════════════════════════════════
    fuels: {
      jet_fuel: {
        value: 3.16,
        unit: 'kg CO2/kg fuel',
        source: 'ICAO Carbon Emissions Calculator',
        lastUpdated: '2024-01-01',
        notes: 'Direct combustion only, excludes upstream emissions',
      },
      diesel: {
        value: 2.68,
        unit: 'kg CO2e/L',
        source: 'DEFRA 2024',
        lastUpdated: '2024-01-01',
      },
      petrol: {
        value: 2.31,
        unit: 'kg CO2e/L',
        source: 'DEFRA 2024',
        lastUpdated: '2024-01-01',
      },
    } as EmissionFactorCategory,
    
    // ═══════════════════════════════════════════════════════════════
    // FOOD & BEVERAGE
    // ═══════════════════════════════════════════════════════════════
    food: {
      meal_meat: {
        value: 2.5,
        unit: 'kg CO2e/meal',
        source: 'Average based on Poore & Nemecek 2018',
        lastUpdated: '2024-01-01',
        notes: 'Assumes typical airport F&B portion with beef/chicken',
      },
      meal_vegetarian: {
        value: 1.2,
        unit: 'kg CO2e/meal',
        source: 'Average based on Poore & Nemecek 2018',
        lastUpdated: '2024-01-01',
      },
      meal_plant_based: {
        value: 0.7,
        unit: 'kg CO2e/meal',
        source: 'Average based on Poore & Nemecek 2018',
        lastUpdated: '2024-01-01',
      },
      beverage: {
        value: 0.5,
        unit: 'kg CO2e/beverage',
        source: 'DEFRA 2024 estimates',
        lastUpdated: '2024-01-01',
      },
      plastic_bottle: {
        value: 0.082,
        unit: 'kg CO2e/bottle',
        source: 'PlasticsEurope Eco-profile',
        lastUpdated: '2024-01-01',
      },
    } as EmissionFactorCategory,
    
    // ═══════════════════════════════════════════════════════════════
    // GROUND TRANSPORT
    // ═══════════════════════════════════════════════════════════════
    transport: {
      taxi: {
        value: 0.21,
        unit: 'kg CO2e/km',
        source: 'LTA Singapore',
        lastUpdated: '2024-01-01',
      },
      mrt: {
        value: 0.04,
        unit: 'kg CO2e/passenger-km',
        source: 'LTA Singapore',
        lastUpdated: '2024-01-01',
      },
      bus: {
        value: 0.089,
        unit: 'kg CO2e/passenger-km',
        source: 'LTA Singapore',
        lastUpdated: '2024-01-01',
      },
      private_car: {
        value: 0.19,
        unit: 'kg CO2e/km',
        source: 'LTA Singapore',
        lastUpdated: '2024-01-01',
      },
    } as EmissionFactorCategory,
    
    // ═══════════════════════════════════════════════════════════════
    // AIRCRAFT OPERATIONS
    // ═══════════════════════════════════════════════════════════════
    aircraft: {
      lto_cycle_average: {
        value: 2500,
        unit: 'kg fuel/LTO cycle',
        source: 'ICAO Doc 9889 average for Changi fleet mix',
        lastUpdated: '2024-01-01',
        notes: 'Weighted average across aircraft types operating at Changi',
      },
      taxi_fuel_rate: {
        value: 12,
        unit: 'kg fuel/minute',
        source: 'ICAO Doc 9889',
        lastUpdated: '2024-01-01',
        notes: 'Average single-aisle taxi fuel consumption',
      },
      apu_fuel_rate: {
        value: 100,
        unit: 'kg fuel/hour',
        source: 'ICAO Doc 9889',
        lastUpdated: '2024-01-01',
      },
    } as EmissionFactorCategory,
    
    // ═══════════════════════════════════════════════════════════════
    // TENANT/RETAIL (Spend-based fallback)
    // ═══════════════════════════════════════════════════════════════
    tenant: {
      fnb_full_service: {
        value: 0.35,
        unit: 'kg CO2e/$ revenue',
        source: 'DEFRA spend-based factors',
        lastUpdated: '2024-01-01',
      },
      fnb_fast_food: {
        value: 0.28,
        unit: 'kg CO2e/$ revenue',
        source: 'DEFRA spend-based factors',
        lastUpdated: '2024-01-01',
      },
      retail_general: {
        value: 0.25,
        unit: 'kg CO2e/$ revenue',
        source: 'DEFRA spend-based factors',
        lastUpdated: '2024-01-01',
      },
      retail_luxury: {
        value: 0.18,
        unit: 'kg CO2e/$ revenue',
        source: 'DEFRA spend-based factors',
        lastUpdated: '2024-01-01',
      },
      services: {
        value: 0.15,
        unit: 'kg CO2e/$ revenue',
        source: 'DEFRA spend-based factors',
        lastUpdated: '2024-01-01',
      },
    } as EmissionFactorCategory,
    
    // ═══════════════════════════════════════════════════════════════
    // SAF (Sustainable Aviation Fuel)
    // ═══════════════════════════════════════════════════════════════
    saf: {
      lifecycle_reduction: {
        value: 0.8,
        unit: 'reduction factor (80%)',
        source: 'ICAO CORSIA',
        lastUpdated: '2024-01-01',
        notes: 'SAF reduces lifecycle emissions by ~80% vs conventional jet fuel',
      },
      price_per_liter: {
        value: 3.5,
        unit: 'SGD/liter (premium over conventional)',
        source: 'Industry estimates 2024',
        lastUpdated: '2024-01-01',
      },
    } as EmissionFactorCategory,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get an emission factor with full metadata
 */
export function getEmissionFactor(
  category: keyof typeof EMISSIONS_CONFIG.factors,
  key: string
): EmissionFactor {
  const categoryFactors = EMISSIONS_CONFIG.factors[category];
  const factor = categoryFactors?.[key];
  
  if (!factor) {
    throw new Error(`Unknown emission factor: ${category}.${key}`);
  }
  
  return factor;
}

/**
 * Get just the numeric value of an emission factor
 */
export function getFactorValue(
  category: keyof typeof EMISSIONS_CONFIG.factors,
  key: string
): number {
  return getEmissionFactor(category, key).value;
}

/**
 * Get configuration version info for display
 */
export function getConfigVersion() {
  return {
    version: EMISSIONS_CONFIG.version,
    lastUpdated: EMISSIONS_CONFIG.lastUpdated,
  };
}

/**
 * Get all sources used in calculations
 */
export function getDataSources() {
  return EMISSIONS_CONFIG.sources;
}

