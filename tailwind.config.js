
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ensure this path is correct for your project structure
  ],
  theme: {
    extend: {
      colors: {
        bluePrimary: '#1A3A69',  // Custom blue
        blueAccent: '#4A90E2',   // Lighter blue for hover states
      },
    },
  },
  plugins: [],
};
