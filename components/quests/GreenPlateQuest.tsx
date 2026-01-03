"use client";

import { useState } from "react";
import { Quest, Merchant } from "@/lib/types";
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

