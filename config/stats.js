// This file exports a constant object called DEFAULT_STATS
// It contains various configuration options for displaying stats during webpack build

const DEFAULT_STATS = {
  // Set to false to hide all stats, or true to show all stats
  all: false,

  // Set to true to show stats for individual modules
  modules: true,

  // Set to true to show errors during build
  errors: true,

  // Set to true to show warnings during build
  warnings: true,

  // Set to true to show the module trace for errors and warnings
  moduleTrace: true,

  // Set to true to show detailed error information
  errorDetails: true,

  // Set to true to show information about assets generated during build
  assets: true,

  // Set to an array of regular expressions to exclude specific assets from being displayed
  excludeAssets: [/\.d\.ts/, /\.png/, /\.jpe?g/],

  // Set to true to show the hash of the build output
  hash: true,

  // Set to true to show timing information for each build step
  timings: true,
};

module.exports = {
  DEFAULT_STATS,
};
