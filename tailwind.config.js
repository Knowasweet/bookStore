/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      nunito: ['Nunito Sans', 'sans-serif'],
      plex: ['IBM Plex Sans', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    screens: { xl: '1440px' },
    colors: {
      transparent: 'transparent',
      white: {
        DEFAULT: '#FFFFFF',
        800: '#FFFFFE',
      },
      black: '#000000',
      lightgray: '#EAEAEA',
      gray: '#828282',
      red: {
        DEFAULT: '#DC4A5C',
        800: '#d9293e',
      },
      cyan: '#309794',
      blue: '#1E4470',
      lightblue: {
        DEFAULT: '#ECF3FE',
        800: '#d2e3fc',
      },
      darkblue: '#0D0842',
      yellow: {
        DEFAULT: '#FFCE1A',
        800: '#d0a609',
      },
      orange: {
        DEFAULT: '#FF5841',
        800: '#ff4f36',
      },
    },
    fontSize: {
      xs: [
        '13px',
        {
          lineHeight: '15.85px',
          fontWeight: '500',
        },
      ],
      sm: [
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
      md: [
        '18px',
        {
          lineHeight: '24.55px',
          fontWeight: '400',
        },
      ],
      lg: [
        '22.24px',
        {
          lineHeight: '30.33px',
          fontWeight: '700',
        },
      ],
      '3xl': [
        '24px',
        {
          lineHeight: '29.26px',
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
