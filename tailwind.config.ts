import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 1s ease infinite',
        popover: 'popover 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        requestGameContent:
          'requestGameContent 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        requestGameContent: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        popover: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '-100% 50%',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xxsh: { raw: '(min-height: 500px)' },
        xsh: { raw: '(min-height: 675px)' },
        mdh: { raw: '(min-height: 820px)' },
        lgh: { raw: '(min-height: 900px)' },
        xlh: { raw: '(min-height: 1024px)' },
        // => @media (max-height: 1234px) { ... }
      },
    },
  },
  plugins: [],
};
export default config;
