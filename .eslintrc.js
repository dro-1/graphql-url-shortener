module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "eol-last": ["warn", "always"],
    "no-console": ["off", { allow: ["warn", "error"] }],
    "no-useless-catch": ["off"],
  },
};
