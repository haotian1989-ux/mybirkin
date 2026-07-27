import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#FCFAF7",
          100: "#F5F1EA",
          200: "#EBE2D4",
          300: "#D9C9B0",
          400: "#C4A87F",
          500: "#B8935A",
          600: "#A37D46",
          700: "#856439",
          800: "#6B5131",
          900: "#4A3924",
          950: "#2C2014",
        },
        paper:    "#FAF8F5",
        ivory:    "#F3EFE8",
        charcoal: "#1C1C1C",
        smoke:    "#6B6B6B",
        gold:     "#B8935A",
        bronze:   "#8B7355",
        pearl:    "#E8E3D9",
        dark:     "#1C1C1C",
        muted:    "#8C8C8C",
        line:     "#E5E0D8",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        heading: ["clamp(1.75rem, 3vw, 2.75rem)", { lineHeight: "1.15" }],
      },
      letterSpacing: {
        widest: "0.2em",
        extra:  "0.12em",
        label:  "0.08em",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
};
export default config;
