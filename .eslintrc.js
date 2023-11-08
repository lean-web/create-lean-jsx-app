module.exports = {
  root: true,
  env: {
    commonjs: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "prettier/prettier": "error",
  },
  plugins: ["prettier"],
};
