// This file is the configuration file for ESLint, a tool used to enforce coding standards and catch errors in JavaScript code.

module.exports = {
  extends: ["@stellar/eslint-config"], // We are extending the "@stellar/eslint-config" configuration, which provides Stellar-specific rules.
  env: {
    es2020: true, // We are specifying that our code is written in ECMAScript 2020 (ES2020).
  },
  globals: {}, // We are not defining any global variables.
  ignorePatterns: ["dist/", "node_modules/", "build/", "__mocks__/"], // We are specifying the directories and files to ignore during linting.
  overrides: [
    {
      files: ["webpack.*.js"], // We are applying specific rules to files that match the pattern "webpack.*.js".
      rules: {
        "import/no-extraneous-dependencies": [0, { devDependencies: false }], // We are disabling the rule that disallows importing extraneous dependencies in webpack configuration files.
      },
    },
  ],
  rules: {
    "react-hooks/exhaustive-deps": "error", // We are enabling the rule that enforces exhaustive dependencies in React hooks.
    "no-shadow": "off", // We are disabling the rule that disallows variable shadowing.
    "@typescript-eslint/no-shadow": ["error"], // We are enabling the TypeScript-specific rule that disallows variable shadowing.
    "no-unused-vars": "off", // We are disabling the rule that disallows unused variables.
    "@typescript-eslint/no-unused-vars": ["error"], // We are enabling the TypeScript-specific rule that disallows unused variables.
    "no-console": "off", // We are disabling the rule that disallows the use of console statements.
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }], // We are enabling the rule that enforces the use of .tsx and .jsx file extensions for JSX files.
    "jsdoc/newline-after-description": "off", // We are disabling the rule that enforces a newline after JSDoc descriptions.
    "max-classes-per-file": "off", // We are disabling the rule that limits the number of classes per file.
    "no-bitwise": "off", // We are disabling the rule that disallows bitwise operators.
    "no-param-reassign": "off", // We are disabling the rule that disallows reassigning function parameters.
    "no-restricted-syntax": "off", // We are disabling the rule that restricts the use of certain syntax.
  },
  settings: {
    "import/resolver": {
      typescript: {}, // We are configuring the TypeScript resolver for imports.
      node: {
        extensions: [".ts", ".tsx"], // We are specifying the file extensions to resolve for Node.js modules.
        moduleDirectory: ["node_modules", "src"], // We are specifying the directories to search for modules.
      },
    },
  },
};
