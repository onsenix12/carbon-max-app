"use client";

import { useState } from "react";
import { Quest, Merchant, QuestExtraData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Check, Lightbulb, QrCode, X, Navigation } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { QRCodeSVG } from "qrcode.react";

// Mock user location in Jewel Changi Airport
const USER_LOCATION = {
  terminal: "Jewel",
  level: "Level 1",
  coordinates: { x: 50, y: 50 }, // Center of map for simplicity
};

// Mock merchants data with map coordinates
interface RestaurantWithCoords extends Merchant {
  mapCoords: { x: number; y: number };
}

const RESTAURANTS: RestaurantWithCoords[] = [
  {
    id: "pho-street",
    name: "Pho Street",
    category: "Vietnamese",
    terminal: "Terminal 3",
    location: "#02-156",
    carbonRating: "A",
    description: "Authentic Vietnamese cuisine with plant-based options",
    walkTime: "3 min",
    mapCoords: { x: 30, y: 70 }, // Left side
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
    mapCoords: { x: 70, y: 30 }, // Top right
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
    mapCoords: { x: 50, y: 80 }, // Bottom center
  },
];

// Mock member ID for Changi Airport membership
const MEMBER_ID = "CHANGI-2024-789456";

// Calculate distance (simple Euclidean for demo)
function calculateDistance(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}

interface GreenPlateQuestProps {
  quest: Quest;
  onComplete: (points: number, bonus: boolean, extraData?: QuestExtraData) => void;
}

export function GreenPlateQuest({ quest, onComplete }: GreenPlateQuestProps) {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [atRestaurant, setAtRestaurant] = useState(false);
  const [orderedPlantBased, setOrderedPlantBased] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrScanned, setQrScanned] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState<string>("");
  const [showMap, setShowMap] = useState(false);
  const [hoveredRestaurant, setHoveredRestaurant] = useState<string | null>(null);

  const selectedRestaurantData = RESTAURANTS.find((r) => r.id === selectedRestaurant);
  const distance = selectedRestaurantData
    ? Math.round(
        calculateDistance(USER_LOCATION.coordinates, selectedRestaurantData.mapCoords) / 10
      )
    : null;

  // Calculate points: base + bonus (if plant-based) + purchase amount points (1 point per $1)
  const purchasePoints = purchaseAmount ? Math.floor(parseFloat(purchaseAmount) || 0) : 0;
  const totalPoints =
    quest.basePoints +
    (orderedPlantBased && quest.bonusPoints ? quest.bonusPoints : 0) +
    purchasePoints;

  const canComplete = atRestaurant && qrScanned && purchaseAmount;

  const handleShowQRCode = () => {
    setShowQRCode(true);
  };

  const handleQRScanned = () => {
    setQrScanned(true);
    setShowQRCode(false);
  };

  const handleComplete = () => {
    onComplete(totalPoints, orderedPlantBased, {
      restaurantId: selectedRestaurant,
      plantBased: orderedPlantBased,
      purchaseAmount: parseFloat(purchaseAmount) || 0,
      purchasePoints,
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
          </div>
        </div>
      </GlassCard>

      {/* Map View Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Restaurant Map</h3>
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
        <GlassCard className="p-4 relative min-h-[300px]">
          <div className="relative w-full h-[300px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden">
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

            {/* Restaurant Locations (Green dots) */}
            {RESTAURANTS.map((restaurant) => (
              <div
                key={restaurant.id}
                className="absolute z-10 cursor-pointer group"
                style={{
                  left: `${restaurant.mapCoords.x}%`,
                  top: `${restaurant.mapCoords.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => {
                  setSelectedRestaurant(restaurant.id);
                  setHoveredRestaurant(restaurant.id);
                }}
                onMouseEnter={() => setHoveredRestaurant(restaurant.id)}
                onMouseLeave={() => setHoveredRestaurant(null)}
              >
                <div
                  className={cn(
                    "w-5 h-5 bg-[#10B981] rounded-full border-2 border-white shadow-lg transition-all",
                    selectedRestaurant === restaurant.id && "ring-2 ring-[#10B981] ring-offset-2",
                    hoveredRestaurant === restaurant.id && "scale-125"
                  )}
                />
                {(hoveredRestaurant === restaurant.id ||
                  selectedRestaurant === restaurant.id) && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#10B981] text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg">
                    {restaurant.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#10B981]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Restaurant Selection */}
      <div>
        <h3 className="font-display font-semibold text-foreground mb-3">
          Choose a Green Restaurant
        </h3>
        <div className="space-y-3">
          {RESTAURANTS.map((restaurant) => {
            const dist = Math.round(
              calculateDistance(USER_LOCATION.coordinates, restaurant.mapCoords) / 10
            );
            return (
              <GlassCard
                key={restaurant.id}
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
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {restaurant.walkTime}
                    </div>
                    {selectedRestaurant === restaurant.id && (
                      <span className="text-xs text-blue-500">~{dist}m away</span>
                    )}
                  </div>
                </div>
                {selectedRestaurant === restaurant.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-foreground">{restaurant.description}</p>
                  </div>
                )}
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

      {/* QR Code Section */}
      {atRestaurant && (
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">Show Your QR Code</h3>
          <GlassCard className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Show your Changi Airport membership QR code when making your purchase to earn points.
            </p>
            {!qrScanned ? (
              <Button
                onClick={handleShowQRCode}
                variant="primary"
                className="w-full flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Show QR Code
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-[#10B981]">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">QR Code scanned successfully!</span>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* Purchase Amount Input */}
      {qrScanned && (
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">Enter Purchase Amount</h3>
          <Input
            type="number"
            placeholder="Enter amount (SGD)"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            icon={<span className="text-muted-foreground">$</span>}
            min="0"
            step="0.01"
          />
          {purchaseAmount && (
            <p className="text-sm text-muted-foreground mt-2">
              You'll earn <span className="text-[#10B981] font-medium">{purchasePoints} points</span> from this purchase (1 point per $1)
            </p>
          )}
        </div>
      )}

      {/* Points Breakdown */}
      {purchaseAmount && (
        <GlassCard className="p-4 bg-[#10B981]/10">
          <h4 className="font-semibold text-foreground mb-3">Points Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base points</span>
              <span className="text-foreground font-medium">+{quest.basePoints}</span>
            </div>
            {orderedPlantBased && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plant-based bonus</span>
                <span className="text-[#F59E0B] font-medium">+{quest.bonusPoints}</span>
              </div>
            )}
            {purchasePoints > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase points</span>
                <span className="text-foreground font-medium">+{purchasePoints}</span>
              </div>
            )}
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-[#10B981] text-lg">+{totalPoints}</span>
            </div>
          </div>
        </GlassCard>
      )}

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
        {canComplete
          ? `Complete Quest (+${totalPoints} pts)`
          : "Complete objectives to finish"}
      </Button>

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
                Changi Airport Membership
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Show this QR code to the cashier
              </p>
              <div className="flex justify-center mb-4 p-4 bg-white rounded-2xl">
                <QRCodeSVG value={MEMBER_ID} size={200} level="H" />
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Member ID: {MEMBER_ID}
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

