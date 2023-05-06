/** @type {import('tailwindcss').Config} */
export default {
  content: ["index,html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('background.jpg')",
      },
      fontFamily: {
      Playfair: ['Playfair', 'arial'],
     },
    },
    
  },
  plugins: [],
}

