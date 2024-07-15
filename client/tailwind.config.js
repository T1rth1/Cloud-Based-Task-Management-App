/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  server:{
    port:5173,
    proxy:{
      "/api":{ 
        target:"http://localhost:3001",
        changeOrigin:true,
      }
    }
  }
}

