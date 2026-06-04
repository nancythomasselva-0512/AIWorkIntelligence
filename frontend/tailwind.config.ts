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
        'theme-main': 'var(--bg-main)',
        'theme-panel': 'var(--bg-panel)',
        'theme-text': 'var(--text-primary)',
        'theme-text-sec': 'var(--text-secondary)',
        'theme-border': 'var(--border-color)',
        'theme-border-light': 'var(--border-color-light)',
        'theme-accent': 'var(--accent-color)',
        'theme-accent-hover': 'var(--accent-hover)',
        'theme-accent-text': 'var(--accent-text)',
        'opti-dark': '#0f172a',
        'opti-slate': '#1e293b',
        'opti-lime': '#c4f03f',
        'opti-lime-hover': '#b1d913',
        'opti-card': '#1c2b36',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
