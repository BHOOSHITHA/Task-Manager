// postcss.config.js
module.exports = {
    plugins: [
      require('postcss-nested'), // Ensure this is first
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  };
  module.exports = {
    plugins: [
      require('postcss-nesting'),
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  };
  