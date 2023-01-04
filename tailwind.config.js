/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/page-components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        // make it with #121212
        "dark-gray": "#121212",
        "light-gray": "#262626",
      },
    },
  },
  plugins: [],
};
