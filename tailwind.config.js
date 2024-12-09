/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./client/views/**/*.ejs", // Add this line to scan your EJS files
    "./client/public/**/*.js" // This might be needed if you have any JavaScript that generates HTML
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

