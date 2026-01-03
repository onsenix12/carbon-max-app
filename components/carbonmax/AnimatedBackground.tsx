"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedBackgroundProps {
  children: ReactNode;
  variant?: "home" | "quest" | "impact" | "chat" | "jewel" | "departure" | "transit";
  className?: string;
}

export function AnimatedBackground({ 
  children, 
  variant = "home",
  className = "" 
}: AnimatedBackgroundProps) {
  const variants = {
    home: {
      gradient: "from-gray-50 via-blue-50/30 to-green-50/40",
      particles: [
        { color: "bg-primary/10", size: "w-64 h-64", position: "top-10 left-10", delay: 0 },
        { color: "bg-secondary/10", size: "w-48 h-48", position: "top-40 right-20", delay: 0.5 },
        { color: "bg-accent-gold/10", size: "w-56 h-56", position: "bottom-20 left-1/4", delay: 1 },
      ],
    },
    quest: {
      gradient: "from-primary/5 via-secondary/5 to-accent-gold/5",
      particles: [
        { color: "bg-primary/8", size: "w-72 h-72", position: "top-0 right-0", delay: 0 },
        { color: "bg-secondary/8", size: "w-96 h-96", position: "bottom-0 left-0", delay: 0.7 },
        { color: "bg-accent-gold/8", size: "w-80 h-80", position: "top-1/2 right-1/4", delay: 1.2 },
      ],
    },
    impact: {
      gradient: "from-primary via-success-dark to-primary",
      particles: [
        { color: "bg-white/5", size: "w-96 h-96", position: "top-20 left-20", delay: 0 },
        { color: "bg-white/5", size: "w-80 h-80", position: "bottom-20 right-20", delay: 0.5 },
        { color: "bg-white/5", size: "w-72 h-72", position: "top-1/2 left-1/2", delay: 1 },
      ],
    },
    chat: {
      gradient: "from-muted via-primary/5 to-secondary/5",
      particles: [
        { color: "bg-primary/5", size: "w-64 h-64", position: "top-10 right-10", delay: 0 },
        { color: "bg-secondary/5", size: "w-48 h-48", position: "bottom-20 left-20", delay: 0.6 },
      ],
    },
    jewel: {
      gradient: "from-[#FFFBEB] via-amber-50/50 to-yellow-50/30",
      particles: [
        { color: "bg-accent-gold/10", size: "w-80 h-80", position: "top-0 right-0", delay: 0 },
        { color: "bg-amber-200/10", size: "w-64 h-64", position: "bottom-0 left-0", delay: 0.5 },
      ],
    },
    departure: {
      gradient: "from-[#EFF6FF] via-blue-50/50 to-sky-50/30",
      particles: [
        { color: "bg-secondary/10", size: "w-80 h-80", position: "top-0 left-0", delay: 0 },
        { color: "bg-blue-200/10", size: "w-64 h-64", position: "bottom-0 right-0", delay: 0.5 },
      ],
    },
    transit: {
      gradient: "from-[#ECFDF5] via-emerald-50/50 to-teal-50/30",
      particles: [
        { color: "bg-primary/10", size: "w-80 h-80", position: "top-0 right-0", delay: 0 },
        { color: "bg-emerald-200/10", size: "w-64 h-64", position: "bottom-0 left-0", delay: 0.5 },
      ],
    },
  };

  const config = variants[variant] || variants.home;

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient}`} />
      
      {/* Animated Particles/Blobs */}
      {config.particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute ${particle.size} ${particle.color} rounded-full blur-3xl`}
          style={{
            top: particle.position.includes("top") ? "0" : undefined,
            bottom: particle.position.includes("bottom") ? "0" : undefined,
            left: particle.position.includes("left") ? "0" : undefined,
            right: particle.position.includes("right") ? "0" : undefined,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

