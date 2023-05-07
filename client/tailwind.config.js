/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["didot", "cursive"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
