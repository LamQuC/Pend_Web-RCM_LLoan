/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'discover-blue': '#003087', // Màu xanh của Discover
        'discover-gray': '#F5F6F5', // Màu xám nền
      },
    },
  },
  plugins: [],
}