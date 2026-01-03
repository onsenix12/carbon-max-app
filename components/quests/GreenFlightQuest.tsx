"use client";

import { useState } from "react";
import { Quest } from "@/lib/types";
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
        <h3 className="font-display font-semibold text-gray-900 mb-4">Your Flight</h3>
        
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
            <h3 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
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
            <h3 className="font-display font-semibold text-gray-900 mb-3 flex items-center gap-2">
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

