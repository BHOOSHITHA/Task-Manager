// // postcss.config.js
// module.exports = {
//   plugins: [
//     require('postcss-nesting'), // PostCSS Nesting plugin for supporting standard CSS nesting
//     require('postcss-nested'),  // PostCSS Nested plugin for handling nested CSS rules
//     require('tailwindcss'),     // Tailwind CSS
//     require('autoprefixer'),    // Autoprefixer for adding vendor prefixes
//   ],
// };
// postcss.config.js
module.exports = {
  plugins: [
    'postcss-import',   // Handles @import statements
    'postcss-nesting',  // CSS nesting (should come before tailwindcss)
    'tailwindcss',      // Tailwind CSS plugin (must come after nesting)
    'autoprefixer',     // Add vendor prefixes for browser compatibility
  ],
};
