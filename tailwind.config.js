module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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