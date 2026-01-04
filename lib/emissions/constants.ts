// lib/emissions/constants.ts

/**
 * Constants for the Operations Dashboard
 */

// ═══════════════════════════════════════════════════════════════════════════
// CAG BASELINE DATA (FY21/22)
// ═══════════════════════════════════════════════════════════════════════════

export const CAG_BASELINE = {
  // Annual totals (FY21/22)
  annual: {
    scope1: 773,           // tCO2e
    scope2: 106154,        // tCO2e
    scope3: 475487,        // tCO2e
    total: 582414,         // tCO2e
  },
  
  // Daily averages (based on annual / 365)
  daily: {
    scope1: 2.1,           // tCO2e
    scope2: 291,           // tCO2e
    scope3: 1303,          // tCO2e
    total: 1596,           // tCO2e
  },
  
  // Operational scale
  operations: {
    passengersPerYear: 67700000,
    passengersPerDay: 185479,
    flightsPerYear: 366000,
    flightsPerDay: 1003,
    retailRevenue: 1100000000,  // S$1.1B
    jewelVisitors: 50000000,
  },
  
  // Energy consumption
  energy: {
    terminalElectricityMWh: 260181,  // Annual MWh
    dailyKWh: 712825,                // Daily average
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// SCOPE BREAKDOWN PERCENTAGES (for simulation)
// ═══════════════════════════════════════════════════════════════════════════

export const SCOPE1_BREAKDOWN = {
  vehicles: 0.45,
  generators: 0.40,
  refrigerants: 0.15,
};

export const SCOPE2_BREAKDOWN = {
  t1: 0.15,
  t2: 0.12,
  t3: 0.25,
  t4: 0.08,
  jewel: 0.20,
  airside: 0.20,
};

export const SCOPE3_BREAKDOWN = {
  aircraft: {
    lto: 0.72,
    taxi: 0.18,
    apu: 0.10,
    percentOfScope3: 0.85,
  },
  tenants: {
    fnb: 0.52,
    retail: 0.31,
    services: 0.17,
    percentOfScope3: 0.10,
  },
  groundTransport: {
    taxi: 0.35,
    mrt: 0.25,
    bus: 0.20,
    privateCar: 0.20,
    percentOfScope3: 0.05,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// TARGETS
// ═══════════════════════════════════════════════════════════════════════════

export const TARGETS = {
  reduction2030: 0.20,       // 20% reduction by 2030
  netZero: 2050,
  safMandate2026: 0.01,      // 1% from 2026
  safMandate2030: 0.05,      // 3-5% by 2030
  acaLevel: 4,               // Target ACA Level
};

// ═══════════════════════════════════════════════════════════════════════════
// ACA CERTIFICATION
// ═══════════════════════════════════════════════════════════════════════════

export const ACA_LEVELS = {
  1: { name: 'Mapping', description: 'Carbon footprint mapping' },
  2: { name: 'Reduction', description: 'Carbon management and reduction' },
  3: { name: 'Optimisation', description: 'Third-party engagement and optimization' },
  4: { name: 'Transformation', description: 'Stakeholder partnerships + absolute reduction' },
  5: { name: 'Transition', description: 'Net Zero roadmap implementation' },
};

export const CURRENT_ACA_LEVEL = 3;

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════

export const DASHBOARD_ROUTES = {
  overview: '/dashboard',
  aircraft: '/dashboard/aircraft',
  tenants: '/dashboard/tenants',
  carbonmax: '/dashboard/carbonmax',
  insights: '/dashboard/insights',
  settings: '/dashboard/settings',
};

export const NAV_ITEMS = [
  { name: 'Overview', href: DASHBOARD_ROUTES.overview, icon: 'LayoutDashboard' },
  { name: 'Aircraft', href: DASHBOARD_ROUTES.aircraft, icon: 'Plane' },
  { name: 'Tenants', href: DASHBOARD_ROUTES.tenants, icon: 'Store' },
  { name: 'CarbonMax', href: DASHBOARD_ROUTES.carbonmax, icon: 'Leaf' },
  { name: 'Insights AI', href: DASHBOARD_ROUTES.insights, icon: 'Brain' },
  { name: 'Settings', href: DASHBOARD_ROUTES.settings, icon: 'Settings' },
];

// ═══════════════════════════════════════════════════════════════════════════
// UI CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

export const STATUS_COLORS = {
  positive: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  negative: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
  },
  warning: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
  },
  neutral: {
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-200',
  },
};

export const CARBON_RATING_COLORS = {
  'A+': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Excellent' },
  'A': { bg: 'bg-green-100', text: 'text-green-700', label: 'Very Good' },
  'B': { bg: 'bg-lime-100', text: 'text-lime-700', label: 'Good' },
  'C': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Average' },
  'D': { bg: 'bg-red-100', text: 'text-red-700', label: 'Needs Improvement' },
};

// ═══════════════════════════════════════════════════════════════════════════
// DEMO MODE
// ═══════════════════════════════════════════════════════════════════════════

export const DEMO_MODE = {
  enabled: true,
  startDate: '2025-12-05',   // 30 days of simulated data
  endDate: '2026-01-04',     // Today
  disclaimer: 'This dashboard displays simulated data for demonstration purposes. Values are based on CAG\'s published FY21/22 emissions profile with realistic daily variations.',
};

