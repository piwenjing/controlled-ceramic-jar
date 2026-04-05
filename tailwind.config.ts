import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "wine-dark": "#1a0505",
        "wine-red": "#4a0404",
        "wine-accent": "#722F37",
        "champagne-gold": "#d4af37",
        "pale-gold": "#f3e5ab",
        cream: "#faf5e4",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-lato)", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
