/* eslint-env node */
module.exports = {
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
    ],
    env: {
      es2022: true,
      node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
      tsconfigRootDir: __dirname,
    },
    root: true,
    plugins: ["@typescript-eslint", "eslint-plugin-lean-jsx"],
    rules: {
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "lean-jsx/single-yield-return": "error",
    },
  };
  