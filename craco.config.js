/* eslint-env node */
module.exports = {
  // Typescript Alias Configuration
  plugins: [
    {
      options: {
        baseUrl: './src',
        source: 'tsconfig',
        tsConfigPath: './tsconfig.paths.json',
      },
      plugin: require('craco-alias'),
    },
  ],

  // Tailwind configurations
  style: {
    postcssOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
