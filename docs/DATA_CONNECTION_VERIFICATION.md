# Data Connection Verification

## ✅ Data Files Connected

### 1. Daily Emissions Data (`data/emissions/daily-emissions.json`)
- **Connected to:** `hooks/useDashboardData.ts`
- **Used in:** Overview page, CarbonMax page
- **Data:** 30 days of emissions data (2025-12-05 to 2026-01-04)
- **Status:** ✅ Connected

**Features:**
- Today's data automatically selected based on current date
- Weekly trend generated from last 7 days
- All scope breakdowns included
- CarbonMax activity data included
- Operational data included

### 2. Airlines Data (`data/emissions/airlines.json`)
- **Connected to:** `hooks/useAircraftData.ts`
- **Used in:** Aircraft page
- **Data:** 42 airlines with emissions, flights, SAF usage
- **Status:** ✅ Connected

**Features:**
- Top 10 airlines displayed in leaderboard
- Trend indicators included
- SAF usage percentages included

### 3. Aircraft Types Data (`data/emissions/aircraft-types.json`)
- **Connected to:** `hooks/useAircraftData.ts`
- **Used in:** Aircraft page
- **Data:** 18 aircraft types with performance metrics
- **Status:** ✅ Connected

**Features:**
- Efficiency scores calculated
- CO2 per passenger metrics
- Flight counts per type

### 4. Tenants Data (`data/emissions/tenants.json`)
- **Connected to:** `hooks/useTenantData.ts`
- **Used in:** Tenants page
- **Data:** 168 tenants with emissions and ratings
- **Status:** ✅ Connected

**Features:**
- Carbon ratings (A+ to D)
- Sustainable transaction percentages
- Category and location breakdowns

### 5. CarbonMax Hourly Data (`data/emissions/carbonmax-hourly.json`)
- **Connected to:** `hooks/useCarbonMaxData.ts`
- **Used in:** CarbonMax page
- **Data:** 24-hour activity breakdown
- **Status:** ✅ Connected

**Features:**
- Hourly quest completions
- CO2 avoided per hour
- Quest type breakdowns

## Hooks Summary

| Hook | Data Source | Pages Using It |
|------|-------------|----------------|
| `useDashboardData` | `daily-emissions.json` | Overview |
| `useAircraftData` | `airlines.json`, `aircraft-types.json`, `daily-emissions.json` | Aircraft |
| `useTenantData` | `tenants.json` | Tenants |
| `useCarbonMaxData` | `carbonmax-hourly.json`, `daily-emissions.json` | CarbonMax |

## Data Flow

```
data/emissions/
├── daily-emissions.json
│   └──→ useDashboardData.ts → Overview page
│   └──→ useAircraftData.ts → Aircraft page (for today's aircraft emissions)
│   └──→ useCarbonMaxData.ts → CarbonMax page (for today's activity)
│
├── airlines.json
│   └──→ useAircraftData.ts → Aircraft page
│
├── aircraft-types.json
│   └──→ useAircraftData.ts → Aircraft page
│
├── tenants.json
│   └──→ useTenantData.ts → Tenants page
│
└── carbonmax-hourly.json
    └──→ useCarbonMaxData.ts → CarbonMax page
```

## Verification Checklist

- [x] All 5 data files exist in `data/emissions/`
- [x] All 4 hooks created and connected
- [x] All pages updated to use data hooks
- [x] TypeScript types match JSON structure
- [x] No linting errors
- [x] JSON imports configured in tsconfig.json (`resolveJsonModule: true`)

## Status: ✅ ALL DATA CONNECTED

All 30 days of data is now properly connected to the dashboard components through the data hooks.

