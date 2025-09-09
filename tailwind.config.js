/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // <-- Esta linha é a mais importante
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}