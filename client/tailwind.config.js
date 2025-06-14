/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}", // optional for component structure
    "./src/pages/**/*.{js,ts,jsx,tsx}",      // optional for page-based apps
  ],
  theme: {
    extend: {
      // Add custom colors, spacing, fonts, etc here if needed
    },
  },
  plugins: [
    // Example: require('@tailwindcss/forms'),
    // Example: require('@tailwindcss/typography'),
  ],
};