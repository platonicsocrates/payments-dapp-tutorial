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
  // Output configuration
  output: {
    path: BUILD_PATH,
    filename: "[contenthash].js",
  },
  // Resolving file extensions and paths
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      }),
    ],
    fallback: {
      buffer: require.resolve("buffer/"),
    },
  },
  // Module rules for different file types
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: ["ts-loader"],
        exclude: /node-modules/,
