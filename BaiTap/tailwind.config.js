/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./components/**/*.{js,jsx,ts,tsx}","./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:"#36393e",
        accent:"#424549",
        sidebar:"#282b30",
        highlight:"#5865F2",
        dark:"#1e2124",
        ligghtBlurple:"#E0E3FF"
      }
    },
  },
  plugins: [],
};