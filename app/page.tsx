"use client";

import { CarbonMaxBanner } from "@/components/carbonmax/CarbonMaxBanner";
import { QuestProgressProvider } from "@/hooks/useQuestProgress";
import { Search, Star, MapPin, Plane, ShoppingBag, User } from "lucide-react";
import { motion } from "framer-motion";

const quickActions1 = [
  { icon: "🎉", label: "Celebrate" },
  { icon: "🏷️", label: "Deals" },
  { icon: "🛍️", label: "Duty-Free" },
  { icon: "🅿️", label: "Parking" },
  { icon: "📍", label: "Map" },
];

const quickActions2 = [
  { icon: "✈️", label: "Flights" },
  { icon: "🛡️", label: "Insurance" },
  { icon: "🏨", label: "Hotels" },
  { icon: "📱", label: "E-SIM" },
  { icon: "⋯", label: "View All" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: { scale: 0.95 },
};

export default function HomePage() {
  return (
    <QuestProgressProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/40 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 30, -30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-56 h-56 bg-accent-gold/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        />

        {/* Subtle Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Simulated Changi App */}
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-2xl min-h-screen shadow-xl relative z-10 border-x border-white/20">
          {/* Status Bar Placeholder */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-changi-navy text-white px-4 py-2 text-xs flex justify-between items-center"
          >
            <span>9:41</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-changi-navy px-4 pb-4"
          >
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-white/10 rounded-lg px-4 py-2.5 flex items-center gap-2 backdrop-blur-sm cursor-pointer transition-all hover:bg-white/15"
              >
                <Search className="w-4 h-4 text-white/60" />
                <span className="text-white/60 text-sm">Search flights, food, shops, facilities</span>
              </motion.div>
              <motion.button 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="p-2"
              >
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 py-4 space-y-4"
          >
            {/* CarbonMax Banner - THE MAIN FEATURE */}
            <motion.div variants={itemVariants}>
              <CarbonMaxBanner />
            </motion.div>

            {/* User Greeting (simulated) */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-changi-purple to-changi-navy rounded-2xl p-4 text-white shadow-lg cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Hi Traveller</p>
                  <p className="font-bold text-xl">340 pts</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  🎁 Rewards Card
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Actions Grid (simulated Changi App features) */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-5 gap-2"
            >
              {quickActions1.map((item, i) => (
                <motion.button
                  key={i}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex flex-col items-center gap-1 p-2 group"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors shadow-sm group-hover:shadow-md"
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-xs text-gray-600 group-hover:text-primary transition-colors font-medium">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-5 gap-2"
            >
              {quickActions2.map((item, i) => (
                <motion.button
                  key={i}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex flex-col items-center gap-1 p-2 group"
                >
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors shadow-sm group-hover:shadow-md"
                  >
                    {item.icon}
                  </motion.div>
                  <span className="text-xs text-gray-600 group-hover:text-primary transition-colors font-medium">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Tabs */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-4 border-b"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pb-2 border-b-2 border-changi-purple text-changi-purple font-medium text-sm"
              >
                All
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pb-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
              >
                Celebrate with Changi
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pb-2 text-gray-400 text-sm hover:text-gray-600 transition-colors"
              >
                Experiences
              </motion.button>
            </motion.div>

            {/* Discover Section (placeholder) */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-4 shadow-sm cursor-pointer"
            >
              <h3 className="font-bold text-gray-900 mb-1">Discover & Book</h3>
              <p className="text-sm text-gray-600">
                The best things you can do to make the most out of your day.
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom Navigation */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto backdrop-blur-lg bg-white/95"
          >
            <div className="flex justify-around py-2">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: "Explore", active: true },
                { icon: <Plane className="w-5 h-5" />, label: "Fly", active: false },
                { icon: <span className="text-lg">💳</span>, label: "Pay", active: false },
                { icon: <ShoppingBag className="w-5 h-5" />, label: "Dine & Shop", active: false },
                { icon: <User className="w-5 h-5" />, label: "Account", active: false },
              ].map((item, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                    item.active ? "text-changi-purple" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>
            {/* Home indicator */}
            <div className="flex justify-center pb-1">
              <div className="w-32 h-1 bg-gray-300 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </QuestProgressProvider>
  );
}
