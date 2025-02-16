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
        redButton: 'rgb(239 68 68)',
<<<<<<< HEAD
        blueButton: 'rgb(37 99 235)',
        blueButtonHover: 'rgb(29 78 216)',
=======
        blueButton: '#567EBB',
>>>>>>> main
        headerDark: 'rgb(53,53,53,33%)',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
