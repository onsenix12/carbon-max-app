"use client";

import { useState } from "react";
import { Quest } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Plane, Leaf, Info, Check, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";

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
      <GlassCard className="p-4">
        <h3 className="font-display font-semibold text-foreground mb-4">Your Flight</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{FLIGHT_DATA.origin}</div>
            <div className="text-sm text-muted-foreground">{FLIGHT_DATA.originCity}</div>
          </div>
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="h-px bg-border flex-1" />
            <Plane className="w-5 h-5 text-muted-foreground mx-2" />
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{FLIGHT_DATA.destination}</div>
            <div className="text-sm text-muted-foreground">{FLIGHT_DATA.destinationCity}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-muted-foreground">Distance</div>
            <div className="font-medium">{FLIGHT_DATA.distance.toLocaleString()} km</div>
          </div>
          <div>
            <div className="text-muted-foreground">Aircraft</div>
            <div className="font-medium">{FLIGHT_DATA.aircraft}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Efficiency</div>
            <div className="font-medium text-rating-a">⭐ {FLIGHT_DATA.efficiency}</div>
          </div>
        </div>
      </GlassCard>

      {/* Calculate Button or Results */}
      {!calculated ? (
        <Button
          onClick={handleCalculate}
          disabled={calculating}
          variant="primary"
          className="w-full"
        >
          {calculating ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Calculating...
            </span>
          ) : (
            "Calculate My Emissions"
          )}
        </Button>
      ) : (
        <>
          {/* Emissions Results */}
          <GlassCard className="p-4 bg-[#F59E0B]/10">
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Emissions Calculated
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base emissions</span>
                <span className="font-medium">{FLIGHT_DATA.baseEmissions} kg CO₂e</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-1">
                  + Radiative forcing
                  <Info className="w-4 h-4 text-muted-foreground" />
                </span>
                <span className="font-medium">+{FLIGHT_DATA.withRF - FLIGHT_DATA.baseEmissions} kg</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F59E0B]/20">
                <span className="font-semibold text-foreground">Total impact</span>
                <span className="font-bold text-[#F59E0B]">{FLIGHT_DATA.withRF} kg CO₂e</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#F59E0B]/20">
              <p className="text-sm text-[#F59E0B]">
                💡 That's like charging your phone <strong>193,000 times</strong>
              </p>
            </div>
          </GlassCard>

          {/* SAF Options */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              Reduce with SAF
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sustainable Aviation Fuel reduces lifecycle emissions by up to 80%
            </p>

            <div className="space-y-3">
              {SAF_OPTIONS.map((option) => (
                <GlassCard
                  key={option.percent}
                  onClick={() => setSelectedSAF(option.percent)}
                  className={cn(
                    "w-full text-left p-4 cursor-pointer transition-all",
                    selectedSAF === option.percent
                      ? "ring-2 ring-[#10B981] bg-[#10B981]/10"
                      : "hover:glass-strong"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">
                        {option.percent === 0 ? "No SAF" : `${option.percent}% SAF Coverage`}
                      </div>
                      {option.percent > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          S${option.price} • Covers {option.co2Avoided} kg CO₂e
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {option.bonusPoints > 0 ? (
                        <span className="text-[#10B981] font-semibold">+{option.bonusPoints} bonus</span>
                      ) : (
                        <span className="text-muted-foreground">No bonus</span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Singapore Mandate Info */}
          <GlassCard className="p-4 bg-[#3B82F6]/10">
            <div className="flex gap-3">
              <span className="text-2xl">🇸🇬</span>
              <div>
                <p className="font-medium text-[#3B82F6] text-sm">Singapore SAF Mandate</p>
                <p className="text-sm text-[#3B82F6] mt-1">
                  Singapore requires 1% SAF from 2026, rising to 3-5% by 2030. You're ahead of the curve!
                </p>
              </div>
            </div>
          </GlassCard>
        </>
      )}

      {/* Complete Button */}
      <Button
        onClick={handleComplete}
        disabled={!canComplete}
        variant="primary"
        className="w-full"
      >
        {canComplete
          ? `Complete Quest (+${totalPoints} pts)`
          : "Calculate emissions to continue"}
      </Button>
    </div>
  );
}

