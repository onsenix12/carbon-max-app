"use client";

import { useState } from "react";
import { Quest } from "@/lib/types";
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
        <h3 className="font-display font-semibold text-foreground mb-2">Find a Refill Station</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Changi has 50+ free water refill stations across all terminals
        </p>

        <div className="space-y-3">
          {REFILL_STATIONS.map((station) => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station.id)}
              className={cn(
                "w-full text-left p-4 rounded-md border-2 transition-all relative",
                selectedStation === station.id
                  ? "border-primary bg-success-light"
                  : "border-border bg-white hover:border-border-strong"
              )}
            >
              {station.isRecommended && (
                <div className="absolute -top-2 -right-2 bg-warning text-warning-dark text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" />
                  RECOMMENDED
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-primary" />
                    {station.name}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{station.location}</p>
                  {station.note && (
                    <p className="text-sm text-primary font-medium mt-1">⭐ {station.note}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
        <h3 className="font-display font-semibold text-foreground mb-3">Quest Objectives</h3>
        <div className="space-y-3">
          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-md border transition-all cursor-pointer",
              !selectedStation && "opacity-50 cursor-not-allowed",
              foundStation ? "border-primary bg-success-light" : "border-border bg-white"
            )}
          >
            <input
              type="checkbox"
              checked={foundStation}
              onChange={(e) => setFoundStation(e.target.checked)}
              disabled={!selectedStation}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <span className="font-medium text-foreground">I found the station</span>
              <p className="text-sm text-muted-foreground">Navigate to the refill point</p>
            </div>
          </label>

          <label
            className={cn(
              "flex items-center gap-3 p-4 rounded-md border transition-all cursor-pointer",
              !foundStation && "opacity-50 cursor-not-allowed",
              filledBottle ? "border-primary bg-success-light" : "border-border bg-white"
            )}
          >
            <input
              type="checkbox"
              checked={filledBottle}
              onChange={(e) => setFilledBottle(e.target.checked)}
              disabled={!foundStation}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <span className="font-medium text-foreground">I refilled my bottle</span>
              <p className="text-sm text-muted-foreground">Complete the refill</p>
            </div>
            <span className="text-sm text-primary font-medium">+{quest.basePoints} pts</span>
          </label>
        </div>
      </div>

      {/* Bonus Indicator */}
      {isGateStation && (
        <div className="bg-warning-light rounded-md p-4 border border-warning/20">
          <p className="text-sm text-warning-dark font-medium">
            🎁 Gate station selected! +{quest.bonusPoints} bonus pts on completion
          </p>
        </div>
      )}

      {/* Your Impact */}
      <div className="bg-mode-transit-accent rounded-md p-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
          <span className="text-xl">🍶</span> Your Impact
        </h4>
        <p className="text-sm text-foreground">Each refill saves:</p>
        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
          <li>• 1 plastic bottle (12g plastic)</li>
          <li>• 100g CO₂ from production & transport</li>
        </ul>
      </div>

      {/* Max's Tip */}
      <div className="bg-success-light rounded-md p-4">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-success-dark text-sm">Max's Tip</p>
            <p className="text-sm text-foreground mt-1">
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
          "w-full py-4 rounded-lg font-semibold text-white transition-all",
          canComplete
            ? "btn-primary"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        )}
      >
        {canComplete ? `Complete Quest (+${totalPoints} pts)` : "Complete objectives to finish"}
      </button>
    </div>
  );
}

