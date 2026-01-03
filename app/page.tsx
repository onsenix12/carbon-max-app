"use client";

import { CarbonMaxBanner } from "@/components/carbonmax/CarbonMaxBanner";
import { QuestProgressProvider } from "@/hooks/useQuestProgress";
import { Search, Star, MapPin, Plane, ShoppingBag, User } from "lucide-react";

export default function HomePage() {
  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7243/ingest/ff043c46-ebaa-49ee-a75d-5e6b254857f8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:6',message:'HomePage component rendered (client)',data:{timestamp:new Date().toISOString()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion
  return (
    <QuestProgressProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Simulated Changi App */}
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
          {/* Status Bar Placeholder */}
          <div className="bg-changi-navy text-white px-4 py-2 text-xs flex justify-between items-center">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-changi-navy px-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/10 rounded-lg px-4 py-2.5 flex items-center gap-2">
                <Search className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-sm">Search flights, food, shops, facilities</span>
              </div>
              <button className="p-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 py-4 space-y-4">
            {/* CarbonMax Banner - THE MAIN FEATURE */}
            <CarbonMaxBanner />

            {/* User Greeting (simulated) */}
            <div className="bg-gradient-to-r from-changi-purple to-changi-navy rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Hi Traveller</p>
                  <p className="font-bold">340 pts</p>
                </div>
                <button className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium">
                  🎁 Rewards Card
                </button>
              </div>
            </div>

            {/* Quick Actions Grid (simulated Changi App features) */}
            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: "🎉", label: "Celebrate" },
                { icon: "🏷️", label: "Deals" },
                { icon: "🛍️", label: "Duty-Free" },
                { icon: "🅿️", label: "Parking" },
                { icon: "📍", label: "Map" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-1 p-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: "✈️", label: "Flights" },
                { icon: "🛡️", label: "Insurance" },
                { icon: "🏨", label: "Hotels" },
                { icon: "📱", label: "E-SIM" },
                { icon: "⋯", label: "View All" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-1 p-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b">
              <button className="pb-2 border-b-2 border-changi-purple text-changi-purple font-medium text-sm">
                All
              </button>
              <button className="pb-2 text-gray-400 text-sm">
                Celebrate with Changi
              </button>
              <button className="pb-2 text-gray-400 text-sm">
                Experiences
              </button>
            </div>

            {/* Discover Section (placeholder) */}
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4">
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
                    item.active ? "text-changi-purple" : "text-gray-400"
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
    </QuestProgressProvider>
  );
}
