import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaria: 'rgb(37 99 235)',
        primariaHover: 'rgb(29 78 216)',
        secundaria: '#316EBD',
        headerDark: '#1F1F1F',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
