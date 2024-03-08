// Importing required modules
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

// Importing default stats configuration
const { DEFAULT_STATS } = require("./stats");

// Defining the build path
const BUILD_PATH = path.resolve(__dirname, "../build");

// Common configuration for webpack
const commonConfig = (env) => ({
  // Entry point for the application
  entry: {
    index: ["babel-polyfill", path.resolve(__dirname, "../src/index.tsx")],
  },
  // Watch options for webpack
  watchOptions: {
    ignored: ["node_modules/**/*", "build/**/*"],
  },
