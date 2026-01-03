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
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Changi Brand Colors
        changi: {
          navy: "#0f1133",
          purple: "#693874",
          cream: "#f3efe9",
          red: "#902437",
          gray: "#5b5b5b",
        },
        
        // CarbonMax Mode Colors
        mode: {
          jewel: {
            DEFAULT: "#F5A623",
            light: "#FFD54F",
            dark: "#E69100",
            bg: "#FFFBF0",
            accent: "#FFF3D6",
          },
          departure: {
            DEFAULT: "#1E3A8A",
            light: "#3B82F6",
            dark: "#1E40AF",
            bg: "#F0F7FF",
            accent: "#DBEAFE",
          },
          transit: {
            DEFAULT: "#0D9488",
            light: "#2DD4BF",
            dark: "#115E59",
            bg: "#F0FDFA",
            accent: "#CCFBF1",
          },
        },
        
        // Green/Eco Colors
        eco: {
          leaf: "#2D8B4E",
          mint: "#4ECDC4",
          forest: "#1B4332",
          lime: "#B7E4C7",
          sage: "#87A878",
        },
        
        // Carbon Rating Colors
        rating: {
          "a-plus": "#22C55E",
          a: "#84CC16",
          b: "#EAB308",
          c: "#F97316",
          d: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

