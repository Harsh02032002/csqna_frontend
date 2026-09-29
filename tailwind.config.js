/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#0F172A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#F8FAFC",
          foreground: "#0F172A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        hero: "#F8FAFC",
        "brand-blue": "#2563EB",
        "brand-purple": "#8B5CF6",
        "brand-pink": "#EC4899",
        "brand-orange": "#F97316",
        "brand-red": "#EF4444",
        success: "#10B981",
        teal: "#14B8A6",
        "soft-blue": "#EFF6FF",
      },
      borderRadius: {
        lg: "var(--radius, 0.8rem)",
        md: "calc(var(--radius, 0.8rem) - 2px)",
        sm: "calc(var(--radius, 0.8rem) - 4px)",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        hand: ["'Caveat'", "cursive"],
        poppins: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        cta: "0 8px 18px -8px rgba(139, 92, 246, 0.5)",
        "cta-strong": "0 12px 24px -8px rgba(236, 72, 153, 0.6)",
        float: "0 16px 45px rgba(37, 99, 235, 0.13)",
        card: "0 10px 28px rgba(15, 23, 42, 0.07)",
      },
      backgroundImage: {
        cta: "linear-gradient(100deg, #8B5CF6 0%, #EC4899 60%, #F97316 100%)",
      },
      keyframes: {
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "float-soft": "float-soft 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
