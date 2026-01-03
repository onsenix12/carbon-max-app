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

