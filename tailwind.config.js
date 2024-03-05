/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      nunito: ['Nunito Sans', 'sans-serif'],
      plex: ['IBM Plex Sans', 'sans-serif'],
    },
    screens: { xl: '1440px' },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      'off-white': '#FFFFFE',
      lightgray: '#EAEAEA',
      gray: '#828282',
      red: {
        DEFAULT: '#DC4A5C',
        800: '#d9293e',
      },
      cyan: '#309794',
      blue: '#1E4470',
      darkblue: '#0D0842',
      yellow: {
        DEFAULT: '#FFCE1A',
        800: '#d0a609',
      },
      orange: '#FF5841',
    },
    fontSize: {
      'xxs-small': [
        '12px',
        {
          lineHeight: '16.37px',
          fontWeight: '400',
        },
      ],
      'xs-small': [
        '13px',
        {
          lineHeight: '15.85px',
          fontWeight: '500',
        },
      ],
      xs: [
        '14px',
        {
          lineHeight: '19.1px',
          fontWeight: '400',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '19.5px',
          fontWeight: '400',
        },
      ],
      'base-nunito': [
        '16px',
        {
          lineHeight: '21.82px',
          fontWeight: '400',
        },
      ],
      'base-bold': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '700',
          letterSpacing: '0.05em',
        },
      ],
      lg: [
        '18px',
        {
          lineHeight: '24.55px',
          fontWeight: '400',
        },
      ],
      '3xl': [
        '24px',
        {
          lineHeight: '29.26px',
          fontWeight: '400',
        },
      ],
      '3xl-nunito': [
        '24px',
        {
          lineHeight: '32.74px',
          fontWeight: '400',
        },
      ],
      '4xl': [
        '32px',
        {
          lineHeight: '32px',
          fontWeight: '700',
          letterSpacing: '0.02em',
        },
      ],
      '5xl': [
        '36px',
        {
          lineHeight: '43.88px',
          fontWeight: '400',
        },
      ],
      '6xl': [
        '40px',
        {
          lineHeight: '48.76px',
          fontWeight: '500',
        },
      ],
      '10xl': [
        '228px',
        {
          lineHeight: '277.93px',
          fontWeight: '500',
        },
      ],
    },
    extend: {},
  },
  plugins: [],
}
