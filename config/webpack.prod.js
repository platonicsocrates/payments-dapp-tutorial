// Importing necessary modules
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const I18nextWebpackPlugin = require("i18next-scanner-webpack");
const { commonConfig } = require("./webpack.common.js");

// Define the available locales
const LOCALES = ["en", "pt"];

// Configuration for production environment
const prodConfig = (env = { PRODUCTION: false, TRANSLATIONS: false }) => ({
  mode: "production",
  optimization: {
    minimize: env.PRODUCTION,
    runtimeChunk: "single",
  },

  plugins: [
    // Define a global variable DEV_SERVER as false
    new webpack.DefinePlugin({
      DEV_SERVER: false,
    }),
