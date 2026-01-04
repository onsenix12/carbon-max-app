// lib/emissions/calculator.ts

import { getEmissionFactor, getFactorValue } from '@/config/emissions-factors';
import type { CalculationResult, CalculationFactor } from './types';

/**
 * Emissions Calculator with Transparent Methodology
 * 
 * Each function returns:
 * - value: The calculated emissions
 * - unit: Unit of measurement
 * - methodology: Human-readable calculation explanation
 * - factors: Array of emission factors used (with sources)
 */

// ═══════════════════════════════════════════════════════════════════════════
// SCOPE 2: ELECTRICITY
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate CO2 emissions from electricity consumption
 * @param kwh - Electricity consumption in kWh
 */
export function calculateElectricityEmissions(kwh: number): CalculationResult {
  const factor = getEmissionFactor('electricity', 'singapore_grid');
  const emissions = kwh * factor.value;
  
  return {
    value: emissions,
    unit: 'kg CO2e',
    methodology: `Electricity (kWh) × Grid EF = ${kwh.toLocaleString()} kWh × ${factor.value} kg CO2e/kWh = ${emissions.toFixed(2)} kg CO2e`,
    factors: [{
      name: 'Singapore Grid Emission Factor',
      value: factor.value,
      unit: factor.unit,
      source: factor.source,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SCOPE 1: DIRECT EMISSIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate CO2 emissions from diesel fuel consumption
 * @param liters - Diesel consumption in liters
 */
export function calculateDieselEmissions(liters: number): CalculationResult {
  const factor = getEmissionFactor('fuels', 'diesel');
  const emissions = liters * factor.value;
  
  return {
    value: emissions,
    unit: 'kg CO2e',
    methodology: `Diesel (L) × EF = ${liters.toLocaleString()} L × ${factor.value} kg CO2e/L = ${emissions.toFixed(2)} kg CO2e`,
    factors: [{
      name: 'Diesel Emission Factor',
      value: factor.value,
      unit: factor.unit,
      source: factor.source,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SCOPE 3: AIRCRAFT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate CO2 emissions from aircraft LTO cycles
 * @param flights - Number of flight movements (arrivals + departures)
 */
export function calculateAircraftLTOEmissions(flights: number): CalculationResult {
  const ltoFactor = getEmissionFactor('aircraft', 'lto_cycle_average');
  const fuelFactor = getEmissionFactor('fuels', 'jet_fuel');
  
  const fuelKg = flights * ltoFactor.value;
  const emissions = fuelKg * fuelFactor.value;
  
  return {
    value: emissions,
    unit: 'kg CO2',
    methodology: `Flights × Avg LTO Fuel × CO2 Factor = ${flights} × ${ltoFactor.value} kg × ${fuelFactor.value} = ${emissions.toFixed(0)} kg CO2`,
    factors: [
      {
        name: 'Average LTO Cycle Fuel',
        value: ltoFactor.value,
        unit: ltoFactor.unit,
        source: ltoFactor.source,
      },
      {
        name: 'Jet Fuel CO2 Factor',
        value: fuelFactor.value,
        unit: fuelFactor.unit,
        source: fuelFactor.source,
      },
    ],
  };
}

/**
 * Calculate CO2 emissions from aircraft taxi operations
 * @param flights - Number of flight movements
 * @param avgTaxiMinutes - Average taxi time in minutes
 */
export function calculateAircraftTaxiEmissions(
  flights: number, 
  avgTaxiMinutes: number
): CalculationResult {
  const taxiFactor = getEmissionFactor('aircraft', 'taxi_fuel_rate');
  const fuelFactor = getEmissionFactor('fuels', 'jet_fuel');
  
  const totalTaxiMinutes = flights * avgTaxiMinutes;
  const fuelKg = totalTaxiMinutes * taxiFactor.value;
  const emissions = fuelKg * fuelFactor.value;
  
  return {
    value: emissions,
    unit: 'kg CO2',
    methodology: `Flights × Avg Taxi Time × Fuel Rate × CO2 Factor = ${flights} × ${avgTaxiMinutes} min × ${taxiFactor.value} kg/min × ${fuelFactor.value} = ${emissions.toFixed(0)} kg CO2`,
    factors: [
      {
        name: 'Taxi Fuel Rate',
        value: taxiFactor.value,
        unit: taxiFactor.unit,
        source: taxiFactor.source,
      },
      {
        name: 'Jet Fuel CO2 Factor',
        value: fuelFactor.value,
        unit: fuelFactor.unit,
        source: fuelFactor.source,
      },
    ],
  };
}

/**
 * Calculate CO2 emissions from APU usage
 * @param flights - Number of flight movements
 * @param avgApuHours - Average APU usage hours per flight
 */
export function calculateAPUEmissions(
  flights: number,
  avgApuHours: number = 0.5
): CalculationResult {
  const apuFactor = getEmissionFactor('aircraft', 'apu_fuel_rate');
  const fuelFactor = getEmissionFactor('fuels', 'jet_fuel');
  
  const totalApuHours = flights * avgApuHours;
  const fuelKg = totalApuHours * apuFactor.value;
  const emissions = fuelKg * fuelFactor.value;
  
  return {
    value: emissions,
    unit: 'kg CO2',
    methodology: `Flights × Avg APU Hours × Fuel Rate × CO2 Factor = ${flights} × ${avgApuHours} hrs × ${apuFactor.value} kg/hr × ${fuelFactor.value} = ${emissions.toFixed(0)} kg CO2`,
    factors: [
      {
        name: 'APU Fuel Rate',
        value: apuFactor.value,
        unit: apuFactor.unit,
        source: apuFactor.source,
      },
      {
        name: 'Jet Fuel CO2 Factor',
        value: fuelFactor.value,
        unit: fuelFactor.unit,
        source: fuelFactor.source,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SCOPE 3: FOOD & BEVERAGE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate emissions impact from meal choices
 * @param mealType - Type of meal chosen
 */
export function calculateMealEmissions(
  mealType: 'meat' | 'vegetarian' | 'plant_based'
): CalculationResult {
  const factorKey = `meal_${mealType}`;
  const factor = getEmissionFactor('food', factorKey);
  
  return {
    value: factor.value,
    unit: 'kg CO2e',
    methodology: `${mealType.replace('_', ' ')} meal = ${factor.value} kg CO2e`,
    factors: [{
      name: `${mealType.replace('_', ' ')} Meal Factor`,
      value: factor.value,
      unit: factor.unit,
      source: factor.source,
    }],
  };
}

/**
 * Calculate emissions avoided by choosing plant-based over meat
 */
export function calculateMealImpact(
  mealType: 'vegetarian' | 'plant_based'
): CalculationResult {
  const meatFactor = getEmissionFactor('food', 'meal_meat');
  const chosenFactor = getEmissionFactor('food', `meal_${mealType}`);
  
  const avoided = meatFactor.value - chosenFactor.value;
  
  return {
    value: avoided,
    unit: 'kg CO2e avoided',
    methodology: `Meat meal baseline - ${mealType.replace('_', ' ')} meal = ${meatFactor.value} - ${chosenFactor.value} = ${avoided.toFixed(2)} kg CO2e avoided`,
    factors: [
      {
        name: 'Meat Meal Baseline',
        value: meatFactor.value,
        unit: meatFactor.unit,
        source: meatFactor.source,
      },
      {
        name: `${mealType.replace('_', ' ')} Meal`,
        value: chosenFactor.value,
        unit: chosenFactor.unit,
        source: chosenFactor.source,
      },
    ],
  };
}

/**
 * Calculate emissions avoided by avoiding plastic bottle
 */
export function calculatePlasticBottleImpact(): CalculationResult {
  const factor = getEmissionFactor('food', 'plastic_bottle');
  
  return {
    value: factor.value,
    unit: 'kg CO2e avoided',
    methodology: `Plastic bottle avoided = ${factor.value} kg CO2e avoided`,
    factors: [{
      name: 'Plastic Bottle Factor',
      value: factor.value,
      unit: factor.unit,
      source: factor.source,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SCOPE 3: GROUND TRANSPORT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate ground transport emissions
 * @param mode - Transport mode
 * @param distanceKm - Distance in kilometers
 */
export function calculateTransportEmissions(
  mode: 'taxi' | 'mrt' | 'bus' | 'private_car',
  distanceKm: number
): CalculationResult {
  const factor = getEmissionFactor('transport', mode);
  const emissions = distanceKm * factor.value;
  
  return {
    value: emissions,
    unit: 'kg CO2e',
    methodology: `Distance × ${mode.toUpperCase()} EF = ${distanceKm} km × ${factor.value} kg CO2e/km = ${emissions.toFixed(2)} kg CO2e`,
    factors: [{
      name: `${mode.toUpperCase()} Emission Factor`,
      value: factor.value,
      unit: factor.unit,
      source: factor.source,
    }],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SAF CALCULATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate emissions reduction from SAF contribution
 * @param liters - Liters of SAF attributed
 */
export function calculateSAFImpact(liters: number): CalculationResult {
  const reductionFactor = getEmissionFactor('saf', 'lifecycle_reduction');
  const fuelFactor = getEmissionFactor('fuels', 'jet_fuel');
  
  // SAF density ~0.8 kg/L
  const fuelKg = liters * 0.8;
  const conventionalEmissions = fuelKg * fuelFactor.value;
  const avoided = conventionalEmissions * reductionFactor.value;
  
  return {
    value: avoided,
    unit: 'kg CO2 avoided',
    methodology: `SAF Liters × Density × Fuel Factor × Reduction = ${liters} L × 0.8 kg/L × ${fuelFactor.value} × ${reductionFactor.value} = ${avoided.toFixed(2)} kg CO2 avoided`,
    factors: [
      {
        name: 'SAF Lifecycle Reduction',
        value: reductionFactor.value * 100,
        unit: '% reduction',
        source: reductionFactor.source,
      },
      {
        name: 'Jet Fuel CO2 Factor',
        value: fuelFactor.value,
        unit: fuelFactor.unit,
        source: fuelFactor.source,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// AGGREGATE CALCULATIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate total daily emissions across all scopes
 */
export function calculateTotalDailyEmissions(
  scope1: number,
  scope2: number,
  scope3: number
): CalculationResult {
  const total = scope1 + scope2 + scope3;
  
  return {
    value: total,
    unit: 'tCO2e',
    methodology: `Scope 1 + Scope 2 + Scope 3 = ${scope1.toFixed(1)} + ${scope2.toFixed(1)} + ${scope3.toFixed(1)} = ${total.toFixed(1)} tCO2e`,
    factors: [
      { name: 'Scope 1', value: scope1, unit: 'tCO2e', source: 'Direct measurement' },
      { name: 'Scope 2', value: scope2, unit: 'tCO2e', source: 'SMART meters × Grid EF' },
      { name: 'Scope 3', value: scope3, unit: 'tCO2e', source: 'Activity-based calculation' },
    ],
  };
}

