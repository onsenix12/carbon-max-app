"use client";

import { useState } from "react";
import { Quest, Merchant, QuestExtraData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Check, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";

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
  onComplete: (points: number, bonus: boolean, extraData?: QuestExtraData) => void;
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
        <h3 className="font-display font-semibold text-foreground mb-3">Choose a Green Restaurant</h3>
        <div className="space-y-3">
          {RESTAURANTS.map((restaurant) => (
            <GlassCard
              onClick={() => setSelectedRestaurant(restaurant.id)}
              className={cn(
                "w-full text-left p-4 cursor-pointer transition-all",
                selectedRestaurant === restaurant.id
                  ? "ring-2 ring-[#10B981] bg-[#10B981]/10"
                  : "hover:glass-strong"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{restaurant.name}</span>
                    <span
                      className={cn(
                        "rating-badge",
                        restaurant.carbonRating === "A+" ? "rating-a-plus" : "rating-a"
                      )}
                    >
                      {restaurant.carbonRating}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{restaurant.category}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {restaurant.terminal} • {restaurant.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {restaurant.walkTime}
                </div>
              </div>
              {selectedRestaurant === restaurant.id && (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm text-foreground">{restaurant.description}</p>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Quest Objectives */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-3">Quest Objectives</h3>
        <div className="space-y-3">
          <GlassCard
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer transition-all",
              !selectedRestaurant && "opacity-50 cursor-not-allowed",
              atRestaurant && "ring-2 ring-[#10B981] bg-[#10B981]/10"
            )}
          >
            <label className="flex items-center gap-3 flex-1 cursor-pointer">
            <input
              type="checkbox"
              checked={atRestaurant}
              onChange={(e) => setAtRestaurant(e.target.checked)}
              disabled={!selectedRestaurant}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <span className="font-medium text-foreground">I'm at the restaurant</span>
              <p className="text-sm text-muted-foreground">Check in when you arrive</p>
            </div>
            <span className="text-sm text-[#10B981] font-medium">+{quest.basePoints} pts</span>
            </label>
          </GlassCard>

          <GlassCard
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer transition-all",
              !atRestaurant && "opacity-50 cursor-not-allowed",
              orderedPlantBased && "ring-2 ring-[#10B981] bg-[#10B981]/10"
            )}
          >
            <label className="flex items-center gap-3 flex-1 cursor-pointer">
            <input
              type="checkbox"
              checked={orderedPlantBased}
              onChange={(e) => setOrderedPlantBased(e.target.checked)}
              disabled={!atRestaurant}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <span className="font-medium text-foreground">I ordered plant-based</span>
              <p className="text-sm text-muted-foreground">Bonus for sustainable choice!</p>
            </div>
            <span className="text-sm text-[#F59E0B] font-medium">+{quest.bonusPoints} bonus</span>
            </label>
          </GlassCard>
        </div>
      </div>

      {/* Max's Tip */}
      <GlassCard className="p-4 bg-[#10B981]/10">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#10B981] text-sm">Max's Tip</p>
            <p className="text-sm text-foreground mt-1">
              Ask for the plant-based options — most green restaurants have great ones that taste amazing!
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Complete Button */}
      <Button
        onClick={handleComplete}
        disabled={!canComplete}
        variant="primary"
        className="w-full"
      >
        {canComplete ? `Complete Quest (+${totalPoints} pts)` : "Complete objectives to finish"}
      </Button>
    </div>
  );
}

