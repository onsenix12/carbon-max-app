import { ModeConfig, GreenTier } from "./types";

export const MODE_CONFIGS: Record<string, ModeConfig> = {
  jewel: {
    id: "jewel",
    name: "Jewel",
    icon: "🟡",
    tagline: "Discover Green Treasures",
    color: "accent-gold",
    bgColor: "mode-jewel-bg",
  },
  departure: {
    id: "departure",
    name: "Departure",
    icon: "🔵",
    tagline: "Leave Lighter",
    color: "secondary",
    bgColor: "mode-departure-bg",
  },
  transit: {
    id: "transit",
    name: "Transit",
    icon: "🟢",
    tagline: "Green While You Wait",
    color: "primary",
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
    id: "sapling",
    name: "Sapling",
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

