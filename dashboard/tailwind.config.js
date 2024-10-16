/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    //themes: false,
    themes:["light","cupcake", "cmyk"]
  },
  plugins: [
    require('daisyui'),
  ],
}

