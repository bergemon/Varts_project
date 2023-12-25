/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        '1xl': '1px',
        '3xl': '3px',
        '5xl': '5px',
        '10xl': '10px',
        '500xl': '500px'
      },
      borderWidth: {
        1: "1px"
      },
      backgroundImage: {
        'primary': "url('/assets/images/bg_primary.png')",
        'gradient-room': 'linear-gradient(180deg, rgba(86, 107, 116, 0) 0%, #566B74 100%)',
      },
      boxShadow: {
        primHead: "0px 1px 0px 0px #566B74",
        primMenu: "0px 5px 10px 0px #00000040"
      },
      flex: {
        'slide': '0 0 25%'
      },
      colors: {
        opacity10: {
          DEFAULT: "#FFFFFF1A",
        },
        opacity20: {
          DEFAULT: "rgba(255, 255, 255, 0.2)",
        },
        gray: {
          DEFAULT: "#A1ADB2",
          90: "#566B74",
          80: "#697B83",
          70: "#7B8C93",
          50: "#A1ADB2",
          40: "#B4BDC1",
        },
        dark: {
          DEFAULT: "#435A64",
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
