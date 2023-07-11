/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {},
      keyframes: {
        lightColorChange: {
          "0%": { color: "#c6262e" },
          "14%": { color: "#f37329" },
          "28%": { color: "#f9c440" },
          "42%": { color: "#68b723" },
          "56%": { color: "#28bca3" },
          "70%": { color: "#3689e6" },
          "84%": { color: "#a56de2" },
          "100%": { color: "#c6262e" },
        },
      },
      animation: {
        lightColorChange: "lightColorChange 20s ease-in-out infinite",
      },
      backgroundColor: {
        "leetcode-bg": "rgb(26 26 26/var(--tw-bg-opacity))",
        "leetcode-bg-lighter": "rgb(40 40 40/var(--tw-bg-opacity))",
        "leetcode-bg-even": "#ffffff12",
        "leetcode-olive": "rgb(0 184 163/var(--tw-bg-opacity))",
        "leetcode-yellow": "rgb(255 192 30/var(--tw-bg-opacity))",
        "leetcode-red": "rgb(255 55 95/var(--tw-bg-opacity))",
        "leetcode-gray-2": "rgb(240 240 240/var(--tw-bg-opacity))",
        "leetcode-dark-2": "rgb(48 48 48/var(--tw-bg-opacity))",
      },
      colors: {
        "leetcode-text": "#eff2f699",
        "leetcode-orange": "rgb(255 161 22/var(--tw-text-opacity))",
        "leetcode-underline": "rgb(179 179 179/var(--tw-bg-opacity))",
        "leetcode-olive": "rgb(0 184 163/var(--tw-text-opacity))",
        "leetcode-yellow": "rgb(255 192 30/var(--tw-text-opacity))",
        "leetcode-red": "rgb(255 55 95/var(--tw-text-opacity))",
        "leetcode-code": "#d4d4d4",
      },

      borderColor: {
        "leetcode-border": "rgb(61 61 61/var(--tw-border-opacity))",
      },
    },
  },
  plugins: [require("daisyui")],
};
