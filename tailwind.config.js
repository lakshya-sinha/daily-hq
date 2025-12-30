/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default to Inter as recommended
      },
      colors: {
        primary: {
          indigo: '#3B4EFF',
          cyan: '#4FD1C5',
          blue: '#334EF6',
          mainn: '#334EF6',
        },
        functional: {
          green: '#22C55E',
          red: '#EF4444',
        },
        background: {
          main: '#334EF6',
          card: '#111827',
          border: '#1F2937',
        },
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
      },
    },
  },
  plugins: [],
};