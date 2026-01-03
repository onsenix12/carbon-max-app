# CarbonMax Implementation Guide
## Building from Scratch

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Dependencies](#2-dependencies)
3. [Folder Structure](#3-folder-structure)
4. [Configuration Files](#4-configuration-files)
5. [Foundation Components](#5-foundation-components)
6. [Quest Hub](#6-quest-hub)
7. [Quest Detail Pages](#7-quest-detail-pages)
8. [State Management](#8-state-management)
9. [Ask Max Chat](#9-ask-max-chat)
10. [Polish & Integration](#10-polish--integration)

---

## 1. Project Setup

### Step 1.1: Create Next.js Project

**Run in terminal:**

```bash
npx create-next-app@latest carbonmax --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

When prompted:
- Would you like to use TypeScript? → **Yes**
- Would you like to use ESLint? → **Yes**
- Would you like to use Tailwind CSS? → **Yes**
- Would you like to use `src/` directory? → **No**
- Would you like to use App Router? → **Yes**
- Would you like to customize the default import alias? → **Yes** → `@/*`

```bash
cd carbonmax
```

---

### Step 1.2: Install Dependencies

**Run in terminal:**

```bash
# UI Components
npm install lucide-react class-variance-authority clsx tailwind-merge

# Animations
npm install framer-motion

# shadcn/ui setup
npx shadcn@latest init
```

When prompted for shadcn:
- Which style would you like to use? → **Default**
- Which color would you like to use as base color? → **Zinc**
- Would you like to use CSS variables for colors? → **Yes**

```bash
# Add shadcn components we'll need
npx shadcn@latest add button card badge progress dialog toast
```

---

## 2. Dependencies

### Final package.json dependencies should include:

```json
{
  "dependencies": {
    "next": "^16.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "lucide-react": "^0.562.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0",
    "framer-motion": "^12.23.0",
    "sonner": "^2.0.7",
    "next-themes": "^0.4.6"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^20.x",
    "@types/react": "^19.x",
    "@types/react-dom": "^19.x",
    "tailwindcss": "^4.x",
    "@tailwindcss/postcss": "^4.x",
    "eslint": "^9.x",
    "eslint-config-next": "^16.x",
    "babel-plugin-react-compiler": "^1.0.0",
    "tw-animate-css": "^1.4.0"
  }
}
```

**Note:** This project uses Tailwind CSS 4 with `@tailwindcss/postcss`, which replaces the need for separate `postcss` and `autoprefixer` packages. The `sonner` component is used instead of the deprecated `toast` component.

---

## 3. Folder Structure

### Step 3.1: Create Folder Structure

**Cursor Prompt 3.1:**

```
Create the following folder structure for a CarbonMax app. Create all folders and add a placeholder .gitkeep file in empty folders:

carbonmax/
├── app/
│   ├── layout.tsx              # Root layout (will exist from setup)
│   ├── page.tsx                # Homepage with CarbonMax banner
│   ├── globals.css             # Global styles (will exist)
│   │
│   ├── carbonmax/
│   │   ├── layout.tsx          # CarbonMax section layout
│   │   ├── page.tsx            # Quest Hub main page
│   │   │
│   │   ├── quest/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Dynamic quest detail page
│   │   │
│   │   ├── impact/
│   │   │   └── page.tsx        # Full impact story page
│   │   │
│   │   └── chat/
│   │       └── page.tsx        # Ask Max chat page
│   │
│   └── api/
│       └── chat/
│           └── route.ts        # Chat API endpoint (for later)
│
├── components/
│   ├── ui/                     # shadcn components (auto-created)
│   │
│   ├── carbonmax/
│   │   ├── CarbonMaxBanner.tsx     # Homepage entry banner
│   │   ├── ModeSelector.tsx        # Jewel/Departure/Transit tabs
│   │   ├── TierProgressBar.tsx     # Green tier progress
│   │   ├── QuestCard.tsx           # Quest list item card
│   │   ├── MyImpact.tsx            # Impact summary component
│   │   ├── AskMaxButton.tsx        # Floating chat button
│   │   ├── QuestComplete.tsx       # Completion celebration
│   │   │
│   │   └── quests/
│   │       ├── GreenPlateQuest.tsx     # Jewel: dining quest
│   │       ├── GreenFlightQuest.tsx    # Departure: flight quest
│   │       └── HydrationQuest.tsx      # Transit: refill quest
│   │
│   └── layout/
│       ├── AppShell.tsx            # Main app wrapper
│       └── BottomNav.tsx           # Bottom navigation bar
│
├── lib/
│   ├── utils.ts                    # Utility functions (cn helper)
│   │
│   └── carbonmax/
│       ├── types.ts                # TypeScript types
│       ├── constants.ts            # App constants
│       └── utils.ts                # CarbonMax utilities
│
├── hooks/
│   ├── useJourneyMode.tsx          # Mode context & hook
│   └── useQuestProgress.tsx        # Quest state management
│
├── data/
│   ├── quests.json                 # Quest definitions
│   ├── merchants.json              # Green merchant data
│   └── tiers.json                  # Green tier definitions
│
└── public/
    └── images/
        └── .gitkeep

Just create the folder structure. Don't add any code to the files yet - we'll do that step by step.
```

---

## 4. Configuration Files

### Step 4.1: Tailwind Configuration

**Cursor Prompt 4.1:**

```
Update tailwind.config.ts with CarbonMax theme colors and configuration.

Replace the entire file with:

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Changi Brand Colors
        changi: {
          navy: "#0f1133",
          purple: "#693874",
          cream: "#f3efe9",
          red: "#902437",
          gray: "#5b5b5b",
        },
        
        // CarbonMax Mode Colors
        mode: {
          jewel: {
            DEFAULT: "#F5A623",
            light: "#FFD54F",
            dark: "#E69100",
            bg: "#FFFBF0",
            accent: "#FFF3D6",
          },
          departure: {
            DEFAULT: "#1E3A8A",
            light: "#3B82F6",
            dark: "#1E40AF",
            bg: "#F0F7FF",
            accent: "#DBEAFE",
          },
          transit: {
            DEFAULT: "#0D9488",
            light: "#2DD4BF",
            dark: "#115E59",
            bg: "#F0FDFA",
            accent: "#CCFBF1",
          },
        },
        
        // Green/Eco Colors
        eco: {
          leaf: "#2D8B4E",
          mint: "#4ECDC4",
          forest: "#1B4332",
          lime: "#B7E4C7",
          sage: "#87A878",
        },
        
        // Carbon Rating Colors
        rating: {
          "a-plus": "#22C55E",
          a: "#84CC16",
          b: "#EAB308",
          c: "#F97316",
          d: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

### Step 4.2: Global CSS

**Cursor Prompt 4.2:**

```
Update app/globals.css with CarbonMax global styles.

Replace the entire file with:

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 142 76% 36%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 142 76% 36%;
    --radius: 0.75rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  /* Mobile app container */
  .app-container {
    @apply max-w-md mx-auto min-h-screen bg-white;
  }
  
  /* Card styles */
  .quest-card {
    @apply bg-white rounded-2xl p-4 shadow-sm border border-gray-100;
    @apply transition-all duration-200 hover:shadow-md;
  }
  
  /* Mode-specific backgrounds */
  .mode-bg-jewel {
    @apply bg-mode-jewel-bg;
  }
  
  .mode-bg-departure {
    @apply bg-mode-departure-bg;
  }
  
  .mode-bg-transit {
    @apply bg-mode-transit-bg;
  }
  
  /* Points badge */
  .points-badge {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium;
    @apply bg-eco-lime text-eco-forest;
  }
  
  /* Carbon rating badges */
  .rating-badge {
    @apply inline-flex items-center px-2 py-0.5 rounded text-xs font-bold;
  }
  
  .rating-a-plus {
    @apply bg-rating-a-plus/20 text-rating-a-plus;
  }
  
  .rating-a {
    @apply bg-rating-a/20 text-rating-a;
  }
  
  .rating-b {
    @apply bg-rating-b/20 text-rating-b;
  }
}

@layer utilities {
  /* Safe area for mobile */
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom, 1rem);
  }
  
  .safe-top {
    padding-top: env(safe-area-inset-top, 0);
  }
}
```

---

### Step 4.3: Utility Functions

**Cursor Prompt 4.3:**

```
Create the utility functions file.

File: lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPoints(points: number): string {
  return `+${points.toLocaleString()} pts`;
}

export function formatCO2(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tonnes`;
  }
  return `${kg.toFixed(0)} kg`;
}

export function formatDistance(km: number): string {
  return `${km.toLocaleString()} km`;
}
```

---

## 5. Foundation Components

### Step 5.1: TypeScript Types

**Cursor Prompt 5.1:**

```
Create the CarbonMax TypeScript type definitions.

File: lib/carbonmax/types.ts

// Journey Modes
export type JourneyMode = "jewel" | "departure" | "transit";

export interface ModeConfig {
  id: JourneyMode;
  name: string;
  icon: string;
  tagline: string;
  color: string;
  bgColor: string;
}

// Quests
export type QuestType = "flight" | "merchant" | "eco-action" | "discovery";
export type QuestStatus = "available" | "in-progress" | "completed" | "locked";

export interface Quest {
  id: string;
  type: QuestType;
  mode: JourneyMode;
  title: string;
  description: string;
  icon: string;
  basePoints: number;
  bonusPoints?: number;
  bonusDescription?: string;
  carbonFact: string;
  estimatedTime?: string;
}

export interface QuestProgress {
  questId: string;
  status: QuestStatus;
  startedAt?: string;
  completedAt?: string;
  pointsEarned: number;
  bonusEarned: boolean;
  extraData?: Record<string, any>;
}

// Green Tiers
export interface GreenTier {
  id: string;
  name: string;
  icon: string;
  minPoints: number;
  maxPoints: number | null;
  perks: string[];
}

export interface UserTierProgress {
  currentTier: GreenTier;
  nextTier: GreenTier | null;
  totalPoints: number;
  pointsToNextTier: number;
  progressPercent: number;
}

// Merchants
export type CarbonRating = "A+" | "A" | "B" | "C";

export interface Merchant {
  id: string;
  name: string;
  category: string;
  terminal: string;
  location: string;
  carbonRating: CarbonRating;
  description: string;
  walkTime: string;
}

// Impact
export interface UserImpact {
  questsCompleted: number;
  totalPointsEarned: number;
  co2Avoided: number;
  plasticSaved: number;
  treesEquivalent: number;
}

// Chat
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
```

---

### Step 5.2: Constants

**Cursor Prompt 5.2:**

```
Create the CarbonMax constants file.

File: lib/carbonmax/constants.ts

import { ModeConfig, GreenTier } from "./types";

export const MODE_CONFIGS: Record<string, ModeConfig> = {
  jewel: {
    id: "jewel",
    name: "Jewel",
    icon: "🟡",
    tagline: "Discover Green Treasures",
    color: "mode-jewel",
    bgColor: "mode-jewel-bg",
  },
  departure: {
    id: "departure",
    name: "Departure",
    icon: "🔵",
    tagline: "Leave Lighter",
    color: "mode-departure",
    bgColor: "mode-departure-bg",
  },
  transit: {
    id: "transit",
    name: "Transit",
    icon: "🩵",
    tagline: "Green While You Wait",
    color: "mode-transit",
    bgColor: "mode-transit-bg",
  },
};

export const GREEN_TIERS: GreenTier[] = [
  {
    id: "seedling",
    name: "Seedling",
    icon: "🌱",
    minPoints: 0,
    maxPoints: 499,
    perks: ["Track your carbon impact", "Access basic quests"],
  },
  {
    id: "sprout",
    name: "Sprout",
    icon: "🌿",
    minPoints: 500,
    maxPoints: 1499,
    perks: ["10% bonus points", "Exclusive green merchant deals"],
  },
  {
    id: "tree",
    name: "Tree",
    icon: "🌳",
    minPoints: 1500,
    maxPoints: 3999,
    perks: ["15% bonus points", "Priority lounge access", "Exclusive quests"],
  },
  {
    id: "forest",
    name: "Forest",
    icon: "🌲",
    minPoints: 4000,
    maxPoints: 9999,
    perks: ["20% bonus points", "VIP experiences", "Carbon offset matching"],
  },
  {
    id: "canopy",
    name: "Canopy",
    icon: "🏔️",
    minPoints: 10000,
    maxPoints: null,
    perks: ["25% bonus points", "All perks unlocked", "Sustainability ambassador status"],
  },
];

export const CARBON_ANALOGIES = {
  phone: { factor: 0.00822, unit: "phone charges" },
  car: { factor: 0.21, unit: "km driven" },
  lightbulb: { factor: 0.01, unit: "hours of light" },
  trees: { factor: 21, unit: "trees for a year" },
};
```

---

### Step 5.3: Quest Data

**Cursor Prompt 5.3:**

```
Create the quest data JSON file with our 3 starter quests.

File: data/quests.json

{
  "quests": [
    {
      "id": "jewel-green-plate",
      "type": "merchant",
      "mode": "jewel",
      "title": "Green Plate Discovery",
      "description": "Find and dine at a restaurant with a Carbon A or A+ rating",
      "icon": "🍽️",
      "basePoints": 75,
      "bonusPoints": 40,
      "bonusDescription": "Choose a plant-based meal",
      "carbonFact": "Plant-based meals produce 50% less CO2 than meat-based meals",
      "estimatedTime": "30 min"
    },
    {
      "id": "departure-green-flight",
      "type": "flight",
      "mode": "departure",
      "title": "Green Your Flight",
      "description": "Calculate your flight emissions and contribute SAF to reduce your impact",
      "icon": "✈️",
      "basePoints": 150,
      "bonusPoints": 200,
      "bonusDescription": "Contribute 25% SAF coverage",
      "carbonFact": "SAF reduces lifecycle emissions by up to 80% compared to conventional jet fuel",
      "estimatedTime": "5 min"
    },
    {
      "id": "transit-hydration",
      "type": "eco-action",
      "mode": "transit",
      "title": "Hydration Station",
      "description": "Find a water refill station and fill up your reusable bottle",
      "icon": "💧",
      "basePoints": 30,
      "bonusPoints": 20,
      "bonusDescription": "Use the station near your gate",
      "carbonFact": "Each refill saves one 500ml plastic bottle (12g plastic, 100g CO2)",
      "estimatedTime": "5 min"
    }
  ]
}
```

---

### Step 5.4: Merchants Data

**Cursor Prompt 5.4:**

```
Create the merchants data JSON file.

File: data/merchants.json

{
  "merchants": [
    {
      "id": "pho-street",
      "name": "Pho Street",
      "category": "Vietnamese",
      "terminal": "Terminal 3",
      "location": "#02-156",
      "carbonRating": "A",
      "description": "Authentic Vietnamese cuisine with plant-based options",
      "walkTime": "3 min"
    },
    {
      "id": "cedele",
      "name": "Cedele",
      "category": "Healthy Café",
      "terminal": "Jewel",
      "location": "#01-234",
      "carbonRating": "A+",
      "description": "Wholesome salads, sandwiches, and plant-forward dishes",
      "walkTime": "5 min"
    },
    {
      "id": "soup-spoon",
      "name": "The Soup Spoon",
      "category": "Soups & Salads",
      "terminal": "Jewel",
      "location": "#B2-045",
      "carbonRating": "A",
      "description": "Hearty soups made with sustainable ingredients",
      "walkTime": "4 min"
    },
    {
      "id": "green-party",
      "name": "The Green Party",
      "category": "Lifestyle",
      "terminal": "Terminal 3",
      "location": "#B2-089",
      "carbonRating": "A+",
      "description": "Sustainable lifestyle products and zero-waste essentials",
      "walkTime": "6 min"
    }
  ]
}
```

---

### Step 5.5: Tiers Data

**Cursor Prompt 5.5:**

```
Create the tiers data JSON file.

File: data/tiers.json

{
  "tiers": [
    {
      "id": "seedling",
      "name": "Seedling",
      "icon": "🌱",
      "minPoints": 0,
      "maxPoints": 499,
      "color": "#B7E4C7",
      "perks": [
        "Track your carbon impact",
        "Access basic quests",
        "Join the green community"
      ]
    },
    {
      "id": "sprout",
      "name": "Sprout",
      "icon": "🌿",
      "minPoints": 500,
      "maxPoints": 1499,
      "color": "#87A878",
      "perks": [
        "10% bonus points on all quests",
        "Exclusive green merchant deals",
        "Early access to new quests"
      ]
    },
    {
      "id": "tree",
      "name": "Tree",
      "icon": "🌳",
      "minPoints": 1500,
      "maxPoints": 3999,
      "color": "#2D8B4E",
      "perks": [
        "15% bonus points on all quests",
        "Priority lounge access",
        "Exclusive Tree-tier quests",
        "Monthly impact report"
      ]
    },
    {
      "id": "forest",
      "name": "Forest",
      "icon": "🌲",
      "minPoints": 4000,
      "maxPoints": 9999,
      "color": "#1B4332",
      "perks": [
        "20% bonus points on all quests",
        "VIP airport experiences",
        "Carbon offset matching up to $50",
        "Sustainability workshop invites"
      ]
    },
    {
      "id": "canopy",
      "name": "Canopy",
      "icon": "🏔️",
      "minPoints": 10000,
      "maxPoints": null,
      "color": "#14532D",
      "perks": [
        "25% bonus points on all quests",
        "All perks unlocked",
        "Sustainability Ambassador status",
        "Annual tree planting in your name",
        "Exclusive Canopy events"
      ]
    }
  ]
}
```

---

## 6. Quest Hub

### Step 6.1: Journey Mode Hook

**Cursor Prompt 6.1:**

```
Create the Journey Mode context and hook.

File: hooks/useJourneyMode.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { JourneyMode, ModeConfig } from "@/lib/carbonmax/types";
import { MODE_CONFIGS } from "@/lib/carbonmax/constants";

interface JourneyModeContextType {
  mode: JourneyMode;
  setMode: (mode: JourneyMode) => void;
  modeConfig: ModeConfig;
}

const JourneyModeContext = createContext<JourneyModeContextType | undefined>(undefined);

const STORAGE_KEY = "carbonmax-journey-mode";

export function JourneyModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<JourneyMode>("jewel");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === "jewel" || stored === "departure" || stored === "transit")) {
      setModeState(stored as JourneyMode);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when mode changes
  const setMode = (newMode: JourneyMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const modeConfig = MODE_CONFIGS[mode];

  // Prevent hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <JourneyModeContext.Provider value={{ mode, setMode, modeConfig }}>
      {children}
    </JourneyModeContext.Provider>
  );
}

export function useJourneyMode() {
  const context = useContext(JourneyModeContext);
  if (context === undefined) {
    throw new Error("useJourneyMode must be used within a JourneyModeProvider");
  }
  return context;
}
```

---

### Step 6.2: Quest Progress Hook

**Cursor Prompt 6.2:**

```
Create the Quest Progress context and hook for tracking completion.

File: hooks/useQuestProgress.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { QuestProgress, UserImpact, UserTierProgress } from "@/lib/carbonmax/types";
import { GREEN_TIERS } from "@/lib/carbonmax/constants";

interface QuestProgressContextType {
  completedQuests: string[];
  questProgress: Record<string, QuestProgress>;
  totalPoints: number;
  userImpact: UserImpact;
  tierProgress: UserTierProgress;
  
  startQuest: (questId: string) => void;
  completeQuest: (questId: string, points: number, bonus: boolean, extraData?: Record<string, any>) => void;
  isQuestCompleted: (questId: string) => boolean;
  isQuestInProgress: (questId: string) => boolean;
}

const QuestProgressContext = createContext<QuestProgressContextType | undefined>(undefined);

const STORAGE_KEY = "carbonmax-quest-progress";

function calculateTierProgress(points: number): UserTierProgress {
  let currentTier = GREEN_TIERS[0];
  let nextTier = GREEN_TIERS[1];
  
  for (let i = 0; i < GREEN_TIERS.length; i++) {
    const tier = GREEN_TIERS[i];
    if (points >= tier.minPoints && (tier.maxPoints === null || points <= tier.maxPoints)) {
      currentTier = tier;
      nextTier = GREEN_TIERS[i + 1] || null;
      break;
    }
  }
  
  const pointsToNextTier = nextTier ? nextTier.minPoints - points : 0;
  const tierRange = currentTier.maxPoints ? currentTier.maxPoints - currentTier.minPoints : 1000;
  const progressInTier = points - currentTier.minPoints;
  const progressPercent = Math.min((progressInTier / tierRange) * 100, 100);
  
  return {
    currentTier,
    nextTier,
    totalPoints: points,
    pointsToNextTier,
    progressPercent,
  };
}

export function QuestProgressProvider({ children }: { children: ReactNode }) {
  const [questProgress, setQuestProgress] = useState<Record<string, QuestProgress>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [userImpact, setUserImpact] = useState<UserImpact>({
    questsCompleted: 0,
    totalPointsEarned: 0,
    co2Avoided: 0,
    plasticSaved: 0,
    treesEquivalent: 0,
  });
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setQuestProgress(data.questProgress || {});
        setTotalPoints(data.totalPoints || 0);
        setUserImpact(data.userImpact || userImpact);
      } catch (e) {
        console.error("Failed to parse quest progress:", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        questProgress,
        totalPoints,
        userImpact,
      }));
    }
  }, [questProgress, totalPoints, userImpact, isHydrated]);

  const completedQuests = Object.keys(questProgress).filter(
    (id) => questProgress[id].status === "completed"
  );

  const startQuest = (questId: string) => {
    setQuestProgress((prev) => ({
      ...prev,
      [questId]: {
        questId,
        status: "in-progress",
        startedAt: new Date().toISOString(),
        pointsEarned: 0,
        bonusEarned: false,
      },
    }));
  };

  const completeQuest = (
    questId: string,
    points: number,
    bonus: boolean,
    extraData?: Record<string, any>
  ) => {
    const newTotalPoints = totalPoints + points;
    
    setQuestProgress((prev) => ({
      ...prev,
      [questId]: {
        questId,
        status: "completed",
        startedAt: prev[questId]?.startedAt,
        completedAt: new Date().toISOString(),
        pointsEarned: points,
        bonusEarned: bonus,
        extraData,
      },
    }));
    
    setTotalPoints(newTotalPoints);
    
    setUserImpact((prev) => ({
      questsCompleted: prev.questsCompleted + 1,
      totalPointsEarned: newTotalPoints,
      co2Avoided: prev.co2Avoided + (extraData?.co2Avoided || 0),
      plasticSaved: prev.plasticSaved + (extraData?.plasticSaved || 0),
      treesEquivalent: (prev.co2Avoided + (extraData?.co2Avoided || 0)) / 21,
    }));
  };

  const isQuestCompleted = (questId: string) => {
    return questProgress[questId]?.status === "completed";
  };

  const isQuestInProgress = (questId: string) => {
    return questProgress[questId]?.status === "in-progress";
  };

  const tierProgress = calculateTierProgress(totalPoints);

  if (!isHydrated) {
    return null;
  }

  return (
    <QuestProgressContext.Provider
      value={{
        completedQuests,
        questProgress,
        totalPoints,
        userImpact,
        tierProgress,
        startQuest,
        completeQuest,
        isQuestCompleted,
        isQuestInProgress,
      }}
    >
      {children}
    </QuestProgressContext.Provider>
  );
}

export function useQuestProgress() {
  const context = useContext(QuestProgressContext);
  if (context === undefined) {
    throw new Error("useQuestProgress must be used within a QuestProgressProvider");
  }
  return context;
}
```

---

### Step 6.3: Mode Selector Component

**Cursor Prompt 6.3:**

```
Create the Mode Selector component.

File: components/carbonmax/ModeSelector.tsx

"use client";

import { useJourneyMode } from "@/hooks/useJourneyMode";
import { JourneyMode } from "@/lib/carbonmax/types";
import { MODE_CONFIGS } from "@/lib/carbonmax/constants";
import { cn } from "@/lib/utils";

export function ModeSelector() {
  const { mode, setMode, modeConfig } = useJourneyMode();

  const modes: JourneyMode[] = ["jewel", "departure", "transit"];

  return (
    <div className="space-y-3">
      {/* Mode Tabs */}
      <div className="flex bg-white rounded-xl p-1 shadow-sm">
        {modes.map((m) => {
          const config = MODE_CONFIGS[m];
          const isActive = mode === m;

          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200",
                isActive
                  ? `bg-${config.color} text-white shadow-md`
                  : "text-gray-500 hover:bg-gray-50"
              )}
              style={
                isActive
                  ? {
                      backgroundColor:
                        m === "jewel"
                          ? "#F5A623"
                          : m === "departure"
                          ? "#1E3A8A"
                          : "#0D9488",
                    }
                  : undefined
              }
            >
              <span className="text-lg">{config.icon}</span>
              <span className="font-medium text-sm">{config.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mode Tagline */}
      <div
        className={cn(
          "text-center py-2 px-4 rounded-lg transition-all duration-300"
        )}
        style={{
          backgroundColor:
            mode === "jewel"
              ? "#FFFBF0"
              : mode === "departure"
              ? "#F0F7FF"
              : "#F0FDFA",
        }}
      >
        <p className="text-sm font-medium text-gray-700">
          {modeConfig.icon} {modeConfig.tagline}
        </p>
      </div>
    </div>
  );
}
```

---

### Step 6.4: Tier Progress Bar Component

**Cursor Prompt 6.4:**

```
Create the Tier Progress Bar component.

File: components/carbonmax/TierProgressBar.tsx

"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { cn } from "@/lib/utils";

export function TierProgressBar() {
  const { tierProgress } = useQuestProgress();
  const { currentTier, nextTier, totalPoints, pointsToNextTier, progressPercent } = tierProgress;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Tier Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentTier.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{currentTier.name}</span>
              {nextTier && (
                <>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-500 text-sm">{nextTier.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="font-bold text-eco-leaf">{totalPoints.toLocaleString()}</span>
          {nextTier && (
            <span className="text-gray-400 text-sm"> / {nextTier.minPoints.toLocaleString()} pts</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="absolute h-full bg-gradient-to-r from-eco-leaf to-eco-mint rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Progress Text */}
      {nextTier ? (
        <p className="text-xs text-gray-500 text-center">
          🎯 <span className="font-medium">{pointsToNextTier}</span> pts to unlock{" "}
          <span className="font-medium">{nextTier.name}</span> tier
        </p>
      ) : (
        <p className="text-xs text-eco-forest text-center font-medium">
          🏆 Maximum tier achieved!
        </p>
      )}
    </div>
  );
}
```

---

### Step 6.5: Quest Card Component

**Cursor Prompt 6.5:**

```
Create the Quest Card component.

File: components/carbonmax/QuestCard.tsx

"use client";

import { Quest } from "@/lib/carbonmax/types";
import { cn } from "@/lib/utils";
import { Clock, ChevronRight, Check } from "lucide-react";

interface QuestCardProps {
  quest: Quest;
  isCompleted?: boolean;
  onStartQuest: (questId: string) => void;
}

export function QuestCard({ quest, isCompleted = false, onStartQuest }: QuestCardProps) {
  const totalPossiblePoints = quest.basePoints + (quest.bonusPoints || 0);

  return (
    <div
      className={cn(
        "quest-card cursor-pointer",
        isCompleted && "bg-eco-lime/10 border-eco-leaf/30"
      )}
      onClick={() => onStartQuest(quest.id)}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
            isCompleted ? "bg-eco-leaf/20" : "bg-gray-100"
          )}
        >
          {isCompleted ? "✅" : quest.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{quest.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
                {quest.description}
              </p>
            </div>
          </div>

          {/* Meta Row */}
          <div className="flex items-center gap-3 mt-3">
            {/* Points Badge */}
            <span
              className={cn(
                "points-badge",
                isCompleted && "bg-eco-leaf/20 text-eco-forest"
              )}
            >
              {isCompleted ? "Completed" : `+${quest.basePoints} pts`}
            </span>

            {/* Bonus Indicator */}
            {!isCompleted && quest.bonusPoints && (
              <span className="text-xs text-gray-400">
                Up to +{totalPossiblePoints}
              </span>
            )}

            {/* Time Estimate */}
            {quest.estimatedTime && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {quest.estimatedTime}
              </span>
            )}

            {/* Arrow */}
            <ChevronRight className="w-5 h-5 text-gray-300 ml-auto flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Step 6.6: My Impact Component

**Cursor Prompt 6.6:**

```
Create the My Impact summary component.

File: components/carbonmax/MyImpact.tsx

"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function MyImpact() {
  const { userImpact } = useQuestProgress();

  const stats = [
    {
      value: userImpact.questsCompleted,
      label: "Quests",
      icon: "🎯",
    },
    {
      value: `${userImpact.co2Avoided.toFixed(0)} kg`,
      label: "CO₂ Saved",
      icon: "🌍",
    },
    {
      value: `${userImpact.plasticSaved}g`,
      label: "Plastic Saved",
      icon: "♻️",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <span>🌍</span> My Impact
        </h3>
        <Link
          href="/carbonmax/impact"
          className="text-sm text-eco-leaf font-medium flex items-center gap-1 hover:underline"
        >
          Full Story <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trees Equivalent */}
      {userImpact.treesEquivalent > 0 && (
        <div className="bg-eco-lime/30 rounded-xl p-3 text-center">
          <p className="text-sm text-eco-forest">
            🌳 Equivalent to{" "}
            <span className="font-bold">
              {userImpact.treesEquivalent.toFixed(1)} trees
            </span>{" "}
            absorbing CO₂ for a year
          </p>
        </div>
      )}

      {/* Empty State */}
      {userImpact.questsCompleted === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            Complete your first quest to start tracking your impact!
          </p>
        </div>
      )}
    </div>
  );
}
```

---

### Step 6.7: CarbonMax Layout

**Cursor Prompt 6.7:**

```
Create the CarbonMax section layout that wraps all CarbonMax pages.

File: app/carbonmax/layout.tsx

import { JourneyModeProvider } from "@/hooks/useJourneyMode";
import { QuestProgressProvider } from "@/hooks/useQuestProgress";

export default function CarbonMaxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JourneyModeProvider>
      <QuestProgressProvider>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </QuestProgressProvider>
    </JourneyModeProvider>
  );
}
```

---

### Step 6.8: Quest Hub Page

**Cursor Prompt 6.8:**

```
Create the main Quest Hub page that brings everything together.

File: app/carbonmax/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useJourneyMode } from "@/hooks/useJourneyMode";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ModeSelector } from "@/components/carbonmax/ModeSelector";
import { TierProgressBar } from "@/components/carbonmax/TierProgressBar";
import { QuestCard } from "@/components/carbonmax/QuestCard";
import { MyImpact } from "@/components/carbonmax/MyImpact";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

// Import quest data
import questsData from "@/data/quests.json";
import { Quest } from "@/lib/carbonmax/types";

export default function QuestHubPage() {
  const router = useRouter();
  const { mode, modeConfig } = useJourneyMode();
  const { isQuestCompleted } = useQuestProgress();

  // Filter quests by current mode
  const quests = (questsData.quests as Quest[]).filter((q) => q.mode === mode);
  const availableCount = quests.filter((q) => !isQuestCompleted(q.id)).length;

  const handleStartQuest = (questId: string) => {
    router.push(`/carbonmax/quest/${questId}`);
  };

  // Dynamic background color based on mode
  const bgColor =
    mode === "jewel"
      ? "bg-mode-jewel-bg"
      : mode === "departure"
      ? "bg-mode-departure-bg"
      : "bg-mode-transit-bg";

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-gray-600">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <h1 className="font-bold text-lg text-gray-900">CarbonMax</h1>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Tier Progress */}
        <TierProgressBar />

        {/* Mode Selector */}
        <ModeSelector />

        {/* Active Quests Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Active Quests</h2>
            <span className="text-sm text-gray-500">
              {availableCount} available
            </span>
          </div>

          <div className="space-y-3">
            {quests.length > 0 ? (
              quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  isCompleted={isQuestCompleted(quest.id)}
                  onStartQuest={handleStartQuest}
                />
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-2xl">
                <p className="text-gray-500">No quests available for this mode</p>
              </div>
            )}
          </div>
        </div>

        {/* My Impact Section */}
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">My Impact</h2>
          <MyImpact />
        </div>
      </div>

      {/* Floating Ask Max Button */}
      <Link
        href="/carbonmax/chat"
        className="fixed bottom-6 right-6 w-14 h-14 bg-eco-leaf text-white rounded-full shadow-lg flex items-center justify-center hover:bg-eco-forest transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </Link>
    </div>
  );
}
```

---

## 7. Quest Detail Pages

### Step 7.1: Green Plate Quest (Jewel Mode)

**Cursor Prompt 7.1:**

```
Create the Green Plate Discovery quest component for Jewel mode.

File: components/carbonmax/quests/GreenPlateQuest.tsx

"use client";

import { useState } from "react";
import { Quest, Merchant } from "@/lib/carbonmax/types";
import { cn } from "@/lib/utils";
import { MapPin, Check, Lightbulb } from "lucide-react";

// Mock merchants data
const RESTAURANTS: Merchant[] = [
  {
    id: "pho-street",
    name: "Pho Street",
    category: "Vietnamese",
    terminal: "Terminal 3",
    location: "#02-156",
    carbonRating: "A",
    description: "Authentic Vietnamese cuisine with plant-based options",
    walkTime: "3 min",
  },
  {
    id: "cedele",
    name: "Cedele",
    category: "Healthy Café",
    terminal: "Jewel",
    location: "#01-234",
    carbonRating: "A+",
    description: "Wholesome salads, sandwiches, and plant-forward dishes",
    walkTime: "5 min",
  },
  {
    id: "soup-spoon",
    name: "The Soup Spoon",
    category: "Soups & Salads",
    terminal: "Jewel",
    location: "#B2-045",
    carbonRating: "A",
    description: "Hearty soups made with sustainable ingredients",
    walkTime: "4 min",
  },
];

interface GreenPlateQuestProps {
  quest: Quest;
  onComplete: (points: number, bonus: boolean, extraData?: Record<string, any>) => void;
}

export function GreenPlateQuest({ quest, onComplete }: GreenPlateQuestProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [atRestaurant, setAtRestaurant] = useState(false);
  const [orderedPlantBased, setOrderedPlantBased] = useState(false);

  const canComplete = atRestaurant;
  const totalPoints = quest.basePoints + (orderedPlantBased && quest.bonusPoints ? quest.bonusPoints : 0);

  const handleComplete = () => {
    onComplete(totalPoints, orderedPlantBased, {
      restaurantId: selectedRestaurant,
      plantBased: orderedPlantBased,
    });
  };

  return (
    <div className="space-y-6">
      {/* Restaurant Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Choose a Green Restaurant</h3>
        <div className="space-y-3">
          {RESTAURANTS.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => setSelectedRestaurant(restaurant.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all",
                selectedRestaurant === restaurant.id
                  ? "border-eco-leaf bg-eco-lime/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{restaurant.name}</span>
                    <span
                      className={cn(
                        "rating-badge",
                        restaurant.carbonRating === "A+" ? "rating-a-plus" : "rating-a"
                      )}
                    >
                      {restaurant.carbonRating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{restaurant.category}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {restaurant.terminal} • {restaurant.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {restaurant.walkTime}
                </div>
              </div>
              {selectedRestaurant === restaurant.id && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">{restaurant.description}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quest Objectives */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Quest Objectives</h3>
        <div className="space-y-3">
          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
              !selectedRestaurant && "opacity-50 cursor-not-allowed",
              atRestaurant ? "border-eco-leaf bg-eco-lime/10" : "border-gray-200 bg-white"
            )}
          >
            <input
              type="checkbox"
              checked={atRestaurant}
              onChange={(e) => setAtRestaurant(e.target.checked)}
              disabled={!selectedRestaurant}
              className="w-5 h-5 rounded border-gray-300 text-eco-leaf focus:ring-eco-leaf"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-900">I'm at the restaurant</span>
              <p className="text-sm text-gray-500">Check in when you arrive</p>
            </div>
            <span className="text-sm text-eco-leaf font-medium">+{quest.basePoints} pts</span>
          </label>

          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
              !atRestaurant && "opacity-50 cursor-not-allowed",
              orderedPlantBased ? "border-eco-leaf bg-eco-lime/10" : "border-gray-200 bg-white"
            )}
          >
            <input
              type="checkbox"
              checked={orderedPlantBased}
              onChange={(e) => setOrderedPlantBased(e.target.checked)}
              disabled={!atRestaurant}
              className="w-5 h-5 rounded border-gray-300 text-eco-leaf focus:ring-eco-leaf"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-900">I ordered plant-based</span>
              <p className="text-sm text-gray-500">Bonus for sustainable choice!</p>
            </div>
            <span className="text-sm text-amber-600 font-medium">+{quest.bonusPoints} bonus</span>
          </label>
        </div>
      </div>

      {/* Max's Tip */}
      <div className="bg-eco-lime/20 rounded-xl p-4">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-eco-leaf flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-eco-forest text-sm">Max's Tip</p>
            <p className="text-sm text-gray-700 mt-1">
              Ask for the plant-based options — most green restaurants have great ones that taste amazing!
            </p>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={!canComplete}
        className={cn(
          "w-full py-4 rounded-xl font-semibold text-white transition-all",
          canComplete
            ? "bg-eco-leaf hover:bg-eco-forest"
            : "bg-gray-300 cursor-not-allowed"
        )}
      >
        {canComplete ? `Complete Quest (+${totalPoints} pts)` : "Complete objectives to finish"}
      </button>
    </div>
  );
}
```

---

### Step 7.2: Green Flight Quest (Departure Mode)

**Cursor Prompt 7.2:**

```
Create the Green Your Flight quest component for Departure mode.

File: components/carbonmax/quests/GreenFlightQuest.tsx

"use client";

import { useState } from "react";
import { Quest } from "@/lib/carbonmax/types";
import { cn } from "@/lib/utils";
import { Plane, Leaf, Info, Check, Lightbulb } from "lucide-react";

interface GreenFlightQuestProps {
  quest: Quest;
  onComplete: (points: number, bonus: boolean, extraData?: Record<string, any>) => void;
}

// Mock flight data
const FLIGHT_DATA = {
  origin: "SIN",
  originCity: "Singapore",
  destination: "NRT",
  destinationCity: "Tokyo Narita",
  distance: 5312,
  aircraft: "Boeing 787-9",
  efficiency: "A",
  baseEmissions: 847,
  withRF: 1584, // With radiative forcing
};

const SAF_OPTIONS = [
  { percent: 0, price: 0, co2Avoided: 0, bonusPoints: 0 },
  { percent: 10, price: 12, co2Avoided: 158, bonusPoints: 100 },
  { percent: 25, price: 30, co2Avoided: 396, bonusPoints: 200 },
];

export function GreenFlightQuest({ quest, onComplete }: GreenFlightQuestProps) {
  const [calculated, setCalculated] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [selectedSAF, setSelectedSAF] = useState(0);

  const selectedOption = SAF_OPTIONS.find((o) => o.percent === selectedSAF) || SAF_OPTIONS[0];
  const totalPoints = quest.basePoints + selectedOption.bonusPoints;
  const canComplete = calculated;

  const handleCalculate = async () => {
    setCalculating(true);
    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCalculated(true);
    setCalculating(false);
  };

  const handleComplete = () => {
    onComplete(totalPoints, selectedSAF > 0, {
      co2Avoided: selectedOption.co2Avoided,
      safPercent: selectedSAF,
      flightEmissions: FLIGHT_DATA.withRF,
    });
  };

  return (
    <div className="space-y-6">
      {/* Flight Details */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Your Flight</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{FLIGHT_DATA.origin}</div>
            <div className="text-sm text-gray-500">{FLIGHT_DATA.originCity}</div>
          </div>
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="h-px bg-gray-300 flex-1" />
            <Plane className="w-5 h-5 text-gray-400 mx-2" />
            <div className="h-px bg-gray-300 flex-1" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{FLIGHT_DATA.destination}</div>
            <div className="text-sm text-gray-500">{FLIGHT_DATA.destinationCity}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-gray-500">Distance</div>
            <div className="font-medium">{FLIGHT_DATA.distance.toLocaleString()} km</div>
          </div>
          <div>
            <div className="text-gray-500">Aircraft</div>
            <div className="font-medium">{FLIGHT_DATA.aircraft}</div>
          </div>
          <div>
            <div className="text-gray-500">Efficiency</div>
            <div className="font-medium text-rating-a">⭐ {FLIGHT_DATA.efficiency}</div>
          </div>
        </div>
      </div>

      {/* Calculate Button or Results */}
      {!calculated ? (
        <button
          onClick={handleCalculate}
          disabled={calculating}
          className="w-full py-4 bg-mode-departure text-white rounded-xl font-semibold hover:bg-mode-departure-dark transition-colors disabled:opacity-70"
        >
          {calculating ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </span>
          ) : (
            "Calculate My Emissions"
          )}
        </button>
      ) : (
        <>
          {/* Emissions Results */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-eco-leaf" />
              Emissions Calculated
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base emissions</span>
                <span className="font-medium">{FLIGHT_DATA.baseEmissions} kg CO₂e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-1">
                  + Radiative forcing
                  <Info className="w-4 h-4 text-gray-400" />
                </span>
                <span className="font-medium">+{FLIGHT_DATA.withRF - FLIGHT_DATA.baseEmissions} kg</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-amber-200">
                <span className="font-semibold text-gray-900">Total impact</span>
                <span className="font-bold text-amber-700">{FLIGHT_DATA.withRF} kg CO₂e</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-amber-200">
              <p className="text-sm text-amber-800">
                💡 That's like charging your phone <strong>193,000 times</strong>
              </p>
            </div>
          </div>

          {/* SAF Options */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-eco-leaf" />
              Reduce with SAF
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Sustainable Aviation Fuel reduces lifecycle emissions by up to 80%
            </p>

            <div className="space-y-3">
              {SAF_OPTIONS.map((option) => (
                <button
                  key={option.percent}
                  onClick={() => setSelectedSAF(option.percent)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border-2 transition-all",
                    selectedSAF === option.percent
                      ? "border-eco-leaf bg-eco-lime/10"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {option.percent === 0 ? "No SAF" : `${option.percent}% SAF Coverage`}
                      </div>
                      {option.percent > 0 && (
                        <div className="text-sm text-gray-500 mt-1">
                          S${option.price} • Covers {option.co2Avoided} kg CO₂e
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {option.bonusPoints > 0 ? (
                        <span className="text-eco-leaf font-semibold">+{option.bonusPoints} bonus</span>
                      ) : (
                        <span className="text-gray-400">No bonus</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Singapore Mandate Info */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex gap-3">
              <span className="text-2xl">🇸🇬</span>
              <div>
                <p className="font-medium text-blue-900 text-sm">Singapore SAF Mandate</p>
                <p className="text-sm text-blue-700 mt-1">
                  Singapore requires 1% SAF from 2026, rising to 3-5% by 2030. You're ahead of the curve!
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={!canComplete}
        className={cn(
          "w-full py-4 rounded-xl font-semibold text-white transition-all",
          canComplete
            ? "bg-eco-leaf hover:bg-eco-forest"
            : "bg-gray-300 cursor-not-allowed"
        )}
      >
        {canComplete
          ? `Complete Quest (+${totalPoints} pts)`
          : "Calculate emissions to continue"}
      </button>
    </div>
  );
}
```

---

### Step 7.3: Hydration Quest (Transit Mode)

**Cursor Prompt 7.3:**

```
Create the Hydration Station quest component for Transit mode.

File: components/carbonmax/quests/HydrationQuest.tsx

"use client";

import { useState } from "react";
import { Quest } from "@/lib/carbonmax/types";
import { cn } from "@/lib/utils";
import { MapPin, Droplets, Lightbulb, Star } from "lucide-react";

interface HydrationQuestProps {
  quest: Quest;
  onComplete: (points: number, bonus: boolean, extraData?: Record<string, any>) => void;
}

const REFILL_STATIONS = [
  {
    id: "gate-f30",
    name: "Gate F30 Station",
    location: "Terminal 3, Departure",
    walkTime: "2 min",
    isRecommended: true,
    note: "Near your gate!",
  },
  {
    id: "transit-lounge",
    name: "Transit Lounge Station",
    location: "Terminal 3, Level 2",
    walkTime: "5 min",
    isRecommended: false,
    note: null,
  },
  {
    id: "food-court",
    name: "Food Court Station",
    location: "Terminal 2, B2",
    walkTime: "8 min",
    isRecommended: false,
    note: null,
  },
];

export function HydrationQuest({ quest, onComplete }: HydrationQuestProps) {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [foundStation, setFoundStation] = useState(false);
  const [filledBottle, setFilledBottle] = useState(false);

  const isGateStation = selectedStation === "gate-f30";
  const bonusEligible = isGateStation && filledBottle;
  const totalPoints = quest.basePoints + (bonusEligible && quest.bonusPoints ? quest.bonusPoints : 0);
  const canComplete = filledBottle;

  const handleComplete = () => {
    onComplete(totalPoints, bonusEligible, {
      stationId: selectedStation,
      plasticSaved: 12, // grams
      co2Avoided: 0.1, // kg
    });
  };

  return (
    <div className="space-y-6">
      {/* Station Selection */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Find a Refill Station</h3>
        <p className="text-sm text-gray-500 mb-4">
          Changi has 50+ free water refill stations across all terminals
        </p>

        <div className="space-y-3">
          {REFILL_STATIONS.map((station) => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all relative",
                selectedStation === station.id
                  ? "border-eco-leaf bg-eco-lime/10"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              {station.isRecommended && (
                <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" />
                  RECOMMENDED
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-mode-transit" />
                    {station.name}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{station.location}</p>
                  {station.note && (
                    <p className="text-sm text-eco-leaf font-medium mt-1">⭐ {station.note}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {station.walkTime}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quest Objectives */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Quest Objectives</h3>
        <div className="space-y-3">
          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
              !selectedStation && "opacity-50 cursor-not-allowed",
              foundStation ? "border-eco-leaf bg-eco-lime/10" : "border-gray-200 bg-white"
            )}
          >
            <input
              type="checkbox"
              checked={foundStation}
              onChange={(e) => setFoundStation(e.target.checked)}
              disabled={!selectedStation}
              className="w-5 h-5 rounded border-gray-300 text-eco-leaf focus:ring-eco-leaf"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-900">I found the station</span>
              <p className="text-sm text-gray-500">Navigate to the refill point</p>
            </div>
          </label>

          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
              !foundStation && "opacity-50 cursor-not-allowed",
              filledBottle ? "border-eco-leaf bg-eco-lime/10" : "border-gray-200 bg-white"
            )}
          >
            <input
              type="checkbox"
              checked={filledBottle}
              onChange={(e) => setFilledBottle(e.target.checked)}
              disabled={!foundStation}
              className="w-5 h-5 rounded border-gray-300 text-eco-leaf focus:ring-eco-leaf"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-900">I refilled my bottle</span>
              <p className="text-sm text-gray-500">Complete the refill</p>
            </div>
            <span className="text-sm text-eco-leaf font-medium">+{quest.basePoints} pts</span>
          </label>
        </div>
      </div>

      {/* Bonus Indicator */}
      {isGateStation && (
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <p className="text-sm text-amber-800 font-medium">
            🎁 Gate station selected! +{quest.bonusPoints} bonus pts on completion
          </p>
        </div>
      )}

      {/* Your Impact */}
      <div className="bg-mode-transit-accent rounded-xl p-4">
        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-xl">🍶</span> Your Impact
        </h4>
        <p className="text-sm text-gray-700">Each refill saves:</p>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>• 1 plastic bottle (12g plastic)</li>
          <li>• 100g CO₂ from production & transport</li>
        </ul>
      </div>

      {/* Max's Tip */}
      <div className="bg-eco-lime/20 rounded-xl p-4">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-eco-leaf flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-eco-forest text-sm">Max's Tip</p>
            <p className="text-sm text-gray-700 mt-1">
              Fill up right before boarding. Changi's water is filtered and perfectly safe!
            </p>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={!canComplete}
        className={cn(
          "w-full py-4 rounded-xl font-semibold text-white transition-all",
          canComplete
            ? "bg-eco-leaf hover:bg-eco-forest"
            : "bg-gray-300 cursor-not-allowed"
        )}
      >
        {canComplete ? `Complete Quest (+${totalPoints} pts)` : "Complete objectives to finish"}
      </button>
    </div>
  );
}
```

---

### Step 7.4: Quest Complete Celebration

**Cursor Prompt 7.4:**

```
Create the Quest Completion celebration modal.

File: components/carbonmax/QuestComplete.tsx

"use client";

import { Quest } from "@/lib/carbonmax/types";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { X, Share2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestCompleteProps {
  isOpen: boolean;
  quest: Quest;
  pointsEarned: number;
  bonusEarned: boolean;
  extraData?: Record<string, any>;
  onClose: () => void;
}

export function QuestComplete({
  isOpen,
  quest,
  pointsEarned,
  bonusEarned,
  extraData,
  onClose,
}: QuestCompleteProps) {
  const { tierProgress } = useQuestProgress();

  if (!isOpen) return null;

  const basePoints = quest.basePoints;
  const bonusPoints = bonusEarned ? (quest.bonusPoints || 0) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-eco-leaf to-eco-forest p-6 text-center text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="text-6xl mb-3"
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold">Quest Complete!</h2>
              <p className="text-white/80 mt-1">{quest.title}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Points Breakdown */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base points</span>
                    <span className="font-medium">+{basePoints}</span>
                  </div>
                  {bonusEarned && (
                    <div className="flex justify-between text-amber-600">
                      <span>Bonus!</span>
                      <span className="font-medium">+{bonusPoints}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total earned</span>
                    <span className="font-bold text-eco-leaf text-lg">+{pointsEarned} pts</span>
                  </div>
                </div>
              </div>

              {/* Impact */}
              {extraData?.co2Avoided && extraData.co2Avoided > 0 && (
                <div className="bg-eco-lime/30 rounded-xl p-4 text-center">
                  <p className="text-sm text-eco-forest">
                    🌍 You avoided{" "}
                    <span className="font-bold">{extraData.co2Avoided} kg CO₂</span>
                  </p>
                </div>
              )}

              {/* Tier Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">Tier Progress</span>
                  <span className="font-medium">
                    {tierProgress.currentTier.icon} {tierProgress.currentTier.name}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${tierProgress.progressPercent}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-eco-leaf to-eco-mint"
                  />
                </div>
                {tierProgress.nextTier && (
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {tierProgress.pointsToNextTier} pts to {tierProgress.nextTier.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // TODO: Implement share
                    alert("Share feature coming soon!");
                  }}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-eco-leaf text-white rounded-xl font-medium hover:bg-eco-forest transition-colors flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

---

### Step 7.5: Quest Detail Page

**Cursor Prompt 7.5:**

```
Create the dynamic quest detail page that renders the appropriate quest component.

File: app/carbonmax/quest/[id]/page.tsx

"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useJourneyMode } from "@/hooks/useJourneyMode";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Quest } from "@/lib/carbonmax/types";
import { GreenPlateQuest } from "@/components/carbonmax/quests/GreenPlateQuest";
import { GreenFlightQuest } from "@/components/carbonmax/quests/GreenFlightQuest";
import { HydrationQuest } from "@/components/carbonmax/quests/HydrationQuest";
import { QuestComplete } from "@/components/carbonmax/QuestComplete";
import { ArrowLeft, Clock, Lightbulb } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import questsData from "@/data/quests.json";

export default function QuestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const questId = params.id as string;

  const { mode } = useJourneyMode();
  const { isQuestCompleted, completeQuest } = useQuestProgress();

  const [showCelebration, setShowCelebration] = useState(false);
  const [completionData, setCompletionData] = useState<{
    points: number;
    bonus: boolean;
    extraData?: Record<string, any>;
  } | null>(null);

  // Find the quest
  const quest = (questsData.quests as Quest[]).find((q) => q.id === questId);

  if (!quest) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Quest not found</p>
          <Link href="/carbonmax" className="text-eco-leaf font-medium">
            Back to Quest Hub
          </Link>
        </div>
      </div>
    );
  }

  const alreadyCompleted = isQuestCompleted(quest.id);

  // Mode-specific colors
  const modeColors = {
    jewel: { bg: "bg-mode-jewel-bg", accent: "bg-mode-jewel", text: "text-mode-jewel-dark" },
    departure: { bg: "bg-mode-departure-bg", accent: "bg-mode-departure", text: "text-mode-departure" },
    transit: { bg: "bg-mode-transit-bg", accent: "bg-mode-transit", text: "text-mode-transit" },
  };

  const colors = modeColors[quest.mode];

  const handleComplete = (points: number, bonus: boolean, extraData?: Record<string, any>) => {
    completeQuest(quest.id, points, bonus, extraData);
    setCompletionData({ points, bonus, extraData });
    setShowCelebration(true);
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    router.push("/carbonmax");
  };

  const renderQuestContent = () => {
    if (alreadyCompleted) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Quest Completed!</h3>
          <p className="text-gray-500 mb-6">You've already finished this quest.</p>
          <Link
            href="/carbonmax"
            className="inline-flex items-center gap-2 px-6 py-3 bg-eco-leaf text-white rounded-xl font-medium hover:bg-eco-forest transition-colors"
          >
            Back to Quests
          </Link>
        </div>
      );
    }

    switch (quest.id) {
      case "jewel-green-plate":
        return <GreenPlateQuest quest={quest} onComplete={handleComplete} />;
      case "departure-green-flight":
        return <GreenFlightQuest quest={quest} onComplete={handleComplete} />;
      case "transit-hydration":
        return <HydrationQuest quest={quest} onComplete={handleComplete} />;
      default:
        return <div className="text-center py-8 text-gray-500">Quest content not available</div>;
    }
  };

  return (
    <div className={cn("min-h-screen", colors.bg)}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/carbonmax" className="flex items-center gap-2 text-gray-600">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-sm font-medium text-white",
                colors.accent
              )}
              style={{
                backgroundColor:
                  quest.mode === "jewel"
                    ? "#F5A623"
                    : quest.mode === "departure"
                    ? "#1E3A8A"
                    : "#0D9488",
              }}
            >
              {quest.mode.charAt(0).toUpperCase() + quest.mode.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Quest Header */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-4">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{quest.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900">{quest.title}</h1>
          <p className="text-gray-500 mt-2">{quest.description}</p>

          {/* Meta */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="points-badge text-base">
              +{quest.basePoints} pts
            </span>
            {quest.bonusPoints && (
              <span className="text-sm text-amber-600">
                Up to +{quest.basePoints + quest.bonusPoints}
              </span>
            )}
            {quest.estimatedTime && (
              <span className="text-sm text-gray-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {quest.estimatedTime}
              </span>
            )}
          </div>
        </div>

        {/* Carbon Fact */}
        <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100">
          <div className="flex gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 text-sm">Carbon Fact</p>
              <p className="text-sm text-gray-600 mt-1">{quest.carbonFact}</p>
            </div>
          </div>
        </div>

        {/* Quest-Specific Content */}
        {renderQuestContent()}
      </div>

      {/* Celebration Modal */}
      {completionData && (
        <QuestComplete
          isOpen={showCelebration}
          quest={quest}
          pointsEarned={completionData.points}
          bonusEarned={completionData.bonus}
          extraData={completionData.extraData}
          onClose={handleCloseCelebration}
        />
      )}
    </div>
  );
}
```

---

## 8. Homepage & Entry Point

### Step 8.1: CarbonMax Banner

**Cursor Prompt 8.1:**

```
Create the CarbonMax promotional banner for the homepage.

File: components/carbonmax/CarbonMaxBanner.tsx

"use client";

import Link from "next/link";
import { useQuestProgress } from "@/hooks/useQuestProgress";
import { Leaf, ChevronRight, Sparkles } from "lucide-react";

export function CarbonMaxBanner() {
  // Note: This will only work inside QuestProgressProvider
  // If used outside, we'll show default values
  let totalPoints = 0;
  
  try {
    const progress = useQuestProgress();
    totalPoints = progress.totalPoints;
  } catch {
    // Not inside provider, use default
  }

  return (
    <Link href="/carbonmax" className="block">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-eco-leaf via-eco-forest to-eco-sage p-6 text-white shadow-lg">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        {/* Floating icons */}
        <div className="absolute top-4 right-4 text-3xl animate-bounce">🌿</div>
        <div className="absolute bottom-4 right-12 text-2xl opacity-60">✈️</div>

        {/* Content */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-sm font-medium text-white/80">NEW</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">
            WELCOME TO CARBONMAX
          </h2>
          <p className="text-white/80 text-sm mb-4">
            Complete green quests, earn rewards,<br />and track your impact!
          </p>

          {/* Points badge */}
          {totalPoints > 0 && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
              <Leaf className="w-4 h-4" />
              <span className="font-semibold">{totalPoints} Eco-Points</span>
            </div>
          )}

          {/* CTA Button */}
          <div className="flex items-center gap-2 bg-white text-eco-forest rounded-xl px-4 py-3 font-semibold w-fit hover:bg-white/90 transition-colors">
            <span>🌱 Start Your Green Journey</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
```

---

### Step 8.2: Homepage

**Cursor Prompt 8.2:**

```
Create the main homepage that simulates the Changi App with the CarbonMax banner.

File: app/page.tsx

import { CarbonMaxBanner } from "@/components/carbonmax/CarbonMaxBanner";
import { QuestProgressProvider } from "@/hooks/useQuestProgress";
import { Search, Star, MapPin, Plane, ShoppingBag, User } from "lucide-react";

export default function HomePage() {
  return (
    <QuestProgressProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Simulated Changi App */}
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
          {/* Status Bar Placeholder */}
          <div className="bg-changi-navy text-white px-4 py-2 text-xs flex justify-between items-center">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-changi-navy px-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-lg px-4 py-2.5 flex items-center gap-2">
                <Search className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-sm">Search flights, food, shops, facilities</span>
              </div>
              <button className="p-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 py-4 space-y-4">
            {/* CarbonMax Banner - THE MAIN FEATURE */}
            <CarbonMaxBanner />

            {/* User Greeting (simulated) */}
            <div className="bg-gradient-to-r from-changi-purple to-changi-navy rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Hi Traveller</p>
                  <p className="font-bold">340 pts</p>
                </div>
                <button className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium">
                  🎁 Rewards Card
                </button>
              </div>
            </div>

            {/* Quick Actions Grid (simulated Changi App features) */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: "🎉", label: "Celebrate" },
                { icon: "🏷️", label: "Deals" },
                { icon: "🛍️", label: "Duty-Free" },
                { icon: "🅿️", label: "Parking" },
                { icon: "📍", label: "Map" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-1 p-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: "✈️", label: "Flights" },
                { icon: "🛡️", label: "Insurance" },
                { icon: "🏨", label: "Hotels" },
                { icon: "📱", label: "E-SIM" },
                { icon: "⋯", label: "View All" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-1 p-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b">
              <button className="pb-2 border-b-2 border-changi-purple text-changi-purple font-medium text-sm">
                All
              </button>
              <button className="pb-2 text-gray-400 text-sm">
                Celebrate with Changi
              </button>
              <button className="pb-2 text-gray-400 text-sm">
                Experiences
              </button>
            </div>

            {/* Discover Section (placeholder) */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4">
              <h3 className="font-bold text-gray-900 mb-1">Discover & Book</h3>
              <p className="text-sm text-gray-600">
                The best things you can do to make the most out of your day.
              </p>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
            <div className="flex justify-around py-2">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: "Explore", active: true },
                { icon: <Plane className="w-5 h-5" />, label: "Fly", active: false },
                { icon: <span className="text-lg">💳</span>, label: "Pay", active: false },
                { icon: <ShoppingBag className="w-5 h-5" />, label: "Dine & Shop", active: false },
                { icon: <User className="w-5 h-5" />, label: "Account", active: false },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                    item.active ? "text-changi-purple" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center pb-1">
              <div className="w-32 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </QuestProgressProvider>
  );
}
```

---

## 9. Ask Max Chat

### Step 9.1: Simple Chat Page

**Cursor Prompt 9.1:**

```
Create a simple Ask Max chat page with hardcoded responses.

File: app/carbonmax/chat/page.tsx

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Leaf } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE = `Hi! I'm Max, your sustainability guide. 🌿

I can help you:
• Find the best quests for you
• Explain carbon facts
• Suggest green merchants nearby

What would you like to know?`;

const QUICK_QUESTIONS = [
  "Which quest should I do first?",
  "How does SAF work?",
  "Find me a green restaurant",
];

function getResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("quest") || lower.includes("first") || lower.includes("start")) {
    return `Great question! Based on your journey, I recommend starting with **"Green Your Flight"** in Departure mode! 🛫

It's worth **150 base points**, and if you contribute SAF, you can earn up to **350 points total**.

Plus, you'll learn about Sustainable Aviation Fuel - Singapore is mandating 1% SAF from 2026!

[Go to Quest Hub →](/carbonmax)`;
  }

  if (lower.includes("saf") || lower.includes("sustainable aviation") || lower.includes("fuel")) {
    return `**SAF (Sustainable Aviation Fuel)** is amazing! Here's what you need to know: ✈️🌿

• Made from **waste oils, agricultural residue**, or even captured CO2
• Reduces lifecycle emissions by **up to 80%**
• Works in existing aircraft - no modifications needed
• Singapore will require **1% SAF from 2026**

When you contribute to SAF through CarbonMax, you're helping airlines accelerate the transition. Your contribution is verified through the **Book-and-Claim** system.

Want to make a SAF contribution now?`;
  }

  if (lower.includes("restaurant") || lower.includes("food") || lower.includes("eat") || lower.includes("dining")) {
    return `For green dining, I have some great recommendations! 🥗

**Top Picks (Carbon A+ rated):**

1. **Cedele** - Jewel, #01-234
   Healthy café with amazing plant-based options
   
2. **Pho Street** - Terminal 3, #02-156
   Vietnamese with delicious veggie pho
   
3. **The Soup Spoon** - Jewel, #B2-045
   Sustainable soups and salads

💡 **Tip:** Ordering plant-based earns you **+40 bonus points** on the Green Plate quest!

Would you like directions to any of these?`;
  }

  if (lower.includes("point") || lower.includes("tier") || lower.includes("reward")) {
    return `Let me explain the **Green Tier** system! 🌱

**How to earn Eco-Points:**
• Complete quests (30-350 pts each)
• Bonus points for sustainable choices
• Higher tiers = point multipliers

**Tier Levels:**
🌱 Seedling: 0-499 pts
🌿 Sprout: 500-1,499 pts (10% bonus)
🌳 Tree: 1,500-3,999 pts (15% bonus)
🌲 Forest: 4,000-9,999 pts (20% bonus)
🏔️ Canopy: 10,000+ pts (25% bonus)

Each tier unlocks exclusive perks like lounge access and merchant deals!`;
  }

  if (lower.includes("plastic") || lower.includes("bottle") || lower.includes("water") || lower.includes("refill")) {
    return `Great eco-thinking! 💧

Changi has **50+ free water refill stations** across all terminals. Each refill saves:
• 12g of plastic
• 100g of CO2 from production

Try the **Hydration Station** quest in Transit mode to earn **30-50 points**!

The stations near boarding gates give you bonus points. 🎁`;
  }

  // Default response
  return `That's a great question! 🤔

For now, I'd suggest exploring the quests in your current mode. Each one teaches you something new about sustainable travel.

**Quick suggestions:**
• 🟡 **Jewel mode**: Try the Green Plate Discovery
• 🔵 **Departure mode**: Green Your Flight with SAF
• 🩵 **Transit mode**: Quick Hydration Station quest

Is there something specific about sustainability or carbon reduction you'd like to know?`;
}

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add assistant response
    const response = getResponse(messageText);
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: response,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    handleSend(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/carbonmax" className="text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-eco-leaf rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">Ask Max</h1>
                <p className="text-xs text-gray-500">Your sustainability guide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-eco-leaf text-white"
                    : "bg-white border border-gray-200"
                )}
              >
                <p
                  className={cn(
                    "text-sm whitespace-pre-wrap",
                    message.role === "user" ? "text-white" : "text-gray-700"
                  )}
                  dangerouslySetInnerHTML={{
                    __html: message.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="max-w-md mx-auto px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Max anything..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-eco-leaf focus:border-transparent"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-eco-leaf text-white rounded-full flex items-center justify-center hover:bg-eco-forest transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 10. Impact Page

### Step 10.1: Full Impact Story Page

**Cursor Prompt 10.1:**

```
Create the full Impact Story page.

File: app/carbonmax/impact/page.tsx

"use client";

import { useQuestProgress } from "@/hooks/useQuestProgress";
import { ArrowLeft, Share2, TreePine, Droplets, Plane, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ImpactPage() {
  const { userImpact, completedQuests, tierProgress } = useQuestProgress();

  const impactStats = [
    {
      icon: <TreePine className="w-6 h-6" />,
      value: `${userImpact.co2Avoided.toFixed(1)} kg`,
      label: "CO₂ Avoided",
      color: "text-eco-leaf",
      bgColor: "bg-eco-lime/30",
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      value: `${userImpact.plasticSaved}g`,
      label: "Plastic Saved",
      color: "text-mode-transit",
      bgColor: "bg-mode-transit-accent",
    },
    {
      icon: <Plane className="w-6 h-6" />,
      value: completedQuests.length.toString(),
      label: "Quests Done",
      color: "text-mode-departure",
      bgColor: "bg-mode-departure-accent",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      value: userImpact.totalPointsEarned.toLocaleString(),
      label: "Eco-Points",
      color: "text-mode-jewel-dark",
      bgColor: "bg-mode-jewel-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-leaf to-eco-forest">
      {/* Header */}
      <div className="sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/carbonmax" className="flex items-center gap-2 text-white/80">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </Link>
            <button className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-md mx-auto px-4 pt-8 pb-12 text-center text-white">
        <div className="text-6xl mb-4">🌍</div>
        <h1 className="text-3xl font-bold mb-2">Your Impact Story</h1>
        <p className="text-white/80">
          Every action counts. Here's what you've achieved.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-t-3xl pt-8 pb-4 px-4 -mt-4">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-4 text-center`}
              >
                <div className={`${stat.color} flex justify-center mb-2`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tree Equivalent */}
          {userImpact.treesEquivalent > 0 && (
            <div className="bg-eco-lime/30 rounded-2xl p-6 text-center mb-8">
              <div className="text-4xl mb-3">🌳</div>
              <p className="text-gray-900">
                Your impact equals{" "}
                <span className="font-bold text-eco-forest text-2xl">
                  {userImpact.treesEquivalent.toFixed(1)}
                </span>{" "}
                trees
              </p>
              <p className="text-sm text-gray-600 mt-1">
                absorbing CO₂ for an entire year
              </p>
            </div>
          )}

          {/* Current Tier */}
          <div className="border border-gray-200 rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{tierProgress.currentTier.icon}</span>
                <div>
                  <div className="font-bold text-gray-900">
                    {tierProgress.currentTier.name}
                  </div>
                  <div className="text-sm text-gray-500">Current Tier</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-eco-leaf">
                  {tierProgress.totalPoints.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">Eco-Points</div>
              </div>
            </div>

            {tierProgress.nextTier && (
              <>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-eco-leaf to-eco-mint transition-all duration-500"
                    style={{ width: `${tierProgress.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {tierProgress.pointsToNextTier} pts to{" "}
                  {tierProgress.nextTier.icon} {tierProgress.nextTier.name}
                </p>
              </>
            )}
          </div>

          {/* Empty State */}
          {userImpact.questsCompleted === 0 && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-bold text-gray-900 mb-2">Start Your Journey</h3>
              <p className="text-gray-500 mb-6">
                Complete your first quest to begin building your impact story!
              </p>
              <Link
                href="/carbonmax"
                className="inline-flex items-center gap-2 px-6 py-3 bg-eco-leaf text-white rounded-xl font-medium"
              >
                Explore Quests
              </Link>
            </div>
          )}

          {/* Motivational Footer */}
          {userImpact.questsCompleted > 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm">
                "Every small action adds up to big change." 🌿
              </p>
            </div>
          )}

          {/* Spacer for safe area */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
```

---

## 11. Final Setup

### Step 11.1: Root Layout

**Cursor Prompt 11.1:**

```
Update the root layout to set up fonts and basic structure.

File: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarbonMax - Changi Airport",
  description: "Complete green quests, earn rewards, and track your impact at Changi Airport",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

---

## 12. Run & Test

### Step 12.1: Start Development Server

**Run in terminal:**

```bash
npm run dev
```

### Step 12.2: Test the Flow

1. Open `http://localhost:3000`
2. See the Changi App simulation with CarbonMax banner
3. Tap the banner to enter Quest Hub
4. Switch between Jewel / Departure / Transit modes
5. Tap a quest to see the detail page
6. Complete objectives and see celebration
7. Check My Impact section
8. Try Ask Max chat

---

## Troubleshooting

### Common Issues:

1. **Module not found**: Make sure all files are created in the correct paths

2. **Hydration errors**: The hooks use localStorage, which causes hydration mismatches. The `isHydrated` pattern handles this.

3. **Tailwind colors not working**: Run `npm run dev` again after updating `tailwind.config.ts`

4. **Type errors**: Make sure `data/*.json` files are valid JSON

---

## Next Steps (After MVP Works)

1. Add more quests per mode
2. Connect Ask Max to Claude API
3. Add streak mechanics
4. Build merchant discovery map
5. Add Operations Dashboard
6. Implement real SAF calculation

---

**Total Files to Create: ~25**
**Estimated Build Time: 3-4 hours following prompts**