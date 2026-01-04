"use client";

import { CarbonMaxBanner } from "@/components/CarbonMaxBanner";
import { Search, Star, MapPin, Plane, ShoppingBag, User } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
        {/* Simulated Changi App */}
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
          {/* Status Bar Placeholder */}
          <div className="bg-[#1a1a2e] text-white px-4 py-2 text-xs flex justify-between items-center">
            <span>15:30</span>
            <div className="flex gap-1">
              <span>R</span>
              <span>67%</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-[#1a1a2e] px-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="CarbonMax Logo" 
                  width={32} 
                  height={32}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex-1 bg-white/10 rounded-lg px-4 py-2.5 flex items-center gap-2">
                <Search className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-sm">Search for flights, food, shops, facilities</span>
              </div>
              <button className="p-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Main Content - White Background */}
          <div className="px-4 py-4 space-y-4 pb-24 bg-white">
            {/* CarbonMax Banner - THE MAIN FEATURE */}
            <CarbonMaxBanner />

            {/* User Greeting (simulated) */}
            <div className="bg-gradient-to-r from-[#6c5ce7] to-[#1a1a2e] rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    💳
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Hi Traveller</p>
                    <p className="font-bold text-lg">340 pts</p>
                  </div>
                </div>
                <button className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors">
                  🦋 Rewards Card
                </button>
              </div>
            </div>

            {/* Quick Actions Grid (simulated Changi App features) */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: "🎁", label: "Celebrate with Changi" },
                { icon: "🏷️", label: "Deals" },
                { icon: "🛍️", label: "Duty-Free Online" },
                { icon: "🅿️", label: "Parking" },
                { icon: "📍", label: "Map" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-1 p-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600 text-center leading-tight">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: "✈️", label: "Flights" },
                { icon: "🛡️", label: "Travel Insurance" },
                { icon: "🏨", label: "Hotel Partners" },
                { icon: "📱", label: "E-SIM" },
                { icon: "⋯", label: "View All" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-1 p-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600 text-center leading-tight">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b">
              <button className="pb-2 border-b-2 border-[#6c5ce7] text-[#6c5ce7] font-medium text-sm">
                All
              </button>
              <button className="pb-2 text-gray-400 text-sm">
                Celebrate with Changi
              </button>
              <button className="pb-2 text-gray-400 text-sm">
                Changi Experiences
              </button>
            </div>

            {/* Filter/Sort Option */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>☰</span>
              <span>Show available listings for: All dates at all locations</span>
            </div>

            {/* Discover Section (placeholder) */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 relative overflow-hidden">
              <h3 className="font-bold text-gray-900 mb-1">Discover & Book</h3>
              <p className="text-sm text-gray-600">
                The best things you can do to make the most out of your day.
              </p>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
            <div className="flex justify-around py-2">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: "Explore", active: true },
                { icon: <Plane className="w-5 h-5" />, label: "Fly", active: false },
                { icon: <span className="text-lg">💳</span>, label: "Pay", active: false },
                { icon: <ShoppingBag className="w-5 h-5" />, label: "Dine & Shop", active: false },
                { icon: <User className="w-5 h-5" />, label: "Account", active: false },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                    item.active ? "text-[#6c5ce7]" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center pb-1">
              <div className="w-32 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
  );
}
