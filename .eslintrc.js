/* eslint-env node */
module.exports = {
    extends: ["../../.eslintrc"],

    rules: {
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-unsafe-return": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "lean-jsx/single-yield-return": "error"
    }
};
