import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Consolas", "monospace"],
      },
      colors: {
        // CSS Variable-based colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
          50: "hsl(var(--secondary-50))",
          100: "hsl(var(--secondary-100))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          gold: {
            DEFAULT: "hsl(var(--accent-gold))",
            light: "hsl(var(--accent-gold-light))",
          },
          purple: {
            DEFAULT: "hsl(var(--accent-purple))",
            light: "hsl(var(--accent-purple-light))",
          },
          teal: {
            DEFAULT: "hsl(var(--accent-teal))",
            light: "hsl(var(--accent-teal-light))",
          },
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
          dark: "hsl(var(--success-dark))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          light: "hsl(var(--warning-light))",
          dark: "hsl(var(--warning-dark))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          light: "hsl(var(--error-light))",
          dark: "hsl(var(--error-dark))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          light: "hsl(var(--info-light))",
          dark: "hsl(var(--info-dark))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Changi Brand Colors (keep for compatibility)
        changi: {
          navy: "#0f1133",
          purple: "#693874",
          cream: "#f3efe9",
          red: "#902437",
          gray: "#5b5b5b",
        },
        
        // CarbonMax Mode Colors - Updated to EcoQuest
        mode: {
          jewel: {
            DEFAULT: "#F59E0B",
            light: "#FCD34D",
            dark: "#D97706",
            bg: "#FFFBEB",
            accent: "#FEF3C7",
          },
          departure: {
            DEFAULT: "#3B82F6",
            light: "#60A5FA",
            dark: "#2563EB",
            bg: "#EFF6FF",
            accent: "#DBEAFE",
          },
          transit: {
            DEFAULT: "#10B981",
            light: "#34D399",
            dark: "#059669",
            bg: "#ECFDF5",
            accent: "#D1FAE5",
          },
        },
        
        // Eco Colors - Updated to EcoQuest palette
        eco: {
          leaf: "#10B981",
          mint: "#14B8A6",
          forest: "#065F46",
          lime: "#D1FAE5",
          sage: "#6EE7B7",
        },
        
        // Carbon Rating Colors
        rating: {
          "a-plus": "#10B981",
          a: "#34D399",
          b: "#F59E0B",
          c: "#F97316",
          d: "#EF4444",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        success: "0 4px 14px 0 rgba(16, 185, 129, 0.2)",
        achievement: "0 4px 14px 0 rgba(245, 158, 11, 0.3)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "celebrate": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "flicker": {
          "0%, 100%": { transform: "scale(1)", filter: "brightness(1)" },
          "50%": { transform: "scale(1.1)", filter: "brightness(1.3)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "celebrate": "celebrate 0.5s ease-out",
        "shimmer": "shimmer 3s infinite",
        "flicker": "flicker 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
