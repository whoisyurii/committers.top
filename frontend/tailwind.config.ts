import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neobrutalism Dark Blue Theme
        primary: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0056e6',
          600: '#0044b3',
          700: '#003380',
          800: '#00224d',
          900: '#00111a',
        },
        secondary: {
          50: '#f0f4ff',
          100: '#d6e3ff',
          200: '#bdd2ff',
          300: '#a3c1ff',
          400: '#8ab0ff',
          500: '#709fff',
          600: '#5788cc',
          700: '#3d7199',
          800: '#245a66',
          900: '#0a4333',
        },
        accent: {
          50: '#fff5e6',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb74d',
          400: '#ffa31a',
          500: '#e68e00',
          600: '#b37000',
          700: '#805200',
          800: '#4d3300',
          900: '#1a1500',
        },
        dark: {
          50: '#f7f8fa',
          100: '#e1e5ea',
          200: '#c4cdd5',
          300: '#a0adb8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        }
      },
      fontFamily: {
        'brutal': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px 0px #000',
        'brutal-lg': '8px 8px 0px 0px #000',
        'brutal-xl': '12px 12px 0px 0px #000',
        'brutal-primary': '4px 4px 0px 0px #0056e6',
        'brutal-accent': '4px 4px 0px 0px #e68e00',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;