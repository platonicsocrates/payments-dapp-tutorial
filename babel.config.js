// This file is the configuration file for Babel, a JavaScript compiler.
// It exports an object that specifies the plugins and presets to be used.

module.exports = {
  plugins: ["dynamic-import-node", "@babel/plugin-proposal-optional-chaining"],

  // The plugins array contains the Babel plugins to be used.
  // Here, we have "dynamic-import-node" and "@babel/plugin-proposal-optional-chaining".

  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],

  // The presets array contains the Babel presets to be used.
  // Here, we have "@babel/preset-typescript", "@babel/preset-react", and "@babel/preset-env".
  // The "@babel/preset-env" preset is configured to target the current version of Node.js.
};
