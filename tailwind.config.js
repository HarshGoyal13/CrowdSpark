/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        transparent: "#ffffff00",
        richblack: {
          5: "#F1F2FF",
          25: "#DBDDEA",
          50: "#C5C7D4",
          100: "#AFB2BF",
          200: "#999DAA",
          300: "#838894",
          400: "#6E727F",
          500: "#585D69",
          600: "#424854",
          700: "#2C333F",
          800: "#161D29",
          900: "#000814",
        },
        primary: "#4D92FF", // Primary color
        "primary-hover": "#2372f1", // Hover color for primary
        "primary-bg": "#010220", // Background color
        secondary: "rgb(147 51 234)",
        "secondary-hover": "#a64ef5",
        third: "#5E17EB",
        highlight: "#FCB040",
        "text-color": "#FFFFFF",
        "text-color-2": "#000",
        yellow: {
          5: "#FFF970",
          50: "#FFD60A",
          100: "#E7C009",
        },
        pink: {
          50: "#F79CB0",
          200: "#EF476F",
        },
      },
      gradientColorStops: {
        primary: "#4D92FF",
        secondary: "rgb(147 51 234)",
        highlight: "#FCB040",
      },
      transitionProperty: {
        transform: "transform",
        opacity: "opacity",
      },
      boxShadow: {
        panelShadow: "rgba(17,12,46,0,15) 0px 48px 100px 0px",
      },
    },
  },
  plugins: [],
};
