/**
 * tailwind.config.ts
 *
 * NOTE: This project uses Tailwind CSS v4.
 * In v4, design tokens are defined via @theme in globals.css,
 * NOT in this config file. This file is kept for:
 *  - Plugin registration (typography, aspect-ratio)
 *  - IDE / tooling compatibility
 *  - Future migration reference
 *
 * Color palette, fonts, and spacing are in:
 *   src/app/globals.css → @theme { ... }
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
