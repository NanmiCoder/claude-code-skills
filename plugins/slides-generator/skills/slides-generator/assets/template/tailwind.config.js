/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Primary colors - will be replaced during generation
        'primary': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Accent colors
        'accent': {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        // Background colors
        'bg': {
          'base': '#0f172a',
          'card': '#1e293b',
          'elevated': '#334155',
        },
        // Text colors
        'text': {
          'primary': '#f8fafc',
          'secondary': '#94a3b8',
          'muted': '#64748b',
        },
        // Border colors
        'border': {
          'default': '#334155',
          'subtle': '#1e293b',
        },
      },
    },
  },
  plugins: [],
}
