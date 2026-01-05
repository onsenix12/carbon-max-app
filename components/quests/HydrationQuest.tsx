"use client";

import { useState, useEffect } from "react";
import { Quest, QuestExtraData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Droplets, Lightbulb, Star, Navigation, QrCode, X, Check, Zap } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { QRCodeSVG } from "qrcode.react";

interface HydrationQuestProps {
  quest: Quest;
  onComplete: (points: number, bonus: boolean, extraData?: QuestExtraData) => void;
}

// Mock user location in Transit (Terminal 3)
const USER_LOCATION = {
  terminal: "Terminal 3",
  level: "Departure Hall",
  gate: "Gate F30",
  coordinates: { x: 50, y: 50 }, // Center of map
};

// Mock member ID for Changi Airport membership
const MEMBER_ID = "CHANGI-2024-789456";

interface RefillStation {
  id: string;
  name: string;
  location: string;
  walkTime: string;
  isRecommended: boolean;
  note: string | null;
  mapCoords: { x: number; y: number };
  description?: string;
}

const REFILL_STATIONS: RefillStation[] = [
  {
    id: "gate-f30",
    name: "Gate F30 Station",
    location: "Terminal 3, Departure",
    walkTime: "2 min",
    isRecommended: true,
    note: "Near your gate!",
    mapCoords: { x: 45, y: 45 }, // Close to user
    description: "Smart water station with sensor detection. Perfect for last-minute refills before boarding.",
  },
  {
    id: "transit-lounge",
    name: "Transit Lounge Station",
    location: "Terminal 3, Level 2",
    walkTime: "5 min",
    isRecommended: false,
    note: null,
    mapCoords: { x: 70, y: 30 }, // Top right
    description: "Comfortable refill station in the transit lounge area with filtered water.",
  },
  {
    id: "food-court",
    name: "Food Court Station",
    location: "Terminal 2, B2",
    walkTime: "8 min",
    isRecommended: false,
    note: null,
    mapCoords: { x: 30, y: 70 }, // Bottom left
    description: "Convenient station near food court, great for refilling after meals.",
  },
];

// Calculate distance (simple Euclidean for demo)
function calculateDistance(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}

export function HydrationQuest({ quest, onComplete }: HydrationQuestProps) {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [foundStation, setFoundStation] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [refillStarted, setRefillStarted] = useState(false);
  const [refillProgress, setRefillProgress] = useState(0);
  const [refillComplete, setRefillComplete] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);
  const [showStationInfo, setShowStationInfo] = useState<string | null>(null);

  const isGateStation = selectedStation === "gate-f30";
  const bonusEligible = isGateStation && refillComplete;
  const totalPoints = quest.basePoints + (bonusEligible && quest.bonusPoints ? quest.bonusPoints : 0);

  const selectedStationData = REFILL_STATIONS.find((s) => s.id === selectedStation);
  const distance = selectedStationData
    ? Math.round(
        calculateDistance(USER_LOCATION.coordinates, selectedStationData.mapCoords) / 10
      )
    : null;

  // Simulate refill progress with sensor
  useEffect(() => {
    if (refillStarted && refillProgress < 100) {
      const interval = setInterval(() => {
        setRefillProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setRefillComplete(true);
            return 100;
          }
          return prev + 10; // Increment by 10% every 500ms
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [refillStarted, refillProgress]);

  // Auto-complete quest when refill is done
  useEffect(() => {
    if (refillComplete) {
      const timer = setTimeout(() => {
        const finalBonusEligible = isGateStation && refillComplete;
        const finalTotalPoints = quest.basePoints + (finalBonusEligible && quest.bonusPoints ? quest.bonusPoints : 0);
        onComplete(finalTotalPoints, finalBonusEligible, {
          stationId: selectedStation,
          plasticSaved: 12, // grams
          co2Avoided: 0.1, // kg
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [refillComplete, isGateStation, quest.basePoints, quest.bonusPoints, selectedStation, onComplete]);

  const handleShowQRCode = () => {
    setShowQRCode(true);
  };

  const handleQRScanned = () => {
    setQrScanned(true);
    setShowQRCode(false);
    // Start refill after QR is scanned
    setTimeout(() => {
      setRefillStarted(true);
    }, 500);
  };

  const handleComplete = () => {
    onComplete(totalPoints, bonusEligible, {
      stationId: selectedStation,
      plasticSaved: 12, // grams
      co2Avoided: 0.1, // kg
    });
  };

  return (
    <div className="space-y-6">
      {/* User Location */}
      <GlassCard className="p-4 bg-blue-500/10 border-blue-500/20">
        <div className="flex items-center gap-3">
          <Navigation className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium text-foreground">Your Location</p>
            <p className="text-xs text-muted-foreground">
              {USER_LOCATION.terminal} • {USER_LOCATION.level}
            </p>
            <p className="text-xs text-blue-500 mt-0.5">{USER_LOCATION.gate}</p>
          </div>
        </div>
      </GlassCard>

      {/* Map View Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Refill Station Map</h3>
        <Button
          variant="secondary"
          onClick={() => setShowMap(!showMap)}
          className="text-sm"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>

      {/* Simple Static Map */}
      {showMap && (
        <GlassCard className="p-4 relative" style={{ minHeight: "300px" }}>
          <div className="relative w-full h-[300px] bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden">
            {/* User Location (Blue dot) */}
            <div
              className="absolute z-10 cursor-pointer group"
              style={{
                left: `${USER_LOCATION.coordinates.x}%`,
                top: `${USER_LOCATION.coordinates.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-blue-500 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                You are here
              </div>
            </div>

            {/* Refill Station Locations (Blue dots) */}
            {REFILL_STATIONS.map((station) => (
              <div
                key={station.id}
                className="absolute z-10 cursor-pointer group"
                style={{
                  left: `${station.mapCoords.x}%`,
                  top: `${station.mapCoords.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => {
                  setSelectedStation(station.id);
                  setHoveredStation(station.id);
                  setShowStationInfo(station.id);
                }}
                onMouseEnter={() => setHoveredStation(station.id)}
                onMouseLeave={() => setHoveredStation(null)}
              >
                <div
                  className={cn(
                    "w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg transition-all flex items-center justify-center",
                    selectedStation === station.id && "ring-2 ring-blue-500 ring-offset-2 scale-125",
                    hoveredStation === station.id && "scale-125"
                  )}
                >
                  <Droplets className="w-3 h-3 text-white" />
                </div>
                {(hoveredStation === station.id || selectedStation === station.id) && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg min-w-[120px]">
                    {station.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Station Info Modal */}
      {showStationInfo && selectedStationData && (
        <GlassCard className="p-4 border-blue-500/20">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                {selectedStationData.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">{selectedStationData.location}</p>
            </div>
            <button
              onClick={() => setShowStationInfo(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {selectedStationData.description && (
            <p className="text-sm text-foreground mt-2">{selectedStationData.description}</p>
          )}
          {selectedStation && distance && (
            <p className="text-xs text-blue-500 mt-2">~{distance}m away</p>
          )}
        </GlassCard>
      )}

      {/* Station Selection */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-2">Find a Refill Station</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Changi has 50+ free water refill stations across all terminals
        </p>

        <div className="space-y-3">
          {REFILL_STATIONS.map((station) => {
            const dist = Math.round(
              calculateDistance(USER_LOCATION.coordinates, station.mapCoords) / 10
            );
            return (
              <GlassCard
                key={station.id}
                onClick={() => setSelectedStation(station.id)}
                className={cn(
                  "w-full text-left p-4 cursor-pointer transition-all relative",
                  selectedStation === station.id
                    ? "ring-2 ring-blue-500 bg-blue-500/10"
                    : "hover:glass-strong"
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
                      <Droplets className="w-4 h-4 text-blue-500" />
                      {station.name}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{station.location}</p>
                    {station.note && (
                      <p className="text-sm text-blue-500 font-medium mt-1">⭐ {station.note}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {station.walkTime}
                    </div>
                    {selectedStation === station.id && (
                      <span className="text-xs text-blue-500">~{dist}m away</span>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Quest Objectives */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-3">Quest Objectives</h3>
        <div className="space-y-3">
          <GlassCard
            className={cn(
              "flex items-center gap-3 p-4 cursor-pointer transition-all",
              !selectedStation && "opacity-50 cursor-not-allowed",
              foundStation && "ring-2 ring-blue-500 bg-blue-500/10"
            )}
          >
            <label className="flex items-center gap-3 flex-1 cursor-pointer">
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
          </GlassCard>
        </div>
      </div>

      {/* QR Code Section */}
      {foundStation && (
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">Scan QR Code</h3>
          <GlassCard className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Scan the QR code at the station using your Changi app to activate the smart refill system.
            </p>
            {!qrScanned ? (
              <Button
                onClick={handleShowQRCode}
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Show QR Code (Changi App)
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-[#10B981]">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">QR Code scanned! Refill activated.</span>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* Refill Progress */}
      {refillStarted && (
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">Refill in Progress</h3>
          <GlassCard className="p-4 bg-blue-500/10">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">Sensor detecting refill...</span>
                  <span className="text-blue-500 font-semibold">{refillProgress}%</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${refillProgress}%` }}
                  />
                </div>
              </div>
            </div>
            {refillComplete && (
              <div className="flex items-center gap-2 text-[#10B981] mt-2">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Refill complete! Points awarded.</span>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* Points Breakdown */}
      {refillComplete && (
        <GlassCard className="p-4 bg-[#10B981]/10">
          <h4 className="font-semibold text-foreground mb-3">Points Earned</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base points</span>
              <span className="text-foreground font-medium">+{quest.basePoints}</span>
            </div>
            {bonusEligible && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gate station bonus</span>
                <span className="text-[#F59E0B] font-medium">+{quest.bonusPoints}</span>
              </div>
            )}
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-[#10B981] text-lg">+{totalPoints}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Bonus Indicator */}
      {isGateStation && !refillComplete && (
        <GlassCard className="p-4 bg-warning/10 border-warning/20">
          <p className="text-sm text-warning-dark font-medium">
            🎁 Gate station selected! +{quest.bonusPoints} bonus pts on completion
          </p>
        </GlassCard>
      )}

      {/* Your Impact */}
      <GlassCard className="p-4 bg-blue-500/10">
        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
          <span className="text-xl">🍶</span> Your Impact
        </h4>
        <p className="text-sm text-foreground">Each refill saves:</p>
        <ul className="text-sm text-muted-foreground mt-2 space-y-1">
          <li>• 1 plastic bottle (12g plastic)</li>
          <li>• 100g CO₂ from production & transport</li>
        </ul>
      </GlassCard>

      {/* Max's Tip */}
      <GlassCard className="p-4 bg-[#10B981]/10">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[#10B981] text-sm">Max's Tip</p>
            <p className="text-sm text-foreground mt-1">
              Fill up right before boarding. Changi's water is filtered and perfectly safe! The smart sensors will automatically detect when your bottle is full.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <GlassCard className="p-6 max-w-sm w-full relative">
            <button
              onClick={() => setShowQRCode(false)}
              className="absolute top-4 right-4 p-1 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <div className="text-center">
              <h3 className="font-display font-semibold text-foreground mb-2">
                Changi Airport App
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code at the refill station
              </p>
              <div className="flex justify-center mb-4 p-4 bg-white rounded-2xl">
                <QRCodeSVG value={MEMBER_ID} size={200} level="H" />
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Member ID: {MEMBER_ID}
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                The station will activate automatically after scanning
              </p>
              <Button
                onClick={handleQRScanned}
                variant="primary"
                className="w-full"
              >
                QR Code Scanned
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

