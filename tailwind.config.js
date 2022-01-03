module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add more here
],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        'regal-blue':'#4661E6',
        'project-light-gray': '#F7F8FD',
        'project-medium-gray':'#F2F4FF',
      }
    },
  },
  plugins: [],
  important: true,

}