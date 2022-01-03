module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/**/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/**/*.{js,ts,jsx,tsx}",
    "./Components/**/**/**/*.{js,ts,jsx,tsx}",
    "./Components/UI/**/**/*.{js,ts,jsx,tsx}",
    './src/styles/**/*.css'

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
  enabled: process.env.NODE_ENV === "production",


}