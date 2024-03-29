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
      },
      {
        test: /\.(js)$/,
        use: ["babel-loader"],
        include: /webextension-polyfill/,
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
          },
        ],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  // Plugins for webpack
  plugins: [
    new ESLintPlugin({
      extensions: [".ts", ".tsx"],
      failOnWarning: true,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../public/static"),
    //       to: BUILD_PATH,
    //     }
    //   ]
    // }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      chunks: ["index"],
      filename: `${BUILD_PATH}/index.html`,
    }),
    new MiniCssExtractPlugin({
      filename: "style.min.css",
      chunkFilename: "[name].min.css",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  // Default stats configuration
  stats: DEFAULT_STATS,
  // Development server configuration
  devServer: {
    hot: true,
  },
});

// Exporting commonConfig and BUILD_PATH
module.exports.commonConfig = commonConfig;
module.exports.BUILD_PATH = BUILD_PATH;
