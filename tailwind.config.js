/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        thmanyah: ['CairoNumbers', 'var(--font-thmanyah)', 'sans-serif'],
        cairo: ['CairoNumbers', 'var(--font-thmanyah)', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fdf2',
          100: '#dcfce5',
          200: '#bbf7ce',
          300: '#86efad',
          400: '#4ade80',
          DEFAULT: '#449C40',
          500: '#449C40',
          600: '#368332',
          alt: '#00703C',
          700: '#00703C',
          800: '#075831',
          900: '#08482a',
          950: '#022916',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
