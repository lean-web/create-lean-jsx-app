module.exports = {
  root: true,
  env: {
    commonjs: true,
    node: true,
    jest: true,
    browser: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parser: "@typescript-eslint/parser",
  rules: {
    "prettier/prettier": "error",
    "lean-jsx/single-yield-return": "error",
    "lean-jsx/no-outer-scope-in-handlers": "error",
    "no-unused-vars": "warn",
  },
  globals: {
    SXL: "true",
  },
  plugins: ["prettier", "@typescript-eslint", "eslint-plugin-lean-jsx"],
};
