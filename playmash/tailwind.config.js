/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  safelist: [
    {
      pattern: /(^bg-|^border-)/,
    },
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1);' },
          '14%': { transform: 'scale(1.3);' },
          '28%': { transform: 'scale(1);' },
          '42%': { transform: 'scale(1.3);' },
          '70%': { transform: 'scale(1);' },
        },
        wobble: {
          from: {
            transform: 'translate3d(0, 0, 0)',
          },

          '15%': {
            transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
          },

          '30%': {
            transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
          },

          '45%': {
            transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
          },

          '60%': {
            transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
          },

          '75%': {
            transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
          },

          to: {
            transform: 'translate3d(0, 0, 0)',
          },
        },
        eight: {
          '0%': {
            transform: 'translate(0, 0)',
          },
          '15%': {
            transform: 'translate(-25%, -25%)',
          },
          '30%': {
            transform: 'translate(-25%, 25%)',
          },
          '45%': {
            transform: 'translate(25%, -25%)',
          },
          '60%': {
            transform: 'translate(25%, 25%)',
          },
          '75%': {
            transform: 'translate(0, 0)',
          },
          '80%': {
            transform: 'scale(1, 1);',
          },
          '82%': {
            transform: 'scale(75%, 75%);',
          },
          '84%': {
            transform: 'scale(1, 1);',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 2s ease-in-out infinite',
        heartbeat: 'heartbeat 1s',
        wobble: 'wobble 1s infinite',
        eight: 'eight 3s infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
