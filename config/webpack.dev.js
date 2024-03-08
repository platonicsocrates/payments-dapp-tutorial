// Hey there! This is the webpack development configuration file.
// It's responsible for setting up the development environment for our project.

// We start by importing the necessary modules and configurations.
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { commonConfig } = require("./webpack.common.js");

// Here we define the specific configuration for the development mode.
const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 9000, // The development server will run on port 9000.
  },
  plugins: [
    // We use the DefinePlugin to define a global variable DEV_SERVER as true.
    // This can be useful for conditional logic in our code.
    new webpack.DefinePlugin({
      DEV_SERVER: true,
    })
  ],
};

// Finally, we export a function that merges the development configuration
