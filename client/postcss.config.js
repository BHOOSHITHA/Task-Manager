// postcss.config.js
module.exports = {
    plugins: [
      require('postcss-nested'), // Ensure this is first
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  };
  