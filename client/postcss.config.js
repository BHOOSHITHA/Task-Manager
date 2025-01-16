// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-nesting'), // PostCSS Nesting plugin for supporting standard CSS nesting
    require('postcss-nested'),  // PostCSS Nested plugin for handling nested CSS rules
    require('tailwindcss'),     // Tailwind CSS
    require('autoprefixer'),    // Autoprefixer for adding vendor prefixes
  ],
};