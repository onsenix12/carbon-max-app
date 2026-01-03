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

