/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#c32f3a",
        "primary-focus": "#e93845",
        "primary-content": "#f0f1f6",

        "secondary": "#e74e34",
        "secondary-focus": "#b33c28",
        "secondary-content": "#f4e5d3",

        "accent": "#18191f",
        "modal": "#9ca3afdd"

      }
    },
  },
  plugins: [],
}