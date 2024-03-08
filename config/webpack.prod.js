// Importing necessary modules
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const I18nextWebpackPlugin = require("i18next-scanner-webpack");
const { commonConfig } = require("./webpack.common.js");

// Define the available locales
const LOCALES = ["en", "pt"];

